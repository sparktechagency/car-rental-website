"use client";
import React, { useState } from 'react';
import { DatePicker, TimePicker, Select, Button, Checkbox } from 'antd';
import { CalendarOutlined, ClockCircleOutlined } from '@ant-design/icons';

const Hero = () => {
  const [sameLocation, setSameLocation] = useState(true);
  const [pickupLocation, setPickupLocation] = useState('Muritala Mohammed International');
  const [returnLocation, setReturnLocation] = useState('Muritala Mohammed International');

  const handleLocationChange = (checked) => {
    setSameLocation(checked);
    if (checked) {
      setReturnLocation(pickupLocation);
    }
  };

  const handlePickupLocationChange = (value) => {
    setPickupLocation(value);
    if (sameLocation) {
      setReturnLocation(value);
    }
  };

  return (
    <div className="relative w-full min-h-[600px] md:h-[800px]">
      {/* Background image container */}
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(/images/hero.png)' }} />

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 relative z-10 flex flex-col lg:flex-row items-center justify-center lg:justify-between w-full h-full py-12 lg:py-0">
        {/* Left side - Hero text */}
        <div className="w-full lg:w-1/2 flex items-center justify-center lg:justify-start mb-8 lg:mb-0">
          <div className="text-white text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl flex flex-col gap-2 sm:gap-3 font-bold mb-4">
              <span>NEED A RIDE?</span>
              <span>WE'VE GOT YOU</span>
              <span>COVERED</span>
            </h1>
            <p className="text-xl sm:text-2xl text-yellow-400">Find the Perfect Vehicle for Your Journey</p>
          </div>
        </div>
        
        {/* Right side - Reservation form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center lg:justify-end">
          <div className="bg-white rounded-lg shadow-xl px-4 sm:px-6 py-6 sm:py-8 w-full max-w-md">
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

              >
                MAKE RESERVATION
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;