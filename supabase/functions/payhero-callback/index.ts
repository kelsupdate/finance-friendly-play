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

    // Extract payment details from callback (PayHero may wrap fields inside `response`)
    const responsePayload =
      payload && typeof payload === 'object' && 'response' in payload && payload.response && typeof payload.response === 'object'
        ? payload.response
        : payload;

    const externalReference =
      (responsePayload as any).external_reference ??
      (responsePayload as any).ExternalReference ??
      (payload as any).external_reference ??
      (payload as any).ExternalReference;

    const resultCode =
      (responsePayload as any).result_code ??
      (responsePayload as any).ResultCode ??
      (payload as any).result_code ??
      (payload as any).ResultCode;

    const checkoutRequestId =
      (responsePayload as any).checkout_request_id ??
      (responsePayload as any).CheckoutRequestID ??
      (payload as any).checkout_request_id ??
      (payload as any).CheckoutRequestID ??
      null;

    const status = resultCode === 0 || resultCode === '0' ? 'completed' : 'failed';

    if (!externalReference) {
      console.error('No external reference in callback');
      // Return 200 so provider doesn't keep retrying a permanently malformed payload
      return new Response(
        JSON.stringify({ success: false, message: 'No external reference' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const updateFields: Record<string, unknown> = { status };
    if (checkoutRequestId) updateFields.checkout_request_id = checkoutRequestId;

    // Update payment status
    const { error: updateError } = await supabase
      .from('payments')
      .update(updateFields)
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
