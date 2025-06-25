"use client";
import CustomLoading from "@/components/CustomLoading";
import ReservationModal from "@/components/ReservationModal";
import { SearchOutlined, StarFilled } from "@ant-design/icons";
import { Input, Pagination } from "antd";
import debounce from "lodash.debounce";
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from "react";
import { baseURL } from "../../../utils/BaseURL";
import { useGetAllVehiclesQuery } from "../../features/fleet_page/FleetApi";
import { useGetLocationQuery } from "../../features/LocationApi";

export default function Fleet() {
  // Vehicle listing states
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCar, setSelectedCar] = useState(null);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isloading, setIsloading] = useState(false);
  const searchInputRef = useRef(null);
  const router = useRouter();

  // API queries
  const {
    data: vehiclesData,
    isLoading: vehiclesLoading,
    error: vehiclesError,
  } = useGetAllVehiclesQuery({
    searchTerm: debouncedSearchTerm,
    page: currentPage,
  });
  const { data: locationsData, isLoading: locationsLoading } =
    useGetLocationQuery();

  // Debounce search term
  useEffect(() => {
    const debouncer = debounce(() => {
      setDebouncedSearchTerm(searchTerm);
      setCurrentPage(1);
    }, 500);
    debouncer();
    return () => {
      debouncer.cancel();
    };
  }, [searchTerm]);

  // Focus search input when no results
  useEffect(() => {
    if (vehiclesData?.data?.result?.length === 0 && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [vehiclesData]);

  const showModal = (car) => {
    setSelectedCar(car);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSubmit = (values) => {
    setIsloading(true);

    // Create the modified vehicle data with reservation details
    const modifiedVehicleData = {
      ...selectedCar, // Keep all existing vehicle properties
      pickupDate: values.pickupDate,
      returnDate: values.returnDate,
      pickupTime: values.pickupTime,
      returnTime: values.returnTime,
      pickupLocationId: values.pickupLocationId,
      pickupLocationName: values.pickupLocationName,
      returnLocationId: values.returnLocationId,
      returnLocationName: values.returnLocationName,
      sameLocation: values.sameLocation,
      // Remove the vehicle property from values since we're merging with the actual vehicle data
    };

    const existingReservations = JSON.parse(localStorage.getItem("reservation")) || [];

    // Check if a reservation with the same vehicle ID already exists
    // const existingIndex = existingReservations.findIndex(
    //   (res) => res._id === selectedCar._id || res.id === selectedCar.id
    // );

    // let updatedReservations;
    // if (existingIndex !== -1) {
    //   // Update existing reservation
    //   updatedReservations = [...existingReservations];
    //   updatedReservations[existingIndex] = modifiedVehicleData;
    // } else {
    //   // Add new reservation
    //   updatedReservations = [...existingReservations, modifiedVehicleData];
    // }

    const updatedArr = existingReservations.map(existReservation => {

      return { ...existReservation, ...modifiedVehicleData };
    });

    localStorage.setItem("reservation", JSON.stringify(updatedArr));

    setIsloading(false);
    // setIsModalOpen(false);
    setTimeout(() => {
      router.push("/booking-extras");
    }, 1000);
  };

  if (vehiclesLoading) {
    return (
      <div className="">
        <CustomLoading />
      </div>
    );
  }
  if (vehiclesError) {
    return (
      <div className="container mx-auto p-4 text-center text-red-500">
        Error loading vehicles: {vehiclesError.message}
      </div>
    );
  }
  if (!vehiclesData?.data?.result || vehiclesData.data.result.length === 0) {
    return (
      <div className="container mx-auto p-4 text-center">
        <div className="max-w-xl mx-auto mb-8">
          <Input
            ref={searchInputRef}
            size="large"
            placeholder="Search by brand, model, or type"
            prefix={<SearchOutlined />}
            className="rounded-lg"
            value={searchTerm}
            onChange={handleSearch}
            allowClear
            autoFocus
          />
        </div>
        <p>No vehicles found matching your search criteria.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-xl mx-auto mb-8">
        <Input
          ref={searchInputRef}
          size="large"
          placeholder="Search by brand, model, or type"
          prefix={<SearchOutlined />}
          className="rounded-lg"
          value={searchTerm}
          onChange={handleSearch}
          allowClear
        />
      </div>

      <div className="space-y-6">
        {vehiclesData.data.result.map((car) => (
          <div
            key={car._id}
            className="flex flex-col md:flex-row bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200"
          >
            {/* Image */}
            <div className="md:w-64 lg:w-72 bg-gray-100">
              <img
                src={car.image && `${baseURL}${car.image}`}
                alt={`${car.brand}`}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Content */}
            <div className="flex-1 p-4 md:p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {car.brand} {car.model}
                  </h2>
                  <div className="flex items-center mt-1">
                    <p className="font-medium mr-2">4.8</p>
                    <StarFilled className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-gray-500 text-sm ml-1">
                      (162 Reviews)
                    </span>
                  </div>
                </div>
                <div className="mt-2 md:mt-0 text-right">
                  <p className="text-sm text-gray-600">Starts From</p>
                  <p className="text-lg font-bold text-green-500">
                    ₦ {car.dailyRate?.toLocaleString() || "0"}/Day
                  </p>
                </div>
              </div>
              <div className="mb-4">
                <p className="text-gray-700 mb-3">
                  {car.shortDescription ||
                    "Premium vehicle for your business needs or luxury trips."}
                </p>
                <p className="text-gray-700">
                  {car.vehicleType} - {car.fuelType} - {car.transmissionType}
                </p>
              </div>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="flex items-center space-x-4 mb-4 md:mb-0">
                  <div className="flex items-center space-x-1 text-gray-700">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                    <span>{car.noOfSeats} Seats</span>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-700">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                      />
                    </svg>
                    <span>{car.noOfDoors} Doors</span>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-700">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                      />
                    </svg>
                    <span>{car.transmissionType}</span>
                  </div>
                </div>
                <button
                  onClick={() => showModal(car)}
                  className={`bg-yellow-500 hover:bg-yellow-600 text-gray-900 cursor-pointer font-bold py-3 px-6 rounded ${car.status !== "AVAILABLE"
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                    }`}
                  disabled={car.status !== "AVAILABLE"}
                >
                  {car.status === "AVAILABLE" ? "BOOK NOW" : "RENTED"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="my-6 flex justify-end">
        <Pagination
          current={currentPage}
          total={vehiclesData.data.total || 0}
          pageSize={vehiclesData.data.limit || 10}
          onChange={handlePageChange}
          showSizeChanger={false}
          responsive
        />
      </div>

      <ReservationModal
        open={isModalOpen}
        onCancel={handleCancel}
        selectedCar={selectedCar}
        locationsData={locationsData}
        locationsLoading={locationsLoading}
        onSubmit={handleSubmit}
        isloading={isloading}
      />
    </div>
  );
}