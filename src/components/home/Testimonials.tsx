
import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

interface TestimonialProps {
  id: number;
  name: string;
  location: string;
  avatar: string;
  content: string;
  rating: number;
  destination: string;
}

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials: TestimonialProps[] = [
    {
      id: 1,
      name: "Priya Sharma",
      location: "New Delhi",
      avatar: "https://randomuser.me/api/portraits/women/42.jpg",
      content: "Our USA tour exceeded all expectations! The itinerary was perfectly balanced with famous attractions and hidden gems. The hotels were excellent, and our guide was knowledgeable and friendly. VR Best Travels handled everything flawlessly from start to finish. Highly recommend!",
      rating: 5,
      destination: "USA"
    },
    {
      id: 2,
      name: "Rahul Mehta",
      location: "Mumbai",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      content: "Japan is a magical place and VR Best Travels made our experience unforgettable. From the cherry blossoms in Tokyo to the serene temples in Kyoto, every moment was picture perfect. The cultural experiences and food recommendations were outstanding. Looking forward to booking our next trip!",
      rating: 5,
      destination: "Japan"
    },
    {
      id: 3,
      name: "Anjali Patel",
      location: "Ahmedabad",
      avatar: "https://randomuser.me/api/portraits/women/65.jpg",
      content: "Our China tour was incredible! The Great Wall, Forbidden City, and Terra Cotta Warriors were breathtaking. VR Best Travels' attention to detail made this complex journey smooth and enjoyable. Our guide's knowledge of Chinese history and culture added tremendous value to our experience.",
      rating: 4,
      destination: "China"
    },
    {
      id: 4,
      name: "Vikram Singh",
      location: "Bangalore",
      avatar: "https://randomuser.me/api/portraits/men/67.jpg",
      content: "Sri Lanka was the perfect family getaway. Beautiful beaches, fascinating wildlife, and rich cultural experiences all in one trip. VR Best Travels customized our itinerary perfectly for our family's interests. The accommodations were excellent and the transfers were always on time. Wonderful memories!",
      rating: 5,
      destination: "Sri Lanka"
    }
  ];

  const nextTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="section-title text-white">What Our Travelers Say</h2>
          <p className="text-gray-300 text-lg mb-10 max-w-3xl mx-auto">
            Authentic experiences shared by our satisfied customers who have traveled with us
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <div className="relative">
            <div className="flex overflow-hidden">
              <div 
                className="w-full flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${activeIndex * 100}%)` }}
              >
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                    <div className="bg-gray-800 rounded-xl p-8 relative">
                      <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-1/2">
                        <div className="bg-vrred-500 text-white py-2 px-4 rounded-lg shadow-lg">
                          {testimonial.destination}
                        </div>
                      </div>
                      
                      <div className="flex items-center mb-6">
                        <img 
                          src={testimonial.avatar} 
                          alt={testimonial.name}
                          className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-vrred-500"
                        />
                        <div>
                          <h3 className="text-xl font-semibold mb-1">{testimonial.name}</h3>
                          <p className="text-gray-400">{testimonial.location}</p>
                        </div>
                      </div>
                      
                      <div className="flex mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-5 w-5 ${
                              i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'
                            }`} 
                          />
                        ))}
                      </div>
                      
                      <blockquote className="text-gray-300 text-lg italic">
                        "{testimonial.content}"
                      </blockquote>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-center mt-8 space-x-4">
              <button 
                onClick={prevTestimonial}
                className="p-3 rounded-full border border-gray-700 hover:border-vrred-500 text-gray-400 hover:text-vrred-500 transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <div className="flex items-center space-x-2">
                {testimonials.map((_, index) => (
                  <button 
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      activeIndex === index ? 'bg-vrred-500' : 'bg-gray-700 hover:bg-gray-600'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
              <button 
                onClick={nextTestimonial}
                className="p-3 rounded-full border border-gray-700 hover:border-vrred-500 text-gray-400 hover:text-vrred-500 transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
