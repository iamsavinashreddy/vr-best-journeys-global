
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { PackageCard } from '@/components/packages/PackageCard';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { MapPin, Calendar, Star, Clock, Users } from 'lucide-react';
import allPackages from '@/data/packages';

const FeaturedPackages = () => {
  // We'll use the same packages data but only show 6 packages on the homepage
  const featuredPackages = allPackages.slice(0, 6);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Function to handle package selection by ID
  const handlePackageSelect = (packageId) => {
    console.log("Package selected in FeaturedPackages:", packageId);
    const pkg = allPackages.find(p => p.id === packageId);
    if (pkg) {
      setSelectedPackage(pkg);
      setIsDialogOpen(true);
    }
  };

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
          {featuredPackages.map((pkg) => (
            <div key={pkg.id}>
              <PackageCard 
                {...pkg} 
                featured={true} 
                onSelect={handlePackageSelect}
              />
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button 
            className="bg-[#D2042D] hover:bg-[#AA0024] text-white px-8 py-3 rounded-md"
            asChild
          >
            <Link to="/packages">View All Packages</Link>
          </Button>
        </div>
      </div>

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
    </section>
  );
};

export default FeaturedPackages;
