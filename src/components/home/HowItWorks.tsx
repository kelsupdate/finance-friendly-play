import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { HOW_IT_WORKS } from '@/lib/constants';
import { 
  FileText, 
  UserCheck, 
  BadgeCheck, 
  Wallet, 
  ArrowRight,
  Target,
  Zap
} from 'lucide-react';

export function HowItWorks() {
  const navigate = useNavigate();

  return (
    <section id="how-it-works" className="py-20 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Red geometric patterns */}
        <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-red-600/5 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-48 h-48 rounded-full bg-red-500/10 blur-2xl" />
        
        {/* Green geometric patterns */}
        <div className="absolute top-1/2 right-0 w-96 h-96 rounded-full bg-green-600/5 blur-3xl" />
        <div className="absolute bottom-1/3 left-0 w-64 h-64 rounded-full bg-green-500/10 blur-2xl" />
        
        {/* Diagonal lines */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500/10 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-500/10 to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-gradient-to-r from-red-600 to-red-700 rounded-lg mb-4">
            <Target className="w-4 h-4 text-white" />
            <span className="text-sm font-bold text-white tracking-wide">YOUTH EMPOWERMENT PATHWAY</span>
            <Zap className="w-4 h-4 text-white" />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            How We <span className="text-green-400">Empower</span> You
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Our streamlined process is designed specifically for young Kenyans to access 
            financial opportunities quickly and easily
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16 relative">
          {/* Connecting line for desktop */}
          <div className="hidden lg:block absolute top-20 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-red-500 via-green-500 to-red-500" />
          
          {HOW_IT_WORKS.map((item, index) => {
            const icons = [FileText, UserCheck, BadgeCheck, Wallet];
            const Icon = icons[index] || FileText;
            
            return (
              <div key={item.step} className="relative group">
                {/* Step Card */}
                <div className="bg-gradient-to-b from-gray-900/80 to-black/80 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 text-center hover:border-green-500/30 hover:shadow-2xl hover:shadow-green-500/10 transition-all duration-300 hover:-translate-y-2">
                  {/* Step Number Badge */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-green-500/20">
                      {item.step}
                    </div>
                  </div>
                  
                  {/* Icon */}
                  <div className="w-16 h-16 bg-gradient-to-br from-red-600/10 to-red-600/5 rounded-xl flex items-center justify-center mx-auto mb-6 mt-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-red-400" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-gray-400">
                    {item.description}
                  </p>
                  
                  {/* Arrow for mobile/tablet */}
                  {index < HOW_IT_WORKS.length - 1 && (
                    <div className="lg:hidden absolute -right-4 top-1/2 -translate-y-1/2">
                      <ArrowRight className="w-6 h-6 text-green-500" />
                    </div>
                  )}
                </div>
                
                {/* Step Indicator Line (for mobile) */}
                {index < HOW_IT_WORKS.length - 1 && (
                  <div className="lg:hidden h-0.5 w-full bg-gradient-to-r from-green-500 to-red-500 my-8 opacity-50" />
                )}
              </div>
            );
          })}
        </div>

        {/* Youth Empowerment Highlights */}
        <div className="bg-gradient-to-r from-gray-900/50 to-black/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-600/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-6 h-6 text-green-400">⚡</div>
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Fast Approval</h4>
              <p className="text-sm text-gray-400">Quick decisions for youth applicants</p>
            </div>
            
            <div className="text-center border-x border-gray-800 md:px-8">
              <div className="w-12 h-12 bg-red-600/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-6 h-6 text-red-400">🎓</div>
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Youth-Focused</h4>
              <p className="text-sm text-gray-400">Designed specifically for ages 18-35</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-green-600/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-6 h-6 text-green-400">🤝</div>
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Mentorship</h4>
              <p className="text-sm text-gray-400">Guidance for young entrepreneurs</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="inline-flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg" 
              onClick={() => navigate('/apply')}
              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-10 py-7 text-lg font-semibold rounded-xl shadow-lg shadow-green-500/20 transition-all duration-300 hover:scale-105"
            >
              <span>Start Your Empowerment Journey</span>
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' })}
              className="border-2 border-red-600 bg-red-600/5 text-red-400 hover:bg-red-600/10 hover:text-red-300 px-10 py-7 text-lg font-semibold rounded-xl transition-all duration-300"
            >
              View FAQs
            </Button>
          </div>
          
          <p className="text-gray-400 mt-6 text-sm">
            Join <span className="text-green-400 font-semibold">15,000+</span> young Kenyans who have already started their journey
          </p>
        </div>
      </div>
    </section>
  );
}
