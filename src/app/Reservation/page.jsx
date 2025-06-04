"use client";

import {
  ArrowRightOutlined,
  CarOutlined,
  DatabaseOutlined,
  EnvironmentOutlined,
  UserOutlined
} from '@ant-design/icons';
import {
  Button,
  Card,
  Checkbox,
  Collapse,
  DatePicker,
  Empty,
  Radio,
  Rate,
  Slider,
  Spin,
  TimePicker
} from 'antd';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { baseURL } from '../../../utils/BaseURL';
import { useGetAllVehiclesQuery, useSeatDoorLuggageBrandsQuery } from '../../features/reservation_page/reservationApi';

const { Panel } = Collapse;

export default function CarRental() {
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
    setFilters(prev => {
      const newBrands = prev.brands.includes(brand)
        ? prev.brands.filter(b => b !== brand)
        : [...prev.brands, brand];
      return { ...prev, brands: newBrands };
    });
    setCurrentPage(1);
  };

  const handlePriceChange = (value) => {
    setFilters({ ...filters, priceRange: value });
    setCurrentPage(1);
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



  const handleValue = (value) => {
    localStorage.setItem("vehicle", JSON.stringify(value));
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <div className="flex items-center mb-2">
          <CarOutlined className="mr-2" />
          <h2 className="text-lg font-semibold">Choose your car</h2>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="bg-green-500 h-full" style={{ width: '25%' }}></div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Left sidebar */}
        <div className="md:w-1/4">
          <div className="mb-8 border border-gray-200 rounded-md p-5">
            <h3 className="font-bold mb-4 border-b border-gray-200 pb-5">Location</h3>

            <div className="mb-4">
              <p className="font-semibold mb-2">Pick-up</p>
              <div className="flex items-start mb-2">
                <EnvironmentOutlined className="mt-1 mr-2 text-gray-500" />
                <div>
                  <p className="text-sm">Murtala Mohammed International Airport Lagos</p>
                </div>
              </div>
              <div className="flex items-center ml-6 gap-3">
                <DatePicker
                  size="small"
                  defaultValue={dayjs('2025-03-25')}
                  format="DD/MM/YYYY"
                  className="mr-2 w-32"
                />
                <TimePicker
                  size="small"
                  defaultValue={dayjs('12:00', 'HH:mm')}
                  format="HH:mm"
                  className="w-24"
                />
              </div>
            </div>

            <div>
              <p className="font-semibold mb-2">Return</p>
              <div className="flex items-start mb-2">
                <EnvironmentOutlined className="mt-1 mr-2 text-gray-500" />
                <div>
                  <p className="text-sm">Murtala Mohammed International Airport Lagos</p>
                </div>
              </div>
              <div className="flex items-center ml-6 gap-3">
                <DatePicker
                  size="small"
                  defaultValue={dayjs('2025-03-26')}
                  format="DD/MM/YYYY"
                  className="mr-2 w-32"
                />
                <TimePicker
                  size="small"
                  defaultValue={dayjs('16:00', 'HH:mm')}
                  format="HH:mm"
                  className="w-24"
                />
              </div>
            </div>
          </div>

          <div className='border p-5 border-gray-200 rounded-md'>
            <div className="mb-4 pb-2 border-b border-gray-200">
              <h3 className="font-bold mb-4">Filter</h3>
            </div>

            <Collapse bordered={false} defaultActiveKey={['price', 'transmission', 'seats', 'doors', 'luggage', 'brands']}>
              {/* Price Filter */}
              <Panel header="Price Range" key="price" className="filter-panel">
                <Slider
                  range
                  min={0}
                  max={1000}
                  value={filters.priceRange}
                  onChange={handlePriceChange}
                  trackStyle={[{ backgroundColor: '#10B981' }]}
                  handleStyle={[
                    { borderColor: '#10B981', backgroundColor: '#10B981' },
                    { borderColor: '#10B981', backgroundColor: '#10B981' }
                  ]}
                />
                <div className="flex justify-between mt-2">
                  <span>${filters.priceRange[0]}</span>
                  <span>${filters.priceRange[1]}</span>
                </div>
              </Panel>

              {/* Transmission Filter */}
              <Panel header="Transmission Type" key="transmission" className="filter-panel">
                <Radio.Group
                  onChange={handleTransmissionChange}
                  value={filters.transmission}
                >
                  <Radio value="" className="block mb-2">
                    <div className="flex items-center">
                      All
                    </div>
                  </Radio>
                  <Radio value="automatic" className="block mb-2">
                    <div className="flex items-center">
                      Automatic
                    </div>
                  </Radio>
                  <Radio value="manual" className="block">
                    <div className="flex items-center">
                      Manual
                    </div>
                  </Radio>
                </Radio.Group>
              </Panel>

              {/* Seats Filter */}
              <Panel header="Seats Required" key="seats" className="filter-panel">
                <div className="grid grid-cols-3 gap-3">
                  <div
                    className={`flex justify-center items-center py-2 cursor-pointer text-center ${filters.seats === 0 ? 'border border-green-500 text-green-500' : 'border border-gray-300'}`}
                    onClick={() => handleSeatsChange(0)}
                  >
                    All
                  </div>
                  {seatOptions.map(num => (
                    <div
                      key={num}
                      className={`flex justify-center items-center py-2 cursor-pointer text-center ${filters.seats === num ? 'border border-green-500 text-green-500' : 'border border-gray-300'}`}
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
                    className={`flex justify-center items-center py-2 cursor-pointer text-center ${filters.doors === 0 ? 'border border-green-500 text-green-500' : 'border border-gray-300'}`}
                    onClick={() => handleDoorsChange(0)}
                  >
                    All
                  </div>
                  {doorOptions.map(num => (
                    <div
                      key={num}
                      className={`flex justify-center items-center py-2 cursor-pointer text-center ${filters.doors === num ? 'border border-green-500 text-green-500' : 'border border-gray-300'}`}
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
                    className={`flex justify-center items-center py-2 cursor-pointer text-center ${filters.luggage === 0 ? 'border border-green-500 text-green-500' : 'border border-gray-300'}`}
                    onClick={() => handleLuggageChange(0)}
                  >
                    All
                  </div>
                  {luggageOptions.map(num => (
                    <div
                      key={num}
                      className={`flex justify-center items-center py-2 cursor-pointer text-center ${filters.luggage === num ? 'border border-green-500 text-green-500' : 'border border-gray-300'}`}
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
                  {brandOptions.map(brand => (
                    <div
                      key={brand}
                      className="flex items-center cursor-pointer gap-2"
                      onClick={() => handleBrandChange(brand)}
                    >
                      <Checkbox
                        checked={filters.brands.includes(brand)}
                        className="mr-2"
                      />
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
            <div className="flex justify-center items-center h-64">
              <Spin size="large" />
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
                          src={`${baseURL}${vehicle.image}` || '/images/default-car.jpg'}
                          className="w-full h-48 object-cover"
                        />
                      }
                      style={{ padding: '12px' }}
                      className="h-full"
                    >
                      <div className="flex justify-between items-center mb-1">
                        <div className="flex items-center">
                          <Rate
                            disabled
                            defaultValue={4.5}
                            className="text-xs"
                          />
                          <span className="text-xs text-gray-500 ml-1">
                            ({(vehicle.bookings?.length || 0) + 10} Reviews)
                          </span>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded ${vehicle.status === 'AVAILABLE'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                          }`}>
                          {vehicle.status}
                        </span>
                      </div>

                      <h3 className="font-bold mb-1">{vehicle.brand} {vehicle.model}</h3>
                      <p className="text-xs text-gray-500 mb-1">Starts From</p>
                      <p className="text-green-500 font-bold mb-2">
                        ₦ {vehicle.dailyRate?.toLocaleString()}/Day
                      </p>

                      <div className="flex justify-between mb-3">
                        <div className="flex items-center">
                          <UserOutlined className="mr-1 text-gray-500" />
                          <span className="text-xs">{vehicle.noOfSeats} Seats</span>
                        </div>
                        <div className="flex items-center">
                          <DatabaseOutlined className="mr-1 text-gray-500" />
                          <span className="text-xs">{vehicle.noOfLuggages}</span>
                        </div>
                      </div>

                      <div className="flex justify-between mb-3">
                        <div className="flex items-center">
                          <CarOutlined className="mr-1 text-gray-500" />
                          <span className="text-xs">{vehicle.noOfDoors} Doors</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-xs capitalize">
                            {vehicle.transmissionType.toLowerCase()}
                          </span>
                        </div>
                      </div>

                      <Button
                        onClick={() => {
                          handleValue(vehicle);
                          router.push(`/booking-extras?vehicleId=${vehicle._id}`);
                        }}
                        className="Vehicles"
                        block
                        disabled={vehicle.status !== 'AVAILABLE'}
                      >
                        {vehicle.status === 'AVAILABLE' ? 'BOOK NOW' : 'NOT AVAILABLE'}
                      </Button>
                    </Card>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-4">
                  <ul className="flex">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <li
                        key={page}
                        className={`mx-1 w-8 h-8 flex items-center justify-center rounded-md ${currentPage === page
                          ? 'bg-green-500 text-white'
                          : 'border border-gray-300'
                          }`}
                      >
                        <button
                          className="w-full h-full"
                          onClick={() => setCurrentPage(page)}
                        >
                          {page}
                        </button>
                      </li>
                    ))}
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