import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { KENYA_COUNTIES, LOAN_TYPES, LOAN_AMOUNTS, EMPLOYMENT_STATUS, INCOME_RANGES, YOUTH_PROGRAMS } from '@/lib/constants';
import { 
  FileText, 
  Target, 
  Zap, 
  User, 
  CreditCard, 
  MapPin, 
  Phone, 
  Mail, 
  Briefcase,
  DollarSign,
  Calendar,
  CheckCircle,
  ArrowRight,
  Star,
  Shield
} from 'lucide-react';

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
      <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-300">Loading application...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black flex flex-col">
      <Navbar />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-gradient-to-r from-green-600 to-green-700 rounded-lg mb-4">
              <Target className="w-4 h-4 text-white" />
              <span className="text-sm font-bold text-white tracking-wide">LOAN APPLICATION</span>
              <Zap className="w-4 h-4 text-white" />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-['Inter'] tracking-tight">
              Start Your <span className="text-green-400">Financial</span> Journey
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto font-['Inter']">
              Complete this form to apply for a loan. All fields marked with * are required.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Sidebar - Application Steps */}
            <Card className="lg:col-span-1 bg-gradient-to-b from-gray-900/80 to-black/80 backdrop-blur-sm border border-gray-800 rounded-2xl overflow-hidden shadow-2xl shadow-green-500/10">
              <CardHeader className="border-b border-gray-800">
                <CardTitle className="text-white flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  Application Steps
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {[
                    { step: 1, title: 'Personal Information', desc: 'Your basic details', icon: User, active: true },
                    { step: 2, title: 'Loan Details', desc: 'Loan type & amount', icon: CreditCard, active: false },
                    { step: 3, title: 'Employment & Income', desc: 'Financial information', icon: Briefcase, active: false },
                    { step: 4, title: 'Review & Submit', desc: 'Final verification', icon: FileText, active: false },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.step} className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                          item.active 
                            ? 'bg-gradient-to-br from-green-600 to-green-700 text-white' 
                            : 'bg-gray-800 text-gray-400'
                        }`}>
                          <span className="text-sm font-bold">{item.step}</span>
                        </div>
                        <div>
                          <h3 className={`font-medium ${item.active ? 'text-white' : 'text-gray-400'}`}>
                            {item.title}
                          </h3>
                          <p className="text-sm text-gray-500">{item.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Quick Tips */}
                <div className="mt-8 pt-6 border-t border-gray-800">
                  <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                    <Shield className="h-4 w-4 text-green-400" />
                    Quick Tips
                  </h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></div>
                      <span className="text-xs text-gray-400">Have your ID ready</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></div>
                      <span className="text-xs text-gray-400">Know your monthly income</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></div>
                      <span className="text-xs text-gray-400">Be clear about loan purpose</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Main Application Form */}
            <div className="lg:col-span-2">
              <Card className="bg-gradient-to-b from-gray-900/80 to-black/80 backdrop-blur-sm border border-gray-800 rounded-2xl overflow-hidden shadow-2xl shadow-green-500/10">
                {/* Decorative Corner Boxes */}
                <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-green-500 rounded-tl-lg"></div>
                <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-green-500 rounded-tr-lg"></div>
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-green-500 rounded-bl-lg"></div>
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-green-500 rounded-br-lg"></div>
                
                <CardHeader className="border-b border-gray-800 relative">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-600/20 to-green-600/10 rounded-xl flex items-center justify-center">
                      <FileText className="h-6 w-6 text-green-400" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl text-white font-['Inter'] font-bold tracking-tight">
                        Loan Application Form
                      </CardTitle>
                      <CardDescription className="text-gray-400 font-['Inter']">
                        Step 1: Personal Information
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Personal Information Section */}
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold text-white flex items-center gap-2 border-b border-gray-800 pb-3">
                        <User className="h-5 w-5 text-green-400" />
                        Personal Information
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <Label htmlFor="fullName" className="text-white font-['Inter'] font-medium">
                            Full Name *
                          </Label>
                          <div className="relative">
                            <Input
                              id="fullName"
                              value={formData.fullName}
                              onChange={(e) => handleChange('fullName', e.target.value)}
                              placeholder="Enter your full name"
                              className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-green-500 focus:ring-green-500 pl-10 font-['Inter']"
                            />
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                          </div>
                        </div>

                        <div className="space-y-3">
                          <Label htmlFor="idNumber" className="text-white font-['Inter'] font-medium">
                            ID Number *
                          </Label>
                          <div className="relative">
                            <Input
                              id="idNumber"
                              value={formData.idNumber}
                              onChange={(e) => handleChange('idNumber', e.target.value)}
                              placeholder="Enter your ID number"
                              className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-green-500 focus:ring-green-500 pl-10 font-['Inter']"
                            />
                            <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                          </div>
                        </div>

                        <div className="space-y-3">
                          <Label htmlFor="phoneNumber" className="text-white font-['Inter'] font-medium">
                            Phone Number *
                          </Label>
                          <div className="relative">
                            <Input
                              id="phoneNumber"
                              value={formData.phoneNumber}
                              onChange={(e) => handleChange('phoneNumber', e.target.value)}
                              placeholder="e.g. 0712345678"
                              className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-green-500 focus:ring-green-500 pl-10 font-['Inter']"
                            />
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                          </div>
                        </div>

                        <div className="space-y-3">
                          <Label htmlFor="email" className="text-white font-['Inter'] font-medium">
                            Email Address *
                          </Label>
                          <div className="relative">
                            <Input
                              id="email"
                              type="email"
                              value={formData.email}
                              onChange={(e) => handleChange('email', e.target.value)}
                              placeholder="Enter your email"
                              className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-green-500 focus:ring-green-500 pl-10 font-['Inter']"
                            />
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                          </div>
                        </div>

                        <div className="space-y-3">
                          <Label htmlFor="county" className="text-white font-['Inter'] font-medium">
                            County *
                          </Label>
                          <Select value={formData.county} onValueChange={(value) => handleChange('county', value)}>
                            <SelectTrigger className="bg-gray-900/50 border-gray-700 text-white focus:border-green-500 focus:ring-green-500 font-['Inter']">
                              <div className="flex items-center">
                                <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                                <SelectValue placeholder="Select Your County" />
                              </div>
                            </SelectTrigger>
                            <SelectContent className="bg-gray-900 border-gray-700 text-white">
                              {KENYA_COUNTIES.map((county) => (
                                <SelectItem key={county} value={county} className="hover:bg-gray-800 font-['Inter']">
                                  {county}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    {/* Loan Details Section */}
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold text-white flex items-center gap-2 border-b border-gray-800 pb-3">
                        <CreditCard className="h-5 w-5 text-green-400" />
                        Loan Details
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <Label htmlFor="loanType" className="text-white font-['Inter'] font-medium">
                            Loan Type *
                          </Label>
                          <Select value={formData.loanType} onValueChange={(value) => handleChange('loanType', value)}>
                            <SelectTrigger className="bg-gray-900/50 border-gray-700 text-white focus:border-green-500 focus:ring-green-500 font-['Inter']">
                              <SelectValue placeholder="Select Loan Type" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-900 border-gray-700 text-white">
                              {LOAN_TYPES.map((type) => (
                                <SelectItem key={type.value} value={type.value} className="hover:bg-gray-800 font-['Inter']">
                                  {type.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-3">
                          <Label htmlFor="loanAmount" className="text-white font-['Inter'] font-medium">
                            Loan Amount (KES) *
                          </Label>
                          <Select value={formData.loanAmount} onValueChange={(value) => handleChange('loanAmount', value)}>
                            <SelectTrigger className="bg-gray-900/50 border-gray-700 text-white focus:border-green-500 focus:ring-green-500 font-['Inter']">
                              <div className="flex items-center">
                                <DollarSign className="h-4 w-4 text-gray-400 mr-2" />
                                <SelectValue placeholder="Select Loan Amount" />
                              </div>
                            </SelectTrigger>
                            <SelectContent className="bg-gray-900 border-gray-700 text-white">
                              {LOAN_AMOUNTS.map((amount) => (
                                <SelectItem key={amount} value={amount.toString()} className="hover:bg-gray-800 font-['Inter']">
                                  KES {amount.toLocaleString()}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <p className="text-xs text-green-400 font-['Inter']">
                            Amount range: KES 2,000 - KES 50,000
                          </p>
                        </div>

                        <div className="space-y-3">
                          <Label htmlFor="employmentStatus" className="text-white font-['Inter'] font-medium">
                            Employment Status *
                          </Label>
                          <Select value={formData.employmentStatus} onValueChange={(value) => handleChange('employmentStatus', value)}>
                            <SelectTrigger className="bg-gray-900/50 border-gray-700 text-white focus:border-green-500 focus:ring-green-500 font-['Inter']">
                              <div className="flex items-center">
                                <Briefcase className="h-4 w-4 text-gray-400 mr-2" />
                                <SelectValue placeholder="Select Employment Status" />
                              </div>
                            </SelectTrigger>
                            <SelectContent className="bg-gray-900 border-gray-700 text-white">
                              {EMPLOYMENT_STATUS.map((status) => (
                                <SelectItem key={status.value} value={status.value} className="hover:bg-gray-800 font-['Inter']">
                                  {status.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-3">
                          <Label htmlFor="monthlyIncome" className="text-white font-['Inter'] font-medium">
                            Monthly Income (KES) *
                          </Label>
                          <Select value={formData.monthlyIncome} onValueChange={(value) => handleChange('monthlyIncome', value)}>
                            <SelectTrigger className="bg-gray-900/50 border-gray-700 text-white focus:border-green-500 focus:ring-green-500 font-['Inter']">
                              <div className="flex items-center">
                                <DollarSign className="h-4 w-4 text-gray-400 mr-2" />
                                <SelectValue placeholder="Select Monthly Income" />
                              </div>
                            </SelectTrigger>
                            <SelectContent className="bg-gray-900 border-gray-700 text-white">
                              {INCOME_RANGES.map((range) => (
                                <SelectItem key={range.value} value={range.value} className="hover:bg-gray-800 font-['Inter']">
                                  {range.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    {/* Loan Purpose Section */}
                    <div className="space-y-3">
                      <Label htmlFor="loanPurpose" className="text-white font-['Inter'] font-medium">
                        Loan Purpose (Optional)
                      </Label>
                      <Textarea
                        id="loanPurpose"
                        value={formData.loanPurpose}
                        onChange={(e) => handleChange('loanPurpose', e.target.value)}
                        placeholder="Briefly describe what you need the loan for... This helps us better understand your needs."
                        rows={4}
                        className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-green-500 focus:ring-green-500 font-['Inter'] resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-6 border-t border-gray-800">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <Shield className="h-4 w-4 text-green-400" />
                          <span className="font-['Inter']">Your information is secure</span>
                        </div>
                        <Button 
                          type="submit" 
                          disabled={submitting}
                          className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-6 text-lg font-semibold rounded-xl shadow-lg shadow-green-500/20 transition-all duration-300 hover:scale-105 font-['Inter']"
                        >
                          {submitting ? (
                            <div className="flex items-center gap-2">
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                              Submitting Application...
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              Submit Application
                              <ArrowRight className="h-4 w-4" />
                            </div>
                          )}
                        </Button>
                      </div>
                    </div>
                  </form>
                </CardContent>
              </Card>

              {/* Additional Information */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-b from-gray-900/50 to-black/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
                  <div className="w-10 h-10 bg-green-600/10 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2 font-['Inter']">Fast Processing</h4>
                  <p className="text-sm text-gray-400 font-['Inter']">Applications reviewed within 24-48 hours</p>
                </div>
                
                <div className="bg-gradient-to-b from-gray-900/50 to-black/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
                  <div className="w-10 h-10 bg-green-600/10 rounded-full flex items-center justify-center mb-4">
                    <Shield className="h-5 w-5 text-green-400" />
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2 font-['Inter']">Secure & Confidential</h4>
                  <p className="text-sm text-gray-400 font-['Inter']">Your data is protected with encryption</p>
                </div>
                
                <div className="bg-gradient-to-b from-gray-900/50 to-black/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
                  <div className="w-10 h-10 bg-green-600/10 rounded-full flex items-center justify-center mb-4">
                    <Star className="h-5 w-5 text-green-400" />
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2 font-['Inter']">Transparent Terms</h4>
                  <p className="text-sm text-gray-400 font-['Inter']">No hidden fees, clear repayment plan</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
