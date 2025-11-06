import React, { useState } from 'react';
import { ChefHat, Award, Heart } from 'lucide-react';

const TeamSection = () => {
  const [hoveredMember, setHoveredMember] = useState(null);

  const team = [
    {
      name: 'Rajesh Kumar',
      role: 'Master Baker',
      emoji: '👨‍🍳',
      experience: '30 Years',
      specialty: 'Artisan Breads',
      quote: 'Every loaf tells a story',
      color: 'from-amber-400 to-amber-600'
    },
    {
      name: 'Priya Sharma',
      role: 'Pastry Chef',
      emoji: '👩‍🍳',
      experience: '15 Years',
      specialty: 'French Pastries',
      quote: 'Perfection in every layer',
      color: 'from-pink-400 to-pink-600'
    },
    {
      name: 'Amit Patel',
      role: 'Cake Designer',
      emoji: '🎨',
      experience: '12 Years',
      specialty: 'Custom Cakes',
      quote: 'Dreams become delicious reality',
      color: 'from-purple-400 to-purple-600'
    },
    {
      name: 'Sneha Desai',
      role: 'Head Decorator',
      emoji: '✨',
      experience: '10 Years',
      specialty: 'Decorative Arts',
      quote: 'Beauty you can taste',
      color: 'from-blue-400 to-blue-600'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-lg mb-6">
              <ChefHat className="w-4 h-4 text-amber-600" />
              <span className="text-amber-800 font-semibold">Our Team</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-amber-950 mb-4">
              Meet the Masters
            </h2>
            <p className="text-lg text-amber-800 max-w-2xl mx-auto">
              Skilled artisans who pour their heart and expertise into every creation
            </p>
          </div>

          {/* Team Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {team.map((member, index) => (
              <div
                key={index}
                onMouseEnter={() => setHoveredMember(index)}
                onMouseLeave={() => setHoveredMember(null)}
                className="group relative"
              >
                {/* Card */}
                <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4">
                  {/* Image/Emoji Section */}
                  <div className={`relative h-64 bg-gradient-to-br ${member.color} flex items-center justify-center overflow-hidden`}>
                    <div className="text-8xl transform group-hover:scale-125 transition-transform duration-500">
                      {member.emoji}
                    </div>
                    {/* Overlay on hover */}
                    <div className={`absolute inset-0 bg-black/50 flex items-center justify-center transition-opacity duration-300 ${hoveredMember === index ? 'opacity-100' : 'opacity-0'}`}>
                      <div className="text-center text-white px-4">
                        <Award className="w-12 h-12 mx-auto mb-2" />
                        <p className="text-sm font-medium italic">"{member.quote}"</p>
                      </div>
                    </div>
                  </div>

                  {/* Info Section */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-amber-950 mb-1">{member.name}</h3>
                    <p className="text-amber-600 font-semibold mb-3">{member.role}</p>
                    <div className="space-y-2 text-sm text-amber-800">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                        <span><strong>Experience:</strong> {member.experience}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                        <span><strong>Specialty:</strong> {member.specialty}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Values Section */}
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Heart,
                title: 'Passion Driven',
                description: 'Every team member brings genuine love for the craft of baking',
                color: 'from-red-500 to-red-600'
              },
              {
                icon: Award,
                title: 'Expert Training',
                description: 'Continuously learning and perfecting techniques from around the world',
                color: 'from-amber-500 to-amber-600'
              },
              {
                icon: ChefHat,
                title: 'Quality Focused',
                description: 'Committed to using only the finest ingredients and traditional methods',
                color: 'from-green-500 to-green-600'
              }
            ].map((value, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center mb-4 shadow-lg`}>
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-amber-950 mb-3">{value.title}</h3>
                <p className="text-amber-800 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;