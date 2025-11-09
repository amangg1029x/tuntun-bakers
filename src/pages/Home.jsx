import React from 'react';
import Hero from '../components/Hero';
import FeaturedProducts from '../components/FeaturedProducts';
import WhyChooseUs from '../components/WhyChooseUs';
import Testimonials from '../components/Testimonials';

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <FeaturedProducts />
      <WhyChooseUs />
      <Testimonials />
    </div>
  );
};

export default Home;