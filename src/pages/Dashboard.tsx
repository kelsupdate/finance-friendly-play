import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  User, 
  CreditCard, 
  Calendar, 
  DollarSign,
  Target,
  Zap,
  TrendingUp,
  Star,
  Briefcase,
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Shield,
  Bell,
  Mail,
  Phone,
  FileText,
  Eye,
  Loader2
} from 'lucide-react';

interface Profile {
  full_name: string | null;
  phone_number: string | null;
  created_at?: string;
}

interface LoanApplication {
  id: string;
  loan_amount: number;
  status: string;
  created_at: string;
  loan_type: string;
}

export default function Dashboard() {
  const { user, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loans, setLoans] = useState<LoanApplication[]>([]);
  const [showFullHistory, setShowFullHistory] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      console.log('No user, redirecting to auth');
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      
      setDataLoading(true);
      setError(null);
      
      try {
        console.log('Fetching data for user:', user.id);
        
        // Fetch profile
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('full_name, phone_number, created_at')
          .eq('user_id', user.id)
          .maybeSingle();
        
        if (profileError) {
          console.error('Profile fetch error:', profileError);
          throw profileError;
        }
        
        console.log('Profile data:', profileData);
        setProfile(profileData);

        // Fetch loans
        const { data: loansData, error: loansError } = await supabase
          .from('loan_applications')
          .select('id, loan_amount, status, created_at, loan_type')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });
        
        if (loansError) {
          console.error('Loans fetch error:', loansError);
          throw loansError;
        }
        
        console.log('Loans data:', loansData);
        setLoans(loansData || []);
        
      } catch (err: any) {
        console.error('Dashboard data fetch error:', err);
        setError(err.message || 'Failed to load dashboard data');
      } finally {
        setDataLoading(false);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user]);

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/auth');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black flex flex-col items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-green-500 mx-auto mb-4" />
          <p className="text-gray-300">Authenticating...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black flex flex-col items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Session Expired</h2>
          <p className="text-gray-300 mb-4">Please log in to access your dashboard</p>
          <Button 
            onClick={() => navigate('/auth')}
            className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"
          >
            Go to Login
          </Button>
        </div>
      </div>
    );
  }

  const activeLoan = loans.find(l => l.status === 'approved');
  const pendingLoans = loans.filter(l => l.status === 'pending');
  const totalLoaned = loans.filter(l => l.status === 'approved').reduce((acc, l) => acc + l.loan_amount, 0);
  const creditScore = 720; // Mock score
  const displayedLoans = showFullHistory ? loans : loans.slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black flex flex-col">
      <Navbar />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          {/* Error Display */}
          {error && (
            <div className="mb-6 p-4 bg-red-600/10 border border-red-500/30 rounded-xl">
              <div className="flex items-center gap-3">
                <AlertCircle className="h-5 w-5 text-red-400" />
                <div>
                  <p className="font-medium text-white">Error Loading Data</p>
                  <p className="text-sm text-gray-300">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Loading State */}
          {dataLoading ? (
            <div className="text-center py-12">
              <Loader2 className="h-12 w-12 animate-spin text-green-500 mx-auto mb-4" />
              <p className="text-gray-300">Loading your dashboard...</p>
            </div>
          ) : (
            <>
              {/* Header Section */}
              <div className="mb-12">
                <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-gradient-to-r from-green-600 to-green-700 rounded-lg mb-4">
                  <Target className="w-4 h-4 text-white" />
                  <span className="text-sm font-bold text-white tracking-wide">YOUR FINANCIAL DASHBOARD</span>
                  <Zap className="w-4 h-4 text-white" />
                </div>
                
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                      Welcome, <span className="text-green-400">{profile?.full_name || 'User'}!</span>
                    </h1>
                    <p className="text-lg text-gray-300">
                      Track your loans, payments, and financial progress all in one place
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600/10 to-red-600/10 border border-green-500/30 rounded-xl">
                    <Star className="h-4 w-4 text-green-400" />
                    <span className="text-sm font-bold text-white">
                      Member Since {profile?.created_at ? new Date(profile.created_at).toLocaleDateString('default', { month: 'short', year: 'numeric' }) : 'Recently'}
                    </span>
                  </div>
                </div>
              </div>

              {/* User Profile Card */}
              <Card className="bg-gradient-to-b from-gray-900/80 to-black/80 backdrop-blur-sm border border-gray-800 rounded-2xl overflow-hidden shadow-2xl shadow-green-500/10 mb-8">
                {/* Corner Boxes */}
                <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-green-500 rounded-tl-lg"></div>
                <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-green-500 rounded-tr-lg"></div>
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-green-500 rounded-bl-lg"></div>
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-green-500 rounded-br-lg"></div>
                
                <CardContent className="p-4 sm:p-8">
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                    </div>
                    <div className="flex-1 min-w-0 w-full">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="min-w-0">
                          <h2 className="text-xl sm:text-2xl font-bold text-white truncate">{profile?.full_name || 'User'}</h2>
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-2">
                            <div className="flex items-center gap-2 min-w-0">
                              <Mail className="h-4 w-4 text-gray-400 flex-shrink-0" />
                              <span className="text-gray-300 text-sm truncate">{user?.email}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone className="h-4 w-4 text-gray-400 flex-shrink-0" />
                              <span className="text-gray-300 text-sm">{profile?.phone_number || 'Not set'}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2 flex-shrink-0">
                          <Button 
                            variant="outline" 
                            onClick={() => navigate('/profile')}
                            className="border border-gray-700 bg-gray-900/50 text-white hover:bg-gray-800 text-sm"
                          >
                            Edit Profile
                          </Button>
                          <Button 
                            variant="ghost" 
                            onClick={handleLogout}
                            className="text-gray-400 hover:text-red-400 hover:bg-red-600/10 text-sm"
                          >
                            Logout
                          </Button>
                        </div>
                      </div>
                      
                      <div className="mt-6 grid grid-cols-3 gap-2 sm:gap-4">
                        <div className="bg-gray-900/50 rounded-xl p-3 sm:p-4">
                          <p className="text-xs sm:text-sm text-gray-400 mb-1">Status</p>
                          <div className="flex items-center gap-1 sm:gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                            <span className="text-green-400 font-bold text-sm sm:text-base">Active</span>
                          </div>
                        </div>
                        <div className="bg-gray-900/50 rounded-xl p-3 sm:p-4">
                          <p className="text-xs sm:text-sm text-gray-400 mb-1">Loans</p>
                          <p className="text-base sm:text-lg font-bold text-white">{loans.length}</p>
                        </div>
                        <div className="bg-gray-900/50 rounded-xl p-3 sm:p-4">
                          <p className="text-xs sm:text-sm text-gray-400 mb-1">Type</p>
                          <p className="text-sm sm:text-lg font-bold text-green-400">Standard</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Financial Overview Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card className="bg-gradient-to-b from-gray-900/80 to-black/80 backdrop-blur-sm border border-green-500/30 rounded-2xl overflow-hidden">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-gray-400">
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-green-400" />
                        Current Balance
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-white">
                      KES {activeLoan?.loan_amount?.toLocaleString() || 0}
                    </p>
                    {activeLoan && (
                      <p className="text-xs text-green-400 mt-1">
                        Active • Due in 30 days
                      </p>
                    )}
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-b from-gray-900/80 to-black/80 backdrop-blur-sm border border-red-500/30 rounded-2xl overflow-hidden">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-gray-400">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-red-400" />
                        Next Payment Due
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-white">
                      {activeLoan ? 'Check M-Pesa' : 'No payments'}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {activeLoan ? 'Auto-debit enabled' : 'No active loans'}
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-b from-gray-900/80 to-black/80 backdrop-blur-sm border border-blue-500/30 rounded-2xl overflow-hidden">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-gray-400">
                      <div className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4 text-blue-400" />
                        Credit Score
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <p className="text-2xl font-bold text-white">{creditScore}</p>
                      <div className="text-right">
                        <p className={`text-sm font-bold ${
                          creditScore >= 750 ? 'text-green-400' :
                          creditScore >= 650 ? 'text-yellow-400' : 'text-red-400'
                        }`}>
                          {creditScore >= 750 ? 'Excellent' : creditScore >= 650 ? 'Good' : 'Fair'}
                        </p>
                        <Progress 
                          value={(creditScore / 850) * 100} 
                          className="h-2 mt-2 bg-gray-800"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-b from-gray-900/80 to-black/80 backdrop-blur-sm border border-purple-500/30 rounded-2xl overflow-hidden">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-gray-400">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-purple-400" />
                        Available Credit
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-white">KES 100,000</p>
                    <div className="flex items-center justify-between mt-2">
                      <Progress 
                        value={(totalLoaned / 100000) * 100} 
                        className="h-1.5 flex-1 bg-gray-800 mr-2"
                      />
                      <span className="text-xs text-gray-400">
                        {Math.round((totalLoaned / 100000) * 100)}% used
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <Button 
                  onClick={() => navigate('/apply')}
                  className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white h-auto py-4"
                >
                  <div className="flex flex-col items-center gap-2">
                    <FileText className="h-5 w-5" />
                    <span>Apply for New Loan</span>
                  </div>
                </Button>
                
                <Button 
                  variant="outline"
                  onClick={() => navigate('/profile')}
                  className="border border-gray-700 bg-gray-900/50 text-white hover:bg-gray-800 h-auto py-4"
                >
                  <div className="flex flex-col items-center gap-2">
                    <User className="h-5 w-5" />
                    <span>Update Profile</span>
                  </div>
                </Button>
                
                <Button 
                  onClick={() => navigate('/payment')}
                  className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white h-auto py-4 shadow-lg shadow-red-500/20 border-0 animate-pulse hover:animate-none"
                >
                  <div className="flex flex-col items-center gap-2">
                    <CreditCard className="h-6 w-6" />
                    <span className="font-bold text-lg">Pay Loan</span>
                  </div>
                </Button>
                
                <Button 
                  variant="outline"
                  onClick={() => setShowFullHistory(!showFullHistory)}
                  className="border border-gray-700 bg-gray-900/50 text-white hover:bg-gray-800 h-auto py-4"
                >
                  <div className="flex flex-col items-center gap-2">
                    <Eye className="h-5 w-5" />
                    <span>{showFullHistory ? 'Hide' : 'View'} Loan History</span>
                  </div>
                </Button>
              </div>

              {/* Loan History */}
              {loans.length > 0 && (
                <Card className="bg-gradient-to-b from-gray-900/80 to-black/80 backdrop-blur-sm border border-gray-800 rounded-2xl overflow-hidden shadow-2xl shadow-green-500/10 mb-8">
                  <CardHeader className="border-b border-gray-800">
                    <CardTitle className="text-xl font-bold text-white">Recent Loan Applications</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {displayedLoans.map((loan) => (
                        <div key={loan.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                          <div>
                            <p className="font-medium">KES {loan.loan_amount.toLocaleString()}</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(loan.created_at).toLocaleDateString()}
                            </p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-sm ${
                            loan.status === 'approved' ? 'bg-green-600/20 text-green-400' :
                            loan.status === 'pending' ? 'bg-yellow-600/20 text-yellow-400' :
                            'bg-red-600/20 text-red-400'
                          }`}>
                            {loan.status.charAt(0).toUpperCase() + loan.status.slice(1)}
                          </span>
                        </div>
                      ))}
                    </div>
                    
                    {loans.length > 3 && (
                      <div className="text-center pt-4 border-t border-gray-800">
                        <Button 
                          variant="ghost" 
                          onClick={() => setShowFullHistory(!showFullHistory)}
                          className="text-gray-400 hover:text-white"
                        >
                          {showFullHistory ? 'Show Less' : `Show ${loans.length - 3} More`}
                          <ArrowRight className={`ml-2 h-3 w-3 transition-transform ${showFullHistory ? 'rotate-180' : ''}`} />
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
