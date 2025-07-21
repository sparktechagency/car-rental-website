"use client";
import { ArrowRightOutlined } from '@ant-design/icons';
import { Spin, Tabs } from 'antd';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useGetAllVehiclesPopularQuery, useGetAllVehiclesRecentsQuery } from '../../features/Home_page/HomeApi';
import { useGetLocationQuery } from '../../features/LocationApi';
import CarCard from '../CarCard';
import ReservationModal from '../ReservationModal';

export default function ExploreVehicles() {
  const [activeTab, setActiveTab] = useState('1');
  const { data: recentVehicles, isLoading: isRecentLoading } = useGetAllVehiclesRecentsQuery();
  const { data: popularVehicles, isLoading: isPopularLoading } = useGetAllVehiclesPopularQuery();
  const { data: locationsData, isLoading: locationsLoading } = useGetLocationQuery();
  const router = useRouter();
  const [isloading, setIsloading] = useState(false);


  // Modal and reservation states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleBookNow = (vehicle) => {
    setSelectedCar(vehicle);
    setIsModalOpen(true);
  };

  const handleReservationSubmit = async (reservationData) => {
    setIsSubmitting(true);
    setIsloading(true);
    try {
      // Get existing reservations from localStorage
      const existingReservations = JSON.parse(localStorage.getItem('reservation')) || [];

      // Create new reservation object matching your structure
      const newReservation = {
        ...reservationData.vehicle, // Spread all vehicle properties
        bookings: reservationData.vehicle.bookings || [], // Preserve existing bookings
        pickupDate: reservationData.pickupDate,
        pickupTime: reservationData.pickupTime,
        returnDate: reservationData.returnDate,
        returnTime: reservationData.returnTime,
        pickupLocationId: reservationData.pickupLocationId,
        pickupLocationName: reservationData.pickupLocationName,
        returnLocationId: reservationData.returnLocationId,
        returnLocationName: reservationData.returnLocationName,
        sameLocation: reservationData.sameLocation,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        // Preserve all other vehicle properties
        dailyRate: reservationData.vehicle.dailyRate,
        dailyRates: reservationData.vehicle.dailyRates || [],
        fuelType: reservationData.vehicle.fuelType,
        image: reservationData.vehicle.image,
        licenseNumber: reservationData.vehicle.licenseNumber,
        model: reservationData.vehicle.model,
        noOfDoors: reservationData.vehicle.noOfDoors,
        noOfLuggages: reservationData.vehicle.noOfLuggages,
        noOfSeats: reservationData.vehicle.noOfSeats,
        shortDescription: reservationData.vehicle.shortDescription,
        status: "RESERVED", // Update status
        transmissionType: reservationData.vehicle.transmissionType,
        vehicleType: reservationData.vehicle.vehicleType,
        vin: reservationData.vehicle.vin,
        _id: reservationData.vehicle._id || reservationData.vehicle.id
      };

      // Add to existing reservations
      const updatedArr = existingReservations.map(existReservation => {

        return { ...existReservation, ...newReservation };
      });

      // Save to localStorage
      localStorage.setItem('reservation', JSON.stringify(updatedArr));

      setTimeout(() => {
        setIsloading(false);
        router.push(`/booking-extras?valid=${reservationData?.vehicle._id}`);
      }, 1000);
      // Close modal
      // setIsModalOpen(false);
    } catch (error) {
      console.error('Error saving reservation:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderTabContent = (vehicles, isLoading) => {
    if (isLoading) {
      return (
        <div className='col-span-full flex items-center justify-center w-full h-64'>
          <Spin size='default' />
        </div>
      );
    }
    if (!vehicles?.data?.result?.length) {
      return <p className="text-center py-8">No vehicles available</p>;
    }
    return vehicles.data.result.map((vehicle) => (
      <CarCard
        key={vehicle._id}
        car={vehicle}
        onBookNow={handleBookNow}
      />
    ));
  };

  const items = [
    {
      key: '1',
      label: <TabLabel text="Recent Cars" />,
      children: (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {renderTabContent(recentVehicles, isRecentLoading)}
        </div>
      ),
    },
    // {
    //   key: '2',
    //   label: <TabLabel text="Featured Cars" />,
    //   children: (
    //     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
    //       {renderTabContent(recentVehicles, isRecentLoading)}
    //     </div>
    //   ),
    // },
    {
      key: '3',
      label: <TabLabel text="Popular Cars" />,
      children: (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {renderTabContent(popularVehicles, isPopularLoading)}
        </div>
      ),
    },
  ];

  return (
    <div className="container mx-auto sm:px-0 px-3 py-6 md:py-16">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Explore Vehicles</h1>
        <ViewAllLink />
      </div>

      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        items={items}
        className="car-tabs"
        tabBarStyle={{ fontSize: 'inherit' }}
      />

      <ReservationModal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        selectedCar={selectedCar}
        onSubmit={handleReservationSubmit}
        isloading={isloading}

        locationsData={locationsData}
        locationsLoading={locationsLoading}
      // Add locationsData and locationsLoading props if you have them
      />
    </div>
  );
}

const TabLabel = ({ text }) => (
  <span className="text-xs sm:text-sm md:text-base">{text}</span>
);

const ViewAllLink = () => (
  <a href="/fleet" className="text-green-500 flex items-center hover:underline text-sm sm:text-base">
    View All <ArrowRightOutlined className="ml-1" />
  </a>
);