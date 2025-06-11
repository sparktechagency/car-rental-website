"use client";
import { CarOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Rate } from 'antd';
import React from 'react';
import { baseURL } from '../../utils/BaseURL';

export default function CarCard({ car, onBookNow }) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
      {/* Image Section */}
      <div className="h-48 overflow-hidden">
        <VehicleImage image={car.image} name={car.name} />
      </div>

      {/* Content Section */}
      <div className="p-3 sm:p-4 flex-grow flex flex-col">
        <RatingSection rating={car.rating} reviews={car.reviews} />
        <VehicleName name={car.name} />
        <PriceSection price={car.dailyRate} />
        <VehicleSpecs
          seats={car.noOfSeats}
          luggages={car.noOfLuggages}
          doors={car.noOfDoors}
          transmission={car.transmissionType}
        />
        <Button
          onClick={() => onBookNow(car)}
          className="w-full mt-auto"
          type="primary"
        >
          BOOK NOW
        </Button>
      </div>
    </div>
  );
}

// Sub-components

const VehicleImage = ({ image, name }) => (
  <img
    src={`${baseURL}${image}`}
    alt={name}
    className="w-full h-full object-cover"
    loading="lazy"
    onError={(e) => {
      e.target.onerror = null;
      e.target.src = '/images/vehicle-placeholder.jpg';
    }}
  />
);

const RatingSection = ({ rating = 4, reviews = 0 }) => (
  <div className="flex items-center mb-2">
    <Rate
      disabled
      defaultValue={rating}
      className="text-xs sm:text-sm"
      style={{ fontSize: '0.8rem' }}
    />
    <span className="text-gray-500 text-xs sm:text-sm ml-2">
      ({reviews.toLocaleString()})
    </span>
  </div>
);

const VehicleName = ({ name }) => (
  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1 line-clamp-1">
    {name}
  </h3>
);

const PriceSection = ({ price }) => (
  <div className="mb-3 sm:mb-4">
    <p className="text-xs sm:text-sm text-gray-500">Starts From</p>
    <p className="text-green-500 font-bold text-sm sm:text-base">
      ₦{price?.toLocaleString() || '0'}/Day
    </p>
  </div>
);

const VehicleSpecs = ({ seats, luggages, doors, transmission }) => (
  <div className="border-t border-gray-200 pt-3 sm:pt-4 mb-3 sm:mb-4">
    <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm">
      <SpecItem icon={<UserOutlined />} text={`${seats} Seats`} />
      <SpecItem icon={<CarOutlined />} text={`${luggages} Luggages`} />
      <SpecItem text={`${doors} Doors`} />
      <SpecItem
        icon={<SettingOutlined />}
        text={transmission || 'Automatic'}
      />
    </div>
  </div>
);

const SpecItem = ({ icon, text }) => (
  <div className="flex items-center text-gray-600">
    {icon && React.cloneElement(icon, { className: "mr-1 sm:mr-2 text-xs" })}
    <span className="truncate">{text}</span>
  </div>
);