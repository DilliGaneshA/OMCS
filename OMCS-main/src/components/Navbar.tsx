import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingCart, User, Phone } from 'lucide-react';

interface NavbarProps {
  onOwnerLogin: () => void;
  cartItems: number;
}

const Navbar: React.FC<NavbarProps> = ({ onOwnerLogin, cartItems }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-lg' : 'bg-white/95 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-orange-600">
              Om Sri Mahaganapati
              <span className="block text-sm text-gray-600">Catering Service</span>
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('home')}
              className="text-gray-700 hover:text-orange-600 transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('menu')}
              className="text-gray-700 hover:text-orange-600 transition-colors"
            >
              Menu
            </button>
            <button
              onClick={() => scrollToSection('specials')}
              className="text-gray-700 hover:text-orange-600 transition-colors"
            >
              Today's Special
            </button>
            <button
              onClick={() => scrollToSection('bulk-order')}
              className="text-gray-700 hover:text-orange-600 transition-colors"
            >
              Bulk Orders
            </button>
            <button
              onClick={() => scrollToSection('track-order')}
              className="text-gray-700 hover:text-orange-600 transition-colors"
            >
              Track Order
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-gray-700 hover:text-orange-600 transition-colors"
            >
              Contact
            </button>
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <ShoppingCart className="h-6 w-6 text-gray-700 hover:text-orange-600 cursor-pointer transition-colors" />
              {cartItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems}
                </span>
              )}
            </div>
            <button
              onClick={onOwnerLogin}
              className="flex items-center space-x-2 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
            >
              <User className="h-4 w-4" />
              <span>Owner Login</span>
            </button>
            <a href="tel:+9003801855" className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
              <Phone className="h-4 w-4" />
              <span>Call Now</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-orange-600 transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button
                onClick={() => scrollToSection('home')}
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-orange-600 transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('menu')}
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-orange-600 transition-colors"
              >
                Menu
              </button>
              <button
                onClick={() => scrollToSection('specials')}
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-orange-600 transition-colors"
              >
                Today's Special
              </button>
              <button
                onClick={() => scrollToSection('bulk-order')}
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-orange-600 transition-colors"
              >
                Bulk Orders
              </button>
              <button
                onClick={() => scrollToSection('track-order')}
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-orange-600 transition-colors"
              >
                Track Order
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-orange-600 transition-colors"
              >
                Contact
              </button>
              <div className="flex space-x-2 px-3 py-2">
                <button
                  onClick={onOwnerLogin}
                  className="flex-1 bg-orange-600 text-white px-3 py-2 rounded-lg hover:bg-orange-700 transition-colors text-center"
                >
                  Owner Login
                </button>
                <a href="tel:+9003801855" className="flex-1 bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors text-center">
                  Call Now
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;