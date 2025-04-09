
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Users, Star, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export interface PackageProps {
  id: number;
  title: string;
  image: string;
  price: number;
  duration: string;
  rating: number;
  destination: string;
  featured?: boolean;
  description?: string;
}

interface PackageCardProps extends PackageProps {
  onSelect?: () => void;
}

export const PackageCard: React.FC<PackageCardProps> = ({ 
  id, 
  title, 
  image, 
  price, 
  duration, 
  rating, 
  destination,
  featured,
  onSelect
}) => {
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toast.success('Added to favorites');
  };

  const handleViewDetails = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onSelect) {
      onSelect();
    }
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 card-hover">
      <div className="relative">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-60 object-cover"
        />
        {featured && (
          <div className="absolute top-4 left-0 bg-[#D2042D] text-white py-1 px-4 rounded-r-full text-sm font-medium">
            Featured
          </div>
        )}
        <button 
          className="absolute top-4 right-4 bg-white/80 hover:bg-white p-1.5 rounded-full"
          onClick={handleFavoriteClick}
        >
          <Heart className="h-5 w-5 text-[#D2042D]" />
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
        
        <h3 className="text-lg font-semibold mb-3 line-clamp-2 hover:text-[#D2042D] transition-colors">{title}</h3>
        
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
            <span className="text-[#D2042D] font-semibold text-lg">₹{price.toLocaleString()}</span>
            <span className="text-sm text-gray-500 ml-1">per person</span>
          </div>
          <Button
            size="sm"
            className="bg-[#D2042D] hover:bg-[#AA0024] text-white"
            onClick={handleViewDetails}
          >
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
};
