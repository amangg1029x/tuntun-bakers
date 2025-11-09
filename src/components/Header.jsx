import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ShoppingCart, Phone, User } from 'lucide-react';
import Logo from "../assets/Logo.jpeg";
import { useCart } from '../context/AppContext';

const Header = () => {  
  const { getCartCount } = useCart();
  const cartCount = getCartCount();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: 'products' },
    { name: 'About', href: 'about' },
    { name: 'Contact', href: 'contact' },
    { name: 'Orders', href: 'orders' }
  ];

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white shadow-lg py-3'
          : 'bg-gradient-to-b from-amber-50/95 to-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3 group cursor-pointer">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-600 to-amber-800 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <img className="rounded-3xl" src={Logo} />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-amber-900 tracking-tight">
                TunTun Bakers
              </h1>
              <p className="text-xs text-amber-700 -mt-1">Fresh Every Day</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="px-4 py-2 text-amber-900 font-medium rounded-lg hover:bg-amber-100 transition-all duration-300 relative group"
              >
                {item.name}
                <span className="absolute bottom-1 left-1/2 w-0 h-0.5 bg-amber-600 group-hover:w-1/2 group-hover:left-1/4 transition-all duration-300"></span>
              </a>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Link to="/login" className="flex items-center space-x-2 bg-white text-amber-900 px-5 py-2.5 rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300 border-2 border-amber-300">
              <User className="w-5 h-5" />
              <span className="font-medium">Login</span>
            </Link>
            <button className="p-2 text-amber-900 hover:bg-amber-100 rounded-lg transition-all duration-300 relative group">
              <Phone className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full"></span>
            </button>
            <Link 
              to="/cart"
              className="flex items-center space-x-2 bg-gradient-to-r from-amber-600 to-amber-700 text-white px-5 py-2.5 rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="font-medium">Cart</span>
              <span className="bg-white text-amber-700 text-xs font-bold px-2 py-0.5 rounded-full">
                {cartCount}
              </span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-amber-900 hover:bg-amber-100 rounded-lg transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isMobileMenuOpen ? 'max-h-110 opacity-100 mt-4 bg-white rounded-2xl p-3' : 'max-h-0 opacity-0'
          }`}
        >
          <nav className="flex flex-col space-y-2 pb-4">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="px-4 py-3 text-amber-900 font-medium rounded-lg hover:bg-amber-100 transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <Link 
              to="/cart"
              className="flex items-center justify-center space-x-2 bg-gradient-to-r from-amber-600 to-amber-700 text-white px-5 py-3 rounded-lg"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="font-medium">Cart ({cartCount})</span>
            </Link>
            <Link to="/login" className="flex items-center justify-center space-x-2 bg-white text-amber-900 px-5 py-3 rounded-lg border-2 border-amber-300">
              <User className="w-5 h-5" />
              <span className="font-medium">Login</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;