import React from 'react';
import AboutHero from '../components/AboutHero';
import OurStory from '../components/OurStory';
import TeamSection from '../components/TeamSection';
import ValuesSection from '../components/ValuesSection';

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      <AboutHero />
      <OurStory />
      <TeamSection />
      <ValuesSection />
    </div>
  );
};

export default About;