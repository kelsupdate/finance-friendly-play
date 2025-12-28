import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/home/HeroSection';
import { LoanProducts } from '@/components/home/LoanProducts';
import { LoanCalculator } from '@/components/home/LoanCalculator';
import { HowItWorks } from '@/components/home/HowItWorks';
import { Testimonials } from '@/components/home/Testimonials';
import { LoanNotification } from '@/components/home/LoanNotification';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <LoanProducts />
        <LoanCalculator />
        <HowItWorks />
        <Testimonials />
      </main>
      <Footer />
      <LoanNotification />
    </div>
  );
};

export default Index;
