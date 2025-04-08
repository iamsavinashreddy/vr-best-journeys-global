
import React from 'react';
import { MapPin, ArrowRight } from 'lucide-react';

interface DestinationCardProps {
  name: string;
  image: string;
  packageCount: number;
  featured?: boolean;
}

const DestinationCard: React.FC<DestinationCardProps> = ({ name, image, packageCount, featured }) => {
  return (
    <div className={`relative group overflow-hidden rounded-lg ${
      featured ? 'col-span-2 row-span-2' : 'col-span-1 row-span-1'
    }`}>
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300 z-10"></div>
      
      <img 
        src={image} 
        alt={name} 
        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
      />
      
      <div className="absolute bottom-0 left-0 right-0 p-5 z-20 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl md:text-2xl font-bold mb-2">{name}</h3>
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{packageCount} Packages</span>
            </div>
          </div>
          
          <div className="bg-white/30 p-2 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300">
            <ArrowRight className="h-5 w-5 text-white" />
          </div>
        </div>
      </div>
      
      <a href={`/destinations/${name.toLowerCase()}`} className="absolute inset-0 z-30">
        <span className="sr-only">View {name} packages</span>
      </a>
    </div>
  );
};

const Destinations = () => {
  const destinations: DestinationCardProps[] = [
    {
      name: "USA",
      image: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?q=80&w=2099&auto=format&fit=crop",
      packageCount: 15,
      featured: true
    },
    {
      name: "Japan",
      image: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?q=80&w=2070&auto=format&fit=crop",
      packageCount: 12
    },
    {
      name: "China",
      image: "https://images.unsplash.com/photo-1508804052814-cd3ba865a116?q=80&w=2070&auto=format&fit=crop",
      packageCount: 10
    },
    {
      name: "Sri Lanka",
      image: "https://images.unsplash.com/photo-1578922746465-3a80a228f223?q=80&w=2071&auto=format&fit=crop",
      packageCount: 8
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="section-title">Popular Destinations</h2>
          <p className="section-subtitle max-w-3xl mx-auto">
            Discover the most loved destinations for your next international adventure
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
          {destinations.map((destination, index) => (
            <DestinationCard
              key={destination.name}
              {...destination}
            />
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-lg mb-3">Can't find your dream destination?</p>
          <a 
            href="/destinations" 
            className="inline-flex items-center text-vrred-500 hover:text-vrred-600 font-medium"
          >
            View all destinations
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Destinations;
