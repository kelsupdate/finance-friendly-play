import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LOAN_TERMS } from '@/lib/constants';

export function LoanCalculator() {
  const [amount, setAmount] = useState('');
  const [term, setTerm] = useState('');
  const [rate, setRate] = useState('12');
  const [result, setResult] = useState({ monthly: 0, total: 0, interest: 0 });

  const calculateLoan = () => {
    const principal = parseFloat(amount) || 0;
    const months = parseInt(term) || 0;
    const annualRate = parseFloat(rate) || 0;
    
    if (principal <= 0 || months <= 0 || annualRate <= 0) {
      setResult({ monthly: 0, total: 0, interest: 0 });
      return;
    }

    const monthlyRate = annualRate / 100 / 12;
    const monthlyPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                          (Math.pow(1 + monthlyRate, months) - 1);
    const totalPayment = monthlyPayment * months;
    const totalInterest = totalPayment - principal;

    setResult({
      monthly: Math.round(monthlyPayment),
      total: Math.round(totalPayment),
      interest: Math.round(totalInterest),
    });
  };

  return (
    <section id="calculator" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-primary text-center mb-12">Loan Calculator</h2>

        <Card className="max-w-2xl mx-auto">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="space-y-2">
                <Label htmlFor="amount">Loan Amount (KES)</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="e.g. 50000"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="term">Loan Term (Months)</Label>
                <Select value={term} onValueChange={setTerm}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select term" />
                  </SelectTrigger>
                  <SelectContent>
                    {LOAN_TERMS.map((t) => (
                      <SelectItem key={t} value={t.toString()}>
                        {t} Months
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="rate">Interest Rate (%)</Label>
                <Input
                  id="rate"
                  type="number"
                  placeholder="e.g. 12"
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                />
              </div>
            </div>

            <Button onClick={calculateLoan} className="w-full mb-6">
              Calculate
            </Button>

            <Card className="bg-muted/50">
              <CardHeader>
                <CardTitle className="text-lg">Your Loan Details</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-card rounded-lg">
                  <p className="text-sm text-muted-foreground">Monthly Payment</p>
                  <p className="text-2xl font-bold text-primary">
                    KES {result.monthly.toLocaleString()}
                  </p>
                </div>
                <div className="text-center p-4 bg-card rounded-lg">
                  <p className="text-sm text-muted-foreground">Total Payment</p>
                  <p className="text-2xl font-bold text-primary">
                    KES {result.total.toLocaleString()}
                  </p>
                </div>
                <div className="text-center p-4 bg-card rounded-lg">
                  <p className="text-sm text-muted-foreground">Total Interest</p>
                  <p className="text-2xl font-bold text-primary">
                    KES {result.interest.toLocaleString()}
                  </p>
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
