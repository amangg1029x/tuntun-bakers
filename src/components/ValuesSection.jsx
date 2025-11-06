import React from 'react';
import { Target, Eye, Leaf, Users, Heart, Shield } from 'lucide-react';

const ValuesSection = () => {
  const values = [
    {
      icon: Leaf,
      title: 'Natural & Fresh',
      description: 'We believe in using only natural ingredients with no artificial preservatives or additives',
      bgColor: 'bg-green-50',
      iconColor: 'from-green-500 to-green-600',
      borderColor: 'border-green-200'
    },
    {
      icon: Heart,
      title: 'Made with Love',
      description: 'Every product is crafted with care, passion, and attention to detail by our expert bakers',
      bgColor: 'bg-red-50',
      iconColor: 'from-red-500 to-red-600',
      borderColor: 'border-red-200'
    },
    {
      icon: Users,
      title: 'Community First',
      description: 'We are proud to serve our local community and give back through various initiatives',
      bgColor: 'bg-blue-50',
      iconColor: 'from-blue-500 to-blue-600',
      borderColor: 'border-blue-200'
    },
    {
      icon: Shield,
      title: 'Quality Assured',
      description: 'Stringent quality checks ensure every item meets our high standards of excellence',
      bgColor: 'bg-amber-50',
      iconColor: 'from-amber-500 to-amber-600',
      borderColor: 'border-amber-200'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Mission & Vision Cards */}
          <div className="grid md:grid-cols-2 gap-8 mb-20">
            {/* Mission */}
            <div className="group relative bg-gradient-to-br from-amber-500 to-orange-600 rounded-3xl p-10 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105 overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
              <div className="relative z-10">
                <div className="w-20 h-20 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center mb-6 transform group-hover:rotate-12 transition-transform duration-300">
                  <Target className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">Our Mission</h3>
                <p className="text-amber-50 text-lg leading-relaxed">
                  To bring joy and comfort to every customer through exceptional baked goods, 
                  crafted with traditional techniques and modern innovation, while maintaining 
                  the highest standards of quality and freshness.
                </p>
              </div>
            </div>

            {/* Vision */}
            <div className="group relative bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl p-10 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105 overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
              <div className="relative z-10">
                <div className="w-20 h-20 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center mb-6 transform group-hover:rotate-12 transition-transform duration-300">
                  <Eye className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">Our Vision</h3>
                <p className="text-purple-50 text-lg leading-relaxed">
                  To become the most loved and trusted bakery brand, known for innovation, 
                  sustainability, and community engagement, while preserving the artisanal 
                  traditions that make every bite special.
                </p>
              </div>
            </div>
          </div>

          {/* Section Header for Values */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-amber-950 mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-amber-800 max-w-2xl mx-auto">
              The principles that guide everything we do at TunTun Bakers
            </p>
          </div>

          {/* Values Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className={`group ${value.bgColor} rounded-3xl p-8 border-2 ${value.borderColor} shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start space-x-6">
                  <div className={`flex-shrink-0 w-20 h-20 bg-gradient-to-br ${value.iconColor} rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                    <value.icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-amber-950 mb-3">{value.title}</h3>
                    <p className="text-amber-800 leading-relaxed">{value.description}</p>
                    <div className={`mt-4 h-1 bg-gradient-to-r ${value.iconColor} rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Promise Section */}
          <div className="mt-20 bg-gradient-to-r from-amber-100 to-orange-100 rounded-3xl p-12 text-center border-2 border-amber-200">
            <div className="max-w-3xl mx-auto">
              <div className="text-6xl mb-6">🤝</div>
              <h3 className="text-3xl md:text-4xl font-bold text-amber-950 mb-4">
                Our Promise to You
              </h3>
              <p className="text-amber-900 text-lg leading-relaxed mb-8">
                Every item that leaves our bakery carries our commitment to quality, freshness, 
                and taste. We promise to never compromise on ingredients, never rush the process, 
                and always put your satisfaction first. That's the TunTun Bakers guarantee.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <div className="bg-white px-6 py-3 rounded-full shadow-lg">
                  <span className="text-amber-900 font-semibold">✓ 100% Fresh Daily</span>
                </div>
                <div className="bg-white px-6 py-3 rounded-full shadow-lg">
                  <span className="text-amber-900 font-semibold">✓ No Preservatives</span>
                </div>
                <div className="bg-white px-6 py-3 rounded-full shadow-lg">
                  <span className="text-amber-900 font-semibold">✓ Quality Guaranteed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;