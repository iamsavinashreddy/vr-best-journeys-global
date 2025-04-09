
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Calendar, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const Hero = () => {
  const navigate = useNavigate();
  const [destination, setDestination] = useState('');
  const [travelers, setTravelers] = useState('');
  const [date, setDate] = useState<Date>();
  
  // Slideshow functionality
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?q=80&w=1974&auto=format&fit=crop",
      title: "Discover Your Dream Holiday Destinations",
    },
    {
      image: "https://images.unsplash.com/photo-1492571350019-22de08371fd3?q=80&w=2070&auto=format&fit=crop",
      title: "Explore Beautiful Landscapes",
    },
    {
      image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070&auto=format&fit=crop",
      title: "Experience Cultural Wonders",
    },
    {
      image: "https://images.unsplash.com/photo-1530789253388-582c481c54b0?q=80&w=2070&auto=format&fit=crop",
      title: "Unforgettable Adventures Await",
    }
  ];

  // Auto-rotate slides every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };
  
  const handleSearch = () => {
    if (!destination) {
      toast.error("Please select a destination");
      return;
    }
    
    const searchParams = new URLSearchParams();
    if (destination) searchParams.set('destination', destination);
    if (date) searchParams.set('month', format(date, 'MMMM'));
    
    navigate(`/packages?${searchParams.toString()}`);
  };

  return (
    <div className="relative h-screen min-h-[600px] max-h-[800px]">
      {/* Slideshow Background */}
      <div className="absolute inset-0 bg-black overflow-hidden">
        {slides.map((slide, index) => (
          <div 
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
              currentSlide === index ? 'opacity-70' : 'opacity-0'
            }`}
            style={{ 
              backgroundImage: `url("${slide.image}")`,
            }}
          />
        ))}
        
        {/* Slide Navigation Arrows */}
        <button 
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/30 rounded-full p-2 text-white hover:bg-black/50 transition-colors z-10"
          onClick={goToPrevSlide}
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button 
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/30 rounded-full p-2 text-white hover:bg-black/50 transition-colors z-10"
          onClick={goToNextSlide}
        >
          <ChevronRight className="h-6 w-6" />
        </button>
        
        {/* Slide Indicators */}
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`h-2 w-8 rounded-full transition-colors ${
                currentSlide === index ? 'bg-white' : 'bg-white/30'
              }`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>
      
      {/* Hero Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <div className="max-w-5xl mx-auto animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 text-shadow transition-opacity duration-500">
            {slides[currentSlide].title.split(' ').map((word, i) => 
              i % 3 === 1 ? <span key={i} className="text-vrred-500"> {word}</span> : ` ${word}`
            )}
          </h1>
          <p className="text-xl md:text-2xl text-white mb-8 text-shadow max-w-3xl mx-auto">
            Explore the best travel packages from India to USA, Japan, China, and Sri Lanka
          </p>
          
          {/* Search Bar */}
          <div className="bg-white p-4 rounded-lg shadow-lg max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              <div className="flex-1">
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
                  <select 
                    className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-vrred-500 text-gray-800"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                  >
                    <option value="">Select Destination</option>
                    <option value="USA">USA</option>
                    <option value="Japan">Japan</option>
                    <option value="China">China</option>
                    <option value="Sri Lanka">Sri Lanka</option>
                  </select>
                </div>
              </div>
              
              <div className="flex-1">
                <Popover>
                  <PopoverTrigger asChild>
                    <div className="relative cursor-pointer">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
                      <div 
                        className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-vrred-500 text-gray-800 flex items-center"
                      >
                        {date ? format(date, 'MMMM yyyy') : <span className="text-gray-500">When (Month)</span>}
                      </div>
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="flex-1">
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
                  <select 
                    className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-vrred-500 text-gray-800"
                    value={travelers}
                    onChange={(e) => setTravelers(e.target.value)}
                  >
                    <option value="">Travelers</option>
                    <option value="1">1 Person</option>
                    <option value="2">2 People</option>
                    <option value="3">3 People</option>
                    <option value="4">4 People</option>
                    <option value="5+">5+ People</option>
                  </select>
                </div>
              </div>
              
              <Button 
                className="bg-vrred-500 hover:bg-vrred-600 text-white px-6 py-3 rounded-md"
                onClick={handleSearch}
              >
                <Search className="h-5 w-5 mr-2" />
                Search
              </Button>
            </div>
          </div>
          
          <div className="mt-8 flex flex-wrap justify-center gap-3 text-white">
            <span className="bg-black/40 px-4 py-1 rounded-full text-sm border border-white/20 backdrop-blur-sm">USA Tours</span>
            <span className="bg-black/40 px-4 py-1 rounded-full text-sm border border-white/20 backdrop-blur-sm">Japan Tours</span>
            <span className="bg-black/40 px-4 py-1 rounded-full text-sm border border-white/20 backdrop-blur-sm">China Adventures</span>
            <span className="bg-black/40 px-4 py-1 rounded-full text-sm border border-white/20 backdrop-blur-sm">Sri Lanka Holidays</span>
            <span className="bg-black/40 px-4 py-1 rounded-full text-sm border border-white/20 backdrop-blur-sm">Family Packages</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
