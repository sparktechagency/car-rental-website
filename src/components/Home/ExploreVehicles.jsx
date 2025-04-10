"use client";
import { useState } from 'react';
import { Tabs, Rate, Button } from 'antd';
import { ArrowRightOutlined, UserOutlined, CarOutlined, SettingOutlined } from '@ant-design/icons';

export default function ExploreVehicles() {
  const [activeTab, setActiveTab] = useState('1');

  const carData = [
    {
      id: 1,
      name: 'MASERATI GRANTURISMO',
      image: '/images/maserati.png', // Replace with actual image path
      rating: 4.8,
      reviews: 162,
      price: '109,999',
      seats: 6,
      gears: 5,
      doors: 2,
      transmission: 'Automatic',
    },
    {
      id: 2,
      name: 'HYUNDAI',
      image: '/images/Hyundai.png', // Replace with actual image path
      rating: 4.8,
      reviews: 162,
      price: '109,999',
      seats: 6,
      gears: 5,
      doors: 2,
      transmission: 'Automatic',
    },
    {
      id: 3,
      name: 'MERCEDES-BENZ',
      image: '/images/Mercedes.png', // Replace with actual image path
      rating: 4.8,
      reviews: 462,
      price: '109,999',
      seats: 6,
      gears: 5,
      doors: 2,
      transmission: 'Automatic',
    },
    {
      id: 4,
      name: 'TOYOTA',
      image: '/images/Toyota.png', // Replace with actual image path
      rating: 4.8,
      reviews: 162,
      price: '109,999',
      seats: 6,
      gears: 5,
      doors: 2,
      transmission: 'Automatic',
    },
  ];

  const items = [
    {
      key: '1',
      label: <span className="text-xs sm:text-sm md:text-base">Recent Cars</span>,
      children: (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {carData.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      ),
    },
    {
      key: '2',
      label: <span className="text-xs sm:text-sm md:text-base">Featured Cars</span>,
      children: 'Featured Cars Content',
    },
    {
      key: '3',
      label: <span className="text-xs sm:text-sm md:text-base">Popular Cars</span>,
      children: 'Popular Cars Content',
    },
  ];

  return (
    <div className="container mx-auto sm:px-0 px-3  py-6 md:py-16">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Explore Vehicles</h1>
        <a href="#" className="text-green-500 flex items-center hover:underline text-sm sm:text-base">
          View All <ArrowRightOutlined className="ml-1" />
        </a>
      </div>

      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        items={items}
        className="car-tabs"
        tabBarStyle={{ fontSize: 'inherit' }} // Ensures tabs inherit responsive font sizes
      />
    </div>
  );
}

function CarCard({ car }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="aspect-w-16 aspect-h-9 sm:aspect-w-3 sm:aspect-h-2">
        <img
          src={car.image}
          alt={car.name}
          className="w-full h-full object-cover"
          loading="lazy" // Better performance
        />
      </div>

      <div className="p-3 sm:p-4">
        <div className="flex items-center mb-2">
          <Rate 
            disabled 
            defaultValue={car.rating} 
            className="text-xs sm:text-sm" 
            style={{ fontSize: '0.8rem' }} // Fixes antd rate component sizing
          />
          <span className="text-gray-500 text-xs sm:text-sm ml-2">({car.reviews})</span>
        </div>

        <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1 line-clamp-1">{car.name}</h3>

        <div className="mb-3 sm:mb-4">
          <p className="text-xs sm:text-sm text-gray-500">Starts From</p>
          <p className="text-green-500 font-bold text-sm sm:text-base">₦ {car.price}/Day</p>
        </div>

        <div className="border-t border-gray-200 pt-3 sm:pt-4 mb-3 sm:mb-4">
          <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm">
            <div className="flex items-center text-gray-600">
              <UserOutlined className="mr-1 sm:mr-2" />
              <span>{car.seats} Seats</span>
            </div>
            <div className="flex items-center text-gray-600">
              <CarOutlined className="mr-1 sm:mr-2" />
              <span>{car.gears}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <span>{car.doors} Doors</span>
            </div>
            <div className="flex items-center text-gray-600">
              <SettingOutlined className="mr-1 sm:mr-2" />
              <span>{car.transmission}</span>
            </div>
          </div>
        </div>

        <Button
  className="Vehicles"
  block
>
  BOOK NOW
</Button>
      </div>
    </div>
  );
}