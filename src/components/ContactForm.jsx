import React, { useState } from 'react';
import { Send, User, Mail, Phone, MessageSquare, CheckCircle } from 'lucide-react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (formData.name && formData.email && formData.subject && formData.message) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      }, 3000);
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Side - Form */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-8 md:p-12 shadow-2xl">
              <h2 className="text-3xl md:text-4xl font-bold text-amber-950 mb-4">
                Send Us a Message
              </h2>
              <p className="text-amber-800 mb-8">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>

              <div className="space-y-6">
                {/* Name Field */}
                <div className="relative">
                  <label className="block text-amber-900 font-semibold mb-2">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${focusedField === 'name' ? 'text-amber-600' : 'text-amber-400'}`} />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full pl-12 pr-4 py-4 bg-white border-2 border-amber-200 rounded-xl focus:border-amber-500 focus:outline-none transition-all duration-300 text-amber-900"
                      placeholder="John Doe"
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div className="relative">
                  <label className="block text-amber-900 font-semibold mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${focusedField === 'email' ? 'text-amber-600' : 'text-amber-400'}`} />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full pl-12 pr-4 py-4 bg-white border-2 border-amber-200 rounded-xl focus:border-amber-500 focus:outline-none transition-all duration-300 text-amber-900"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                {/* Phone Field */}
                <div className="relative">
                  <label className="block text-amber-900 font-semibold mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${focusedField === 'phone' ? 'text-amber-600' : 'text-amber-400'}`} />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('phone')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full pl-12 pr-4 py-4 bg-white border-2 border-amber-200 rounded-xl focus:border-amber-500 focus:outline-none transition-all duration-300 text-amber-900"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>

                {/* Subject Field */}
                <div className="relative">
                  <label className="block text-amber-900 font-semibold mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('subject')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full px-4 py-4 bg-white border-2 border-amber-200 rounded-xl focus:border-amber-500 focus:outline-none transition-all duration-300 text-amber-900"
                    placeholder="Custom cake order"
                  />
                </div>

                {/* Message Field */}
                <div className="relative">
                  <label className="block text-amber-900 font-semibold mb-2">
                    Message *
                  </label>
                  <div className="relative">
                    <MessageSquare className={`absolute left-4 top-4 w-5 h-5 transition-colors duration-300 ${focusedField === 'message' ? 'text-amber-600' : 'text-amber-400'}`} />
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      rows="5"
                      className="w-full pl-12 pr-4 py-4 bg-white border-2 border-amber-200 rounded-xl focus:border-amber-500 focus:outline-none transition-all duration-300 text-amber-900 resize-none"
                      placeholder="Tell us about your requirements..."
                    ></textarea>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitted}
                  className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center space-x-2 ${
                    isSubmitted
                      ? 'bg-green-500 text-white'
                      : 'bg-gradient-to-r from-amber-600 to-amber-700 text-white hover:shadow-2xl hover:scale-105'
                  }`}
                >
                  {isSubmitted ? (
                    <>
                      <CheckCircle className="w-6 h-6" />
                      <span>Message Sent!</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Right Side - Additional Info */}
            <div className="space-y-8">
              {/* Map Placeholder */}
              <div className="bg-gradient-to-br from-amber-100 to-orange-100 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
                <h3 className="text-2xl font-bold text-amber-950 mb-4">Find Us Here</h3>
                <div className="aspect-video bg-gradient-to-br from-amber-200 to-orange-200 rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">📍</div>
                    <p className="text-amber-900 font-semibold">123 Bakery Street</p>
                    <p className="text-amber-800">Ghaziabad, UP, India</p>
                  </div>
                </div>
              </div>

              {/* Quick Info Cards */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-8 shadow-xl">
                <h3 className="text-2xl font-bold text-blue-950 mb-6">Quick Response</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">⚡</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-blue-950 mb-1">Fast Response Time</h4>
                      <p className="text-blue-800 text-sm">We typically respond within 2-4 hours during business hours</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">✨</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-blue-950 mb-1">Custom Orders Welcome</h4>
                      <p className="text-blue-800 text-sm">Special occasions? We create customized cakes and treats</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">🎂</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-blue-950 mb-1">Bulk Orders Available</h4>
                      <p className="text-blue-800 text-sm">Planning an event? Contact us for special bulk pricing</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;