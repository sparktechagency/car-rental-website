"use client";
import { ArrowRightOutlined, CarOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Rate, Tabs } from 'antd';
import { useState } from 'react';
import { useGetAllVehiclesPopularQuery, useGetAllVehiclesRecentsQuery } from '../../features/Home_page/HomeApi';

export default function ExploreVehicles() {
  const [activeTab, setActiveTab] = useState('1');
  const { data: recentVehicles, isLoading: isRecentVehiclesLoading } = useGetAllVehiclesRecentsQuery();
  const { data: popularVehicles, isLoading: isPopularVehiclesLoading } = useGetAllVehiclesPopularQuery();

  // Function to transform API data to car card format
  const transformVehicleData = (vehicle) => ({
    id: vehicle._id,
    name: vehicle.name,
    image: getVehicleImage(vehicle.name), // Helper function to get appropriate image
    rating: 4.5, // Default rating since API doesn't provide this
    reviews: 0, // Default reviews count
    price: vehicle.dailyRate.toFixed(2),
    seats: vehicle.noOfSeats,
    gears: '5', // Default value since API doesn't provide
    doors: vehicle.noOfDoors,
    transmission: vehicle.transmissionType === 'AUTOMATIC' ? 'Automatic' : 'Manual',
    luggage: vehicle.noOfLuggages
  });

  // Helper function to get vehicle image based on name
  const getVehicleImage = (name) => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes('maserati')) return '/images/maserati.png';
    if (lowerName.includes('hyundai')) return '/images/Hyundai.png';
    if (lowerName.includes('mercedes')) return '/images/Mercedes.png';
    if (lowerName.includes('toyota')) return '/images/Toyota.png';
    if (lowerName.includes('explorer')) return '/images/explorer.png'; // Add more as needed
    return '/images/default-car.png'; // Default image
  };

  const items = [
    {
      key: '1',
      label: <span className="text-xs sm:text-sm md:text-base">Recent Cars</span>,
      children: (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {isRecentVehiclesLoading ? (
            <p>Loading recent vehicles...</p>
          ) : recentVehicles?.length > 0 ? (
            recentVehicles.map((vehicle) => (
              <CarCard key={vehicle._id} car={transformVehicleData(vehicle)} />
            ))
          ) : (
            <p>No recent vehicles available</p>
          )}
        </div>
      ),
    },
    {
      key: '2',
      label: <span className="text-xs sm:text-sm md:text-base">Featured Cars</span>,
      children: (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {/* Featured cars could be a combination or different API call */}
          {isRecentVehiclesLoading ? (
            <p>Loading featured vehicles...</p>
          ) : recentVehicles?.length > 0 ? (
            recentVehicles.slice(0, 4).map((vehicle) => (
              <CarCard key={vehicle._id} car={transformVehicleData(vehicle)} />
            ))
          ) : (
            <p>No featured vehicles available</p>
          )}
        </div>
      ),
    },
    {
      key: '3',
      label: <span className="text-xs sm:text-sm md:text-base">Popular Cars</span>,
      children: (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {isPopularVehiclesLoading ? (
            <p>Loading popular vehicles...</p>
          ) : popularVehicles?.length > 0 ? (
            popularVehicles.map((vehicle) => (
              <CarCard key={vehicle._id} car={transformVehicleData(vehicle)} />
            ))
          ) : (
            <p>No popular vehicles available</p>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="container mx-auto sm:px-0 px-3 py-6 md:py-16">
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
        tabBarStyle={{ fontSize: 'inherit' }}
      />
    </div>
  );
}

function CarCard({ car }) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="aspect-w-16 aspect-h-9 sm:aspect-w-3 sm:aspect-h-2">
        <img
          src={car.image}
          alt={car.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      <div className="p-3 sm:p-4">
        <div className="flex items-center mb-2">
          <Rate
            disabled
            defaultValue={car.rating || 4}
            className="text-xs sm:text-sm"
            style={{ fontSize: '0.8rem' }}
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
              <span>{car.gears} Gears</span>
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

        <Button className="w-full" type="primary">
          BOOK NOW
        </Button>
      </div>
    </div>
  );
}