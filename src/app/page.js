import Benefits from '@/components/Home/Benefits';
import CustomerTestimonials from '@/components/Home/CustomerTestimonials';
import ExploreVehicles from '@/components/Home/ExploreVehicles';
import Frequently from '@/components/Home/Frequently';
import Hero from '@/components/Home/Hero';
import React from 'react';

const page = () => {
  return (
    <div>
      <Hero />
      <ExploreVehicles />
      <Benefits />
      <Frequently />
      <CustomerTestimonials />
    </div>
  );
};

export default page;