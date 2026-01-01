import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { KENYA_COUNTIES } from '@/lib/constants';
import { z } from 'zod';
import { 
  Target, 
  Zap, 
  Star, 
  Users, 
  Shield, 
  Mail, 
  Phone, 
  User, 
  MapPin, 
  Lock,
  Eye,
  EyeOff,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const registerSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().regex(/^(?:\+254|0)[17]\d{8}$/, 'Please enter a valid Kenyan phone number'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

export default function Auth() {
  const [searchParams] = useSearchParams();
  const [isLogin, setIsLogin] = useState(searchParams.get('mode') !== 'register');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    county: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { user, signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      navigate('/apply');
    }
  }, [user, navigate]);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    try {
      if (isLogin) {
        const validation = loginSchema.safeParse({
          email: formData.email,
          password: formData.password,
        });

        if (!validation.success) {
          const fieldErrors: Record<string, string> = {};
          validation.error.errors.forEach(err => {
            if (err.path[0]) {
              fieldErrors[err.path[0] as string] = err.message;
            }
          });
          setErrors(fieldErrors);
          setLoading(false);
          return;
        }

        const { error } = await signIn(formData.email, formData.password);
        if (error) {
          if (error.message.includes('Invalid login credentials')) {
            toast({
              title: 'Login Failed',
              description: 'Invalid email or password. Please try again.',
              variant: 'destructive',
            });
          } else {
            toast({
              title: 'Login Failed',
              description: error.message,
              variant: 'destructive',
            });
          }
        } else {
          toast({
            title: 'Welcome back!',
            description: 'You have successfully logged in.',
          });
          navigate('/dashboard');
        }
      } else {
        const validation = registerSchema.safeParse({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        });

        if (!validation.success) {
          const fieldErrors: Record<string, string> = {};
          validation.error.errors.forEach(err => {
            if (err.path[0]) {
              fieldErrors[err.path[0] as string] = err.message;
            }
          });
          setErrors(fieldErrors);
          setLoading(false);
          return;
        }

        const { error } = await signUp(formData.email, formData.password, formData.fullName, formData.phone);
        if (error) {
          if (error.message.includes('already registered')) {
            toast({
              title: 'Registration Failed',
              description: 'This email is already registered. Please login instead.',
              variant: 'destructive',
            });
          } else {
            toast({
              title: 'Registration Failed',
              description: error.message,
              variant: 'destructive',
            });
          }
        } else {
          toast({
            title: 'Welcome to Nyota Fund!',
            description: 'Your account has been created successfully.',
          });
          navigate('/apply');
        }
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An unexpected error occurred. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-gradient-to-r from-green-600 to-green-700 rounded-lg mb-4">
              <Target className="w-4 h-4 text-white" />
              <span className="text-sm font-bold text-white tracking-wide">ACCOUNT PORTAL</span>
              <Zap className="w-4 h-4 text-white" />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {isLogin ? 'Welcome Back' : 'Get Started'} With <span className="text-green-400">Nyota Fund</span>
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              {isLogin 
                ? 'Access your financial dashboard and loan management tools'
                : 'Create your account to start your financial empowerment journey'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Auth Form Card */}
            <Card className="bg-gradient-to-b from-gray-900/80 to-black/80 backdrop-blur-sm border border-gray-800 rounded-2xl overflow-hidden shadow-2xl shadow-green-500/10">
              {/* Corner Boxes */}
              <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-green-500 rounded-tl-lg"></div>
              <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-green-500 rounded-tr-lg"></div>
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-green-500 rounded-bl-lg"></div>
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-green-500 rounded-br-lg"></div>
              
              <CardHeader className="border-b border-gray-800">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-600/20 to-green-600/10 rounded-xl flex items-center justify-center">
                    {isLogin ? (
                      <Shield className="h-6 w-6 text-green-400" />
                    ) : (
                      <Users className="h-6 w-6 text-green-400" />
                    )}
                  </div>
                  <div>
                    <CardTitle className="text-2xl text-white">
                      {isLogin ? 'Login to Your Account' : 'Create New Account'}
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      {isLogin
                        ? 'Enter your credentials to access your account'
                        : 'Fill in your details to get started'}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {!isLogin && (
                    <>
                      <div className="space-y-3">
                        <Label htmlFor="fullName" className="text-white">
                          <User className="inline w-4 h-4 mr-2 text-gray-400" />
                          Full Name
                        </Label>
                        <div className="relative">
                          <Input
                            id="fullName"
                            placeholder="Enter your full name"
                            value={formData.fullName}
                            onChange={(e) => handleChange('fullName', e.target.value)}
                            className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-green-500 pl-10"
                          />
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        </div>
                        {errors.fullName && <p className="text-sm text-red-400">{errors.fullName}</p>}
                      </div>
                    </>
                  )}

                  <div className="space-y-3">
                    <Label htmlFor="email" className="text-white">
                      <Mail className="inline w-4 h-4 mr-2 text-gray-400" />
                      Email Address
                    </Label>
                    <div className="relative">
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-green-500 pl-10"
                      />
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>
                    {errors.email && <p className="text-sm text-red-400">{errors.email}</p>}
                  </div>

                  {!isLogin && (
                    <>
                      <div className="space-y-3">
                        <Label htmlFor="phone" className="text-white">
                          <Phone className="inline w-4 h-4 mr-2 text-gray-400" />
                          Phone Number
                        </Label>
                        <div className="relative">
                          <Input
                            id="phone"
                            placeholder="e.g. 0712345678"
                            value={formData.phone}
                            onChange={(e) => handleChange('phone', e.target.value)}
                            className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-green-500 pl-10"
                          />
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        </div>
                        {errors.phone && <p className="text-sm text-red-400">{errors.phone}</p>}
                      </div>

                      <div className="space-y-3">
                        <Label htmlFor="county" className="text-white">
                          <MapPin className="inline w-4 h-4 mr-2 text-gray-400" />
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
                    </>
                  )}

                  <div className="space-y-3">
                    <Label htmlFor="password" className="text-white">
                      <Lock className="inline w-4 h-4 mr-2 text-gray-400" />
                      Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={(e) => handleChange('password', e.target.value)}
                        className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-green-500 pl-10 pr-10"
                      />
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    {errors.password && <p className="text-sm text-red-400">{errors.password}</p>}
                  </div>

                  {!isLogin && (
                    <div className="space-y-3">
                      <Label htmlFor="confirmPassword" className="text-white">
                        <Lock className="inline w-4 h-4 mr-2 text-gray-400" />
                        Confirm Password
                      </Label>
                      <div className="relative">
                        <Input
                          id="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm your password"
                          value={formData.confirmPassword}
                          onChange={(e) => handleChange('confirmPassword', e.target.value)}
                          className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-green-500 pl-10 pr-10"
                        />
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                        >
                          {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                      {errors.confirmPassword && <p className="text-sm text-red-400">{errors.confirmPassword}</p>}
                    </div>
                  )}

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-6 text-lg font-semibold rounded-xl shadow-lg shadow-green-500/20 transition-all duration-300 hover:scale-105"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        {isLogin ? 'Signing In...' : 'Creating Account...'}
                      </div>
                    ) : (
                      isLogin ? 'Sign In to Your Account' : 'Create Your Account'
                    )}
                  </Button>
                </form>

                <div className="text-center mt-6 pt-6 border-t border-gray-800">
                  <p className="text-gray-400">
                    {isLogin ? "Don't have an account? " : 'Already have an account? '}
                    <button
                      type="button"
                      onClick={() => setIsLogin(!isLogin)}
                      className="text-green-400 hover:text-green-300 font-semibold"
                    >
                      {isLogin ? 'Register here' : 'Login here'}
                    </button>
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Benefits Card */}
            <div className="space-y-8">
              <Card className="bg-gradient-to-b from-gray-900/80 to-black/80 backdrop-blur-sm border border-green-500/30 rounded-2xl overflow-hidden shadow-2xl shadow-green-500/10">
                <CardHeader className="border-b border-gray-800">
                  <CardTitle className="text-white flex items-center gap-2">
                    <Star className="h-5 w-5 text-green-400" />
                    Account Benefits
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Why you should create an account with us
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {[
                      'Fast loan application processing',
                      '24/7 account access and management',
                      'Secure and encrypted data protection',
                      'Real-time loan status tracking',
                      'Easy payment management',
                      'Credit building opportunities'
                    ].map((benefit, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-green-600/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <CheckCircle className="h-3 w-3 text-green-400" />
                        </div>
                        <span className="text-gray-300">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Trust Stats */}
              <Card className="bg-gradient-to-b from-gray-900/80 to-black/80 backdrop-blur-sm border border-gray-800 rounded-2xl overflow-hidden">
                <CardContent className="p-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-gray-900/50 rounded-xl">
                      <div className="text-2xl font-bold text-green-400">15K+</div>
                      <div className="text-sm text-gray-400 mt-1">Active Members</div>
                    </div>
                    <div className="text-center p-4 bg-gray-900/50 rounded-xl">
                      <div className="text-2xl font-bold text-green-400">KES 75M+</div>
                      <div className="text-sm text-gray-400 mt-1">Loans Disbursed</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Security Badge */}
              <div className="bg-gradient-to-b from-gray-900/50 to-black/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-600/10 rounded-full flex items-center justify-center">
                    <Shield className="h-5 w-5 text-green-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white">Bank-Level Security</h4>
                    <p className="text-sm text-gray-400">Your data is protected with 256-bit encryption</p>
                  </div>
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
