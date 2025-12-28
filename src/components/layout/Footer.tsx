import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, MessageCircle } from 'lucide-react';

export function Footer() {
  return (
    <footer id="contact" className="bg-secondary text-secondary-foreground py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-primary mb-2 text-center">Contact Us</h2>
        <p className="text-center text-secondary-foreground/80 mb-12">
          We're here to help you achieve your financial goals. Get in touch with us today.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Visit Our Office</h3>
            <p className="text-sm text-secondary-foreground/70">
              Nyota Fund Building<br />
              Kenyatta Avenue<br />
              Nairobi, Kenya
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Call Us</h3>
            <p className="text-sm text-secondary-foreground/70">
              +254 700 123 456<br />
              +254 711 987 654<br />
              Mon-Fri: 8am-5pm
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Email Us</h3>
            <p className="text-sm text-secondary-foreground/70">
              info@nyotafund.co.ke<br />
              support@nyotafund.co.ke<br />
              loans@nyotafund.co.ke
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Live Chat</h3>
            <p className="text-sm text-secondary-foreground/70">
              Available during business hours<br />
              Quick responses<br />
              Expert assistance
            </p>
          </div>
        </div>

        <div className="border-t border-secondary-foreground/20 pt-8 text-center">
          <Link to="/" className="text-xl font-bold">
            <span className="text-secondary-foreground">Nyota</span>{' '}
            <span className="text-primary">Fund</span>
          </Link>
          <p className="text-sm text-secondary-foreground/60 mt-4">
            © {new Date().getFullYear()} Nyota Fund. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
