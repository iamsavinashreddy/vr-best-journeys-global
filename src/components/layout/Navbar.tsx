
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Phone, ChevronDown, ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const isMobile = useIsMobile();
  const navigate = useNavigate();

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

  const handleNavigation = (path: string, hasDropdown: boolean) => {
    if (!hasDropdown) {
      navigate(path);
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { name: 'Destinations', path: '/packages', hasDropdown: true },
    { name: 'Holiday Packages', path: '/packages', hasDropdown: true },
    { name: 'Contact', path: '/contact', hasDropdown: false },
  ];

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/90 backdrop-blur-sm shadow-md py-2' 
            : 'bg-white/30 backdrop-blur-sm py-4'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img 
                src="https://raw.githubusercontent.com/iamsavinashreddy/vrbest-group/main/Img/vr-best-travel-logo-1.png" 
                alt="VR Best Group" 
                className={`w-auto ${isMobile ? 'h-14' : 'h-16'} transition-all duration-300`}
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                <div key={link.name} className="relative group">
                  <Link
                    to={link.path}
                    className={`flex items-center font-bold text-gray-800 hover:text-[#D2042D] ${isScrolled ? 'text-gray-800' : 'text-gray-800'}`}
                    onClick={(e) => {
                      if (link.hasDropdown) {
                        e.preventDefault();
                      }
                    }}
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
                            <Link to="/packages?destination=usa" className="block px-4 py-2 text-sm hover:bg-gray-50 hover:text-[#D2042D] rounded-md">USA</Link>
                            <Link to="/packages?destination=japan" className="block px-4 py-2 text-sm hover:bg-gray-50 hover:text-[#D2042D] rounded-md">Japan</Link>
                            <Link to="/packages?destination=china" className="block px-4 py-2 text-sm hover:bg-gray-50 hover:text-[#D2042D] rounded-md">China</Link>
                            <Link to="/packages?destination=sri-lanka" className="block px-4 py-2 text-sm hover:bg-gray-50 hover:text-[#D2042D] rounded-md">Sri Lanka</Link>
                          </>
                        ) : (
                          <>
                            <Link to="/packages?type=group" className="block px-4 py-2 text-sm hover:bg-gray-50 hover:text-[#D2042D] rounded-md">Group Tours</Link>
                            <Link to="/packages?type=customized" className="block px-4 py-2 text-sm hover:bg-gray-50 hover:text-[#D2042D] rounded-md">Customized Tours</Link>
                            <Link to="/packages?type=luxury" className="block px-4 py-2 text-sm hover:bg-gray-50 hover:text-[#D2042D] rounded-md">Luxury Tours</Link>
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Call Action Button */}
            <div className="hidden lg:flex items-center space-x-4">
              <Button 
                size="sm" 
                variant="outline"
                className={`border-[#D2042D] ${isScrolled ? 'text-[#D2042D]' : 'text-[#D2042D]'} hover:bg-[#D2042D]/10`}
              >
                <Phone className="h-4 w-4 mr-1" />
                +91 1234567890
              </Button>
              <Button
                size="sm"
                className="bg-[#D2042D] text-white hover:bg-[#AA0024]"
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
                className={isScrolled ? "text-gray-800" : "text-gray-800"}
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6 text-[#D2042D]" />
                ) : (
                  <Menu className="h-6 w-6" />
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
                      className={`px-4 py-2 hover:bg-white/10 hover:text-[#D2042D] rounded-md font-bold ${isScrolled ? 'text-gray-800' : 'text-gray-800'}`}
                      onClick={() => {
                        if (!link.hasDropdown) {
                          setIsMobileMenuOpen(false);
                        }
                      }}
                    >
                      {link.name}
                    </Link>
                    {link.hasDropdown && link.name === 'Destinations' && (
                      <div className="pl-6 flex flex-col space-y-1">
                        <Link to="/packages?destination=usa" className="px-4 py-1.5 text-sm text-gray-600 hover:text-[#D2042D]" onClick={() => setIsMobileMenuOpen(false)}>USA</Link>
                        <Link to="/packages?destination=japan" className="px-4 py-1.5 text-sm text-gray-600 hover:text-[#D2042D]" onClick={() => setIsMobileMenuOpen(false)}>Japan</Link>
                        <Link to="/packages?destination=china" className="px-4 py-1.5 text-sm text-gray-600 hover:text-[#D2042D]" onClick={() => setIsMobileMenuOpen(false)}>China</Link>
                        <Link to="/packages?destination=sri-lanka" className="px-4 py-1.5 text-sm text-gray-600 hover:text-[#D2042D]" onClick={() => setIsMobileMenuOpen(false)}>Sri Lanka</Link>
                      </div>
                    )}
                    {link.hasDropdown && link.name === 'Holiday Packages' && (
                      <div className="pl-6 flex flex-col space-y-1">
                        <Link to="/packages?type=group" className="px-4 py-1.5 text-sm text-gray-600 hover:text-[#D2042D]" onClick={() => setIsMobileMenuOpen(false)}>Group Tours</Link>
                        <Link to="/packages?type=customized" className="px-4 py-1.5 text-sm text-gray-600 hover:text-[#D2042D]" onClick={() => setIsMobileMenuOpen(false)}>Customized Tours</Link>
                        <Link to="/packages?type=luxury" className="px-4 py-1.5 text-sm text-gray-600 hover:text-[#D2042D]" onClick={() => setIsMobileMenuOpen(false)}>Luxury Tours</Link>
                      </div>
                    )}
                  </React.Fragment>
                ))}
                <div className="pt-2">
                  <Button 
                    size="sm"
                    className="w-full bg-[#D2042D] text-white hover:bg-[#AA0024]"
                    asChild
                  >
                    <Link to="/contact">Book Now</Link>
                  </Button>
                  <div className="flex items-center justify-center mt-3 text-sm text-[#D2042D]">
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
          className="fixed bottom-8 right-8 bg-[#D2042D] text-white p-3 rounded-full shadow-lg hover:bg-[#AA0024] z-50 transition-all duration-300 animate-fade-in"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </>
  );
};

export default Navbar;
