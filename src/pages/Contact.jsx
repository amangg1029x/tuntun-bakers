import React from 'react';
import ContactHero from '../components/ContactHero';
import ContactForm from '../components/ContactForm';

const Contact = () => {
  return (
    <div className="min-h-screen bg-white">
      <ContactHero />
      <ContactForm />
    </div>
  );
};

export default Contact;