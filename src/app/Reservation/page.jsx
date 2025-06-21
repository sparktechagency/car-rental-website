"use client";

import {
  ArrowRightOutlined,
  CarOutlined,
  DatabaseOutlined,
  UserOutlined
} from '@ant-design/icons';
import {
  Button,
  Card,
  Checkbox,
  Collapse,
  Empty,
  Radio,
  Rate,
  Slider,
  Spin
} from 'antd';
import { Calendar, MapPin } from "lucide-react";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { baseURL } from '../../../utils/BaseURL';
import { useGetAllVehiclesQuery, useSeatDoorLuggageBrandsQuery } from '../../features/reservation_page/reservationApi';

const { Panel } = Collapse;

export default function CarRental() {
  const [reservation, setReservation] = useState([]);
  const [filters, setFilters] = useState({
    transmission: '',
    seats: 0,
    priceRange: [0, 1000],
    searchTerm: '',
    doors: 0,
    luggage: 0,
    brands: []
  });

  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, error, refetch } = useGetAllVehiclesQuery({
    searchTerm: filters.searchTerm,
    page: currentPage
  });

  const { data: seatDoorLuggageBrands, isLoading: seatDoorLuggageBrandsLoading } = useSeatDoorLuggageBrandsQuery();
  const router = useRouter();

  useEffect(() => {
    // Only access localStorage on client side
    if (typeof window !== 'undefined') {
      const reservationData = localStorage.getItem("reservation");
      if (reservationData) {
        setReservation(JSON.parse(reservationData));
      }
    }
  }, []);

  // Apply filters to the data
  const filteredVehicles = data?.data?.result?.filter(vehicle => {
    // Transmission filter
    if (filters.transmission &&
      vehicle.transmissionType.toLowerCase() !== filters.transmission.toLowerCase()) {
      return false;
    }

    // Seats filter
    if (filters.seats > 0 && vehicle.noOfSeats < filters.seats) {
      return false;
    }

    // Price filter
    if (vehicle.dailyRate < filters.priceRange[0] || vehicle.dailyRate > filters.priceRange[1]) {
      return false;
    }

    // Doors filter
    if (filters.doors > 0 && vehicle.noOfDoors < filters.doors) {
      return false;
    }

    // Luggage filter
    if (filters.luggage > 0 && vehicle.noOfLuggages < filters.luggage) {
      return false;
    }

    // Brands filter
    if (filters.brands.length > 0 && !filters.brands.includes(vehicle.brand)) {
      return false;
    }

    return true;
  }) || [];

  const handleTransmissionChange = (e) => {
    setFilters({ ...filters, transmission: e.target.value });
    setCurrentPage(1);
  };

  const handleSeatsChange = (num) => {
    setFilters({ ...filters, seats: num });
    setCurrentPage(1);
  };

  const handleDoorsChange = (num) => {
    setFilters({ ...filters, doors: num });
    setCurrentPage(1);
  };

  const handleLuggageChange = (num) => {
    setFilters({ ...filters, luggage: num });
    setCurrentPage(1);
  };

  const handleBrandChange = (brand) => {
    setFilters(prev => ({
      ...prev,
      brands: prev.brands.includes(brand)
        ? prev.brands.filter(b => b !== brand)
        : [...prev.brands, brand]
    }));
    setCurrentPage(1);
  };

  const handlePriceChange = (value) => {
    setFilters({ ...filters, priceRange: value });
    setCurrentPage(1);
  };

  const handleValue = (vehicle) => {
    if (typeof window !== 'undefined') {
      const storedData = localStorage.getItem('reservation');
      let dataArray = storedData ? JSON.parse(storedData) : [];

      if (Array.isArray(dataArray)) {
        const updatedData = dataArray.map(obj => ({
          ...obj,
          ...vehicle
        }));
        localStorage.setItem('reservation', JSON.stringify(updatedData));
      }
    }
    router.push('/booking-extras');
  };

  const formatDate = (dateTimeString) => {
    if (!dateTimeString) return '';
    const date = new Date(dateTimeString);
    if (isNaN(date.getTime())) return dateTimeString;

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formatTime = (timeString) => {
    if (!timeString) return '';

    let date = new Date(timeString);
    if (isNaN(date.getTime())) {
      const [hours, minutes] = timeString.split(':').map(Number);
      if (!isNaN(hours) && !isNaN(minutes)) {
        date = new Date();
        date.setHours(hours, minutes, 0, 0);
      }
    }
    if (isNaN(date.getTime())) return timeString;

    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours || 12;
    return `${hours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
  };

  // Calculate total pages from API meta data
  const totalPages = data?.data?.meta?.totalPage || 1;

  // Get unique sorted values for filters
  const seatOptions = seatDoorLuggageBrands?.data?.seatCounts
    ? [...new Set(seatDoorLuggageBrands.data.seatCounts)].sort((a, b) => a - b)
    : [4, 5, 7];

  const doorOptions = seatDoorLuggageBrands?.data?.doorCounts
    ? [...new Set(seatDoorLuggageBrands.data.doorCounts)].sort((a, b) => a - b)
    : [4, 5, 6, 7, 50];

  const luggageOptions = seatDoorLuggageBrands?.data?.luggageCounts
    ? [...new Set(seatDoorLuggageBrands.data.luggageCounts)].sort((a, b) => a - b)
    : [4, 6, 7, 8, 40];

  const brandOptions = seatDoorLuggageBrands?.data?.brands
    ? [...new Set(seatDoorLuggageBrands.data.brands)].sort()
    : ["Ford", "Forida", "Forida Apa", "Toyota", "Toyota7"];

  const currentVehicle = reservation.length > 0 ? reservation[0] : {};

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <div className="flex items-center mb-2">
          <CarOutlined className="mr-2" />
          <h2 className="text-lg font-semibold">Choose your car</h2>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="bg-green-500 h-full" style={{ width: "25%" }}></div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Left sidebar */}
        <div className="md:w-1/4 flex flex-col gap-2">
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Location
              </h2>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Pick-up
                </h3>

                <div className="flex items-start gap-3 mb-3">
                  <MapPin className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-gray-700 font-medium">
                      {currentVehicle.pickupLocationName || 'Not specified'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  <p className="text-gray-700">
                    {formatDate(reservation[0]?.pickupDate)},{" "}
                    {formatTime(reservation[0]?.pickupTime)}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Return
                </h3>

                <div className="flex items-start gap-3 mb-3">
                  <MapPin className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-gray-700 font-medium">
                      {currentVehicle.returnLocationName || 'Not specified'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  <p className="text-gray-700">
                    {formatDate(reservation[0]?.returnDate)},{" "}
                    {formatTime(reservation[0]?.returnTime)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="border p-5 border-gray-200 rounded-md">
            <div className="mb-4 pb-2 border-b border-gray-200">
              <h3 className="font-bold mb-4">Filter</h3>
            </div>

            <Collapse
              bordered={false}
              defaultActiveKey={["price", "transmission", "seats", "doors", "luggage", "brands"]}
            >
              {/* Price Filter */}
              <Panel header="Price Range" key="price" className="filter-panel">
                <Slider
                  range
                  min={0}
                  max={1000}
                  value={filters.priceRange}
                  onChange={handlePriceChange}
                  trackStyle={[{ backgroundColor: "#10B981" }]}
                  handleStyle={[
                    { borderColor: "#10B981", backgroundColor: "#10B981" },
                    { borderColor: "#10B981", backgroundColor: "#10B981" }
                  ]}
                />
                <div className="flex justify-between mt-2">
                  <span>₦{filters.priceRange[0]}</span>
                  <span>₦{filters.priceRange[1]}</span>
                </div>
              </Panel>

              {/* Transmission Filter */}
              <Panel header="Transmission Type" key="transmission" className="filter-panel">
                <Radio.Group
                  onChange={handleTransmissionChange}
                  value={filters.transmission}
                >
                  <Radio value="" className="block mb-2">All</Radio>
                  <Radio value="automatic" className="block mb-2">Automatic</Radio>
                  <Radio value="manual" className="block">Manual</Radio>
                </Radio.Group>
              </Panel>

              {/* Seats Filter */}
              <Panel header="Seats Required" key="seats" className="filter-panel">
                <div className="grid grid-cols-3 gap-3">
                  <div
                    className={`flex justify-center items-center py-2 cursor-pointer text-center ${filters.seats === 0 ? "border border-green-500 text-green-500" : "border border-gray-300"
                      }`}
                    onClick={() => handleSeatsChange(0)}
                  >
                    All
                  </div>
                  {seatOptions.map((num) => (
                    <div
                      key={num}
                      className={`flex justify-center items-center py-2 cursor-pointer text-center ${filters.seats === num ? "border border-green-500 text-green-500" : "border border-gray-300"
                        }`}
                      onClick={() => handleSeatsChange(num)}
                    >
                      {num}
                    </div>
                  ))}
                </div>
              </Panel>

              {/* Doors Filter */}
              <Panel header="Doors Required" key="doors" className="filter-panel">
                <div className="grid grid-cols-3 gap-3">
                  <div
                    className={`flex justify-center items-center py-2 cursor-pointer text-center ${filters.doors === 0 ? "border border-green-500 text-green-500" : "border border-gray-300"
                      }`}
                    onClick={() => handleDoorsChange(0)}
                  >
                    All
                  </div>
                  {doorOptions.map((num) => (
                    <div
                      key={num}
                      className={`flex justify-center items-center py-2 cursor-pointer text-center ${filters.doors === num ? "border border-green-500 text-green-500" : "border border-gray-300"
                        }`}
                      onClick={() => handleDoorsChange(num)}
                    >
                      {num}
                    </div>
                  ))}
                </div>
              </Panel>

              {/* Luggage Filter */}
              <Panel header="Luggage Capacity" key="luggage" className="filter-panel">
                <div className="grid grid-cols-3 gap-3">
                  <div
                    className={`flex justify-center items-center py-2 cursor-pointer text-center ${filters.luggage === 0 ? "border border-green-500 text-green-500" : "border border-gray-300"
                      }`}
                    onClick={() => handleLuggageChange(0)}
                  >
                    All
                  </div>
                  {luggageOptions.map((num) => (
                    <div
                      key={num}
                      className={`flex justify-center items-center py-2 cursor-pointer text-center ${filters.luggage === num ? "border border-green-500 text-green-500" : "border border-gray-300"
                        }`}
                      onClick={() => handleLuggageChange(num)}
                    >
                      {num}
                    </div>
                  ))}
                </div>
              </Panel>

              {/* Brands Filter */}
              <Panel header="Brands" key="brands" className="filter-panel">
                <div className="space-y-2">
                  {brandOptions.map((brand) => (
                    <div
                      key={brand}
                      className="flex items-center cursor-pointer gap-2"
                      onClick={() => handleBrandChange(brand)}
                    >
                      <Checkbox checked={filters.brands.includes(brand)} className="mr-2" />
                      <span>{brand}</span>
                    </div>
                  ))}
                </div>
              </Panel>
            </Collapse>
          </div>
        </div>

        {/* Main content */}
        <div className="md:w-3/4">
          {isLoading ? (
            <div className="h-[300px] w-full flex justify-center items-center">
              <Spin size="default" />
            </div>
          ) : error ? (
            <div className="flex justify-center items-center h-64">
              <p>Error loading vehicles. Please try again.</p>
            </div>
          ) : filteredVehicles.length === 0 ? (
            <div className="flex justify-center items-center h-64">
              <Empty description="No vehicles found matching your criteria" />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {filteredVehicles.map((vehicle) => (
                  <div key={vehicle._id} className="mb-8">
                    <Card
                      hoverable
                      cover={
                        <img
                          alt={vehicle.name}
                          src={`${baseURL}${vehicle.image}` || "/images/default-car.jpg"}
                          className="w-full h-48 object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/images/default-car.jpg";
                          }}
                        />
                      }
                      style={{ padding: "12px" }}
                      className="h-full"
                    >
                      <div className="flex justify-between items-center mb-1">
                        <div className="flex items-center">
                          <Rate disabled defaultValue={4.5} className="text-xs" />
                          <span className="text-xs text-gray-500 ml-1">
                            ({(vehicle.bookings?.length || 0) + 10} Reviews)
                          </span>
                        </div>
                        <span
                          className={`text-xs px-2 py-1 rounded ${vehicle.status === "AVAILABLE"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                            }`}
                        >
                          {vehicle.status}
                        </span>
                      </div>

                      <h3 className="font-bold mb-1">
                        {vehicle.brand} {vehicle.model}
                      </h3>
                      <p className="text-xs text-gray-500 mb-1">Starts From</p>
                      <p className="text-green-500 font-bold mb-2">
                        ₦ {vehicle.dailyRate?.toLocaleString()}/Day
                      </p>

                      <div className="flex justify-between mb-3">
                        <div className="flex items-center">
                          <UserOutlined className="mr-1 text-gray-500" />
                          <span className="text-xs">
                            {vehicle.noOfSeats} Seats
                          </span>
                        </div>
                        <div className="flex items-center">
                          <DatabaseOutlined className="mr-1 text-gray-500" />
                          <span className="text-xs">
                            {vehicle.noOfLuggages}
                          </span>
                        </div>
                      </div>

                      <div className="flex justify-between mb-3">
                        <div className="flex items-center">
                          <CarOutlined className="mr-1 text-gray-500" />
                          <span className="text-xs">
                            {vehicle.noOfDoors} Doors
                          </span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-xs capitalize">
                            {vehicle.transmissionType.toLowerCase()}
                          </span>
                        </div>
                      </div>

                      <Button
                        onClick={() => handleValue(vehicle)}
                        className="Vehicles"
                        block
                        disabled={vehicle.status !== "AVAILABLE"}
                      >
                        {vehicle.status === "AVAILABLE" ? "BOOK NOW" : "NOT AVAILABLE"}
                      </Button>
                    </Card>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-4">
                  <ul className="flex">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <li
                          key={page}
                          className={`mx-1 w-8 h-8 flex items-center justify-center rounded-md ${currentPage === page
                            ? "bg-green-500 text-white"
                            : "border border-gray-300"
                            }`}
                        >
                          <button
                            className="w-full h-full"
                            onClick={() => setCurrentPage(page)}
                          >
                            {page}
                          </button>
                        </li>
                      )
                    )}
                    {currentPage < totalPages && (
                      <li className="mx-1 w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md">
                        <button
                          className="w-full h-full"
                          onClick={() => setCurrentPage(currentPage + 1)}
                        >
                          <ArrowRightOutlined />
                        </button>
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}