// ReservationDetailsPage.jsx
import React from 'react';
import { Button, Card } from 'antd';
import { PrinterOutlined } from '@ant-design/icons';

const ReservationDetails = () => {
  const renderSideMenu = () => (
    <div className="w-full max-w-sm">
      <div className="rounded-md overflow-hidden border border-gray-200">
        <div className="bg-green-500 text-white p-4">
          <h2 className="font-medium text-lg">Details</h2>
        </div>
        <div className="divide-y divide-gray-200">
          <div className="p-4 hover:bg-gray-50 cursor-pointer">Extras & Protection</div>
          <div className="p-4 hover:bg-gray-50 cursor-pointer">Price & Payments</div>
          <div className="p-4 hover:bg-gray-50 cursor-pointer">Drivers</div>
          <div className="p-4 hover:bg-gray-50 cursor-pointer">Documents</div>
        </div>
        <div className="p-4">
          <Button icon={<PrinterOutlined />} className="flex items-center">
            Print Details
          </Button>
        </div>
      </div>
    </div>
  );

  const renderReservationDetails = () => (
    <div className="w-full flex flex-col gap-5">
      <Card className="mb-6">
        <h2 className="text-lg font-medium mb-4">Your Reservation Details</h2>
        <div className="border-t border-gray-200 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-500 text-sm">Reference ID</p>
              <p className="font-medium">RQ1743231118</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Created on</p>
              <p className="font-medium">29/3/2025 7:51 am</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className='flex flex-col gap-1'>
              <p className="text-gray-500 text-sm">Status</p>
              <span className="bg-green-500 w-24 text-center text-white px-3 py-1 rounded-md text-sm ">Confirmed</span>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Type</p>
              <p className="font-medium">LEXUS GX460</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <p className="text-gray-500 text-sm">Pickup Date & Time</p>
              <p className="font-medium">30/3/2025, 12:00 am</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Return Date & Time</p>
              <p className="font-medium">31/3/2025, 10:45 pm</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <p className="text-gray-500 text-sm">Pick-up Location</p>
              <p className="font-medium">Muritala Mohammed International Airport Lagos</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Return Location</p>
              <p className="font-medium">Muritala Mohammed International Airport Lagos</p>
            </div>
          </div>
        </div>
      </Card>

      <Card className='sm:max-w-md w-full'>
        <div className=''>
        <h2 className="text-lg font-medium mb-4">Personal Details</h2>
        <div className="border-t border-gray-200 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 content-between">
            <div>
              <p className="text-gray-500 text-sm">First Name</p>
              <p className="font-medium">Shazzadul</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Last Name</p>
              <p className="font-medium">Chowdhury</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <p className="text-gray-500 text-sm">Last Name</p>
              <p className="font-medium">Chowdhury</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">E-Mail</p>
              <p className="font-medium">shazzad.cse@gmail.com</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <p className="text-gray-500 text-sm">Phone</p>
              <p className="font-medium">+234 1916333904</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Country</p>
              <p className="font-medium">Bangladesh</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <p className="text-gray-500 text-sm">Region/State</p>
              <p className="font-medium">Nigeria</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">City</p>
              <p className="font-medium">Dhaka</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <p className="text-gray-500 text-sm">Address</p>
              <p className="font-medium">Arambagh</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Postcode/ZIP</p>
              <p className="font-medium">1000</p>
            </div>
          </div>
        </div>
        </div>
      </Card>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-6">
        {renderSideMenu()}
        {renderReservationDetails()}
      </div>
    </div>
  );
};

export default ReservationDetails;