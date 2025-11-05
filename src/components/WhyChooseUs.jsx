import React from 'react';
import { Clock, Award, Leaf, Heart } from 'lucide-react';

const WhyChooseUs = () => {
  const features = [
    {
      icon: Clock,
      title: 'Fresh Daily',
      description: 'All our products are baked fresh every morning using traditional methods',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Award,
      title: 'Premium Quality',
      description: 'We use only the finest ingredients sourced from trusted suppliers',
      color: 'from-amber-500 to-amber-600'
    },
    {
      icon: Leaf,
      title: 'Natural Ingredients',
      description: 'No artificial preservatives or additives, just pure natural goodness',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Heart,
      title: 'Made with Love',
      description: 'Every item is crafted with care and passion by our expert bakers',
      color: 'from-red-500 to-red-600'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-64 h-64 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block bg-white text-amber-800 px-4 py-2 rounded-full text-sm font-semibold mb-4 shadow-lg">
            What Makes Us Special
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-amber-950 mb-4">
            Why Choose TunTun Bakers?
          </h2>
          <p className="text-lg text-amber-800 max-w-2xl mx-auto">
            Three decades of baking excellence and a commitment to quality that never wavers
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Icon */}
              <div className="mb-6 relative">
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-400 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-amber-950 mb-3 group-hover:text-amber-700 transition-colors">
                {feature.title}
              </h3>
              <p className="text-amber-700 leading-relaxed">{feature.description}</p>

              {/* Hover Effect Line */}
              <div className="mt-6 h-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <div className="mt-20 bg-gradient-to-r from-amber-600 to-orange-600 rounded-3xl p-12 text-center shadow-2xl transform hover:scale-105 transition-transform duration-500">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Experience the Difference Today!
            </h3>
            <p className="text-amber-50 text-lg mb-8">
              Visit our bakery or order online to taste the tradition and quality that has
              made us a local favorite for 30 years.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-amber-900 px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
                Visit Store
              </button>
              <button className="bg-amber-800 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 border-2 border-white/30">
                Call Us Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;