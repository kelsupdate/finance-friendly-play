import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const payload = await req.json();
    console.log('PayHero callback received:', JSON.stringify(payload));

    // Create Supabase client with service role
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Extract payment details from callback
    const externalReference = payload.external_reference || payload.ExternalReference;
    const resultCode = payload.result_code || payload.ResultCode;
    const status = resultCode === 0 || resultCode === '0' ? 'completed' : 'failed';

    if (!externalReference) {
      console.error('No external reference in callback');
      return new Response(
        JSON.stringify({ success: false, message: 'No external reference' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Update payment status
    const { error: updateError } = await supabase
      .from('payments')
      .update({ status })
      .eq('external_reference', externalReference);

    if (updateError) {
      console.error('Failed to update payment status:', updateError);
      return new Response(
        JSON.stringify({ success: false, message: 'Failed to update payment' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // If payment completed, update loan application
    if (status === 'completed') {
      const { data: payment } = await supabase
        .from('payments')
        .select('loan_application_id')
        .eq('external_reference', externalReference)
        .maybeSingle();

      if (payment?.loan_application_id) {
        await supabase
          .from('loan_applications')
          .update({ payment_verified: true })
          .eq('id', payment.loan_application_id);
      }
    }

    console.log(`Payment ${externalReference} updated to ${status}`);

    return new Response(
      JSON.stringify({ success: true, status }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: unknown) {
    console.error('Error in payhero-callback:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ success: false, message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
