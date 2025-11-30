import React from 'react';
import { Award, Heart, Users, TrendingUp } from 'lucide-react';

const AboutHero = () => {
  return (
    <section className="relative pt-32 pb-20 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-amber-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Main Header */}
          <div className="text-center mb-16">
            <div className="inline-block bg-white px-6 py-3 rounded-full shadow-lg mb-6">
              <span className="text-amber-800 font-semibold">Est. 1995</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-amber-950 mb-6">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">Story</span>
            </h1>
            <p className="text-xl text-amber-800 max-w-3xl mx-auto leading-relaxed">
              For three decades, TunTun Bakers has been crafting moments of joy, one fresh bake at a time. 
              From a small family kitchen to your favorite neighborhood bakery.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Award, number: '30+', label: 'Years of Excellence', color: 'from-amber-500 to-amber-600' },
              { icon: Heart, number: '50K+', label: 'Happy Customers', color: 'from-red-500 to-red-600' },
              { icon: Users, number: '25+', label: 'Expert Bakers', color: 'from-blue-500 to-blue-600' },
              { icon: TrendingUp, number: '100+', label: 'Daily Fresh Items', color: 'from-green-500 to-green-600' }
            ].map((stat, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mb-4 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg`}>
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-amber-950 mb-2">{stat.number}</div>
                <div className="text-amber-700">{stat.label}</div>
                <div className="mt-4 h-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
};

export default AboutHero;