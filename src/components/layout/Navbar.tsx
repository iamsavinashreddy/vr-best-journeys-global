
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Phone, ChevronDown, Search, ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
      
      // Show scroll to top button when scrolled down 300px
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Destinations', path: '/destinations', hasDropdown: true },
    { name: 'Holiday Packages', path: '/packages', hasDropdown: true },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img 
                src="https://raw.githubusercontent.com/iamsavinashreddy/vrbest-group/main/Img/vr-best-group-logo1.png" 
                alt="VR Best Travels" 
                className="h-12 w-auto"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                <div key={link.name} className="relative group">
                  <Link
                    to={link.path}
                    className="flex items-center text-black hover:text-vrred-500 font-medium"
                  >
                    {link.name}
                    {link.hasDropdown && (
                      <ChevronDown className="ml-1 h-4 w-4" />
                    )}
                  </Link>
                  {link.hasDropdown && (
                    <div className="absolute left-0 mt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
                      <div className="bg-white rounded-md shadow-lg p-2 border border-gray-100">
                        {link.name === 'Destinations' ? (
                          <>
                            <Link to="/destinations/usa" className="block px-4 py-2 text-sm hover:bg-gray-50 hover:text-vrred-500 rounded-md">USA</Link>
                            <Link to="/destinations/japan" className="block px-4 py-2 text-sm hover:bg-gray-50 hover:text-vrred-500 rounded-md">Japan</Link>
                            <Link to="/destinations/china" className="block px-4 py-2 text-sm hover:bg-gray-50 hover:text-vrred-500 rounded-md">China</Link>
                            <Link to="/destinations/sri-lanka" className="block px-4 py-2 text-sm hover:bg-gray-50 hover:text-vrred-500 rounded-md">Sri Lanka</Link>
                          </>
                        ) : (
                          <>
                            <Link to="/packages/group" className="block px-4 py-2 text-sm hover:bg-gray-50 hover:text-vrred-500 rounded-md">Group Tours</Link>
                            <Link to="/packages/customized" className="block px-4 py-2 text-sm hover:bg-gray-50 hover:text-vrred-500 rounded-md">Customized Tours</Link>
                            <Link to="/packages/luxury" className="block px-4 py-2 text-sm hover:bg-gray-50 hover:text-vrred-500 rounded-md">Luxury Tours</Link>
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Call and Search Action Buttons */}
            <div className="hidden lg:flex items-center space-x-4">
              <Button 
                size="sm"
                variant="ghost"
                className="text-black hover:text-vrred-500 hover:bg-transparent"
              >
                <Search className="h-5 w-5 mr-1" />
                Search
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                className="border-vrred-500 text-vrred-500 hover:bg-vrred-50"
              >
                <Phone className="h-4 w-4 mr-1" />
                +91 1234567890
              </Button>
              <Button
                size="sm"
                className="bg-vrred-500 text-white hover:bg-vrred-600"
                asChild
              >
                <Link to="/contact">Book Now</Link>
              </Button>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="lg:hidden">
              <Button 
                variant="ghost" 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle Menu"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6 text-vrred-500" />
                ) : (
                  <Menu className="h-6 w-6 text-vrred-500" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden mt-4 pb-4 animate-fade-in">
              <div className="flex flex-col space-y-2">
                {navLinks.map((link) => (
                  <React.Fragment key={link.name}>
                    <Link
                      to={link.path}
                      className="px-4 py-2 text-black hover:bg-gray-50 hover:text-vrred-500 rounded-md font-medium"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                    {link.hasDropdown && link.name === 'Destinations' && (
                      <div className="pl-6 flex flex-col space-y-1">
                        <Link to="/destinations/usa" className="px-4 py-1.5 text-sm text-gray-600 hover:text-vrred-500" onClick={() => setIsMobileMenuOpen(false)}>USA</Link>
                        <Link to="/destinations/japan" className="px-4 py-1.5 text-sm text-gray-600 hover:text-vrred-500" onClick={() => setIsMobileMenuOpen(false)}>Japan</Link>
                        <Link to="/destinations/china" className="px-4 py-1.5 text-sm text-gray-600 hover:text-vrred-500" onClick={() => setIsMobileMenuOpen(false)}>China</Link>
                        <Link to="/destinations/sri-lanka" className="px-4 py-1.5 text-sm text-gray-600 hover:text-vrred-500" onClick={() => setIsMobileMenuOpen(false)}>Sri Lanka</Link>
                      </div>
                    )}
                    {link.hasDropdown && link.name === 'Holiday Packages' && (
                      <div className="pl-6 flex flex-col space-y-1">
                        <Link to="/packages/group" className="px-4 py-1.5 text-sm text-gray-600 hover:text-vrred-500" onClick={() => setIsMobileMenuOpen(false)}>Group Tours</Link>
                        <Link to="/packages/customized" className="px-4 py-1.5 text-sm text-gray-600 hover:text-vrred-500" onClick={() => setIsMobileMenuOpen(false)}>Customized Tours</Link>
                        <Link to="/packages/luxury" className="px-4 py-1.5 text-sm text-gray-600 hover:text-vrred-500" onClick={() => setIsMobileMenuOpen(false)}>Luxury Tours</Link>
                      </div>
                    )}
                  </React.Fragment>
                ))}
                <div className="pt-2">
                  <Button 
                    size="sm"
                    className="w-full bg-vrred-500 text-white hover:bg-vrred-600"
                    asChild
                  >
                    <Link to="/contact">Book Now</Link>
                  </Button>
                  <div className="flex items-center justify-center mt-3 text-sm text-vrred-500">
                    <Phone className="h-4 w-4 mr-1" />
                    +91 1234567890
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>
      
      {/* Scroll to top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-vrred-500 text-white p-3 rounded-full shadow-lg hover:bg-vrred-600 z-50 transition-all duration-300 animate-fade-in"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </>
  );
};

export default Navbar;
