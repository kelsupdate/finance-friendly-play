import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Target, Zap, Star, TrendingUp, Users, Award, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';

const navLinks = [
  { href: '/', label: 'Home', icon: Star },
  { href: '/youth-loans', label: 'Youth Loans', icon: TrendingUp },
  { href: '/#calculator', label: 'Calculator', icon: Target },
  { href: '/#how-it-works', label: 'Empowerment Path', icon: Zap },
  { href: '/#testimonials', label: 'Success Stories', icon: Users },
  { href: '/#contact', label: 'Youth Support', icon: Award },
];

const youthPrograms = [
  { href: '/apply', label: 'Student Loans', badge: '🎓' },
  { href: '/apply', label: 'Startup Funding', badge: '💼' },
  { href: '/apply', label: 'Education', badge: '📚' },
  { href: '/apply', label: 'Community Projects', badge: '🤝' },
  { href: '/apply', label: 'Mentorship', badge: '👥' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isProgramsOpen, setIsProgramsOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-b from-gray-900/95 to-black/95 backdrop-blur-xl border-b border-gray-800 shadow-2xl shadow-green-500/5">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Star className="h-5 w-5 text-white fill-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold tracking-tight">
                <span className="text-white">Nyota</span>{' '}
                <span className="text-green-400">Youth</span>{' '}
                <span className="text-white">Fund</span>
              </span>
              <span className="text-[10px] text-gray-400 tracking-wider">EMPOWERING KENYA'S YOUTH</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link, index) => {
              const Icon = link.icon;
              return link.label === 'Youth Loans' ? (
                <div key={link.href} className="relative group">
                  <button
                    onClick={() => setIsProgramsOpen(!isProgramsOpen)}
                    className="flex items-center gap-2 px-5 py-3 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-900/50 rounded-lg transition-all duration-200"
                  >
                    <Icon className="h-4 w-4" />
                    {link.label}
                    <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${isProgramsOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {/* Dropdown */}
                  {isProgramsOpen && (
                    <>
                      <div 
                        className="fixed inset-0 z-40" 
                        onClick={() => setIsProgramsOpen(false)}
                      />
                      <div className="absolute left-0 mt-2 w-64 bg-gradient-to-b from-gray-900 to-black backdrop-blur-xl border border-gray-800 rounded-xl shadow-2xl shadow-green-500/10 z-50 overflow-hidden">
                        <div className="p-2">
                          <div className="px-3 py-2 mb-2 border-b border-gray-800">
                            <p className="text-xs text-gray-400">YOUTH PROGRAMS</p>
                          </div>
                          {youthPrograms.map((program) => (
                            <Link
                              key={program.href}
                              to={program.href}
                              className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-all duration-200 group"
                              onClick={() => setIsProgramsOpen(false)}
                            >
                              <span className="text-lg">{program.badge}</span>
                              <span>{program.label}</span>
                              <div className="ml-auto w-1 h-1 bg-green-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                            </Link>
                          ))}
                        </div>
                        <div className="bg-gradient-to-r from-green-600/10 to-red-600/10 border-t border-gray-800 p-3">
                          <p className="text-xs text-gray-400 mb-1">Youth Benefits</p>
                          <div className="flex flex-wrap gap-1">
                            <span className="px-2 py-1 bg-green-600/10 text-green-400 text-[10px] rounded border border-green-500/20">
                              Lower Rates
                            </span>
                            <span className="px-2 py-1 bg-red-600/10 text-red-400 text-[10px] rounded border border-red-500/20">
                              Fast Approval
                            </span>
                            <span className="px-2 py-1 bg-blue-600/10 text-blue-400 text-[10px] rounded border border-blue-500/20">
                              No Collateral
                            </span>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-2 px-5 py-3 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-900/50 rounded-lg transition-all duration-200 group"
                >
                  <Icon className="h-4 w-4 group-hover:text-green-400 transition-colors duration-200" />
                  {link.label}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-green-500 to-red-500 rounded-full group-hover:w-3/4 transition-all duration-300"></div>
                </a>
              );
            })}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Youth Badge */}
            <div className="px-3 py-1.5 bg-gradient-to-r from-green-600/10 to-red-600/10 border border-green-500/20 rounded-lg">
              <p className="text-xs text-gray-300 font-medium">
                <span className="text-green-400">Ages 18-35</span> Only
              </p>
            </div>

            {user ? (
              <>
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/dashboard')}
                  className="border border-gray-700 bg-gray-900/50 text-white hover:bg-gray-800 hover:text-green-400 hover:border-green-500/30 transition-all duration-200"
                >
                  Youth Dashboard
                </Button>
                <Button 
                  variant="ghost" 
                  onClick={handleLogout}
                  className="text-gray-300 hover:text-red-400 hover:bg-red-600/10 transition-all duration-200"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/auth')}
                  className="border border-gray-700 bg-gray-900/50 text-white hover:bg-gray-800 hover:text-white transition-all duration-200"
                >
                  Login
                </Button>
                <Button 
                  onClick={() => navigate('/auth?mode=register')}
                  className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg shadow-green-500/20 hover:scale-105 transition-all duration-200"
                >
                  Join Youth Program
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 hover:bg-gray-900/50 rounded-lg transition-all duration-200"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="h-6 w-6 text-gray-300" />
            ) : (
              <Menu className="h-6 w-6 text-gray-300" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t border-gray-800 bg-gradient-to-b from-gray-900 to-black backdrop-blur-xl">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return link.label === 'Youth Loans' ? (
                  <div key={link.href}>
                    <button
                      onClick={() => setIsProgramsOpen(!isProgramsOpen)}
                      className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-all duration-200"
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="h-4 w-4" />
                        {link.label}
                      </div>
                      <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isProgramsOpen ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {/* Mobile Dropdown */}
                    {isProgramsOpen && (
                      <div className="ml-8 mt-1 mb-2 space-y-1 border-l border-gray-800 pl-4">
                        {youthPrograms.map((program) => (
                          <Link
                            key={program.href}
                            to={program.href}
                            className="flex items-center gap-3 px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-800/30 rounded-lg transition-all duration-200"
                            onClick={() => {
                              setIsOpen(false);
                              setIsProgramsOpen(false);
                            }}
                          >
                            <span className="text-lg">{program.badge}</span>
                            <span>{program.label}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <a
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-all duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    <Icon className="h-4 w-4" />
                    {link.label}
                  </a>
                );
              })}

              {/* Youth Badge Mobile */}
              <div className="mx-4 my-3 px-4 py-2 bg-gradient-to-r from-green-600/10 to-red-600/10 border border-green-500/20 rounded-lg">
                <p className="text-xs text-center text-gray-300 font-medium">
                  Exclusively for <span className="text-green-400">Young Kenyans</span> (Ages 18-35)
                </p>
              </div>

              {/* Auth Buttons Mobile */}
              <div className="flex flex-col gap-2 pt-4 border-t border-gray-800 px-4">
                {user ? (
                  <>
                    <Button 
                      variant="outline" 
                      onClick={() => { navigate('/dashboard'); setIsOpen(false); }}
                      className="border border-gray-700 bg-gray-900/50 text-white hover:bg-gray-800"
                    >
                      Youth Dashboard
                    </Button>
                    <Button 
                      variant="ghost" 
                      onClick={() => { handleLogout(); setIsOpen(false); }}
                      className="text-gray-300 hover:text-red-400 hover:bg-red-600/10"
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button 
                      variant="outline" 
                      onClick={() => { navigate('/auth'); setIsOpen(false); }}
                      className="border border-gray-700 bg-gray-900/50 text-white hover:bg-gray-800"
                    >
                      Login
                    </Button>
                    <Button 
                      onClick={() => { navigate('/auth?mode=register'); setIsOpen(false); }}
                      className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg"
                    >
                      Join Youth Program
                    </Button>
                  </>
                )}
              </div>

              {/* Youth Stats Mobile */}
              <div className="grid grid-cols-2 gap-2 px-4 pt-4 border-t border-gray-800">
                <div className="bg-gray-900/50 rounded-lg p-3 text-center">
                  <p className="text-xs text-gray-400">Youth Empowered</p>
                  <p className="text-lg font-bold text-green-400">15K+</p>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-3 text-center">
                  <p className="text-xs text-gray-400">Success Rate</p>
                  <p className="text-lg font-bold text-green-400">92%</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Decorative bottom line */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-500/30 to-transparent"></div>
    </nav>
  );
}
