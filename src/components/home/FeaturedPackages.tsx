
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { PackageCard } from '@/components/packages/PackageCard';
import allPackages from '@/data/packages';

const FeaturedPackages = () => {
  // We'll use the same packages data but only show 6 packages on the homepage
  const featuredPackages = allPackages.slice(0, 6);

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
              <PackageCard {...pkg} featured={true} />
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
    </section>
  );
};

export default FeaturedPackages;
