import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const ContactHero = () => {
  const contactInfo = [
    {
      icon: Phone,
      title: 'Call Us',
      info: '+91 98765 43210',
      subInfo: 'Mon-Sun, 6 AM - 10 PM',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Mail,
      title: 'Email Us',
      info: 'hello@tuntunbakers.com',
      subInfo: 'We reply within 24 hours',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      info: '123 Bakery Street',
      subInfo: 'Ghaziabad, UP, India',
      color: 'from-red-500 to-red-600'
    },
    {
      icon: Clock,
      title: 'Working Hours',
      info: 'Open Daily',
      subInfo: '6:00 AM - 10:00 PM',
      color: 'from-green-500 to-green-600'
    }
  ];

  return (
    <section className="relative pt-32 pb-20 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block bg-white px-6 py-3 rounded-full shadow-lg mb-6 animate-bounce-slow">
            <span className="text-amber-800 font-semibold">Let's Connect</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-amber-950 mb-6">
            Get In <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">Touch</span>
          </h1>
          <p className="text-xl text-amber-800 max-w-2xl mx-auto">
            Have questions or special requests? We'd love to hear from you!
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {contactInfo.map((item, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mb-4 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg`}>
                <item.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-amber-950 mb-2">{item.title}</h3>
              <p className="text-amber-900 font-semibold mb-1">{item.info}</p>
              <p className="text-amber-700 text-sm">{item.subInfo}</p>
              
              {/* Hover line effect */}
              <div className="mt-4 h-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default ContactHero;