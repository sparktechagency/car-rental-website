import { CarFilled, HeartFilled } from '@ant-design/icons';
import React from 'react';
import { FaAward, FaCamera } from 'react-icons/fa';
import { Booking, Cars, Satisfaction, Services } from '../../../utils/svgImage';

export default function Benefits() {
  return (
    <div className="bg-gray-50 p-4 sm:p-6 md:p-8 lg:p-10 ">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row gap-8 xl:gap-12 items-center">
          {/* Left Side - Text and Image */}
          <div className="w-full lg:w-1/2 space-y-4 md:space-y-6">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
                Your Luxury Chauffeur <br className="hidden sm:block" />Service In Lagos, Nigeria
              </h1>
              <p className="text-sm sm:text-base text-gray-600">
                The Lux Auto offers premium luxury car rentals with professional
                drivers, ensuring a smooth and stylish ride. Based in Lagos, Nigeria, we
                provide a fleet of prestigious vehicles and top-tier service, making us a
                trusted name in luxury car hire.
              </p>
            </div>
            
            <div className="mt-4 md:mt-6">
              <div className="rounded-lg overflow-hidden shadow-lg">
                <img 
                  src="/images/benifit.png" 
                  alt="Chauffeur service" 
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
          
          {/* Right Side - Features */}
          <div className="w-full lg:w-1/2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              {/* Feature 1 */}
              <div className="bg-white flex flex-col p-4 sm:p-5 md:p-6 rounded-lg shadow-md">
                <div className="flex items-center">
                  <div className="bg-green-500 rounded-full p-4 sm:p-5 md:p-6 lg:p-7 mb-3 sm:mb-4">
                    <Booking className="text-white w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                  </div>
                  <div className="ml-auto text-2xl sm:text-3xl md:text-4xl font-bold text-gray-200">01</div>
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2">Easy Booking</h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-600">
                  Simple and quick process to rent a car from us, so you can start your journey without any delay.
                </p>
              </div>
              
              {/* Feature 2 */}
              <div className="bg-white flex flex-col p-4 sm:p-5 md:p-6 rounded-lg shadow-md">
                <div className="flex items-center">
                  <div className="bg-[#822DF1] rounded-full p-4 sm:p-5 md:p-6 lg:p-7 mb-3 sm:mb-4">
                    <Cars className="text-white w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                  </div>
                  <div className="ml-auto text-2xl sm:text-3xl md:text-4xl font-bold text-gray-200">02</div>
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2">Wide Range of Cars</h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-600">
                  From luxury to economy, we have cars for every need and budget.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-white flex flex-col p-4 sm:p-5 md:p-6 rounded-lg shadow-md">
                <div className="flex items-center">
                  <div className="bg-[#004CE9] rounded-full p-4 sm:p-5 md:p-6 lg:p-7 mb-3 sm:mb-4">
                    <Services className="text-white w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                  </div>
                  <div className="ml-auto text-2xl sm:text-3xl md:text-4xl font-bold text-gray-200">03</div>
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2">Great Service</h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-600">
                  Our professional drivers and friendly staff ensure a smooth experience every time.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="bg-white flex flex-col p-4 sm:p-5 md:p-6 rounded-lg shadow-md">
                <div className="flex items-center">
                  <div className="bg-[#D21211] rounded-full p-4 sm:p-5 md:p-6 lg:p-7 mb-3 sm:mb-4">
                    <Satisfaction className="text-white w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                  </div>
                  <div className="ml-auto text-2xl sm:text-3xl md:text-4xl font-bold text-gray-200">04</div>
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2">User Satisfaction</h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-600">
                  We prioritize your comfort and happiness, ensuring a seamless and enjoyable ride every time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}