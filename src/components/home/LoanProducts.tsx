import { Home, Briefcase, GraduationCap, Tractor, BookOpen, Heart, Target, Zap, TrendingUp, Award, Star, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LOAN_PRODUCTS } from '@/lib/constants';
import { Button } from '@/components/ui/button';

const iconMap = {
  Home,
  Briefcase,
  GraduationCap,
  Tractor,
  BookOpen,
  Heart,
};

export function LoanProducts() {
  const youthBenefits = [
    { icon: '🎯', text: 'Lower interest rates for ages 18-35' },
    { icon: '⚡', text: 'Fast approval within 24 hours' },
    { icon: '🤝', text: 'No collateral required for first-time youth borrowers' },
    { icon: '📈', text: 'Mentorship and business guidance included' },
  ];

  return (
    <section id="loans" className="py-20 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-1/4 w-64 h-64 rounded-full bg-red-600/5 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-48 h-48 rounded-full bg-green-500/10 blur-2xl" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 rounded-full bg-green-500/5 blur-3xl" />
        
        {/* Decorative elements */}
        <div className="absolute top-20 left-20 opacity-10">
          <Target className="w-32 h-32 text-green-500" />
        </div>
        <div className="absolute bottom-20 right-20 opacity-10">
          <Zap className="w-32 h-32 text-red-500" />
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-gradient-to-r from-green-600 to-green-700 rounded-lg mb-4">
            <Target className="w-4 h-4 text-white" />
            <span className="text-sm font-bold text-white tracking-wide">YOUTH-FOCUSED FINANCING</span>
            <TrendingUp className="w-4 h-4 text-white" />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Designed for <span className="text-green-400">Young</span> Ambitions
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Our specialized loan products are crafted specifically to support the dreams and aspirations 
            of Kenya's youth, with flexible terms and youth-friendly features
          </p>
        </div>

        {/* Youth Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {youthBenefits.map((benefit, index) => (
            <div 
              key={index}
              className="bg-gradient-to-b from-gray-900/50 to-black/50 backdrop-blur-sm border border-gray-800 rounded-xl p-4 flex items-center gap-3 hover:border-green-500/30 transition-all duration-300"
            >
              <div className="text-2xl">{benefit.icon}</div>
              <p className="text-sm text-gray-300">{benefit.text}</p>
            </div>
          ))}
        </div>

        {/* Main Loan Products - Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {LOAN_PRODUCTS.map((product, index) => {
            const Icon = iconMap[product.icon as keyof typeof iconMap] || Briefcase;
            const colors = [
              { bg: 'from-green-600/20 to-green-600/5', text: 'text-green-400', border: 'border-green-500/30' },
              { bg: 'from-red-600/20 to-red-600/5', text: 'text-red-400', border: 'border-red-500/30' },
              { bg: 'from-blue-600/20 to-blue-600/5', text: 'text-blue-400', border: 'border-blue-500/30' },
              { bg: 'from-purple-600/20 to-purple-600/5', text: 'text-purple-400', border: 'border-purple-500/30' },
            ];
            const color = colors[index] || colors[0];

            return (
              <Card 
                key={product.type} 
                className={`bg-gradient-to-b ${color.bg} backdrop-blur-sm border ${color.border} rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-green-500/10 transition-all duration-500 hover:-translate-y-2`}
              >
                <CardHeader className="text-center pb-4">
                  {/* Icon */}
                  <div className="w-20 h-20 bg-gradient-to-br from-gray-900/50 to-black/50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color.bg} border ${color.border}`}>
                      <Icon className={`h-6 w-6 ${color.text}`} />
                    </div>
                  </div>
                  
                  {/* Product Type */}
                  <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${color.bg} ${color.text} border ${color.border} mb-2`}>
                    YOUTH PROGRAM
                  </div>
                  
                  <CardTitle className={`text-xl font-bold ${color.text}`}>
                    {product.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="text-center text-gray-300 text-sm">
                    {product.description}
                  </CardDescription>
                  
                  {/* Quick Stats */}
                  <div className="mt-6 grid grid-cols-2 gap-2 text-center">
                    <div className="bg-gray-900/50 rounded-lg p-2">
                      <p className="text-xs text-gray-400">Amount</p>
                      <p className={`text-sm font-bold ${color.text}`}>
                        Up to KES {product.maxAmount.toLocaleString()}
                      </p>
                    </div>
                    <div className="bg-gray-900/50 rounded-lg p-2">
                      <p className="text-xs text-gray-400">Rate</p>
                      <p className={`text-sm font-bold ${color.text}`}>
                        {product.interestRate}%
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Detailed Loan Products */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {LOAN_PRODUCTS.map((product, index) => {
            const Icon = iconMap[product.icon as keyof typeof iconMap] || Briefcase;
            const colors = [
              { bg: 'from-green-600/10 to-green-600/5', text: 'text-green-400', border: 'border-green-500/20' },
              { bg: 'from-red-600/10 to-red-600/5', text: 'text-red-400', border: 'border-red-500/20' },
              { bg: 'from-blue-600/10 to-blue-600/5', text: 'text-blue-400', border: 'border-blue-500/20' },
              { bg: 'from-purple-600/10 to-purple-600/5', text: 'text-purple-400', border: 'border-purple-500/20' },
            ];
            const color = colors[index] || colors[0];

            return (
              <Card 
                key={`${product.type}-detailed`} 
                className={`bg-gradient-to-b ${color.bg} backdrop-blur-sm border ${color.border} rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-green-500/10 transition-all duration-300`}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${color.bg} border ${color.border}`}>
                        <Icon className={`h-7 w-7 ${color.text}`} />
                      </div>
                      <div>
                        <CardTitle className={`text-2xl font-bold ${color.text}`}>
                          {product.title}
                        </CardTitle>
                        <p className="text-sm text-gray-400">Youth-Focused Financing</p>
                      </div>
                    </div>
                    
                    {/* Age Badge */}
                    <div className="px-3 py-1 bg-gray-900/50 border border-gray-700 rounded-full text-xs text-gray-300">
                      Ages 18-35
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-6">{product.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-900/50 rounded-xl p-4">
                      <p className="text-xs text-gray-400 mb-1">Loan Amount</p>
                      <p className={`text-xl font-bold ${color.text}`}>
                        KES {product.minAmount.toLocaleString()} - {product.maxAmount.toLocaleString()}
                      </p>
                    </div>
                    <div className="bg-gray-900/50 rounded-xl p-4">
                      <p className="text-xs text-gray-400 mb-1">Youth Interest Rate</p>
                      <p className={`text-xl font-bold ${color.text}`}>
                        {product.interestRate}% p.a.
                      </p>
                      <p className="text-xs text-green-400 mt-1">2% lower than standard</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Repayment Period</span>
                      <span className="text-sm font-medium text-white">
                        {product.minTerm} - {product.maxTerm} months
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Processing Time</span>
                      <span className="text-sm font-medium text-green-400">24-48 hours</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Collateral Required</span>
                      <span className="text-sm font-medium text-green-400">None for first loan</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-gray-800">
                    <h4 className="text-sm font-semibold text-white mb-3">Youth Benefits Included:</h4>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-green-600/10 text-green-400 text-xs rounded-full border border-green-500/20">
                        Free Mentorship
                      </span>
                      <span className="px-3 py-1 bg-green-600/10 text-green-400 text-xs rounded-full border border-green-500/20">
                        Business Training
                      </span>
                      <span className="px-3 py-1 bg-green-600/10 text-green-400 text-xs rounded-full border border-green-500/20">
                        Financial Literacy
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Youth Success Metrics */}
        <div className="bg-gradient-to-r from-green-600/10 via-green-600/5 to-red-600/5 border border-green-500/20 rounded-2xl p-8 mb-16 backdrop-blur-sm">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Award className="w-5 h-5 text-green-400" />
                <h3 className="text-2xl font-bold text-white">Youth Success Rate</h3>
              </div>
              <p className="text-gray-300 mb-6">
                Our youth-focused approach has helped thousands of young Kenyans achieve their financial goals
              </p>
              <div className="flex items-center gap-3">
                <div className="text-5xl font-bold text-green-400">92%</div>
                <div>
                  <p className="text-sm text-gray-400">Success rate for youth borrowers</p>
                  <p className="text-xs text-green-400">Higher than industry average</p>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-2">
              <h4 className="text-lg font-semibold text-white mb-6">Popular Youth Loan Amounts</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { amount: 'KES 50K', purpose: 'Small Business Start', users: '45%', color: 'bg-green-500' },
                  { amount: 'KES 100K', purpose: 'Education/Training', users: '30%', color: 'bg-blue-500' },
                  { amount: 'KES 25K', purpose: 'Emergency Fund', users: '25%', color: 'bg-purple-500' },
                ].map((item, index) => (
                  <div key={index} className="bg-gray-900/50 border border-gray-800 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-xl font-bold text-white">{item.amount}</div>
                      <div className="text-sm text-gray-400">{item.users} of youth</div>
                    </div>
                    <p className="text-sm text-gray-300 mb-2">{item.purpose}</p>
                    <div className="w-full bg-gray-800 rounded-full h-2">
                      <div className={`${item.color} h-2 rounded-full`} style={{ width: item.users }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Ready to Start Your <span className="text-green-400">Empowerment</span> Journey?
          </h3>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of young Kenyans who have already transformed their lives through our youth-focused financing
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-10 py-6 text-lg font-semibold rounded-xl shadow-lg shadow-green-500/20 transition-all duration-300 hover:scale-105"
            >
              Apply Now for Youth Loan
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-2 border-red-600 bg-red-600/5 text-red-400 hover:bg-red-600/10 hover:text-red-300 px-10 py-6 text-lg font-semibold rounded-xl transition-all duration-300"
            >
              Speak with Youth Advisor
            </Button>
          </div>
          <div className="flex items-center justify-center gap-2 mt-6 text-sm text-gray-400">
            <Users className="w-4 h-4" />
            <span>Over <span className="text-green-400 font-semibold">15,000</span> youth applications processed</span>
          </div>
        </div>
      </div>
    </section>
  );
}
