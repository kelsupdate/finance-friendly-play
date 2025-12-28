import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, CreditCard, Calendar, DollarSign } from 'lucide-react';

interface Profile {
  full_name: string | null;
  phone_number: string | null;
}

interface LoanApplication {
  id: string;
  loan_amount: number;
  status: string;
  created_at: string;
}

export default function Dashboard() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loans, setLoans] = useState<LoanApplication[]>([]);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      fetchProfile();
      fetchLoans();
    }
  }, [user]);

  const fetchProfile = async () => {
    const { data } = await supabase
      .from('profiles')
      .select('full_name, phone_number')
      .eq('user_id', user!.id)
      .maybeSingle();
    
    if (data) {
      setProfile(data);
    }
  };

  const fetchLoans = async () => {
    const { data } = await supabase
      .from('loan_applications')
      .select('id, loan_amount, status, created_at')
      .eq('user_id', user!.id)
      .order('created_at', { ascending: false });
    
    if (data) {
      setLoans(data);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  const activeLoan = loans.find(l => l.status === 'approved');
  const totalLoaned = loans.filter(l => l.status === 'approved').reduce((acc, l) => acc + l.loan_amount, 0);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-muted/30 py-8">
        <div className="container mx-auto px-4">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">
              Welcome to Your Dashboard, {profile?.full_name || 'User'}!
            </h1>
          </div>

          {/* User Info Card */}
          <div className="flex items-center gap-4 mb-8 p-4 bg-card rounded-lg shadow">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <User className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="font-semibold">{profile?.full_name || 'User'}</p>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Current Loan Balance
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">KES {activeLoan?.loan_amount?.toLocaleString() || 0}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Next Payment Due
                </CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{activeLoan ? 'Check M-Pesa' : 'No active loans'}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Credit Score
                </CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-success">Good (720)</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Available Credit
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">KES 100,000</p>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Button onClick={() => navigate('/apply')} className="w-full">
              Apply for New Loan
            </Button>
            <Button variant="outline" onClick={() => navigate('/profile')} className="w-full">
              Update Profile
            </Button>
            <Button variant="outline" onClick={() => navigate('/payment')} className="w-full">
              Make a Payment
            </Button>
            <Button variant="outline" className="w-full">
              View Loan History
            </Button>
          </div>

          {/* Loan History */}
          {loans.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Recent Loan Applications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {loans.slice(0, 5).map((loan) => (
                    <div key={loan.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                      <div>
                        <p className="font-medium">KES {loan.loan_amount.toLocaleString()}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(loan.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        loan.status === 'approved' ? 'bg-success/20 text-success' :
                        loan.status === 'pending' ? 'bg-warning/20 text-warning' :
                        'bg-destructive/20 text-destructive'
                      }`}>
                        {loan.status.charAt(0).toUpperCase() + loan.status.slice(1)}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
