import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { HOW_IT_WORKS } from '@/lib/constants';

export function HowItWorks() {
  const navigate = useNavigate();

  return (
    <section id="how-it-works" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-primary text-center mb-4">How It Works</h2>
        <p className="text-center text-muted-foreground mb-12">
          Getting a loan from Nyota Fund is simple and straightforward
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {HOW_IT_WORKS.map((item) => (
            <div key={item.step} className="relative text-center">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                {item.step}
              </div>
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" onClick={() => navigate('/apply')}>
            Start Your Application
          </Button>
        </div>
      </div>
    </section>
  );
}
