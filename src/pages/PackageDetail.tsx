
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Users, Star, Heart, Calendar as CalendarIcon, Phone, Mail, MapPin, Check } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import allPackages from '@/data/packages';
import { PackageProps } from '@/components/packages/PackageCard';

const PackageDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [packageData, setPackageData] = useState<PackageProps | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);

  // Find the package by ID
  useEffect(() => {
    if (id) {
      const pkg = allPackages.find(p => p.id === parseInt(id));
      
      if (pkg) {
        setPackageData(pkg);
      } else {
        navigate('/not-found');
      }
    }
    setIsLoading(false);
  }, [id, navigate]);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    if (!isFavorite) {
      toast.success("Added to your favorites");
    } else {
      toast.info("Removed from your favorites");
    }
  };

  const handleBookNow = () => {
    toast.success("Booking request sent!");
  };

  const handleEnquire = () => {
    toast.success("Enquiry submitted!");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-pulse text-xl">Loading package details...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!packageData) {
    return <div>Package not found</div>;
  }

  const { title, image, price, duration, rating, destination, description } = packageData;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="relative h-[40vh] min-h-[300px]">
          <div className="absolute inset-0 bg-black">
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ 
                backgroundImage: `url(${image})`,
                opacity: '0.7'
              }}
            />
          </div>
          <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
            <div className="text-center max-w-4xl">
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 text-shadow">
                {title}
              </h1>
              <div className="flex items-center justify-center text-white space-x-4">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-1" />
                  <span>{destination}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-1" />
                  <span>{duration}</span>
                </div>
                <div className="flex items-center">
                  <Star className="h-5 w-5 fill-yellow-500 text-yellow-500 mr-1" />
                  <span>{rating}/5</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto py-10 px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Package Details */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="overview">
                <TabsList className="grid grid-cols-4 mb-6">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
                  <TabsTrigger value="inclusions">Inclusions</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="bg-white p-6 rounded-lg shadow-sm">
                  <h2 className="text-2xl font-semibold mb-4">Trip Overview</h2>
                  <p className="text-gray-700 mb-6">
                    {description || `Experience the beauty and culture of ${destination} with our exclusive ${duration} package. 
                    Perfect for families, couples, and solo travelers looking for an unforgettable journey.
                    This carefully crafted itinerary ensures you see all the iconic landmarks while also discovering hidden gems known only to locals.`}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="flex flex-col items-center p-4 border rounded-lg bg-gray-50">
                      <Clock className="h-10 w-10 text-vrred-500 mb-2" />
                      <h3 className="font-semibold">{duration}</h3>
                      <p className="text-sm text-gray-500">Duration</p>
                    </div>
                    <div className="flex flex-col items-center p-4 border rounded-lg bg-gray-50">
                      <CalendarIcon className="h-10 w-10 text-vrred-500 mb-2" />
                      <h3 className="font-semibold">Year Round</h3>
                      <p className="text-sm text-gray-500">Availability</p>
                    </div>
                    <div className="flex flex-col items-center p-4 border rounded-lg bg-gray-50">
                      <Users className="h-10 w-10 text-vrred-500 mb-2" />
                      <h3 className="font-semibold">2-15</h3>
                      <p className="text-sm text-gray-500">Group Size</p>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-3">About This Trip</h3>
                  <p className="text-gray-700 mb-4">
                    Embark on an unforgettable journey through {destination}'s most iconic destinations. This comprehensive tour covers everything from historic sites to natural wonders, ensuring a perfect balance of exploration, relaxation, and authentic cultural experiences.
                  </p>
                  
                  <h3 className="text-xl font-semibold mb-3">Highlights</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-vrred-500 mr-2 mt-0.5 shrink-0" />
                      <span>Visit iconic landmarks and attractions</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-vrred-500 mr-2 mt-0.5 shrink-0" />
                      <span>Authentic local cultural experiences</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-vrred-500 mr-2 mt-0.5 shrink-0" />
                      <span>Comfortable accommodations</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-vrred-500 mr-2 mt-0.5 shrink-0" />
                      <span>Expert local guides</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-vrred-500 mr-2 mt-0.5 shrink-0" />
                      <span>Selected meals included</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-vrred-500 mr-2 mt-0.5 shrink-0" />
                      <span>All transportation arrangements</span>
                    </li>
                  </ul>
                </TabsContent>
                
                <TabsContent value="itinerary" className="bg-white p-6 rounded-lg shadow-sm">
                  <h2 className="text-2xl font-semibold mb-6">Daily Itinerary</h2>
                  
                  {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                    <div key={day} className="mb-8 border-b pb-6 last:border-0">
                      <h3 className="text-xl font-semibold mb-2">Day {day}: {day === 1 ? "Arrival" : day === 7 ? "Departure" : `Exploring ${destination}`}</h3>
                      <p className="text-gray-700 mb-4">
                        {day === 1 
                          ? `Arrive at the airport where you'll be greeted by our representative. Transfer to your hotel and check-in. Rest of the day at leisure to recover from your journey. Welcome dinner in the evening.` 
                          : day === 7
                          ? `After breakfast, check-out from the hotel. Depending on your flight time, you may have free time for last-minute shopping. Transfer to the airport for your departure flight. End of tour services.`
                          : `Full day of sightseeing and exploring the beautiful attractions of ${destination}. Visit key landmarks, enjoy authentic local cuisine, and immerse yourself in the local culture and traditions.`
                        }
                      </p>
                      <div className="flex items-center text-gray-500 text-sm">
                        <div className="mr-6">
                          <span className="font-medium text-gray-700">Meals:</span> Breakfast{day === 1 ? ", Dinner" : day % 3 === 0 ? ", Lunch, Dinner" : ", Lunch"}
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Accommodation:</span> {["Standard", "Deluxe", "Luxury"][Math.floor(Math.random() * 3)]} Hotel
                        </div>
                      </div>
                    </div>
                  ))}
                </TabsContent>
                
                <TabsContent value="inclusions" className="bg-white p-6 rounded-lg shadow-sm">
                  <h2 className="text-2xl font-semibold mb-4">What's Included</h2>
                  
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-3 text-vrred-500">Inclusions</h3>
                    <ul className="space-y-2">
                      {["Return international airfare from India", 
                        "All airport transfers", 
                        "Accommodation in 3/4 star hotels", 
                        "Daily breakfast and selected meals", 
                        "Sightseeing as per itinerary", 
                        "English-speaking local guides",
                        "All transportation in an air-conditioned vehicle",
                        "Entrance fees to monuments",
                        "Tour manager from VR Best Travels"
                      ].map((item, index) => (
                        <li key={index} className="flex items-center">
                          <Check className="h-5 w-5 text-green-500 mr-2" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-vrred-500">Exclusions</h3>
                    <ul className="space-y-2">
                      {["Travel insurance (can be arranged on request)", 
                        "Visa fees (if applicable)", 
                        "Personal expenses (laundry, telephone calls, etc.)", 
                        "Tips and gratuities", 
                        "Optional tours and activities",
                        "Meals not mentioned in the inclusions"
                      ].map((item, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-red-500 mr-2 font-bold">×</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>
                
                <TabsContent value="reviews" className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-semibold">Reviews</h2>
                    <div className="flex items-center">
                      <Star className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                      <span className="font-semibold ml-1">{rating}/5</span>
                      <span className="text-gray-500 ml-1">(24 reviews)</span>
                    </div>
                  </div>
                  
                  {[
                    {name: "Priya Sharma", rating: 5, comment: "Amazing experience! The tour was well organized and our guide was very knowledgeable. Highly recommend!"},
                    {name: "Rahul Gupta", rating: 4, comment: "Great value for money. We got to see so many amazing places in a short time. The accommodations were comfortable."},
                    {name: "Meera Patel", rating: 5, comment: "This was my second tour with VR Best Travels and they didn't disappoint. Excellent service from start to finish."}
                  ].map((review, index) => (
                    <div key={index} className="mb-5 pb-5 border-b last:border-0">
                      <div className="flex items-center mb-2">
                        <div className="bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center mr-3">
                          <span className="font-semibold">{review.name[0]}</span>
                        </div>
                        <div>
                          <h4 className="font-medium">{review.name}</h4>
                          <div className="flex">
                            {Array.from({length: 5}).map((_, i) => (
                              <Star key={i} className={`h-4 w-4 ${i < review.rating ? "fill-yellow-500 text-yellow-500" : "text-gray-300"}`} />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Booking Form */}
            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-24">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-vrred-500">₹{price.toLocaleString()}</h2>
                    <p className="text-gray-500">per person</p>
                  </div>
                  <button 
                    onClick={toggleFavorite}
                    className="p-2 rounded-full border hover:bg-gray-50 transition-colors"
                  >
                    <Heart className={`h-6 w-6 ${isFavorite ? "fill-vrred-500 text-vrred-500" : "text-gray-400"}`} />
                  </button>
                </div>
                
                <Button 
                  className="w-full mb-3 py-6 text-lg bg-vrred-500 hover:bg-vrred-600"
                  onClick={handleBookNow}
                >
                  Book Now
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full mb-6 py-6 text-lg border-vrred-500 text-vrred-500 hover:bg-vrred-50"
                  onClick={handleEnquire}
                >
                  Enquire Now
                </Button>
                
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Need Help?</h3>
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-vrred-500 mr-3" />
                    <span>+91 98765 43210</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-vrred-500 mr-3" />
                    <span>info@vrbesttravels.com</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PackageDetail;
