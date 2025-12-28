import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[500px] flex items-center justify-center overflow-hidden">
      {/* Background with Kenyan flag colors pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary via-foreground/80 to-secondary">
        {/* Decorative shapes */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border-[80px] border-primary/60 opacity-80" />
        <div className="absolute top-0 left-0 w-full h-8 bg-foreground" />
        <div className="absolute bottom-0 left-0 w-full h-8 bg-secondary" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 fade-in">
          Affordable Loans for Kenyans
        </h1>
        <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto fade-in" style={{ animationDelay: '0.2s' }}>
          Get the financial support you need with flexible repayment options and competitive interest rates. Your dreams are within reach with Nyota Fund.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center fade-in" style={{ animationDelay: '0.4s' }}>
          <Button 
            size="lg" 
            onClick={() => navigate('/apply')}
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8"
          >
            Apply for Loan
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            onClick={() => document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })}
            className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
          >
            Loan Calculator
          </Button>
        </div>
      </div>
    </section>
  );
}
