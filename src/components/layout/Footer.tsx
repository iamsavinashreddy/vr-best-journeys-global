
import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">
              <span className="text-vrred-500">VR Best</span> Travels
            </h3>
            <p className="text-gray-400 mb-6">
              Providing unforgettable travel experiences from India to USA, Japan, China, and Sri Lanka. Your dreams, our expertise.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="bg-gray-800 hover:bg-vrred-500 p-2 rounded-full transition-colors duration-200">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="bg-gray-800 hover:bg-vrred-500 p-2 rounded-full transition-colors duration-200">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="bg-gray-800 hover:bg-vrred-500 p-2 rounded-full transition-colors duration-200">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="bg-gray-800 hover:bg-vrred-500 p-2 rounded-full transition-colors duration-200">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/destinations" className="text-gray-400 hover:text-vrred-500 transition-colors">Destinations</Link>
              </li>
              <li>
                <Link to="/packages" className="text-gray-400 hover:text-vrred-500 transition-colors">Holiday Packages</Link>
              </li>
              <li>
                <Link to="/testimonials" className="text-gray-400 hover:text-vrred-500 transition-colors">Testimonials</Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-vrred-500 transition-colors">Travel Blog</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-vrred-500 transition-colors">Contact Us</Link>
              </li>
            </ul>
          </div>
          
          {/* Support */}
          <div>
            <h4 className="font-bold text-lg mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-vrred-500 transition-colors">FAQ</Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-gray-400 hover:text-vrred-500 transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms-conditions" className="text-gray-400 hover:text-vrred-500 transition-colors">Terms & Conditions</Link>
              </li>
              <li>
                <Link to="/booking-process" className="text-gray-400 hover:text-vrred-500 transition-colors">Booking Process</Link>
              </li>
              <li>
                <Link to="/payment-options" className="text-gray-400 hover:text-vrred-500 transition-colors">Payment Options</Link>
              </li>
              <li>
                <Link to="/cancellation-policy" className="text-gray-400 hover:text-vrred-500 transition-colors">Cancellation Policy</Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-vrred-500 mt-1 mr-3 flex-shrink-0" />
                <span className="text-gray-400">
                  123 Travel Plaza, MG Road<br />
                  Mumbai, 400001, India
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-vrred-500 mr-3 flex-shrink-0" />
                <span className="text-gray-400">+91 1234567890</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-vrred-500 mr-3 flex-shrink-0" />
                <a href="mailto:info@vrbesttravels.com" className="text-gray-400 hover:text-vrred-500 transition-colors">
                  info@vrbesttravels.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <hr className="border-gray-800 my-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {currentYear} VR Best Travels. All rights reserved. Managed by <a href="https://vrbest.group" target="_blank" rel="noopener noreferrer" className="text-vrred-500 hover:text-vrred-400">VR Best IT Solutions</a>
          </p>
          <div className="flex space-x-4">
            <Link to="/sitemap" className="text-gray-500 hover:text-vrred-500 text-sm">Sitemap</Link>
            <span className="text-gray-700">|</span>
            <Link to="/accessibility" className="text-gray-500 hover:text-vrred-500 text-sm">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
