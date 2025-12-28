import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { KENYA_COUNTIES, LOAN_TYPES, LOAN_AMOUNTS, EMPLOYMENT_STATUS, INCOME_RANGES } from '@/lib/constants';

export default function Apply() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    idNumber: '',
    phoneNumber: '',
    email: '',
    county: '',
    loanType: '',
    loanAmount: '',
    employmentStatus: '',
    monthlyIncome: '',
    loanPurpose: '',
  });

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      setFormData(prev => ({ ...prev, email: user.email || '' }));
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    const { data } = await supabase
      .from('profiles')
      .select('full_name, phone_number, id_number, county')
      .eq('user_id', user!.id)
      .maybeSingle();
    
    if (data) {
      setFormData(prev => ({
        ...prev,
        fullName: data.full_name || '',
        phoneNumber: data.phone_number || '',
        idNumber: data.id_number || '',
        county: data.county || '',
      }));
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.idNumber || !formData.phoneNumber || 
        !formData.county || !formData.loanType || !formData.loanAmount ||
        !formData.employmentStatus || !formData.monthlyIncome) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      return;
    }

    setSubmitting(true);

    try {
      const { data, error } = await supabase
        .from('loan_applications')
        .insert({
          user_id: user!.id,
          full_name: formData.fullName,
          id_number: formData.idNumber,
          phone_number: formData.phoneNumber,
          email: formData.email,
          county: formData.county,
          loan_type: formData.loanType,
          loan_amount: parseInt(formData.loanAmount),
          employment_status: formData.employmentStatus,
          monthly_income: formData.monthlyIncome,
          loan_purpose: formData.loanPurpose,
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: 'Application Submitted!',
        description: 'Please proceed to make the activation payment.',
      });

      navigate('/payment', { state: { loanApplicationId: data.id, amount: parseInt(formData.loanAmount) } });
    } catch (error: any) {
      toast({
        title: 'Submission Failed',
        description: error.message || 'An error occurred. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-muted/30 py-8">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl text-primary text-center">Loan Application Form</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => handleChange('fullName', e.target.value)}
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="idNumber">ID Number *</Label>
                    <Input
                      id="idNumber"
                      value={formData.idNumber}
                      onChange={(e) => handleChange('idNumber', e.target.value)}
                      placeholder="Enter your ID number"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber">Phone Number *</Label>
                    <Input
                      id="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={(e) => handleChange('phoneNumber', e.target.value)}
                      placeholder="e.g. 0712345678"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      placeholder="Enter your email"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="county">County *</Label>
                    <Select value={formData.county} onValueChange={(value) => handleChange('county', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Your County" />
                      </SelectTrigger>
                      <SelectContent>
                        {KENYA_COUNTIES.map((county) => (
                          <SelectItem key={county} value={county}>
                            {county}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="loanType">Loan Type *</Label>
                    <Select value={formData.loanType} onValueChange={(value) => handleChange('loanType', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Loan Type" />
                      </SelectTrigger>
                      <SelectContent>
                        {LOAN_TYPES.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="loanAmount">Loan Amount (KES) *</Label>
                    <Select value={formData.loanAmount} onValueChange={(value) => handleChange('loanAmount', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Loan Amount" />
                      </SelectTrigger>
                      <SelectContent>
                        {LOAN_AMOUNTS.map((amount) => (
                          <SelectItem key={amount} value={amount.toString()}>
                            KES {amount.toLocaleString()}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">Loan amount must be between KES 2,000 and KES 50,000</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="employmentStatus">Employment Status *</Label>
                    <Select value={formData.employmentStatus} onValueChange={(value) => handleChange('employmentStatus', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Employment Status" />
                      </SelectTrigger>
                      <SelectContent>
                        {EMPLOYMENT_STATUS.map((status) => (
                          <SelectItem key={status.value} value={status.value}>
                            {status.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="monthlyIncome">Monthly Income (KES) *</Label>
                    <Select value={formData.monthlyIncome} onValueChange={(value) => handleChange('monthlyIncome', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Monthly Income Range" />
                      </SelectTrigger>
                      <SelectContent>
                        {INCOME_RANGES.map((range) => (
                          <SelectItem key={range.value} value={range.value}>
                            {range.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="loanPurpose">Loan Purpose</Label>
                  <Textarea
                    id="loanPurpose"
                    value={formData.loanPurpose}
                    onChange={(e) => handleChange('loanPurpose', e.target.value)}
                    placeholder="Briefly describe what you need the loan for..."
                    rows={4}
                  />
                </div>

                <Button type="submit" className="w-full" disabled={submitting}>
                  {submitting ? 'Submitting...' : 'Submit Application'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
