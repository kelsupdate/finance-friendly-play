import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import kenyaCoatOfArms from '@/assets/kenya-coat-of-arms.png';

export function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background with Kenyan flag colors */}
      <div className="absolute inset-0">
        {/* Layered Kenyan flag stripes */}
        <div className="absolute inset-0 flex flex-col">
          <div className="flex-1 bg-foreground" /> {/* Black */}
          <div className="h-2 bg-primary-foreground" /> {/* White stripe */}
          <div className="flex-1 bg-primary" /> {/* Red */}
          <div className="h-2 bg-primary-foreground" /> {/* White stripe */}
          <div className="flex-1 bg-secondary" /> {/* Green */}
        </div>
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-foreground/70" />
        
        {/* Decorative Maasai shield pattern */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[500px] opacity-10">
          <div className="w-full h-full rounded-[50%_50%_50%_50%/60%_60%_40%_40%] border-8 border-primary bg-foreground/50 flex items-center justify-center">
            <div className="w-4 h-32 bg-primary-foreground rounded-full" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        {/* Coat of Arms */}
        <div className="flex justify-center mb-6 fade-in">
          <img 
            src={kenyaCoatOfArms} 
            alt="Kenya Coat of Arms" 
            className="w-32 h-32 md:w-40 md:h-40 object-contain drop-shadow-2xl"
          />
        </div>

        {/* Nyota Fund Logo */}
        <div className="flex items-center justify-center gap-3 mb-4 fade-in" style={{ animationDelay: '0.1s' }}>
          <Star className="w-8 h-8 md:w-10 md:h-10 text-accent fill-accent" />
          <h2 className="text-2xl md:text-3xl font-bold text-accent tracking-wider">
            NYOTA FUND
          </h2>
          <Star className="w-8 h-8 md:w-10 md:h-10 text-accent fill-accent" />
        </div>

        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 fade-in" style={{ animationDelay: '0.2s' }}>
          Empowering Kenyans Through
          <span className="block text-accent mt-2">Affordable Financing</span>
        </h1>
        
        <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto fade-in" style={{ animationDelay: '0.3s' }}>
          Harambee! Together we rise. Access flexible loans with competitive rates 
          and build your future with Kenya's trusted financial partner.
        </p>

        {/* Harambee motto */}
        <div className="mb-8 fade-in" style={{ animationDelay: '0.35s' }}>
          <span className="inline-block px-6 py-2 bg-secondary/80 text-secondary-foreground rounded-full text-sm md:text-base font-semibold tracking-wide border-2 border-secondary-foreground/20">
            🇰🇪 Harambee - Let Us Pull Together 🇰🇪
          </span>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center fade-in" style={{ animationDelay: '0.4s' }}>
          <Button 
            size="lg" 
            onClick={() => navigate('/apply')}
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg font-semibold shadow-lg"
          >
            Apply for Loan
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            onClick={() => document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })}
            className="border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 px-8 py-6 text-lg"
          >
            Loan Calculator
          </Button>
        </div>

        {/* Trust indicators */}
        <div className="mt-12 grid grid-cols-3 gap-4 max-w-lg mx-auto fade-in" style={{ animationDelay: '0.5s' }}>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-accent">10K+</div>
            <div className="text-xs md:text-sm text-primary-foreground/70">Happy Customers</div>
          </div>
          <div className="text-center border-x border-primary-foreground/20">
            <div className="text-2xl md:text-3xl font-bold text-accent">KSh 50M+</div>
            <div className="text-xs md:text-sm text-primary-foreground/70">Loans Disbursed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-accent">24hrs</div>
            <div className="text-xs md:text-sm text-primary-foreground/70">Fast Approval</div>
          </div>
        </div>
      </div>
    </section>
  );
}
