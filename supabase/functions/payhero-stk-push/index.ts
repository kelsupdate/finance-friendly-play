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
    const { amount, phone_number, loan_application_id, user_id } = await req.json();

    console.log('PayHero STK Push request:', { amount, phone_number, loan_application_id, user_id });

    // Validate inputs
    if (!amount || !phone_number || !user_id) {
      return new Response(
        JSON.stringify({ success: false, message: 'Missing required fields' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const payheroApiKey = Deno.env.get('PAYHERO_API_KEY');
    const payheroApiSecret = Deno.env.get('PAYHERO_API_SECRET');

    if (!payheroApiKey || !payheroApiSecret) {
      console.error('PayHero credentials not configured');
      return new Response(
        JSON.stringify({ success: false, message: 'Payment service not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Create Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Generate unique external reference
    const externalReference = `NYOTA-${Date.now()}-${Math.random().toString(36).substring(7)}`;

    // Prepare PayHero request
    const authString = btoa(`${payheroApiKey}:${payheroApiSecret}`);
    
    const payheroPayload = {
      amount: amount,
      phone_number: phone_number,
      channel_id: 4380, // Account 1
      provider: "m-pesa",
      external_reference: externalReference,
      customer_name: user_id,
      callback_url: `${supabaseUrl}/functions/v1/payhero-callback`,
    };

    console.log('Sending to PayHero:', payheroPayload);

    const payheroResponse = await fetch('https://backend.payhero.co.ke/api/v2/payments', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${authString}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payheroPayload),
    });

    const payheroData = await payheroResponse.json();
    console.log('PayHero response:', payheroData);

    if (!payheroResponse.ok) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: payheroData.message || 'Failed to initiate payment' 
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Store payment record
    const { error: insertError } = await supabase
      .from('payments')
      .insert({
        user_id: user_id,
        loan_application_id: loan_application_id || null,
        amount: amount,
        phone_number: phone_number,
        external_reference: externalReference,
        checkout_request_id: payheroData.checkout_request_id || null,
        status: 'pending',
        provider: 'm-pesa',
      });

    if (insertError) {
      console.error('Failed to store payment record:', insertError);
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'STK push initiated',
        external_reference: externalReference,
        checkout_request_id: payheroData.checkout_request_id,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: unknown) {
    console.error('Error in payhero-stk-push:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ success: false, message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
