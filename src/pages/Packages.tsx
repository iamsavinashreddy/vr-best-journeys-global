import React, { useState, useEffect } from 'react';
import { useSearchParams, Link, useLocation } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { PackageCard, PackageProps } from '@/components/packages/PackageCard';
import { MapPin, Calendar, Filter, Star, Clock, Users } from 'lucide-react';
import allPackages from '@/data/packages';

const Packages = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const destinationParam = searchParams.get('destination');
  const typeParam = searchParams.get('type');
  const monthParam = searchParams.get('month');
  
  const [packages, setPackages] = useState<PackageProps[]>([]);
  
  const [filters, setFilters] = useState({
    destination: destinationParam || '',
    type: typeParam || '',
    month: monthParam || '',
    minPrice: '',
    maxPrice: '',
    duration: ''
  });
  
  const [selectedPackage, setSelectedPackage] = useState<PackageProps | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Effect to handle URL parameters and filter packages
  useEffect(() => {
    let filtered = [...allPackages];
    
    // Apply destination filter from URL params
    if (destinationParam) {
      filtered = filtered.filter(pkg => 
        pkg.destination.toLowerCase() === destinationParam.toLowerCase()
      );
      setFilters(prev => ({ ...prev, destination: destinationParam }));
    }
    
    // Apply type filter from URL params
    if (typeParam) {
      // This would filter by package type if we had that property
      setFilters(prev => ({ ...prev, type: typeParam }));
    }
    
    setPackages(filtered);
  }, [destinationParam, typeParam, monthParam, location.search]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    let filtered = [...allPackages];
    
    if (filters.destination && filters.destination !== 'all') {
      filtered = filtered.filter(pkg => pkg.destination.toLowerCase() === filters.destination.toLowerCase());
    }
    
    if (filters.minPrice) {
      filtered = filtered.filter(pkg => pkg.price >= parseInt(filters.minPrice));
    }
    
    if (filters.maxPrice) {
      filtered = filtered.filter(pkg => pkg.price <= parseInt(filters.maxPrice));
    }
    
    if (filters.duration && filters.duration !== 'any') {
      filtered = filtered.filter(pkg => pkg.duration.includes(filters.duration));
    }
    
    setPackages(filtered);
  };

  // Function to handle package selection
  const handlePackageSelect = (packageId: number) => {
    console.log("Package selected in Packages page:", packageId);
    const pkg = allPackages.find(p => p.id === packageId);
    if (pkg) {
      setSelectedPackage(pkg);
      setIsDialogOpen(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24">
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
                  <Button className="w-full bg-[#D2042D] hover:bg-[#AA0024]" onClick={applyFilters}>
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
                <div key={pkg.id}>
                  <PackageCard {...pkg} onSelect={handlePackageSelect} />
                </div>
              ))}
            </div>
            
            {packages.length === 0 && (
              <div className="text-center py-16">
                <p className="text-gray-600 text-lg">No packages found matching your criteria.</p>
                <Button 
                  className="mt-4 bg-[#D2042D] hover:bg-[#AA0024]"
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
      
      {/* Package Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          {selectedPackage && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">{selectedPackage.title}</DialogTitle>
                <DialogDescription className="flex items-center text-base text-[#D2042D]">
                  <MapPin className="h-4 w-4 mr-1" /> {selectedPackage.destination}
                </DialogDescription>
              </DialogHeader>
              
              <div className="mt-4">
                <img 
                  src={selectedPackage.image} 
                  alt={selectedPackage.title} 
                  className="w-full h-[300px] object-cover rounded-lg"
                />
                
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-lg mb-3">Package Highlights</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <Clock className="h-4 w-4 text-[#D2042D] mr-2" />
                        <span>{selectedPackage.duration}</span>
                      </li>
                      <li className="flex items-center">
                        <Users className="h-4 w-4 text-[#D2042D] mr-2" />
                        <span>Group Size: 10-15 people</span>
                      </li>
                      <li className="flex items-center">
                        <Star className="h-4 w-4 text-[#D2042D] mr-2" />
                        <span>{selectedPackage.rating}/5 Rating</span>
                      </li>
                      <li className="flex items-center">
                        <Calendar className="h-4 w-4 text-[#D2042D] mr-2" />
                        <span>Available year-round</span>
                      </li>
                    </ul>
                    
                    <div className="mt-6">
                      <h3 className="font-semibold text-lg mb-3">Included</h3>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        <li>Return flights from Delhi</li>
                        <li>Accommodation in 4-star hotels</li>
                        <li>Daily breakfast and dinner</li>
                        <li>All sightseeing and transfers</li>
                        <li>English speaking tour guide</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between items-center mb-4">
                        <div>
                          <p className="text-sm text-gray-600">Price starts from</p>
                          <p className="text-2xl font-bold text-[#D2042D]">₹{selectedPackage.price.toLocaleString()}</p>
                          <p className="text-xs text-gray-500">per person on twin sharing</p>
                        </div>
                        <div className="flex flex-col space-y-2">
                          <Button className="bg-[#D2042D] hover:bg-[#AA0024]" asChild>
                            <Link to={`/contact?package=${encodeURIComponent(selectedPackage.title)}`}>Book Now</Link>
                          </Button>
                        </div>
                      </div>
                      
                      <p className="text-sm mb-4">{selectedPackage.description || `Experience the beauty of ${selectedPackage.destination} with our ${selectedPackage.duration} package. Perfect for families and couples.`}</p>
                      
                      <Button variant="outline" className="w-full border-[#D2042D] text-[#D2042D] hover:bg-[#D2042D]/10" asChild>
                        <Link to={`/contact?package=${encodeURIComponent(selectedPackage.title)}`}>Enquire Now</Link>
                      </Button>
                    </div>
                    
                    <div className="mt-6">
                      <h3 className="font-semibold text-lg mb-3">Not Included</h3>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        <li>Visa fees and travel insurance</li>
                        <li>Personal expenses</li>
                        <li>Optional tours and activities</li>
                        <li>Tips and gratuities</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="font-semibold text-lg mb-3">Itinerary Overview</h3>
                  <div className="space-y-4">
                    <div className="border-l-2 border-[#D2042D] pl-4">
                      <p className="font-medium">Day 1: Arrival</p>
                      <p className="text-sm text-gray-600">Arrival at destination, transfer to hotel, welcome dinner.</p>
                    </div>
                    <div className="border-l-2 border-[#D2042D] pl-4">
                      <p className="font-medium">Day 2-5: Exploration</p>
                      <p className="text-sm text-gray-600">Visit major attractions, cultural experiences, and local cuisine.</p>
                    </div>
                    <div className="border-l-2 border-[#D2042D] pl-4">
                      <p className="font-medium">Day 6-7: Leisure</p>
                      <p className="text-sm text-gray-600">Free time for shopping or optional activities, farewell dinner.</p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Packages;
