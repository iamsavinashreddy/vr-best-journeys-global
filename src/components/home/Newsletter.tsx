
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';
import { toast } from 'sonner';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success('Thank you for subscribing to our newsletter!');
      setEmail('');
      setLoading(false);
    }, 1000);
  };

  return (
    <section className="py-20 bg-vrred-500">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Get Exclusive Travel Deals
          </h2>
          <p className="text-white/90 text-lg mb-10 max-w-2xl mx-auto">
            Subscribe to our newsletter and be the first to know about special offers, new destinations, and travel inspiration.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <div className="relative flex-grow">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                placeholder="Your email address"
                className="w-full pl-12 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white text-gray-800 text-lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <Button 
              type="submit" 
              className="bg-black hover:bg-gray-900 text-white px-8 py-3 rounded-lg text-lg font-medium"
              disabled={loading}
            >
              {loading ? 'Subscribing...' : 'Subscribe'}
            </Button>
          </form>
          
          <p className="mt-4 text-sm text-white/80">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
