// BookingConfirmation.jsx
"use client";
import React from 'react';
import { Button } from 'antd';
import { useRouter } from 'next/navigation';

const BookingConfirmation = ({ referenceId = "RQ1743231118" }) => {
  const router = useRouter();
  return (
    <div className="max-w-2xl mx-auto my-32">
      <div className="border border-gray-200 rounded-md overflow-hidden">
        <div className="bg-green-500 text-white text-center py-4">
          <h2 className="text-lg font-medium">Reference ID: {referenceId}</h2>
        </div>
        
        <div className="p-6 text-center">
          <p className="mb-1 text-gray-700">
            You can review details about your reservation at Manage Booking page.
          </p>
          <p className="mb-6 text-gray-700">
            You will need your email address and Reference ID.
          </p>
          
          <Button 
          onClick={()=> router.push('/reservationdetails')}
            type="primary" 
            className="bg-green-500 hover:bg-green-600 border-green-500 hover:border-green-600"
          >
            Manage Booking
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;