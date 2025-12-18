import React from 'react';
import { Sparkles } from 'lucide-react';

const OurStory = () => {
  const timeline = [
    {
      year: '1995',
      title: 'The Beginning',
      description: 'Started as a small home kitchen with just 3 recipes and a dream to share authentic baked goods',
      emoji: '🏡',
      color: 'from-amber-400 to-amber-500'
    },
    {
      year: '2000',
      title: 'First Store Opens',
      description: 'Opened our first retail location in Ghaziabad, serving fresh bread and pastries daily',
      emoji: '🏪',
      color: 'from-orange-400 to-orange-500'
    },
    {
      year: '2010',
      title: 'Award Recognition',
      description: 'Received "Best Local Bakery" award and expanded our product range to 50+ items',
      emoji: '🏆',
      color: 'from-yellow-400 to-yellow-500'
    },
    {
      year: '2020',
      title: 'Digital Transformation',
      description: 'Launched online ordering and delivery services, making our treats accessible to more people',
      emoji: '📱',
      color: 'from-green-400 to-green-500'
    },
    {
      year: '2025',
      title: 'Continuing Excellence',
      description: 'Celebrating 30 years of baking with love, serving 1000+ customers daily with the same passion',
      emoji: '🎉',
      color: 'from-purple-400 to-purple-500'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-amber-100 px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span className="text-amber-800 font-semibold">Our Journey</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-amber-950 mb-4">
              Three Decades of Passion
            </h2>
            <p className="text-lg text-amber-800 max-w-2xl mx-auto">
              From humble beginnings to becoming a beloved community staple, here's our story
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-10.5 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-300 via-orange-300 to-purple-300 transform md:-translate-x-1/2"></div>

            {/* Timeline Items */}
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div
                  key={index}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  } flex-col md:flex-row`}
                >
                  {/* Content Card */}
                  <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'} pl-20 md:pl-0`}>
                    <div className="group bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center text-3xl shadow-lg transform group-hover:rotate-12 transition-transform duration-300`}>
                          {item.emoji}
                        </div>
                        <div>
                          <div className="text-3xl font-bold text-amber-900">{item.year}</div>
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-amber-950 mb-3">{item.title}</h3>
                      <p className="text-amber-800 leading-relaxed">{item.description}</p>
                      <div className="mt-4 h-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                    </div>
                  </div>

                  {/* Center Circle */}
                  <div className="absolute left-8 md:left-1/2 w-6 h-6 bg-white border-4 border-amber-500 rounded-full transform md:-translate-x-1/2 shadow-lg z-10">
                    <div className="absolute inset-0 bg-amber-500 rounded-full animate-ping opacity-75"></div>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden md:block w-5/12"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-20 text-center">
            <div className="bg-gradient-to-r from-amber-600 to-orange-600 rounded-3xl p-12 shadow-2xl">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Want to Be Part of Our Story?
              </h3>
              <p className="text-amber-50 text-lg mb-8 max-w-2xl mx-auto">
                Join thousands of satisfied customers who have made us their go-to bakery for all occasions
              </p>
              <button className="bg-white text-amber-900 px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
                Visit Us Today
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStory;