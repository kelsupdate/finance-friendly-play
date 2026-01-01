import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, MessageCircle, Target, Zap, TrendingUp, Star, Facebook, Twitter, Instagram, Linkedin, Users, Heart, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Footer() {
  const socialLinks = [
    { icon: Facebook, label: 'Facebook', color: 'hover:text-blue-500' },
    { icon: Twitter, label: 'Twitter', color: 'hover:text-blue-400' },
    { icon: Instagram, label: 'Instagram', color: 'hover:text-pink-500' },
    { icon: Linkedin, label: 'LinkedIn', color: 'hover:text-blue-600' },
  ];

  const youthPrograms = [
    'Student Loan Program',
    'Youth Business Startup',
    'Education Financing',
    'Skill Development Fund',
    'Community Impact Projects',
    'Youth Mentorship Program',
  ];

  return (
    <footer id="contact" className="bg-gradient-to-b from-black via-gray-900 to-black text-white py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-green-600/5 to-transparent" />
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-red-600/5 blur-3xl" />
        <div className="absolute bottom-20 left-1/4 w-32 h-32 rounded-full bg-green-500/10 blur-2xl" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-500 to-transparent" />
          <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-500/50 to-transparent" />
          <div className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-500/30 to-transparent" />
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-gradient-to-r from-green-600 to-green-700 rounded-lg mb-4">
            <Target className="w-4 h-4 text-white" />
            <span className="text-sm font-bold text-white tracking-wide">YOUTH EMPOWERMENT PARTNER</span>
            <Zap className="w-4 h-4 text-white" />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Connect With Our <span className="text-green-400">Youth</span> Team
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Our dedicated youth support team is ready to help you start your financial journey
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {/* Office */}
          <div className="group">
            <div className="w-14 h-14 bg-gradient-to-br from-green-600/20 to-green-600/10 border border-green-500/30 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-all duration-300">
              <MapPin className="h-6 w-6 text-green-400" />
            </div>
            <h3 className="font-bold text-white text-lg text-center mb-3">Youth Center</h3>
            <p className="text-sm text-gray-300 text-center leading-relaxed">
              Nyota Youth Hub<br />
              Kenyatta Avenue<br />
              Nairobi, Kenya
            </p>
            <div className="text-center mt-3">
              <span className="inline-block px-3 py-1 bg-green-600/10 text-green-400 text-xs rounded-full border border-green-500/20">
                Youth Walk-ins Welcome
              </span>
            </div>
          </div>

          {/* Phone */}
          <div className="group">
            <div className="w-14 h-14 bg-gradient-to-br from-red-600/20 to-red-600/10 border border-red-500/30 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-all duration-300">
              <Phone className="h-6 w-6 text-red-400" />
            </div>
            <h3 className="font-bold text-white text-lg text-center mb-3">Youth Hotline</h3>
            <p className="text-sm text-gray-300 text-center leading-relaxed">
              +254 700 YOUTH<br />
              +254 711 987 654<br />
              <span className="text-green-400">24/7 Support for Youth</span>
            </p>
            <div className="text-center mt-3">
              <span className="inline-block px-3 py-1 bg-red-600/10 text-red-400 text-xs rounded-full border border-red-500/20">
                Priority Youth Lines
              </span>
            </div>
          </div>

          {/* Email */}
          <div className="group">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-600/20 to-blue-600/10 border border-blue-500/30 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-all duration-300">
              <Mail className="h-6 w-6 text-blue-400" />
            </div>
            <h3 className="font-bold text-white text-lg text-center mb-3">Youth Email</h3>
            <p className="text-sm text-gray-300 text-center leading-relaxed">
              youth@nyotafund.co.ke<br />
              students@nyotafund.co.ke<br />
              startups@nyotafund.co.ke
            </p>
            <div className="text-center mt-3">
              <span className="inline-block px-3 py-1 bg-blue-600/10 text-blue-400 text-xs rounded-full border border-blue-500/20">
                Fast Response Guaranteed
              </span>
            </div>
          </div>

          {/* Live Chat */}
          <div className="group">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-600/20 to-purple-600/10 border border-purple-500/30 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-all duration-300">
              <MessageCircle className="h-6 w-6 text-purple-400" />
            </div>
            <h3 className="font-bold text-white text-lg text-center mb-3">Youth Chat</h3>
            <p className="text-sm text-gray-300 text-center leading-relaxed">
              Live Chat Support<br />
              Youth Mentors Available<br />
              Quick Q&A Sessions
            </p>
            <div className="text-center mt-3">
              <span className="inline-block px-3 py-1 bg-purple-600/10 text-purple-400 text-xs rounded-full border border-purple-500/20">
                Real-time Assistance
              </span>
            </div>
          </div>
        </div>

        {/* Youth Programs & Quick Links */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          {/* Youth Programs */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="w-5 h-5 text-green-400" />
              <h3 className="text-xl font-bold text-white">Youth Programs</h3>
            </div>
            <ul className="space-y-3">
              {youthPrograms.map((program, index) => (
                <li key={index} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  <span className="text-gray-300 hover:text-green-400 transition-colors duration-200">
                    {program}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Star className="w-5 h-5 text-green-400" />
              <h3 className="text-xl font-bold text-white">Quick Links</h3>
            </div>
            <ul className="space-y-3">
              {[
                { label: 'Youth Loan Application', path: '/youth-apply' },
                { label: 'Success Stories', path: '/stories' },
                { label: 'Youth Calculator', path: '/calculator' },
                { label: 'Mentorship Program', path: '/mentorship' },
                { label: 'Financial Literacy', path: '/education' },
                { label: 'Youth FAQ', path: '/faq' },
              ].map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path}
                    className="text-gray-300 hover:text-green-400 transition-colors duration-200 flex items-center gap-2"
                  >
                    <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Youth Newsletter */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Users className="w-5 h-5 text-green-400" />
              <h3 className="text-xl font-bold text-white">Youth Newsletter</h3>
            </div>
            <p className="text-gray-300 mb-4">
              Get youth-focused financial tips, opportunities, and success stories delivered to your inbox
            </p>
            <div className="space-y-3">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-green-500 focus:ring-green-500 focus:ring-1 outline-none"
              />
              <Button className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold">
                Subscribe for Youth Updates
              </Button>
            </div>
          </div>
        </div>

        {/* Social & Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Social Media */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Follow Our Youth Journey</h3>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href="#"
                    className={`w-12 h-12 bg-gray-900/50 border border-gray-700 rounded-full flex items-center justify-center text-gray-300 ${social.color} transition-all duration-300 hover:scale-110 hover:border-green-500/30`}
                    aria-label={social.label}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Youth Impact Stats */}
          <div className="bg-gradient-to-r from-green-600/10 to-green-600/5 border border-green-500/20 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Heart className="w-5 h-5 text-green-400" />
              <h3 className="text-lg font-bold text-white">Youth Impact 2024</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-2xl font-bold text-green-400">15,000+</p>
                <p className="text-sm text-gray-300">Youth Empowered</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-400">KSh 75M+</p>
                <p className="text-sm text-gray-300">Youth Funding</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer */}
        <div className="border-t border-gray-800 pt-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Logo & Tagline */}
            <div className="text-center lg:text-left">
              <Link to="/" className="inline-flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center">
                  <Star className="h-5 w-5 text-white fill-white" />
                </div>
                <div>
                  <span className="text-2xl font-bold text-white">Nyota</span>
                  <span className="text-2xl font-bold text-green-400"> Youth</span>
                  <span className="text-2xl font-bold text-white"> Fund</span>
                </div>
              </Link>
              <p className="text-sm text-gray-400 mt-2 max-w-md">
                Empowering young Kenyans to build their futures through accessible finance and mentorship.
              </p>
            </div>

            {/* Awards & Recognition */}
            <div className="flex items-center gap-4">
              <div className="px-4 py-2 bg-gray-900/50 border border-gray-700 rounded-lg">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm text-gray-300">Best Youth Finance 2024</span>
                </div>
              </div>
              <div className="px-4 py-2 bg-gray-900/50 border border-gray-700 rounded-lg">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-green-400" />
                  <span className="text-sm text-gray-300">Youth Choice Award</span>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright & Legal */}
          <div className="mt-12 pt-8 border-t border-gray-800 text-center">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-gray-400">
                © {new Date().getFullYear()} Nyota Youth Fund. Empowering Kenya's Next Generation.
              </p>
              
              <div className="flex flex-wrap justify-center gap-6">
                <Link to="/privacy" className="text-sm text-gray-400 hover:text-green-400 transition-colors duration-200">
                  Youth Privacy Policy
                </Link>
                <Link to="/terms" className="text-sm text-gray-400 hover:text-green-400 transition-colors duration-200">
                  Youth Terms & Conditions
                </Link>
                <Link to="/careers" className="text-sm text-gray-400 hover:text-green-400 transition-colors duration-200">
                  Youth Careers
                </Link>
                <Link to="/partners" className="text-sm text-gray-400 hover:text-green-400 transition-colors duration-200">
                  Youth Partners
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
