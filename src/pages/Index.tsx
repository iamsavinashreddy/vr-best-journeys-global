
import React, { useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/home/Hero';
import FeaturedPackages from '@/components/home/FeaturedPackages';
import Destinations from '@/components/home/Destinations';
import Testimonials from '@/components/home/Testimonials';
import Newsletter from '@/components/home/Newsletter';
import Footer from '@/components/layout/Footer';

const Index = () => {
  // Implement scroll animation for elements
  useEffect(() => {
    const animateOnScroll = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      
      elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
          element.classList.add('animated');
        }
      });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    
    // Trigger once on load
    animateOnScroll();
    
    return () => window.removeEventListener('scroll', animateOnScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        
        <div className="animate-on-scroll">
          <FeaturedPackages />
        </div>
        
        <div className="animate-on-scroll">
          <Destinations />
        </div>
        
        <div className="animate-on-scroll">
          <Testimonials />
        </div>
        
        <div className="animate-on-scroll">
          <Newsletter />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
