
import React from 'react';
import { Calendar, Clock, Users, Star, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PackageProps {
  id: number;
  title: string;
  image: string;
  price: number;
  duration: string;
  rating: number;
  destination: string;
  featured?: boolean;
}

const PackageCard: React.FC<PackageProps> = ({ 
  id, 
  title, 
  image, 
  price, 
  duration, 
  rating, 
  destination,
  featured 
}) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 card-hover">
      <div className="relative">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-60 object-cover"
        />
        {featured && (
          <div className="absolute top-4 left-0 bg-vrred-500 text-white py-1 px-4 rounded-r-full text-sm font-medium">
            Featured
          </div>
        )}
        <button className="absolute top-4 right-4 bg-white/80 hover:bg-white p-1.5 rounded-full">
          <Heart className="h-5 w-5 text-vrred-500" />
        </button>
      </div>
      
      <div className="p-5">
        <div className="flex items-center mb-2">
          <div className="text-yellow-500 flex items-center">
            <Star className="h-4 w-4 fill-current" />
            <span className="ml-1 text-sm font-medium">{rating}</span>
          </div>
          <span className="mx-2 text-gray-300">•</span>
          <span className="text-sm text-gray-600">{destination}</span>
        </div>
        
        <h3 className="text-lg font-semibold mb-3 line-clamp-2">{title}</h3>
        
        <div className="flex items-center text-sm text-gray-600 mb-4">
          <div className="flex items-center mr-4">
            <Clock className="h-4 w-4 mr-1 text-gray-500" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1 text-gray-500" />
            <span>2-5 People</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <span className="text-vrred-500 font-semibold text-lg">₹{price.toLocaleString()}</span>
            <span className="text-sm text-gray-500 ml-1">per person</span>
          </div>
          <Button
            size="sm"
            className="bg-vrred-500 hover:bg-vrred-600 text-white"
          >
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
};

const FeaturedPackages = () => {
  const packages: PackageProps[] = [
    {
      id: 1,
      title: "Discover New York & East Coast Wonders",
      image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=2070&auto=format&fit=crop",
      price: 175000,
      duration: "8 Days / 7 Nights",
      rating: 4.8,
      destination: "USA",
      featured: true
    },
    {
      id: 2,
      title: "Enchanting Japan: Tokyo, Kyoto & Mount Fuji",
      image: "https://images.unsplash.com/photo-1528164344705-47542687000d?q=80&w=2069&auto=format&fit=crop",
      price: 165000,
      duration: "9 Days / 8 Nights",
      rating: 4.9,
      destination: "Japan"
    },
    {
      id: 3,
      title: "China Heritage Tour: Beijing, Xi'an & Shanghai",
      image: "https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?q=80&w=2070&auto=format&fit=crop",
      price: 150000,
      duration: "10 Days / 9 Nights",
      rating: 4.7,
      destination: "China"
    },
    {
      id: 4,
      title: "Tropical Sri Lanka: Beaches, Wildlife & Culture",
      image: "https://images.unsplash.com/photo-1586100345683-e423cfd68376?q=80&w=2070&auto=format&fit=crop",
      price: 85000,
      duration: "7 Days / 6 Nights",
      rating: 4.8,
      destination: "Sri Lanka",
      featured: true
    },
    {
      id: 5,
      title: "California Dream: LA, San Francisco & Yosemite",
      image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=2129&auto=format&fit=crop",
      price: 195000,
      duration: "11 Days / 10 Nights",
      rating: 4.9,
      destination: "USA"
    },
    {
      id: 6,
      title: "Scenic Hokkaido & Northern Japan Adventure",
      image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070&auto=format&fit=crop",
      price: 175000,
      duration: "8 Days / 7 Nights",
      rating: 4.7,
      destination: "Japan"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="section-title">Featured Holiday Packages</h2>
          <p className="section-subtitle max-w-3xl mx-auto">
            Explore our handpicked holiday packages from India to USA, Japan, China, and Sri Lanka
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <PackageCard key={pkg.id} {...pkg} />
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button 
            className="bg-vrred-500 hover:bg-vrred-600 text-white px-8 py-3 rounded-md"
          >
            View All Packages
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPackages;
