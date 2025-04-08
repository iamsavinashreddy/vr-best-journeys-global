
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { PackageCard, PackageProps } from '@/components/packages/PackageCard';
import { MapPin, Calendar, Filter } from 'lucide-react';
import allPackages from '@/data/packages';

const Packages = () => {
  const [searchParams] = useSearchParams();
  const destinationParam = searchParams.get('destination');
  const monthParam = searchParams.get('month');
  
  const [packages, setPackages] = useState<PackageProps[]>(() => {
    if (destinationParam) {
      return allPackages.filter(pkg => 
        pkg.destination.toLowerCase() === destinationParam.toLowerCase()
      );
    }
    return allPackages;
  });
  
  const [filters, setFilters] = useState({
    destination: destinationParam || '',
    month: monthParam || '',
    minPrice: '',
    maxPrice: '',
    duration: ''
  });

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    let filtered = [...allPackages];
    
    if (filters.destination) {
      filtered = filtered.filter(pkg => pkg.destination.toLowerCase() === filters.destination.toLowerCase());
    }
    
    if (filters.minPrice) {
      filtered = filtered.filter(pkg => pkg.price >= parseInt(filters.minPrice));
    }
    
    if (filters.maxPrice) {
      filtered = filtered.filter(pkg => pkg.price <= parseInt(filters.maxPrice));
    }
    
    if (filters.duration) {
      filtered = filtered.filter(pkg => pkg.duration.includes(filters.duration));
    }
    
    setPackages(filtered);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-gray-100 py-10">
          <div className="container mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Holiday Packages</h1>
            <p className="text-lg text-gray-600 mb-6">
              Discover amazing holiday packages from India to destinations around the world
            </p>
            
            {/* Filters Section */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-lg">Filter Packages</h2>
                <Button variant="ghost" size="sm" onClick={() => setPackages(allPackages)}>
                  Clear All
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Destination</label>
                  <Select 
                    value={filters.destination}
                    onValueChange={(value) => handleFilterChange('destination', value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select destination" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Destinations</SelectItem>
                      <SelectItem value="USA">USA</SelectItem>
                      <SelectItem value="Japan">Japan</SelectItem>
                      <SelectItem value="China">China</SelectItem>
                      <SelectItem value="Sri Lanka">Sri Lanka</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Price Range</label>
                  <div className="flex space-x-2">
                    <Input
                      type="number"
                      placeholder="Min ₹"
                      value={filters.minPrice}
                      onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                      className="w-1/2"
                    />
                    <Input
                      type="number"
                      placeholder="Max ₹"
                      value={filters.maxPrice}
                      onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                      className="w-1/2"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Duration</label>
                  <Select 
                    value={filters.duration}
                    onValueChange={(value) => handleFilterChange('duration', value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any Duration</SelectItem>
                      <SelectItem value="7 Days">7 Days</SelectItem>
                      <SelectItem value="8 Days">8 Days</SelectItem>
                      <SelectItem value="9 Days">9 Days</SelectItem>
                      <SelectItem value="10 Days">10 Days</SelectItem>
                      <SelectItem value="11 Days">11+ Days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-end">
                  <Button className="w-full bg-vrred-500 hover:bg-vrred-600" onClick={applyFilters}>
                    <Filter className="h-4 w-4 mr-2" />
                    Apply Filters
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Results Section */}
            <div className="mb-4">
              <p className="text-gray-600">Showing {packages.length} packages</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {packages.map((pkg) => (
                <PackageCard key={pkg.id} {...pkg} />
              ))}
            </div>
            
            {packages.length === 0 && (
              <div className="text-center py-16">
                <p className="text-gray-600 text-lg">No packages found matching your criteria.</p>
                <Button 
                  className="mt-4 bg-vrred-500 hover:bg-vrred-600"
                  onClick={() => setPackages(allPackages)}
                >
                  View All Packages
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Packages;
