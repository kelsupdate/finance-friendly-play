import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, Loader2, Phone, XCircle, Shield, Wallet } from 'lucide-react';
import mpesaLogo from '@/assets/mpesa-logo.png';
import type { RealtimeChannel } from '@supabase/supabase-js';

export default function Payment() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  const [phoneNumber, setPhoneNumber] = useState('');
  const [processing, setProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'failed'>('idle');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showPhoneInput, setShowPhoneInput] = useState(false);
  const [currentExternalRef, setCurrentExternalRef] = useState<string | null>(null);
  const channelRef = useRef<RealtimeChannel | null>(null);

  const loanApplicationId = location.state?.loanApplicationId;
  const activationFee = 500;

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      fetchUserPhone();
    }
  }, [user]);

  // Cleanup realtime subscription on unmount
  useEffect(() => {
    return () => {
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
      }
    };
  }, []);

  const fetchUserPhone = async () => {
    const { data } = await supabase
      .from('profiles')
      .select('phone_number')
      .eq('user_id', user!.id)
      .maybeSingle();
    
    if (data?.phone_number) {
      setPhoneNumber(data.phone_number);
    }
  };

  const handleProceedToPayment = () => {
    if (!agreedToTerms) {
      toast({
        title: 'Terms Required',
        description: 'Please agree to the terms and conditions to proceed.',
        variant: 'destructive',
      });
      return;
    }
    setShowPhoneInput(true);
  };

  // Subscribe to realtime payment updates
  const subscribeToPaymentUpdates = (externalReference: string) => {
    console.log('Subscribing to payment updates for:', externalReference);
    
    // Remove existing channel if any
    if (channelRef.current) {
      supabase.removeChannel(channelRef.current);
    }

    const channel = supabase
      .channel(`payment-${externalReference}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'payments',
          filter: `external_reference=eq.${externalReference}`,
        },
        async (payload) => {
          console.log('Payment update received:', payload);
          const newStatus = payload.new.status;

          if (newStatus === 'completed') {
            setPaymentStatus('success');
            setProcessing(false);
            
            if (loanApplicationId) {
              await supabase
                .from('loan_applications')
                .update({ payment_verified: true })
                .eq('id', loanApplicationId);
            }

            toast({
              title: 'Payment Successful!',
              description: 'Your account has been activated.',
            });

            // Cleanup subscription
            supabase.removeChannel(channel);
          } else if (newStatus === 'failed') {
            setPaymentStatus('failed');
            setProcessing(false);
            toast({
              title: 'Payment Failed',
              description: 'The payment was not completed. Please try again.',
              variant: 'destructive',
            });

            // Cleanup subscription
            supabase.removeChannel(channel);
          }
        }
      )
      .subscribe((status) => {
        console.log('Subscription status:', status);
      });

    channelRef.current = channel;

    // Set a timeout fallback (60 seconds)
    setTimeout(() => {
      if (processing && paymentStatus === 'processing') {
        setPaymentStatus('failed');
        setProcessing(false);
        toast({
          title: 'Payment Timeout',
          description: 'Payment verification timed out. Please check your M-Pesa and try again if needed.',
          variant: 'destructive',
        });
        supabase.removeChannel(channel);
      }
    }, 60000);
  };

  const initiateSTKPush = async () => {
    if (!phoneNumber) {
      toast({
        title: 'Phone Required',
        description: 'Please enter your M-Pesa phone number.',
        variant: 'destructive',
      });
      return;
    }

    if (!user) {
      toast({
        title: 'Authentication Required',
        description: 'Please log in to continue with payment.',
        variant: 'destructive',
      });
      navigate('/auth');
      return;
    }

    // Format phone number to 254XXXXXXXXX
    let formattedPhone = phoneNumber.replace(/\s/g, '');
    if (formattedPhone.startsWith('0')) {
      formattedPhone = '254' + formattedPhone.substring(1);
    } else if (formattedPhone.startsWith('+254')) {
      formattedPhone = formattedPhone.substring(1);
    } else if (!formattedPhone.startsWith('254')) {
      formattedPhone = '254' + formattedPhone;
    }

    setProcessing(true);
    setPaymentStatus('processing');

    try {
      const { data, error } = await supabase.functions.invoke('payhero-stk-push', {
        body: {
          amount: activationFee,
          phone_number: formattedPhone,
          loan_application_id: loanApplicationId,
          user_id: user!.id,
        },
      });

      if (error) throw error;

      if (data.success) {
        setCurrentExternalRef(data.external_reference);
        
        toast({
          title: 'STK Push Sent!',
          description: 'Please check your phone and enter your M-Pesa PIN to complete payment.',
        });

        // Subscribe to realtime updates
        subscribeToPaymentUpdates(data.external_reference);
      } else {
        throw new Error(data.message || 'Failed to initiate payment');
      }
    } catch (error: any) {
      console.error('Payment error:', error);
      setPaymentStatus('failed');
      setProcessing(false);
      toast({
        title: 'Payment Failed',
        description: error.message || 'Failed to initiate payment. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const resetPayment = () => {
    setPaymentStatus('idle');
    setShowPhoneInput(false);
    setAgreedToTerms(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#00A650]/10 to-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#00A650]" />
      </div>
    );
  }

  // Success State
  if (paymentStatus === 'success') {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 bg-gradient-to-b from-[#00A650]/10 to-background py-8 flex items-center justify-center">
          <Card className="max-w-md mx-auto text-center border-[#00A650]/30 shadow-xl">
            <CardContent className="pt-8 pb-8">
              <div className="w-24 h-24 bg-[#00A650]/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                <CheckCircle className="h-12 w-12 text-[#00A650]" />
              </div>
              <h2 className="text-2xl font-bold text-[#00A650] mb-4">Payment Successful!</h2>
              <p className="text-muted-foreground mb-2">
                Your savings fee and account creation fee has been received.
              </p>
              <p className="text-sm text-muted-foreground mb-6">
                Your loan application is now complete and under review. We will contact you within 24 hours.
              </p>
              <div className="flex items-center justify-center gap-2 mb-6">
                <img src={mpesaLogo} alt="M-Pesa" className="h-8 object-contain" />
                <span className="text-sm text-[#00A650] font-medium">Powered by M-Pesa</span>
              </div>
              <Button 
                onClick={() => navigate('/dashboard')}
                className="bg-[#00A650] hover:bg-[#008540] text-white"
              >
                Return to Dashboard
              </Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  // Failed State
  if (paymentStatus === 'failed' && !processing) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 bg-gradient-to-b from-destructive/10 to-background py-8 flex items-center justify-center">
          <Card className="max-w-md mx-auto text-center border-destructive/30 shadow-xl">
            <CardContent className="pt-8 pb-8">
              <div className="w-24 h-24 bg-destructive/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <XCircle className="h-12 w-12 text-destructive" />
              </div>
              <h2 className="text-2xl font-bold text-destructive mb-4">Payment Not Successful</h2>
              <p className="text-muted-foreground mb-2">
                We couldn't complete your payment. This could be due to:
              </p>
              <ul className="text-sm text-muted-foreground mb-6 text-left list-disc list-inside space-y-1">
                <li>Insufficient M-Pesa balance</li>
                <li>Wrong PIN entered</li>
                <li>Transaction cancelled</li>
                <li>Network timeout</li>
              </ul>
              <Button 
                onClick={resetPayment}
                className="bg-[#00A650] hover:bg-[#008540] text-white"
              >
                Try Again
              </Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-gradient-to-b from-[#00A650]/10 to-background py-8">
        <div className="container mx-auto px-4">
          <Card className="max-w-lg mx-auto border-[#00A650]/30 shadow-xl overflow-hidden">
            {/* M-Pesa Header */}
            <div className="bg-[#00A650] p-6 text-white text-center">
              <img src={mpesaLogo} alt="M-Pesa" className="h-16 mx-auto mb-3 bg-white rounded-lg p-2" />
              <h1 className="text-xl font-bold">Secure M-Pesa Payment</h1>
              <p className="text-white/80 text-sm mt-1">Fast, Safe & Convenient</p>
            </div>

            <CardHeader className="pb-2">
              <CardTitle className="text-xl text-center flex items-center justify-center gap-2">
                <Wallet className="h-5 w-5 text-[#00A650]" />
                Savings & Account Creation Fee
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Fee Breakdown */}
              <div className="bg-[#00A650]/5 border border-[#00A650]/20 p-4 rounded-xl">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="h-6 w-6 text-[#00A650]" />
                  <div>
                    <h3 className="font-semibold text-foreground">Fee Details</h3>
                    <p className="text-xs text-muted-foreground">Required for account activation</p>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Savings Fee</span>
                    <span className="font-medium">KES 300</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Account Creation Fee</span>
                    <span className="font-medium">KES 200</span>
                  </div>
                  <div className="border-t border-[#00A650]/20 pt-2 mt-2">
                    <div className="flex justify-between">
                      <span className="font-semibold">Total Amount</span>
                      <span className="text-2xl font-bold text-[#00A650]">KES {activationFee}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Processing State */}
              {processing && (
                <div className="bg-[#00A650]/10 border border-[#00A650]/30 p-6 rounded-xl text-center">
                  <Loader2 className="h-12 w-12 animate-spin text-[#00A650] mx-auto mb-4" />
                  <h3 className="font-semibold text-[#00A650] mb-2">Processing Payment...</h3>
                  <p className="text-sm text-muted-foreground">
                    Please check your phone for the M-Pesa prompt and enter your PIN to complete the transaction.
                  </p>
                </div>
              )}

              {/* Agreement & Payment Flow */}
              {!processing && !showPhoneInput && (
                <div className="space-y-4">
                  <div className="bg-muted/50 p-4 rounded-lg text-sm text-muted-foreground">
                    <p className="mb-2">
                      By proceeding, you agree to pay the one-time savings and account creation fee of <strong>KES 500</strong>. 
                      This fee is required to activate your Nyota Fund account and process your loan application.
                    </p>
                    <p className="text-xs">
                      Your payment is secured through M-Pesa and regulated by the Central Bank of Kenya (CBK).
                    </p>
                  </div>

                  <div className="flex items-start space-x-3 p-4 border border-[#00A650]/30 rounded-lg bg-[#00A650]/5">
                    <Checkbox 
                      id="terms" 
                      checked={agreedToTerms}
                      onCheckedChange={(checked) => setAgreedToTerms(checked === true)}
                      className="mt-0.5 border-[#00A650] data-[state=checked]:bg-[#00A650]"
                    />
                    <Label htmlFor="terms" className="text-sm cursor-pointer">
                      I agree to pay the savings and account creation fee of <strong>KES 500</strong> and accept the terms and conditions of Nyota Fund.
                    </Label>
                  </div>

                  <Button 
                    onClick={handleProceedToPayment}
                    className="w-full bg-[#00A650] hover:bg-[#008540] text-white py-6 text-lg font-semibold"
                    disabled={!agreedToTerms}
                  >
                    Proceed to Pay with M-Pesa
                  </Button>
                </div>
              )}

              {/* Phone Input */}
              {!processing && showPhoneInput && (
                <div className="space-y-4 animate-in slide-in-from-bottom-4">
                  <div className="flex items-center gap-3 p-3 bg-[#00A650]/10 rounded-lg">
                    <Phone className="h-5 w-5 text-[#00A650]" />
                    <span className="text-sm font-medium">Enter your M-Pesa number to receive payment prompt</span>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-medium">M-Pesa Phone Number</Label>
                    <Input
                      id="phone"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="e.g. 0712345678"
                      className="text-lg py-6 border-[#00A650]/30 focus:border-[#00A650] focus:ring-[#00A650]"
                    />
                    <p className="text-xs text-muted-foreground">
                      You will receive an STK push on this number. Enter your M-Pesa PIN to complete payment.
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <Button 
                      variant="outline"
                      onClick={() => setShowPhoneInput(false)}
                      className="flex-1"
                    >
                      Back
                    </Button>
                    <Button 
                      onClick={initiateSTKPush} 
                      className="flex-1 bg-[#00A650] hover:bg-[#008540] text-white py-6"
                      disabled={!phoneNumber}
                    >
                      Pay KES {activationFee}
                    </Button>
                  </div>
                </div>
              )}

              {/* Security Footer */}
              <div className="flex items-center justify-center gap-2 pt-4 border-t">
                <Shield className="h-4 w-4 text-[#00A650]" />
                <span className="text-xs text-muted-foreground">Secured by Safaricom M-Pesa</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
