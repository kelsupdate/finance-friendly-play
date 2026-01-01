import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LOAN_TERMS } from '@/lib/constants';
import { Calculator, Target, Zap, TrendingUp, CreditCard, DollarSign, Percent } from 'lucide-react';

export function LoanCalculator() {
  const [amount, setAmount] = useState('');
  const [term, setTerm] = useState('');
  const [rate, setRate] = useState('9.5');
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

  const youthInterestRates = [
    { label: "Student Loan", rate: "7.5", icon: "🎓" },
    { label: "Business Startup", rate: "9.5", icon: "💼" },
    { label: "Education", rate: "8.0", icon: "📚" },
    { label: "Personal Development", rate: "10.5", icon: "⚡" }
  ];

  return (
    <section id="calculator" className="py-20 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-1/4 w-64 h-64 rounded-full bg-green-600/5 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-48 h-48 rounded-full bg-red-500/10 blur-2xl" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 rounded-full bg-green-500/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-gradient-to-r from-red-600 to-red-700 rounded-lg mb-4">
            <Calculator className="w-4 h-4 text-white" />
            <span className="text-sm font-bold text-white tracking-wide">FINANCIAL EMPOWERMENT TOOL</span>
            <TrendingUp className="w-4 h-4 text-white" />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Plan Your <span className="text-green-400">Financial</span> Journey
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Calculate how our youth-focused loans can help you achieve your goals
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Youth Interest Rates */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-5 h-5 text-green-400" />
              <h3 className="text-xl font-semibold text-white">Youth-Focused Interest Rates</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {youthInterestRates.map((item, index) => (
                <div 
                  key={index}
                  className={`bg-gradient-to-b from-gray-900/80 to-black/80 backdrop-blur-sm border ${rate === item.rate ? 'border-green-500' : 'border-gray-800'} rounded-xl p-4 text-center cursor-pointer hover:border-green-500/50 transition-all duration-300`}
                  onClick={() => setRate(item.rate)}
                >
                  <div className="text-2xl mb-2">{item.icon}</div>
                  <div className="text-sm text-gray-300 mb-1">{item.label}</div>
                  <div className="text-xl font-bold text-green-400">{item.rate}%</div>
                </div>
              ))}
            </div>
          </div>

          {/* Calculator Card */}
          <Card className="bg-gradient-to-b from-gray-900/90 to-black/90 backdrop-blur-sm border border-gray-800 rounded-2xl overflow-hidden shadow-2xl shadow-green-500/10">
            <CardContent className="pt-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                {/* Input Section */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Loan Amount */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="amount" className="text-white text-base font-medium">
                        Loan Amount (KES)
                      </Label>
                      <div className="text-sm text-green-400 font-medium">Max: KES 500,000</div>
                    </div>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2">
                        <DollarSign className="w-5 h-5 text-gray-400" />
                      </div>
                      <Input
                        id="amount"
                        type="number"
                        placeholder="e.g. 50000"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="pl-12 py-6 bg-gray-900/50 border-gray-700 text-white text-lg placeholder:text-gray-500 focus:border-green-500 focus:ring-green-500"
                      />
                    </div>
                  </div>

                  {/* Loan Term and Rate */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label htmlFor="term" className="text-white text-base font-medium">
                        Loan Term
                      </Label>
                      <Select value={term} onValueChange={setTerm}>
                        <SelectTrigger className="py-6 bg-gray-900/50 border-gray-700 text-white focus:border-green-500 focus:ring-green-500">
                          <SelectValue placeholder="Select term (months)" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-900 border-gray-700 text-white">
                          {LOAN_TERMS.map((t) => (
                            <SelectItem 
                              key={t} 
                              value={t.toString()}
                              className="hover:bg-gray-800 focus:bg-gray-800"
                            >
                              {t} Months
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="rate" className="text-white text-base font-medium">
                          Interest Rate
                        </Label>
                        <div className="text-sm text-green-400 font-medium">Youth Rate Applied</div>
                      </div>
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2">
                          <Percent className="w-5 h-5 text-gray-400" />
                        </div>
                        <Input
                          id="rate"
                          type="number"
                          placeholder="e.g. 9.5"
                          value={rate}
                          onChange={(e) => setRate(e.target.value)}
                          className="pl-12 py-6 bg-gray-900/50 border-gray-700 text-white text-lg placeholder:text-gray-500 focus:border-green-500 focus:ring-green-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Calculate Button */}
                  <Button 
                    onClick={calculateLoan}
                    className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-7 text-lg font-semibold rounded-xl shadow-lg shadow-green-500/20 transition-all duration-300 hover:scale-[1.02]"
                  >
                    <Calculator className="mr-2 w-5 h-5" />
                    Calculate Your Loan
                  </Button>
                </div>

                {/* Quick Amounts */}
                <div className="space-y-4">
                  <Label className="text-white text-base font-medium">Quick Amounts</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {[20000, 50000, 100000, 200000].map((quickAmount) => (
                      <button
                        key={quickAmount}
                        type="button"
                        onClick={() => setAmount(quickAmount.toString())}
                        className="py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white hover:border-green-500 hover:bg-gray-800 transition-all duration-300"
                      >
                        KES {quickAmount.toLocaleString()}
                      </button>
                    ))}
                  </div>
                  
                  <div className="pt-6 border-t border-gray-800">
                    <div className="text-sm text-gray-400 mb-2">Youth Benefits:</div>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2 text-sm text-gray-300">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        No collateral required
                      </li>
                      <li className="flex items-center gap-2 text-sm text-gray-300">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        Flexible repayment terms
                      </li>
                      <li className="flex items-center gap-2 text-sm text-gray-300">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        24-hour approval
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Results Section */}
              {result.monthly > 0 && (
                <div className="mt-8">
                  <div className="flex items-center gap-2 mb-6">
                    <Zap className="w-5 h-5 text-green-400" />
                    <CardTitle className="text-xl font-bold text-white">
                      Your Loan Breakdown
                    </CardTitle>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      { 
                        label: "Monthly Payment", 
                        value: `KES ${result.monthly.toLocaleString()}`,
                        description: "Amount to pay each month",
                        color: "from-green-600/20 to-green-600/5",
                        border: "border-green-500/30"
                      },
                      { 
                        label: "Total Repayment", 
                        value: `KES ${result.total.toLocaleString()}`,
                        description: "Total amount to repay",
                        color: "from-gray-800/80 to-black/80",
                        border: "border-gray-700"
                      },
                      { 
                        label: "Total Interest", 
                        value: `KES ${result.interest.toLocaleString()}`,
                        description: "Interest over loan term",
                        color: "from-red-600/20 to-red-600/5",
                        border: "border-red-500/30"
                      }
                    ].map((item, index) => (
                      <div 
                        key={index}
                        className={`bg-gradient-to-b ${item.color} backdrop-blur-sm border ${item.border} rounded-xl p-6 text-center hover:scale-[1.02] transition-all duration-300`}
                      >
                        <p className="text-sm text-gray-300 mb-2">{item.label}</p>
                        <p className="text-3xl font-bold text-white mb-2">{item.value}</p>
                        <p className="text-xs text-gray-400">{item.description}</p>
                      </div>
                    ))}
                  </div>
                  
                  {/* Total Savings Highlight */}
                  <div className="mt-8 p-6 bg-gradient-to-r from-green-600/10 to-green-600/5 border border-green-500/20 rounded-xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-300">Youth Interest Saving</p>
                        <p className="text-2xl font-bold text-green-400">
                          KES {(result.interest * 0.15).toLocaleString('en-US', { maximumFractionDigits: 0 })}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          15% lower than standard rates
                        </p>
                      </div>
                      <div className="text-3xl">🎯</div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Youth Financing Tips */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-b from-gray-900/50 to-black/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
              <div className="w-12 h-12 bg-green-600/10 rounded-full flex items-center justify-center mb-4">
                <div className="w-6 h-6 text-green-400">💰</div>
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Start Small</h4>
              <p className="text-sm text-gray-400">Begin with manageable amounts to build your credit history</p>
            </div>
            
            <div className="bg-gradient-to-b from-gray-900/50 to-black/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
              <div className="w-12 h-12 bg-red-600/10 rounded-full flex items-center justify-center mb-4">
                <div className="w-6 h-6 text-red-400">📅</div>
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Plan Ahead</h4>
              <p className="text-sm text-gray-400">Use our calculator to plan your repayments comfortably</p>
            </div>
            
            <div className="bg-gradient-to-b from-gray-900/50 to-black/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
              <div className="w-12 h-12 bg-green-600/10 rounded-full flex items-center justify-center mb-4">
                <div className="w-6 h-6 text-green-400">🎓</div>
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Youth Priority</h4>
              <p className="text-sm text-gray-400">Students and young entrepreneurs get preferential rates</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
