import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Star, Target, Zap, Users, TrendingUp, ArrowRight, BookOpen, Briefcase, Heart, CheckCircle } from 'lucide-react';

export function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[700px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Background with green/red/black theme */}
      <div className="absolute inset-0">
        {/* Geometric background patterns */}
        <div className="absolute inset-0">
          {/* Red accents */}
          <div className="absolute top-10 left-1/4 w-48 h-48 rounded-full bg-red-600/10 blur-3xl" />
          <div className="absolute bottom-20 right-1/3 w-32 h-32 rounded-full bg-red-500/15 blur-2xl" />
          
          {/* Green accents */}
          <div className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-green-600/10 blur-3xl" />
          <div className="absolute bottom-1/4 left-10 w-40 h-40 rounded-full bg-green-500/15 blur-2xl" />
          
          {/* Black geometric lines */}
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500/20 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-500/20 to-transparent" />
        </div>
        
        {/* Diagonal color bars in corners */}
        <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-gradient-to-br from-red-600/5 via-transparent to-transparent" />
        <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-gradient-to-tl from-green-600/5 via-transparent to-transparent" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content Column */}
          <div className="text-left">
            {/* Youth Empowerment Badge */}
            <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-gradient-to-r from-red-600 to-red-700 rounded-lg mb-8 fade-in shadow-lg">
              <Target className="w-4 h-4 text-white" />
              <span className="text-sm font-bold text-white tracking-wide">YOUTH EMPOWERMENT INITIATIVE</span>
              <Zap className="w-4 h-4 text-white" />
            </div>

            {/* Logo */}
            <div className="flex items-center gap-3 mb-6 fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                <Star className="w-5 h-5 text-white fill-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white tracking-wider">
                NYOTA <span className="text-green-400">YOUTH</span> FUND
              </h2>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 fade-in" style={{ animationDelay: '0.2s' }}>
              <span className="block mb-4">Empowering the</span>
              <span className="block">
                <span className="text-green-400">Next Generation</span>
                <span className="text-white"> of</span>
              </span>
              <span className="block text-red-400 mt-2">Kenyan Leaders</span>
            </h1>

            {/* Empowerment Statement */}
            <p className="text-lg text-gray-300 mb-8 fade-in" style={{ animationDelay: '0.3s' }}>
              We provide young Kenyans with the tools, resources, and opportunities to build 
              successful futures. Through education, entrepreneurship, and skill development, 
              we're creating pathways to financial independence and community impact.
            </p>

            {/* How Youth Will Be Empowered */}
            <div className="mb-8 fade-in" style={{ animationDelay: '0.4s' }}>
              <h3 className="text-xl font-semibold text-green-400 mb-4">How We Empower You:</h3>
              <div className="space-y-4">
                {[
                  { icon: <BookOpen className="w-5 h-5" />, text: "Education loans for tuition and vocational training" },
                  { icon: <Briefcase className="w-5 h-5" />, text: "Startup funding for young entrepreneurs" },
                  { icon: <TrendingUp className="w-5 h-5" />, text: "Financial literacy and business mentorship" },
                  { icon: <Heart className="w-5 h-5" />, text: "Community development project support" }
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircle className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-gray-300">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 fade-in" style={{ animationDelay: '0.5s' }}>
              <Button
                size="lg"
                onClick={() => navigate('/apply')}
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-6 text-base font-semibold rounded-lg shadow-lg transition-all duration-300 hover:scale-105"
              >
                <span>Apply Now</span>
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate('/auth')}
                className="border-2 border-red-600 bg-red-600/5 text-red-400 hover:bg-red-600/10 px-8 py-6 text-base font-semibold rounded-lg hover:border-red-500 transition-all duration-300"
              >
                Login
              </Button>
             </div>
            {/* Youth Empowerment Metrics */}
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 fade-in" style={{ animationDelay: '0.6s' }}>
              {[
                { value: "15K+", label: "Youth Empowered", color: "text-green-400" },
                { value: "KSh 75M+", label: "Funding", color: "text-red-400" },
                { value: "92%", label: "Success Rate", color: "text-green-400" },
                { value: "Ages 18-35", label: "Age Focus", color: "text-red-400" }
              ].map((metric, index) => (
                <div key={index} className="text-left">
                  <div className={`text-2xl md:text-3xl font-bold ${metric.color}`}>{metric.value}</div>
                  <div className="text-sm text-gray-400 mt-1">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="relative fade-in" style={{ animationDelay: '0.7s' }}>
            {/* Image Container with Frame */}
            <div className="relative">
              {/* Frame decorations */}
              <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-green-500" />
              <div className="absolute -top-4 -right-4 w-8 h-8 border-t-2 border-r-2 border-red-500" />
              <div className="absolute -bottom-4 -left-4 w-8 h-8 border-b-2 border-l-2 border-red-500" />
              <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-green-500" />
              
              {/* Main Image */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://www.gainhealth.org/sites/default/files/2025-02/dsc09112.jpg"
                  alt="Empowered Kenyan youth building their future"
                  className="w-full h-[500px] object-cover transform hover:scale-105 transition-transform duration-700"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>

              {/* Image Badge */}
              <div className="absolute -bottom-6 right-8 bg-gradient-to-r from-green-600 to-red-600 text-white px-6 py-3 rounded-lg shadow-xl">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span className="font-semibold text-sm">Youth Changing Kenya</span>
                </div>
              </div>
            </div>

            {/* Floating elements around image */}
            <div className="absolute -top-6 left-6 w-20 h-20 bg-red-600/10 rounded-full blur-xl" />
            <div className="absolute bottom-10 -left-6 w-16 h-16 bg-green-600/10 rounded-full blur-xl" />
          </div>
        </div>

        {/* Bottom Empowerment Tagline */}
        <div className="mt-16 text-center fade-in" style={{ animationDelay: '0.8s' }}>
          <div className="inline-flex items-center gap-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-green-500" />
            <span className="text-lg font-medium text-gray-300">
              Building Futures • Creating Opportunities • Empowering Youth
            </span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-red-500" />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 fade-in" style={{ animationDelay: '0.9s' }}>
        <div className="text-gray-400 text-sm mb-2">Discover Your Potential</div>
        <div className="w-6 h-10 mx-auto border-2 border-green-500/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gradient-to-b from-green-400 to-green-600 rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
