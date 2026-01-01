import { Card, CardContent } from '@/components/ui/card';
import { TESTIMONIALS } from '@/lib/constants';
import { Quote, Star, Target, Zap, TrendingUp, Award, Users, MapPin } from 'lucide-react';
import { useState } from 'react';

export function Testimonials() {
  const [activeCategory, setActiveCategory] = useState('all');

  // Filter testimonials by youth categories
  const youthCategories = [
    { id: 'all', label: 'All Stories', icon: '👥' },
    { id: 'students', label: 'Students', icon: '🎓' },
    { id: 'entrepreneurs', label: 'Entrepreneurs', icon: '💼' },
    { id: 'graduates', label: 'Graduates', icon: '🎯' },
    { id: 'community', label: 'Community', icon: '🤝' }
  ];

  // Show all testimonials since TESTIMONIALS doesn't have category
  const filteredTestimonials = TESTIMONIALS;

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-green-600/5 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-48 h-48 rounded-full bg-red-500/10 blur-2xl" />
        <div className="absolute top-1/2 right-1/3 w-32 h-32 rounded-full bg-green-500/10 blur-2xl" />
        
        {/* Testimonial pattern */}
        <div className="absolute top-20 left-10 opacity-5">
          <Quote className="w-24 h-24 text-white" />
        </div>
        <div className="absolute bottom-20 right-10 opacity-5">
          <Quote className="w-24 h-24 text-white" />
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-gradient-to-r from-green-600 to-green-700 rounded-lg mb-4">
            <Award className="w-4 h-4 text-white" />
            <span className="text-sm font-bold text-white tracking-wide">YOUTH SUCCESS STORIES</span>
            <Star className="w-4 h-4 text-white" />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Voices of <span className="text-green-400">Empowered</span> Youth
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Hear from young Kenyans who have transformed their lives through our programs
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {youthCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg shadow-green-500/20'
                  : 'bg-gray-900/50 border border-gray-800 text-gray-300 hover:border-green-500/30 hover:text-white'
              }`}
            >
              <span className="text-lg">{category.icon}</span>
              <span className="font-medium">{category.label}</span>
            </button>
          ))}
        </div>

        {/* Success Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-gradient-to-b from-gray-900/50 to-black/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">4.8/5</div>
            <div className="flex justify-center mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <p className="text-sm text-gray-300">Customer Rating</p>
          </div>
          
          <div className="bg-gradient-to-b from-gray-900/50 to-black/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">15K+</div>
            <div className="flex justify-center mb-2">
              <Users className="w-5 h-5 text-green-400" />
            </div>
            <p className="text-sm text-gray-300">Youth Impacted</p>
          </div>
          
          <div className="bg-gradient-to-b from-gray-900/50 to-black/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">92%</div>
            <div className="flex justify-center mb-2">
              <TrendingUp className="w-5 h-5 text-green-400" />
            </div>
            <p className="text-sm text-gray-300">Success Rate</p>
          </div>
          
          <div className="bg-gradient-to-b from-gray-900/50 to-black/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">KSh 75M+</div>
            <div className="flex justify-center mb-2">
              <Zap className="w-5 h-5 text-green-400" />
            </div>
            <p className="text-sm text-gray-300">Youth Funding</p>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTestimonials.map((testimonial, index) => (
            <Card 
              key={index} 
              className="bg-gradient-to-b from-gray-900/80 to-black/80 backdrop-blur-sm border border-gray-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-green-500/10 hover:border-green-500/30 transition-all duration-500 hover:-translate-y-2 group"
            >
              <CardContent className="p-8">
                  {/* Quote Icon */}
                  <div className="flex justify-between items-start mb-6">
                    <Quote className="h-10 w-10 text-green-500/30 group-hover:text-green-500/50 transition-colors duration-300" />
                    
                    {/* Category Badge */}
                    <div className="px-3 py-1 rounded-full text-xs font-medium bg-green-600/20 text-green-400 border border-green-500/30">
                      Success Story
                    </div>
                  </div>
                
                {/* Quote */}
                <p className="text-gray-200 mb-6 italic text-lg leading-relaxed">
                  "{testimonial.quote}"
                </p>
                
                {/* Author Info */}
                <div className="border-t border-gray-800 pt-6">
                  <div className="flex items-center gap-4">
                    {/* Avatar */}
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-600 to-green-700 flex items-center justify-center text-white font-bold">
                      {testimonial.author.charAt(0)}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-bold text-white text-lg">{testimonial.author}</p>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 mt-1">
                        <MapPin className="w-3 h-3 text-gray-400" />
                        <p className="text-sm text-gray-400">{testimonial.location}</p>
                      </div>
                      
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Featured Youth Story */}
        <div className="mt-16 bg-gradient-to-r from-green-600/10 via-green-600/5 to-red-600/5 border border-green-500/20 rounded-2xl p-8 backdrop-blur-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Target className="w-5 h-5 text-green-400" />
                <h3 className="text-2xl font-bold text-white">Youth Spotlight</h3>
              </div>
              <blockquote className="text-xl text-gray-200 italic mb-6">
                "Nyota Fund didn't just give me a loan - they gave me a chance to prove myself. 
                Starting my business at 22 seemed impossible, but their youth program made it possible."
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-green-600 to-green-700 flex items-center justify-center text-white text-2xl font-bold">
                  S
                </div>
                <div>
                  <p className="font-bold text-white text-lg">Samuel K.</p>
                  <p className="text-gray-400">Young Entrepreneur, Nairobi</p>
                  <p className="text-sm text-green-400 mt-1">Turned KSh 50,000 into KSh 500,000 business</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-b from-gray-900/50 to-black/50 border border-gray-800 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-white mb-4">Youth Impact in Numbers</h4>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-300">Business Startups</span>
                    <span className="text-sm font-medium text-green-400">85%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-300">Education Funding</span>
                    <span className="text-sm font-medium text-green-400">78%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-300">Community Projects</span>
                    <span className="text-sm font-medium text-green-400">65%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-lg text-gray-300 mb-6">
            Join thousands of young Kenyans who have already transformed their lives
          </p>
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-lg">
            <Star className="w-4 h-4 fill-white" />
            <span>Share Your Success Story</span>
            <Star className="w-4 h-4 fill-white" />
          </div>
        </div>
      </div>
    </section>
  );
}
