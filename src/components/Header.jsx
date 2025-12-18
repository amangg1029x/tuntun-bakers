import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ShoppingCart, Phone, User } from 'lucide-react';
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
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
    { name: 'Products', href: '/products' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Orders', href: '/orders' }
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
          <Link to="/" className="flex items-center space-x-3 group cursor-pointer">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-600 to-amber-800 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <img className="rounded-full" src={Logo} alt="TunTun Bakers" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-amber-900 tracking-tight">
                TunTun Bakers
              </h1>
              <p className="text-xs text-amber-700 -mt-1">Fresh Every Day</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <Link
                key={index}
                to={item.href}
                className="px-4 py-2 text-amber-900 font-medium rounded-lg hover:bg-amber-100 transition-all duration-300 relative group"
              >
                {item.name}
                <span className="absolute bottom-1 left-1/2 w-0 h-0.5 bg-amber-600 group-hover:w-1/2 group-hover:left-1/4 transition-all duration-300"></span>
              </Link>
            ))}
          </nav>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Signed In - Show User Button and Cart */}
            <SignedIn>
              <Link 
                to="/profile"
                className="flex items-center space-x-2 bg-white text-amber-900 px-5 py-2.5 rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300 border-2 border-amber-300"
              >
                <User className="w-5 h-5" />
                <span className="font-medium">Profile</span>
              </Link>
              
              {/* Clerk User Button with custom appearance */}
              <UserButton 
                appearance={{
                  elements: {
                    avatarBox: 'w-10 h-10',
                    userButtonPopoverCard: 'shadow-2xl',
                    userButtonPopoverActionButton: 'hover:bg-amber-50'
                  }
                }}
                afterSignOutUrl="/"
              />
            </SignedIn>

            {/* Signed Out - Show Sign In Button */}
            <SignedOut>
              <Link 
                to="/sign-in"
                className="flex items-center space-x-2 bg-white text-amber-900 px-5 py-2.5 rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300 border-2 border-amber-300"
              >
                <User className="w-5 h-5" />
                <span className="font-medium">Sign In</span>
              </Link>
            </SignedOut>

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

          {/* Mobile Actions (Profile Icon + Menu Button) */}
          <div className="flex items-center gap-2 md:hidden">
            {/* Mobile Cart Button - Always visible */}
            <Link 
              to="/cart"
              className="relative p-2 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-lg hover:scale-105 active:scale-95 transition-all duration-200 touch-manipulation"
              aria-label="Cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            <SignedIn>
              {/* Mobile Profile Button */}
              <Link 
                to="/profile"
                className="p-2 bg-amber-100 text-amber-900 rounded-lg hover:scale-105 active:scale-95 transition-all duration-200 touch-manipulation"
                aria-label="Profile"
              >
                <User className="w-5 h-5" />
              </Link>
              
              {/* Clerk User Button */}
              <div className="p-1">
                <UserButton 
                  appearance={{
                    elements: {
                      avatarBox: 'w-9 h-9',
                      userButtonPopoverCard: 'shadow-2xl',
                      userButtonPopoverActionButton: 'hover:bg-amber-50'
                    }
                  }}
                  afterSignOutUrl="/"
                />
              </div>
            </SignedIn>

            <SignedOut>
              <Link 
                to="/sign-in"
                className="p-2 bg-amber-100 text-amber-900 rounded-lg hover:scale-105 active:scale-95 transition-all duration-200 touch-manipulation"
                aria-label="Sign In"
              >
                <User className="w-5 h-5" />
              </Link>
            </SignedOut>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-amber-900 hover:bg-amber-100 rounded-lg transition-colors touch-manipulation"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            isMobileMenuOpen ? 'max-h-screen opacity-100 mt-4 bg-white rounded-2xl p-3' : 'max-h-0 opacity-0'
          }`}
        >
          <nav className="flex flex-col space-y-2 pb-4">
            {navItems.map((item, index) => (
              <Link
                key={index}
                to={item.href}
                className="px-4 py-3 text-amber-900 font-medium rounded-lg hover:bg-amber-100 active:bg-amber-200 transition-all duration-300 touch-manipulation"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;