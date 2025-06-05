// pages/booking-extras.js
"use client";
import {
  CarOutlined,
  EnvironmentOutlined,
  SettingOutlined,
  UserOutlined
} from '@ant-design/icons';
import {
  Button,
  Card
} from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { baseURL } from '../../../utils/BaseURL';
import { useGetAllExtraServiceQuery } from '../../features/reservation_page/reservationApi';

const ChildSeatCard = ({ title, description, price, onAddToggle }) => {
  const [add, setAdd] = useState(false);

  const handleClick = () => {
    const newAddState = !add;
    setAdd(newAddState);
    onAddToggle(newAddState);
  };

  return (
    <Card className="h-full">
      <div className="flex flex-col h-full">
        <div className="flex items-start space-x-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gray-100 p-2">
            <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 4C13.1046 4 14 3.10457 14 2C14 0.89543 13.1046 0 12 0C10.8954 0 10 0.89543 10 2C10 3.10457 10.8954 4 12 4Z" fill="#374151" />
              <path d="M18 8H6C5.44772 8 5 8.44772 5 9V14C5 14.5523 5.44772 15 6 15H7L8 22C8.05 22.5 8.5 23 9 23H15C15.5 23 15.95 22.5 16 22L17 15H18C18.5523 15 19 14.5523 19 14V9C19 8.44772 18.5523 8 18 8Z" fill="#374151" />
              <path d="M14 8V6.5C14 5.67157 13.3284 5 12.5 5H11.5C10.6716 5 10 5.67157 10 6.5V8" fill="#374151" />
              <path d="M8 13L9 18.5H15L16 13H8Z" fill="#F9D270" />
            </svg>
          </div>
          <div className="flex-1">
            <h2 className="text-base font-bold text-gray-900">{title}</h2>
          </div>
        </div>

        <div className="flex-grow">
          <p className="text-sm text-gray-600 mb-3">{description}</p>
        </div>

        <div className="mt-auto">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs text-gray-500">Per day</span>
              <p className="text-green-500 font-bold text-base">₦ {price}</p>
            </div>
            <Button
              onClick={handleClick}
              type="primary"
              className="bg-yellow-400 hover:bg-yellow-500 border-yellow-400 hover:border-yellow-500 text-gray-900 font-medium"
              size="small"
            >
              {add ? "ADDED" : "ADD"}
            </Button>
          </div>
          <Button type="link" className="text-xs p-0 mt-2 text-gray-500">More info</Button>
        </div>
      </div>
    </Card>
  );
};

const AddonCard = ({ icon, title, description, price, isFree, onAddToggle }) => {
  const [add, setAdd] = useState(false);

  const handleClick = () => {
    const newAddState = !add;
    setAdd(newAddState);
    onAddToggle(newAddState);
  };

  return (
    <div className='border border-gray-300 p-3 rounded-md shadow h-full'>
      <div className="flex flex-col h-full">
        <div className="flex items-start space-x-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gray-100 p-2">
            <Image src={`${baseURL}/${icon}`} height={40} width={40} alt={title} />
          </div>
          <div className="flex-1">
            <h2 className="text-base font-bold text-gray-900">{title}</h2>
            {isFree && <span className="text-xs text-green-500">FREE</span>}
          </div>
        </div>

        <div className="flex-grow">
          <p className="text-sm text-gray-600 mb-3">{description}</p>
        </div>

        <div className="mt-auto">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs text-gray-500">Per day</span>
              <p className="text-green-500 font-bold text-base">₦ {price}</p>
            </div>
            <Button
              onClick={handleClick}
              className="Vehicles"
              size='middle'
              style={{ width: "100px", height: "35px" }}
            >
              {add ? "ADDED" : "ADD"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function BookingExtras() {
  const router = useRouter();
  const vehicleData = localStorage.getItem("reservation");
  const vehicle = JSON.parse(vehicleData);
  const [addedServicesCount, setAddedServicesCount] = useState(0);

  const { data } = useGetAllExtraServiceQuery();
  console.log(data?.data.result);

  const handleExtraService = (isAdded) => {
    setAddedServicesCount(prevCount => isAdded ? prevCount + 1 : prevCount - 1);
    localStorage.setItem("pronab", isAdded);
  };
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
      <div className="mb-6">
        <div className="flex items-center mb-2">
          <CarOutlined className="mr-2" />
          <h2 className="text-lg font-semibold">Choose your car</h2>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="bg-green-500 h-full" style={{ width: '50%' }}></div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left sidebar */}
        <div className="lg:w-1/4">
          <div className="mb-6 border p-3 border-gray-200 rounded-md">
            <h3 className="font-bold mb-4 border-b border-gray-200 pb-4">Location</h3>

            <div className="mb-4">
              <p className="font-semibold mb-2">Pick-up</p>
              <div className="flex items-start mb-2">
                <EnvironmentOutlined className="mt-1 mr-2 text-gray-500" />
                <div>
                  <p className="text-sm">Murtala Mohammed International Airport Lagos</p>
                  <p className="text-xs text-gray-500">25/3/2025, 12:00 am</p>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <p className="font-semibold mb-2">Return</p>
              <div className="flex items-start mb-2">
                <EnvironmentOutlined className="mt-1 mr-2 text-gray-500" />
                <div>
                  <p className="text-sm">Murtala Mohammed International Airport Lagos</p>
                  <p className="text-xs text-gray-500">25/3/2025, 4:00 pm</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6 border border-gray-200 rounded-md p-3">
            <h3 className="font-bold mb-4 border-b border-gray-200 pb-4">Selected Car</h3>
            <div className="rounded-md overflow-hidden">
              <img
                src="/images/maserati.png"
                alt="Mercedes-Benz"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h4 className="font-bold text-lg mb-1">{vehicle[0]?.brand}</h4>
                <p className="text-xs text-gray-500 mb-1">Starts From</p>
                <p className="text-green-500 font-bold mb-4 border-b border-gray-200 pb-2">₦ {vehicle[0]?.dailyRate}/Day</p>

                <div className="flex justify-between mb-3">
                  <div className="flex items-center">
                    <UserOutlined className="mr-1 text-gray-500" />
                    <span className="text-xs">{vehicle[0].noOfSeats} Seats</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-xs">{vehicle[0].noOfLuggages}</span>
                  </div>
                </div>

                <div className="flex justify-between">
                  <div className="flex items-center">
                    <CarOutlined className="mr-1 text-gray-500" />
                    <span className="text-xs">{vehicle[0].noOfDoors} Doors</span>
                  </div>
                  <div className="flex items-center">
                    <SettingOutlined className="mr-1 text-gray-500" />
                    <span className="text-xs">{vehicle[0].transmissionType}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main content - Extras */}
        <div className="lg:w-3/4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {data?.data.result.map((addon) => (
              addon.id === 1 ? (
                <ChildSeatCard
                  key={addon._id}
                  title={addon.name}
                  description={addon.description}
                  price={addon.cost}
                  onAddToggle={handleExtraService}
                />
              ) : (
                <AddonCard
                  key={addon._id}
                  icon={addon.image}
                  title={addon.name}
                  description={addon.description}
                  price={addon.cost}
                  isFree={addon.isFree}
                  onAddToggle={handleExtraService}
                />
              )
            ))}
          </div>

          <div className="flex justify-end mt-6">
            <Button
              onClick={() => {
                handleExtraService(addedServicesCount);
                router.push('/checkout');
              }}
              type="primary"
              className="bg-green-500 border-green-500 hover:bg-green-600"
              size="large"
            >
              Continue Booking (Added: {addedServicesCount})
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}