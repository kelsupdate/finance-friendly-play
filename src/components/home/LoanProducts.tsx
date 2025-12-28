import { Home, Briefcase, GraduationCap, Tractor } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LOAN_PRODUCTS } from '@/lib/constants';

const iconMap = {
  Home,
  Briefcase,
  GraduationCap,
  Tractor,
};

export function LoanProducts() {
  return (
    <section id="loans" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-primary text-center mb-4">Our Loan Products</h2>
        <p className="text-center text-muted-foreground mb-12">
          We offer a variety of loan products tailored to meet your specific needs
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {LOAN_PRODUCTS.map((product) => {
            const Icon = iconMap[product.icon as keyof typeof iconMap];
            return (
              <Card key={product.type} className="card-hover bg-card border-none shadow-md">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-primary">{product.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-muted-foreground">
                    {product.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Detailed Loan Products */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {LOAN_PRODUCTS.map((product) => {
            const Icon = iconMap[product.icon as keyof typeof iconMap];
            return (
              <Card key={`${product.type}-detailed`} className="card-hover bg-card">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-primary">{product.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{product.description}</p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full" />
                      Loan amount: KES {product.minAmount.toLocaleString()} - {product.maxAmount.toLocaleString()}
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full" />
                      Repayment period: {product.minTerm} - {product.maxTerm} months
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full" />
                      Interest rate: {product.interestRate}% per annum
                    </li>
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
