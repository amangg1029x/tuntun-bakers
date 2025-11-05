import React, { useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: 'Priya Sharma',
      role: 'Regular Customer',
      image: '👩',
      rating: 5,
      text: 'The best bakery in town! Their croissants are absolutely divine. I visit every weekend and never leave disappointed. The staff is wonderful too!'
    },
    {
      id: 2,
      name: 'Rahul Verma',
      role: 'Food Blogger',
      image: '👨',
      rating: 5,
      text: 'TunTun Bakers maintains authentic traditional recipes while keeping everything fresh and modern. Their sourdough is the best I have tasted in years!'
    },
    {
      id: 3,
      name: 'Anjali Desai',
      role: 'Birthday Cake Customer',
      image: '👩‍🦰',
      rating: 5,
      text: 'Ordered a custom birthday cake and it exceeded all expectations! Beautiful design, delicious taste, and delivered on time. Highly recommended!'
    },
    {
      id: 4,
      name: 'Arjun Patel',
      role: 'Local Resident',
      image: '👨‍💼',
      rating: 5,
      text: 'Been coming here for 10 years! The consistency in quality and taste is remarkable. It is a family tradition for us now. Love this place!'
    }
  ];

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Customer Love
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-amber-950 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-amber-800 max-w-2xl mx-auto">
            Don't just take our word for it - hear from our happy customers
          </p>
        </div>

        {/* Testimonials Slider */}
        <div className="max-w-5xl mx-auto relative">
          {/* Main Testimonial Card */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-12 shadow-2xl relative overflow-hidden">
            {/* Quote Icon */}
            <div className="absolute top-8 left-8 opacity-10">
              <Quote className="w-24 h-24 text-amber-600" />
            </div>

            <div className="relative z-10">
              {/* Stars */}
              <div className="flex justify-center mb-6">
                {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-6 h-6 fill-amber-500 text-amber-500 mx-1"
                  />
                ))}
              </div>

              {/* Testimonial Text */}
              <blockquote className="text-xl md:text-2xl text-amber-900 text-center leading-relaxed mb-8 font-medium">
                "{testimonials[activeIndex].text}"
              </blockquote>

              {/* Customer Info */}
              <div className="flex items-center justify-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-3xl shadow-lg">
                  {testimonials[activeIndex].image}
                </div>
                <div className="text-left">
                  <div className="font-bold text-lg text-amber-950">
                    {testimonials[activeIndex].name}
                  </div>
                  <div className="text-amber-700 text-sm">
                    {testimonials[activeIndex].role}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-16 bg-white p-4 rounded-full shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-300 group"
          >
            <ChevronLeft className="w-6 h-6 text-amber-900 group-hover:-translate-x-1 transition-transform" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-16 bg-white p-4 rounded-full shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-300 group"
          >
            <ChevronRight className="w-6 h-6 text-amber-900 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === activeIndex
                    ? 'w-12 h-3 bg-gradient-to-r from-amber-600 to-orange-600'
                    : 'w-3 h-3 bg-amber-300 hover:bg-amber-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Customer Thumbnails */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-4xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <button
              key={testimonial.id}
              onClick={() => setActiveIndex(index)}
              className={`bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl p-6 transition-all duration-300 ${
                index === activeIndex
                  ? 'ring-4 ring-amber-500 scale-105 shadow-xl'
                  : 'hover:scale-105 shadow-lg'
              }`}
            >
              <div className="text-4xl mb-2">{testimonial.image}</div>
              <div className="text-sm font-semibold text-amber-900">
                {testimonial.name}
              </div>
              <div className="flex justify-center mt-2">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-3 h-3 fill-amber-500 text-amber-500"
                  />
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;