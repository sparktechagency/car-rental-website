// pages/index.js
"use client"
import React, { useState } from 'react';
import { Input, Button, DatePicker, TimePicker, Select, Checkbox, Modal } from 'antd';
import { SearchOutlined, CalendarOutlined, ClockCircleOutlined, StarFilled } from '@ant-design/icons';
import Head from 'next/head';

export default function Fleet() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pickupLocation, setPickupLocation] = useState('Muritala Mohammed International');
  const [returnLocation, setReturnLocation] = useState('Muritala Mohammed International');
  const [sameLocation, setSameLocation] = useState(true);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handlePickupLocationChange = (value) => {
    setPickupLocation(value);
    if (sameLocation) {
      setReturnLocation(value);
    }
  };

  const handleLocationChange = (checked) => {
    setSameLocation(checked);
    if (checked) {
      setReturnLocation(pickupLocation);
    }
  };

  const carListings = [
    {
      id: 1,
      brand: 'MERCEDES-BENZ',
      rating: 4.8,
      reviews: 162,
      price: '₦ 149,900.00/Day',
      seats: 6,
      doors: 2,
      transmission: 'Automatic',
      image: '/images/maserati.png',
    },
    {
      id: 2,
      brand: 'MERCEDES-BENZ',
      rating: 4.8,
      reviews: 162,
      price: '₦ 149,900.00/Day',
      seats: 6,
      doors: 2,
      transmission: 'Automatic',
      image: '/images/maserati.png',
    }
  ];

  return (
    <div className="container mx-auto p-4">
      <Head>
        <title>Premium Car Rentals</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="max-w-xl mx-auto mb-8">
        <Input
          size="large"
          placeholder="Search"
          prefix={<SearchOutlined />}
          className="rounded-lg"
        />
      </div>

      <div className="space-y-6">
        {carListings.map((car) => (
          <div key={car.id} className="flex flex-col md:flex-row bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
            {/* Car Image */}
            <div className="md:w-64 lg:w-72 bg-gray-100">
              <img 
                src={car.image} 
                alt={`${car.brand} car`} 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Content Section */}
            <div className="flex-1 p-4 md:p-6">
              {/* Top Section - Brand and Rating */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{car.brand}</h2>
                  <div className="flex items-center mt-1">
                    <p className="font-medium mr-2">{car.rating}</p>
                    <StarFilled className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-gray-500 text-sm ml-1">({car.reviews} Reviews)</span>
                  </div>
                </div>
                <div className="mt-2 md:mt-0 text-right">
                  <p className="text-sm text-gray-600">Starts From</p>
                  <p className="text-lg font-bold text-green-500">{car.price}</p>
                </div>
              </div>
              
              {/* Description */}
              <div className="mb-4">
                <p className="text-gray-700 mb-3">
                  Premium cars for you business needs or just a luxury trip. Be stylish and elegant wherever you go. 
                  We stand by our motto of driving premium cars at reasonable prices. We offer everything you would like 
                  from a premium car rental company which contains all kind of premium vehicles.
                </p>
                <p className="text-gray-700">
                  Take to the road surrounded by the sophistication and luxury. Whatever the occasion, get where you're going 
                  in style with premium car rental. With some fantastic deals on offer, you've got the perfect excuse to upgrade. 
                  So go on – take a spin in something special!
                </p>
              </div>
              
              {/* Features and Book Button */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="flex items-center space-x-4 mb-4 md:mb-0">
                  <div className="flex items-center space-x-1 text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    <span>{car.seats} Seats</span>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                    </svg>
                    <span>{car.doors} Doors</span>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                    <span>{car.transmission}</span>
                  </div>
                </div>
                <button 
                  onClick={showModal}
                  className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 cursor-pointer font-bold py-3 px-6 rounded"
                >
                  BOOK NOW
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Reservation Modal */}
      <Modal
        title={null}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        width={500}
        centered
      >
        <div className="bg-white rounded-lg shadow-xl px-4 sm:px-6 py-6 sm:py-8 w-full">
          <h2 className="text-xl sm:text-2xl font-bold text-center mb-4 sm:mb-6 text-gray-800">RESERVATION</h2>
          
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {/* Pick-up Date */}
            <div className="col-span-1">
              <DatePicker 
                placeholder="--/--/----"
                className="w-full" 
                format="DD/MM/YYYY"
                suffixIcon={<CalendarOutlined className="text-green-500" />}
                popupClassName="ant-picker-dropdown"
                style={{ borderColor: '#10B981' }}
                renderExtraFooter={() => null}
                allowClear={false}
              />
            </div>
            
            {/* Pick-up Time */}
            <div className="col-span-1">
              <TimePicker 
                placeholder="--:--" 
                className="w-full" 
                format="HH:mm"
                suffixIcon={<ClockCircleOutlined className="text-green-500" />}
                style={{ borderColor: '#10B981' }}
                allowClear={false}
              />
            </div>
            
            {/* Return Date */}
            <div className="col-span-1">
              <DatePicker 
                placeholder="--/--/----" 
                className="w-full" 
                format="DD/MM/YYYY"
                suffixIcon={<CalendarOutlined className="text-green-500" />}
                style={{ borderColor: '#10B981' }}
                renderExtraFooter={() => null}
                allowClear={false}
              />
            </div>
            
            {/* Return Time */}
            <div className="col-span-1">
              <TimePicker 
                placeholder="--:--" 
                className="w-full" 
                format="HH:mm"
                suffixIcon={<ClockCircleOutlined className="text-green-500" />}
                style={{ borderColor: '#10B981' }}
                allowClear={false}
              />
            </div>
          </div>
          
          {/* Pick-up Location */}
          <div className="mt-3 sm:mt-4">
            <p className="text-xs text-gray-500 mb-1">Pick-up Location</p>
            <Select
              className="w-full"
              value={pickupLocation}
              onChange={handlePickupLocationChange}
              options={[
                { value: 'Muritala Mohammed International', label: 'Muritala Mohammed International' },
                { value: 'Lagos Airport', label: 'Lagos Airport' },
                { value: 'Ikeja City Mall', label: 'Ikeja City Mall' },
              ]}
              style={{ borderColor: '#10B981' }}
            />
          </div>
          
          {/* Return Location */}
          <div className="mt-3 sm:mt-4">
            <p className="text-xs text-gray-500 mb-1">Return Location</p>
            <Select
              className="w-full"
              value={returnLocation}
              onChange={(value) => setReturnLocation(value)}
              options={[
                { value: 'Muritala Mohammed International', label: 'Muritala Mohammed International' },
                { value: 'Lagos Airport', label: 'Lagos Airport' },
                { value: 'Ikeja City Mall', label: 'Ikeja City Mall' },
              ]}
              disabled={sameLocation}
              style={{ borderColor: '#10B981' }}
            />
          </div>
          
          {/* Same Location Checkbox */}
          <div className="mt-3 sm:mt-4 flex items-center">
            <Checkbox 
              checked={sameLocation} 
              onChange={(e) => handleLocationChange(e.target.checked)}
              className="text-primary"
            />
            <span className="ml-2 text-sm text-gray-600">Same as pick-up location</span>
          </div>
          
          {/* Submit Button */}
          <div className="mt-4 sm:mt-6">
            <Button 
              type="primary" 
              className="w-full h-12 sm:h-14 text-white font-medium text-base sm:text-lg"
              onClick={handleOk}
            >
              MAKE RESERVATION
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}