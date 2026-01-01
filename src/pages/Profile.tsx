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
import { KENYA_COUNTIES, EMPLOYMENT_STATUS } from '@/lib/constants';
import { 
  CheckCircle, 
  User, 
  Mail, 
  Phone, 
  CreditCard, 
  MapPin, 
  Briefcase, 
  Home, 
  Target, 
  Zap, 
  Shield,
  ArrowRight,
  Loader2
} from 'lucide-react';

export default function Profile() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    idNumber: '',
    county: '',
    address: '',
    employmentStatus: '',
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
      .select('*')
      .eq('user_id', user!.id)
      .maybeSingle();
    
    if (data) {
      setFormData(prev => ({
        ...prev,
        fullName: data.full_name || '',
        phoneNumber: data.phone_number || '',
        idNumber: data.id_number || '',
        county: data.county || '',
        address: data.address || '',
        employmentStatus: data.employment_status || '',
      }));
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: formData.fullName,
          phone_number: formData.phoneNumber,
          id_number: formData.idNumber,
          county: formData.county,
          address: formData.address,
          employment_status: formData.employmentStatus,
        })
        .eq('user_id', user!.id);

      if (error) throw error;

      setSaved(true);
      toast({
        title: 'Profile Updated!',
        description: 'Your profile information has been updated.',
      });
    } catch (error: any) {
      toast({
        title: 'Update Failed',
        description: error.message || 'Failed to update profile.',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black flex flex-col items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-green-500 mx-auto mb-4" />
          <p className="text-gray-300">Loading profile...</p>
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
              <span className="text-sm font-bold text-white tracking-wide">PROFILE MANAGEMENT</span>
              <Zap className="w-4 h-4 text-white" />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Update Your <span className="text-green-400">Profile</span>
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Keep your information up-to-date for faster loan processing and better experience
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Sidebar - Profile Info */}
            <Card className="lg:col-span-1 bg-gradient-to-b from-gray-900/80 to-black/80 backdrop-blur-sm border border-gray-800 rounded-2xl overflow-hidden shadow-2xl shadow-green-500/10">
              <CardHeader className="border-b border-gray-800">
                <CardTitle className="text-white flex items-center gap-2">
                  <User className="h-5 w-5 text-green-400" />
                  Profile Information
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Keep your details current for better service
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {/* User Avatar */}
                  <div className="flex flex-col items-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center mb-4">
                      <User className="h-12 w-12 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white text-center">{formData.fullName || 'Your Name'}</h3>
                    <p className="text-gray-400 text-center">{user?.email}</p>
                  </div>

                  {/* Quick Stats */}
                  <div className="space-y-4">
                    <div className="bg-gray-900/50 rounded-xl p-4">
                      <p className="text-sm text-gray-400 mb-1">Profile Completion</p>
                      <div className="flex items-center justify-between">
                        <div className="w-full bg-gray-800 rounded-full h-2 mr-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                        </div>
                        <span className="text-green-400 text-sm font-bold">75%</span>
                      </div>
                    </div>

                    <div className="bg-gray-900/50 rounded-xl p-4">
                      <p className="text-sm text-gray-400 mb-1">Member Since</p>
                      <p className="text-white font-medium">
                        {user?.created_at ? new Date(user.created_at).toLocaleDateString('default', { month: 'long', year: 'numeric' }) : 'Recently'}
                      </p>
                    </div>
                  </div>

                  {/* Security Info */}
                  <div className="pt-6 border-t border-gray-800">
                    <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                      <Shield className="h-4 w-4 text-green-400" />
                      Account Security
                    </h4>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-300">Account is secure and active</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Main Profile Form */}
            <div className="lg:col-span-2">
              <Card className="bg-gradient-to-b from-gray-900/80 to-black/80 backdrop-blur-sm border border-gray-800 rounded-2xl overflow-hidden shadow-2xl shadow-green-500/10">
                {/* Corner Boxes */}
                <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-green-500 rounded-tl-lg"></div>
                <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-green-500 rounded-tr-lg"></div>
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-green-500 rounded-bl-lg"></div>
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-green-500 rounded-br-lg"></div>
                
                <CardHeader className="border-b border-gray-800">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-600/20 to-green-600/10 rounded-xl flex items-center justify-center">
                      <User className="h-6 w-6 text-green-400" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl text-white">
                        Update Your Profile
                      </CardTitle>
                      <CardDescription className="text-gray-400">
                        Fill in your details below
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-8">
                  {saved && (
                    <div className="mb-6 p-4 bg-green-600/10 border border-green-500/20 rounded-xl flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <div className="flex-1">
                        <p className="text-green-400 font-bold">Profile Updated Successfully!</p>
                        <p className="text-sm text-gray-300">Your changes have been saved</p>
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Full Name */}
                      <div className="space-y-3">
                        <Label htmlFor="fullName" className="text-white flex items-center gap-2">
                          <User className="h-4 w-4 text-gray-400" />
                          Full Name
                        </Label>
                        <div className="relative">
                          <Input
                            id="fullName"
                            value={formData.fullName}
                            onChange={(e) => handleChange('fullName', e.target.value)}
                            placeholder="Enter your full name"
                            className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-green-500 pl-10"
                          />
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        </div>
                      </div>

                      {/* Email Address */}
                      <div className="space-y-3">
                        <Label htmlFor="email" className="text-white flex items-center gap-2">
                          <Mail className="h-4 w-4 text-gray-400" />
                          Email Address
                        </Label>
                        <div className="relative">
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            disabled
                            className="bg-gray-900/30 border-gray-700 text-gray-400 cursor-not-allowed pl-10"
                          />
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        </div>
                        <p className="text-xs text-gray-500">Contact support to change email</p>
                      </div>

                      {/* Phone Number */}
                      <div className="space-y-3">
                        <Label htmlFor="phoneNumber" className="text-white flex items-center gap-2">
                          <Phone className="h-4 w-4 text-gray-400" />
                          Phone Number
                        </Label>
                        <div className="relative">
                          <Input
                            id="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={(e) => handleChange('phoneNumber', e.target.value)}
                            placeholder="e.g. 0712345678"
                            className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-green-500 pl-10"
                          />
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        </div>
                      </div>

                      {/* ID Number */}
                      <div className="space-y-3">
                        <Label htmlFor="idNumber" className="text-white flex items-center gap-2">
                          <CreditCard className="h-4 w-4 text-gray-400" />
                          ID Number
                        </Label>
                        <div className="relative">
                          <Input
                            id="idNumber"
                            value={formData.idNumber}
                            onChange={(e) => handleChange('idNumber', e.target.value)}
                            placeholder="Enter your ID number"
                            className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-green-500 pl-10"
                          />
                          <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        </div>
                      </div>

                      {/* County */}
                      <div className="space-y-3">
                        <Label htmlFor="county" className="text-white flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          County
                        </Label>
                        <Select value={formData.county} onValueChange={(value) => handleChange('county', value)}>
                          <SelectTrigger className="bg-gray-900/50 border-gray-700 text-white focus:border-green-500">
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                              <SelectValue placeholder="Select Your County" />
                            </div>
                          </SelectTrigger>
                          <SelectContent className="bg-gray-900 border-gray-700 text-white">
                            {KENYA_COUNTIES.map((county) => (
                              <SelectItem key={county} value={county} className="hover:bg-gray-800">
                                {county}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Employment Status */}
                      <div className="space-y-3">
                        <Label htmlFor="employmentStatus" className="text-white flex items-center gap-2">
                          <Briefcase className="h-4 w-4 text-gray-400" />
                          Employment Status
                        </Label>
                        <Select value={formData.employmentStatus} onValueChange={(value) => handleChange('employmentStatus', value)}>
                          <SelectTrigger className="bg-gray-900/50 border-gray-700 text-white focus:border-green-500">
                            <div className="flex items-center">
                              <Briefcase className="h-4 w-4 text-gray-400 mr-2" />
                              <SelectValue placeholder="Select Employment Status" />
                            </div>
                          </SelectTrigger>
                          <SelectContent className="bg-gray-900 border-gray-700 text-white">
                            {EMPLOYMENT_STATUS.map((status) => (
                              <SelectItem key={status.value} value={status.value} className="hover:bg-gray-800">
                                {status.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Address */}
                    <div className="space-y-3">
                      <Label htmlFor="address" className="text-white flex items-center gap-2">
                        <Home className="h-4 w-4 text-gray-400" />
                        Address
                      </Label>
                      <Textarea
                        id="address"
                        value={formData.address}
                        onChange={(e) => handleChange('address', e.target.value)}
                        placeholder="Enter your address"
                        rows={3}
                        className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-green-500 resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-6 border-t border-gray-800">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <Shield className="h-4 w-4 text-green-400" />
                          <span>Your information is secure and encrypted</span>
                        </div>
                        <Button 
                          type="submit" 
                          disabled={saving}
                          className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-6 text-lg font-semibold rounded-xl shadow-lg shadow-green-500/20 transition-all duration-300 hover:scale-105"
                        >
                          {saving ? (
                            <div className="flex items-center gap-2">
                              <Loader2 className="h-4 w-4 animate-spin" />
                              Updating Profile...
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              Update Profile
                              <ArrowRight className="h-4 w-4" />
                            </div>
                          )}
                        </Button>
                      </div>
                    </div>
                  </form>
                </CardContent>
              </Card>

              {/* Additional Info Section */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-b from-gray-900/50 to-black/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
                  <div className="w-10 h-10 bg-green-600/10 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">Why Update Profile?</h4>
                  <p className="text-sm text-gray-300">
                    Complete profiles get faster loan approval and better interest rates
                  </p>
                </div>
                
                <div className="bg-gradient-to-b from-gray-900/50 to-black/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
                  <div className="w-10 h-10 bg-green-600/10 rounded-full flex items-center justify-center mb-4">
                    <Shield className="h-5 w-5 text-green-400" />
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">Data Security</h4>
                  <p className="text-sm text-gray-300">
                    Your information is encrypted and protected with bank-level security
                  </p>
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
