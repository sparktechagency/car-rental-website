"use client";
import { CalendarOutlined, ClockCircleOutlined, PlusOutlined, SearchOutlined, StarFilled } from '@ant-design/icons';
import { Button, Checkbox, DatePicker, Input, Modal, Pagination, Select, Spin, TimePicker } from 'antd';
import dayjs from 'dayjs';
import debounce from 'lodash.debounce';
import { useEffect, useRef, useState } from 'react';
import { baseURL } from '../../../utils/BaseURL';
import { useGetAllVehiclesQuery } from '../../features/fleet_page/FleetApi';
import { useGetLocationQuery } from '../../features/LocationApi';

export default function Fleet() {
  // Vehicle listing states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCar, setSelectedCar] = useState(null);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const searchInputRef = useRef(null);

  // Reservation form states
  const now = dayjs();
  const defaultReturnTime = now.add(3, 'hour');

  const [sameLocation, setSameLocation] = useState(true);
  const [pickupLocationId, setPickupLocationId] = useState('');
  const [returnLocationId, setReturnLocationId] = useState('');
  const [pickupLocationName, setPickupLocationName] = useState('');
  const [returnLocationName, setReturnLocationName] = useState('');
  const [customPickupLocation, setCustomPickupLocation] = useState('');
  const [customReturnLocation, setCustomReturnLocation] = useState('');
  const [showCustomPickupInput, setShowCustomPickupInput] = useState(false);
  const [showCustomReturnInput, setShowCustomReturnInput] = useState(false);
  const [pickupDate, setPickupDate] = useState(now);
  const [returnDate, setReturnDate] = useState(defaultReturnTime);
  const [pickupTime, setPickupTime] = useState(now);
  const [returnTime, setReturnTime] = useState(defaultReturnTime);
  const [isloading, setIsloading] = useState(false);
  const [errors, setErrors] = useState({
    pickupDate: '',
    pickupTime: '',
    returnDate: '',
    returnTime: '',
    pickupLocation: '',
    returnLocation: ''
  });

  // API queries
  const { data: vehiclesData, isLoading: vehiclesLoading, error: vehiclesError } =
    useGetAllVehiclesQuery({ searchTerm: debouncedSearchTerm, page: currentPage });
  const { data: locationsData, isLoading: locationsLoading } = useGetLocationQuery();

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

  // Set default location when locations are loaded
  useEffect(() => {
    if (locationsData?.data?.result?.length > 0) {
      const defaultLocation = locationsData.data.result[0];
      setPickupLocationId(defaultLocation._id);
      setPickupLocationName(defaultLocation.location);
      setReturnLocationId(defaultLocation._id);
      setReturnLocationName(defaultLocation.location);
    }
  }, [locationsData]);

  const handleValues = () => ({
    pickupDate: pickupDate ? pickupDate.format('YYYY-MM-DD') : null,
    returnDate: returnDate ? returnDate.format('YYYY-MM-DD') : null,
    pickupTime: pickupTime ? pickupTime.format('HH:mm') : null,
    returnTime: returnTime ? returnTime.format('HH:mm') : null,
    pickupLocationId,
    pickupLocationName,
    returnLocationId,
    returnLocationName,
    sameLocation,
    vehicle: selectedCar
  });

  const handleLocationChange = (checked) => {
    setSameLocation(checked);
    if (checked) {
      setReturnLocationId(pickupLocationId);
      setReturnLocationName(pickupLocationName);
      setErrors({ ...errors, returnLocation: '' });
    }
  };

  const handlePickupLocationChange = (value, option) => {
    if (value === 'custom') {
      setShowCustomPickupInput(true);
      return;
    }
    setPickupLocationId(value);
    setPickupLocationName(option.label);
    setErrors({ ...errors, pickupLocation: '' });
    if (sameLocation) {
      setReturnLocationId(value);
      setReturnLocationName(option.label);
      setErrors({ ...errors, returnLocation: '' });
    }
  };

  const handleReturnLocationChange = (value, option) => {
    if (value === 'custom') {
      setShowCustomReturnInput(true);
      return;
    }
    setReturnLocationId(value);
    setReturnLocationName(option.label);
    setErrors({ ...errors, returnLocation: '' });
  };

  const handleCustomPickupSubmit = () => {
    if (!customPickupLocation.trim()) {
      setErrors({ ...errors, pickupLocation: 'Please enter a pickup location' });
      return;
    }
    setPickupLocationId('custom');
    setPickupLocationName(customPickupLocation);
    setErrors({ ...errors, pickupLocation: '' });
    if (sameLocation) {
      setReturnLocationId('custom');
      setReturnLocationName(customPickupLocation);
      setErrors({ ...errors, returnLocation: '' });
    }
    setShowCustomPickupInput(false);
    setCustomPickupLocation('');
  };

  const handleCustomReturnSubmit = () => {
    if (!customReturnLocation.trim()) {
      setErrors({ ...errors, returnLocation: 'Please enter a return location' });
      return;
    }
    setReturnLocationId('custom');
    setReturnLocationName(customReturnLocation);
    setErrors({ ...errors, returnLocation: '' });
    setShowCustomReturnInput(false);
    setCustomReturnLocation('');
  };

  const handlePickupDateChange = (date) => {
    setPickupDate(date);
    setErrors({ ...errors, pickupDate: '' });
    if (date && pickupTime) {
      const pickupDateTime = dayjs(date).hour(pickupTime.hour()).minute(pickupTime.minute());
      const returnDateTime = pickupDateTime.add(3, 'hour');
      setReturnDate(returnDateTime);
      setReturnTime(returnDateTime);
    } else if (date && !returnDate) {
      setReturnDate(date);
    }
  };

  const handlePickupTimeChange = (time) => {
    setPickupTime(time);
    setErrors({ ...errors, pickupTime: '' });
    if (pickupDate && pickupDate.isSame(dayjs(), 'day') && time) {
      const pickupDateTime = dayjs(pickupDate).hour(time.hour()).minute(time.minute());
      if (pickupDateTime.isBefore(dayjs())) {
        setErrors({ ...errors, pickupTime: 'Pickup time cannot be in the past' });
        return;
      }
    }
    if (pickupDate && time) {
      const pickupDateTime = dayjs(pickupDate).hour(time.hour()).minute(time.minute());
      const returnDateTime = pickupDateTime.add(3, 'hour');
      setReturnDate(returnDateTime);
      setReturnTime(returnDateTime);
    }
  };

  const handleReturnDateChange = (date) => {
    setReturnDate(date);
    setErrors({ ...errors, returnDate: '' });
  };

  const handleReturnTimeChange = (time) => {
    setReturnTime(time);
    setErrors({ ...errors, returnTime: '' });
  };

  const isPickupInPast = (date, time) => {
    if (!date || !time) return false;
    const pickupDateTime = dayjs(date).hour(time.hour()).minute(time.minute());
    return pickupDateTime.isBefore(dayjs());
  };

  const isMinimumDuration = (pickupDate, pickupTime, returnDate, returnTime) => {
    if (!pickupDate || !pickupTime || !returnDate || !returnTime) return true;
    const pickup = dayjs(pickupDate).hour(pickupTime.hour()).minute(pickupTime.minute());
    const returnDateTime = dayjs(returnDate).hour(returnTime.hour()).minute(returnTime.minute());
    const diffInHours = returnDateTime.diff(pickup, 'hour', true);
    return diffInHours >= 3;
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      pickupDate: '',
      pickupTime: '',
      returnDate: '',
      returnTime: '',
      pickupLocation: '',
      returnLocation: ''
    };

    if (!pickupDate) {
      newErrors.pickupDate = 'Please select a pickup date';
      valid = false;
    }
    if (!pickupTime) {
      newErrors.pickupTime = 'Please select a pickup time';
      valid = false;
    }
    if (!returnDate) {
      newErrors.returnDate = 'Please select a return date';
      valid = false;
    }
    if (!returnTime) {
      newErrors.returnTime = 'Please select a return time';
      valid = false;
    }
    if (!pickupLocationId) {
      newErrors.pickupLocation = 'Please select a pickup location';
      valid = false;
    }
    if (!returnLocationId) {
      newErrors.returnLocation = 'Please select a return location';
      valid = false;
    }

    if (pickupDate && pickupTime && isPickupInPast(pickupDate, pickupTime)) {
      newErrors.pickupTime = 'Pickup date and time cannot be in the past';
      valid = false;
    }

    if (pickupDate && pickupTime && returnDate && returnTime && !isMinimumDuration(pickupDate, pickupTime, returnDate, returnTime)) {
      newErrors.returnTime = 'Minimum reservation length is 3 hours';
      valid = false;
    }

    if (pickupDate && returnDate && returnDate.isBefore(pickupDate)) {
      newErrors.returnDate = 'Return date cannot be before pickup date';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;
    if (!selectedCar) return;

    const values = handleValues();
    setIsloading(true);

    const existingReservations = JSON.parse(localStorage.getItem("reservation")) || [];
    const updatedReservations = [...existingReservations, values];
    localStorage.setItem("reservation", JSON.stringify(updatedReservations));

    setIsloading(false);
    setIsModalOpen(false);
    window.location.href = "/booking-extras";
  };

  const showModal = (car) => {
    setSelectedCar(car);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSameLocation(true);
    if (locationsData?.data?.result?.length > 0) {
      const defaultLocation = locationsData.data.result[0];
      setPickupLocationId(defaultLocation._id);
      setPickupLocationName(defaultLocation.location);
      setReturnLocationId(defaultLocation._id);
      setReturnLocationName(defaultLocation.location);
    }
    setCustomPickupLocation('');
    setCustomReturnLocation('');
    setShowCustomPickupInput(false);
    setShowCustomReturnInput(false);
    setPickupDate(now);
    setReturnDate(defaultReturnTime);
    setPickupTime(now);
    setReturnTime(defaultReturnTime);
    setErrors({
      pickupDate: '',
      pickupTime: '',
      returnDate: '',
      returnTime: '',
      pickupLocation: '',
      returnLocation: ''
    });
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const disabledPickupDate = (current) => {
    return current && current < dayjs().startOf('day');
  };

  const disabledReturnDate = (current) => {
    const minDate = pickupDate || dayjs();
    return current && current < minDate.startOf('day');
  };

  const disabledPickupTime = () => {
    if (!pickupDate || !pickupDate.isSame(dayjs(), 'day')) {
      return { disabledHours: () => [], disabledMinutes: () => [] };
    }
    const now = dayjs();
    const currentHour = now.hour();
    const currentMinute = now.minute();
    return {
      disabledHours: () => {
        const hours = [];
        for (let i = 0; i < currentHour; i++) hours.push(i);
        return hours;
      },
      disabledMinutes: (selectedHour) => {
        if (selectedHour === currentHour) {
          const minutes = [];
          for (let i = 0; i <= currentMinute; i++) minutes.push(i);
          return minutes;
        }
        return [];
      },
    };
  };

  const disabledReturnTime = () => {
    if (!pickupDate || !pickupTime || !returnDate) {
      return { disabledHours: () => [], disabledMinutes: () => [] };
    }
    if (returnDate.isSame(pickupDate, 'day')) {
      const minReturnTime = pickupTime.add(3, 'hour');
      const minHour = minReturnTime.hour();
      const minMinute = minReturnTime.minute();
      return {
        disabledHours: () => {
          const hours = [];
          for (let i = 0; i < minHour; i++) hours.push(i);
          return hours;
        },
        disabledMinutes: (selectedHour) => {
          if (selectedHour === minHour) {
            const minutes = [];
            for (let i = 0; i < minMinute; i++) minutes.push(i);
            return minutes;
          } else if (selectedHour < minHour) {
            const minutes = [];
            for (let i = 0; i < 60; i++) minutes.push(i);
            return minutes;
          }
          return [];
        },
      };
    }
    return { disabledHours: () => [], disabledMinutes: () => [] };
  };

  const createLocationOptions = () => {
    const apiOptions = locationsData?.data?.result?.map(location => ({
      value: location._id,
      label: location.location
    })) || [];

    return [
      ...apiOptions,
      {
        value: 'custom',
        label: (
          <div className="flex items-center text-green-500">
            <PlusOutlined className="mr-1" />
            <span>Add custom location</span>
          </div>
        )
      }
    ];
  };

  const locationOptions = createLocationOptions();

  if (vehiclesLoading) {
    return <div className="container mx-auto p-4 text-center"><Spin size="large" /></div>;
  }
  if (vehiclesError) {
    return <div className="container mx-auto p-4 text-center text-red-500">Error loading vehicles: {vehiclesError.message}</div>;
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
          <div key={car._id} className="flex flex-col md:flex-row bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
            {/* Image */}
            <div className="md:w-64 lg:w-72 bg-gray-100">
              <img
                src={car.image ? `${baseURL}${car.image}` : '/images/default-car.jpg'}
                alt={`${car.brand} ${car.model}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/images/default-car.jpg';
                }}
              />
            </div>
            {/* Content */}
            <div className="flex-1 p-4 md:p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{car.brand} {car.model}</h2>
                  <div className="flex items-center mt-1">
                    <p className="font-medium mr-2">4.8</p>
                    <StarFilled className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-gray-500 text-sm ml-1">(162 Reviews)</span>
                  </div>
                </div>
                <div className="mt-2 md:mt-0 text-right">
                  <p className="text-sm text-gray-600">Starts From</p>
                  <p className="text-lg font-bold text-green-500">₦ {car.dailyRate?.toLocaleString() || '0'}/Day</p>
                </div>
              </div>
              <div className="mb-4">
                <p className="text-gray-700 mb-3">{car.shortDescription || 'Premium vehicle for your business needs or luxury trips.'}</p>
                <p className="text-gray-700">{car.vehicleType} - {car.fuelType} - {car.transmissionType}</p>
              </div>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="flex items-center space-x-4 mb-4 md:mb-0">
                  <div className="flex items-center space-x-1 text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    <span>{car.noOfSeats} Seats</span>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                    </svg>
                    <span>{car.noOfDoors} Doors</span>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                    <span>{car.transmissionType}</span>
                  </div>
                </div>
                <button
                  onClick={() => showModal(car)}
                  className={`bg-yellow-500 hover:bg-yellow-600 text-gray-900 cursor-pointer font-bold py-3 px-6 rounded ${car.status !== 'AVAILABLE' ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={car.status !== 'AVAILABLE'}
                >
                  {car.status === 'AVAILABLE' ? 'BOOK NOW' : 'RENTED'}
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

      {/* Reservation Modal */}
      <Modal
        title={null}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        width={500}
        centered
        destroyOnClose
      >
        <div className="w-full flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-sm px-4 sm:px-6 py-6 sm:py-8 w-full max-w-md">
            <Spin spinning={isloading} tip="Processing your reservation...">
              <h2 className="text-xl sm:text-2xl font-bold text-center mb-4 sm:mb-6 text-gray-800">RESERVATION</h2>
              {selectedCar && (
                <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <img
                      src={selectedCar.image ? `${baseURL}${selectedCar.image}` : '/images/default-car.jpg'}
                      alt={`${selectedCar.brand} ${selectedCar.model}`}
                      className="w-16 h-16 object-cover rounded mr-3"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/images/default-car.jpg';
                      }}
                    />
                    <div>
                      <h3 className="font-bold">{selectedCar.brand} {selectedCar.model}</h3>
                      <p className="text-green-600 font-semibold">₦{selectedCar.dailyRate?.toLocaleString() || '0'}/day</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {/* Pick-up Date */}
                <div className="col-span-1">
                  <DatePicker
                    placeholder="Pick-up date*"
                    className="w-full"
                    format="DD/MM/YYYY"
                    suffixIcon={<CalendarOutlined className="text-green-500" />}
                    style={{ borderColor: errors.pickupDate ? '#ff4d4f' : '#10B981' }}
                    allowClear={false}
                    disabledDate={disabledPickupDate}
                    onChange={handlePickupDateChange}
                    value={pickupDate}
                  />
                  {errors.pickupDate && <div className="text-red-500 text-xs mt-1">{errors.pickupDate}</div>}
                </div>
                {/* Pick-up Time */}
                <div className="col-span-1">
                  <TimePicker
                    placeholder="Pick-up time*"
                    className="w-full"
                    format="HH:mm"
                    suffixIcon={<ClockCircleOutlined className="text-green-500" />}
                    style={{ borderColor: errors.pickupTime ? '#ff4d4f' : '#10B981' }}
                    allowClear={false}
                    disabledTime={disabledPickupTime}
                    onChange={handlePickupTimeChange}
                    value={pickupTime}
                  />
                  {errors.pickupTime && <div className="text-red-500 text-xs mt-1">{errors.pickupTime}</div>}
                </div>
                {/* Return Date */}
                <div className="col-span-1">
                  <DatePicker
                    placeholder="Return date*"
                    className="w-full"
                    format="DD/MM/YYYY"
                    suffixIcon={<CalendarOutlined className="text-green-500" />}
                    style={{ borderColor: errors.returnDate ? '#ff4d4f' : '#10B981' }}
                    allowClear={false}
                    disabledDate={disabledReturnDate}
                    onChange={handleReturnDateChange}
                    value={returnDate}
                  />
                  {errors.returnDate && <div className="text-red-500 text-xs mt-1">{errors.returnDate}</div>}
                </div>
                {/* Return Time */}
                <div className="col-span-1">
                  <TimePicker
                    placeholder="Return time*"
                    className="w-full"
                    format="HH:mm"
                    suffixIcon={<ClockCircleOutlined className="text-green-500" />}
                    style={{ borderColor: errors.returnTime ? '#ff4d4f' : '#10B981' }}
                    allowClear={false}
                    disabledTime={disabledReturnTime}
                    onChange={handleReturnTimeChange}
                    value={returnTime}
                  />
                  {errors.returnTime && <div className="text-red-500 text-xs mt-1">{errors.returnTime}</div>}
                </div>
              </div>

              {/* Pick-up Location */}
              <div className="mt-3 sm:mt-4">
                <p className="text-xs text-gray-500 mb-1">Pick-up Location*</p>
                {showCustomPickupInput ? (
                  <div>
                    <div className="flex">
                      <Input
                        placeholder="Enter custom location*"
                        value={customPickupLocation}
                        onChange={(e) => setCustomPickupLocation(e.target.value)}
                        style={{ borderColor: errors.pickupLocation ? '#ff4d4f' : '#10B981' }}
                        className="flex-1"
                      />
                      <Button
                        type="primary"
                        onClick={handleCustomPickupSubmit}
                        style={{ backgroundColor: '#10B981', borderColor: '#10B981', marginLeft: '8px' }}
                      >
                        Save
                      </Button>
                    </div>
                    {errors.pickupLocation && <div className="text-red-500 text-xs mt-1">{errors.pickupLocation}</div>}
                  </div>
                ) : (
                  <div>
                    <Select
                      className="w-full"
                      value={pickupLocationId || undefined}
                      onChange={handlePickupLocationChange}
                      options={locationOptions}
                      style={{ borderColor: errors.pickupLocation ? '#ff4d4f' : '#10B981' }}
                      placeholder="Select your pickup location"
                      loading={locationsLoading}
                      notFoundContent={locationsLoading ? <Spin size="small" /> : "No locations found"}
                      optionLabelProp="label"
                    >
                      {locationOptions.map(option => (
                        <Select.Option
                          key={option.value}
                          value={option.value}
                          label={option.label}
                        >
                          {option.label}
                        </Select.Option>
                      ))}
                    </Select>
                    {errors.pickupLocation && <div className="text-red-500 text-xs mt-1">{errors.pickupLocation}</div>}
                  </div>
                )}
              </div>

              {/* Return Location */}
              <div className="mt-3 sm:mt-4">
                <p className="text-xs text-gray-500 mb-1">Return Location*</p>
                {showCustomReturnInput ? (
                  <div>
                    <div className="flex">
                      <Input
                        placeholder="Enter custom location*"
                        value={customReturnLocation}
                        onChange={(e) => setCustomReturnLocation(e.target.value)}
                        style={{ borderColor: errors.returnLocation ? '#ff4d4f' : '#10B981' }}
                        className="flex-1"
                      />
                      <Button
                        type="primary"
                        onClick={handleCustomReturnSubmit}
                        style={{ backgroundColor: '#10B981', borderColor: '#10B981', marginLeft: '8px' }}
                      >
                        Save
                      </Button>
                    </div>
                    {errors.returnLocation && <div className="text-red-500 text-xs mt-1">{errors.returnLocation}</div>}
                  </div>
                ) : (
                  <div>
                    <Select
                      className="w-full"
                      value={returnLocationId || undefined}
                      onChange={handleReturnLocationChange}
                      options={locationOptions}
                      disabled={sameLocation}
                      style={{ borderColor: errors.returnLocation ? '#ff4d4f' : '#10B981' }}
                      placeholder="Select your return location"
                      loading={locationsLoading}
                      notFoundContent={locationsLoading ? <Spin size="small" /> : "No locations found"}
                      optionLabelProp="label"
                    >
                      {locationOptions.map(option => (
                        <Select.Option
                          key={option.value}
                          value={option.value}
                          label={option.label}
                        >
                          {option.label}
                        </Select.Option>
                      ))}
                    </Select>
                    {errors.returnLocation && <div className="text-red-500 text-xs mt-1">{errors.returnLocation}</div>}
                  </div>
                )}
              </div>

              {/* Same Location Checkbox */}
              <div className="mt-3 sm:mt-4 flex items-center">
                <Checkbox
                  checked={sameLocation}
                  onChange={(e) => handleLocationChange(e.target.checked)}
                />
                <span className="ml-2 text-sm text-gray-600">Same as pick-up location</span>
              </div>

              {/* Submit Button */}
              <div className="mt-4 sm:mt-6">
                <Button
                  type="primary"
                  className="w-full h-12 sm:h-14 text-white font-medium text-base sm:text-lg"
                  onClick={handleSubmit}
                  style={{ backgroundColor: '#10B981', borderColor: '#10B981' }}
                >
                  MAKE RESERVATION
                </Button>
              </div>
            </Spin>
          </div>
        </div>
      </Modal>
    </div>
  );
}