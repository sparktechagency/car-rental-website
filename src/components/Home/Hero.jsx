"use client";
import { CalendarOutlined, ClockCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Checkbox, DatePicker, Input, Select, Spin, TimePicker } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useGetLocationQuery } from '../../features/LocationApi';

const Hero = () => {
  const [sameLocation, setSameLocation] = useState(true);
  const [pickupLocationId, setPickupLocationId] = useState('');
  const [returnLocationId, setReturnLocationId] = useState('');
  const [customPickupLocation, setCustomPickupLocation] = useState('');
  const [customReturnLocation, setCustomReturnLocation] = useState('');
  const [showCustomPickupInput, setShowCustomPickupInput] = useState(false);
  const [showCustomReturnInput, setShowCustomReturnInput] = useState(false);

  // Set default values - current time for pickup, +3 hours for return
  const now = dayjs();
  const defaultReturnTime = now.add(3, 'hour');

  const { data: locations, isLoading: locationsLoading } = useGetLocationQuery();

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

  const handleValues = () => {
    return {
      pickupDate: pickupDate ? pickupDate.format('YYYY-MM-DD') : null,
      returnDate: returnDate ? returnDate.format('YYYY-MM-DD') : null,
      pickupTime: pickupTime ? pickupTime.format('HH:mm') : null,
      returnTime: returnTime ? returnTime.format('HH:mm') : null,
      pickupLocationId,
      returnLocationId,
      sameLocation
    };
  };

  // Helper function to check if pickup datetime is in the past
  const isPickupInPast = (date, time) => {
    if (!date || !time) return false;
    const pickupDateTime = dayjs(date).hour(time.hour()).minute(time.minute());
    return pickupDateTime.isBefore(dayjs());
  };

  // Helper function to check if return is at least 3 hours after pickup
  const isMinimumDuration = (pickupDate, pickupTime, returnDate, returnTime) => {
    if (!pickupDate || !pickupTime || !returnDate || !returnTime) return true;

    const pickup = dayjs(pickupDate).hour(pickupTime.hour()).minute(pickupTime.minute());
    const returnDateTime = dayjs(returnDate).hour(returnTime.hour()).minute(returnTime.minute());

    const diffInHours = returnDateTime.diff(pickup, 'hour', true);
    return diffInHours >= 3;
  };

  const handleLocationChange = (checked) => {
    setSameLocation(checked);
    if (checked) {
      setReturnLocationId(pickupLocationId);
      setErrors({ ...errors, returnLocation: '' });
    }
  };

  const handlePickupLocationChange = (value) => {
    if (value === 'custom') {
      setShowCustomPickupInput(true);
      return;
    }
    setPickupLocationId(value);
    setErrors({ ...errors, pickupLocation: '' });
    if (sameLocation) {
      setReturnLocationId(value);
      setErrors({ ...errors, returnLocation: '' });
    }
  };

  const handleReturnLocationChange = (value) => {
    if (value === 'custom') {
      setShowCustomReturnInput(true);
      return;
    }
    setReturnLocationId(value);
    setErrors({ ...errors, returnLocation: '' });
  };

  const handleCustomPickupSubmit = () => {
    if (!customPickupLocation.trim()) {
      setErrors({ ...errors, pickupLocation: 'Please enter a pickup location' });
      return;
    }
    setPickupLocationId(customPickupLocation);
    setErrors({ ...errors, pickupLocation: '' });
    if (sameLocation) {
      setReturnLocationId(customPickupLocation);
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
    setReturnLocationId(customReturnLocation);
    setErrors({ ...errors, returnLocation: '' });
    setShowCustomReturnInput(false);
    setCustomReturnLocation('');
  };

  const handlePickupDateChange = (date) => {
    setPickupDate(date);
    setErrors({ ...errors, pickupDate: '' });

    // Auto-set return date and time to 3 hours later
    if (date && pickupTime) {
      const pickupDateTime = dayjs(date).hour(pickupTime.hour()).minute(pickupTime.minute());
      const returnDateTime = pickupDateTime.add(3, 'hour');

      setReturnDate(returnDateTime);
      setReturnTime(returnDateTime);
    } else if (date && !returnDate) {
      // If no return date is set, set it to the same day by default
      setReturnDate(date);
    }
  };

  const handlePickupTimeChange = (time) => {
    setPickupTime(time);
    setErrors({ ...errors, pickupTime: '' });

    // Check if pickup time is in the past for today's date
    if (pickupDate && pickupDate.isSame(dayjs(), 'day') && time) {
      if (isPickupInPast(pickupDate, time)) {
        setErrors({ ...errors, pickupTime: 'Pickup time cannot be in the past' });
        return;
      }
    }

    // Auto-set return date and time to 3 hours later
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

    // Additional validations
    if (pickupDate && pickupTime && isPickupInPast(pickupDate, pickupTime)) {
      newErrors.pickupTime = 'Pickup date and time cannot be in the past';
      valid = false;
    }

    if (pickupDate && pickupTime && returnDate && returnTime) {
      if (!isMinimumDuration(pickupDate, pickupTime, returnDate, returnTime)) {
        newErrors.returnTime = 'Minimum reservation length is 3 hours';
        valid = false;
      }
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

    const values = handleValues();
    setIsloading(true);
    setTimeout(() => {
      localStorage.setItem("reservation", JSON.stringify([values]));
      setIsloading(false);
      window.location.href = "/reservation";
    }, 2000);
  };

  // Disable past dates for pickup
  const disabledPickupDate = (current) => {
    return current && current < dayjs().startOf('day');
  };

  // Disable past dates for return, and dates before pickup
  const disabledReturnDate = (current) => {
    const minDate = pickupDate || dayjs();
    return current && current < minDate.startOf('day');
  };

  // Disable past times for pickup (only for today)
  const disabledPickupTime = () => {
    if (!pickupDate || !pickupDate.isSame(dayjs(), 'day')) {
      return {
        disabledHours: () => [],
        disabledMinutes: () => [],
      };
    }

    const now = dayjs();
    const currentHour = now.hour();
    const currentMinute = now.minute();

    return {
      disabledHours: () => {
        const hours = [];
        for (let i = 0; i < currentHour; i++) {
          hours.push(i);
        }
        return hours;
      },
      disabledMinutes: (selectedHour) => {
        if (selectedHour === currentHour) {
          const minutes = [];
          for (let i = 0; i <= currentMinute; i++) {
            minutes.push(i);
          }
          return minutes;
        }
        return [];
      },
    };
  };

  // Disable return times that don't meet minimum 3-hour requirement
  const disabledReturnTime = () => {
    if (!pickupDate || !pickupTime || !returnDate) {
      return {
        disabledHours: () => [],
        disabledMinutes: () => [],
      };
    }

    // If return date is same as pickup date, check time constraints
    if (returnDate.isSame(pickupDate, 'day')) {
      const minReturnTime = pickupTime.add(3, 'hour');
      const minHour = minReturnTime.hour();
      const minMinute = minReturnTime.minute();

      return {
        disabledHours: () => {
          const hours = [];
          for (let i = 0; i < minHour; i++) {
            hours.push(i);
          }
          return hours;
        },
        disabledMinutes: (selectedHour) => {
          if (selectedHour === minHour) {
            const minutes = [];
            for (let i = 0; i < minMinute; i++) {
              minutes.push(i);
            }
            return minutes;
          } else if (selectedHour < minHour) {
            // Disable all minutes for hours before minimum hour
            const minutes = [];
            for (let i = 0; i < 60; i++) {
              minutes.push(i);
            }
            return minutes;
          }
          return [];
        },
      };
    }

    return {
      disabledHours: () => [],
      disabledMinutes: () => [],
    };
  };

  // Create location options from API data
  const createLocationOptions = () => {
    const apiOptions = locations?.data?.result?.map(location => ({
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
            <Spin size='small' spinning={isloading} tip="finding your car...">
              <h2 className="text-xl sm:text-2xl font-bold text-center mb-4 sm:mb-6 text-gray-800">RESERVATION</h2>

              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {/* Pick-up Date */}
                <div className="col-span-1">
                  <DatePicker
                    placeholder="Pick-up date*"
                    className="w-full"
                    format="DD/MM/YYYY"
                    suffixIcon={<CalendarOutlined className="text-green-500" />}
                    popupClassName="ant-picker-dropdown"
                    style={{ borderColor: errors.pickupDate ? '#ff4d4f' : '#10B981' }}
                    renderExtraFooter={() => null}
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
                    renderExtraFooter={() => null}
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
                    />
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
                    />
                    {errors.returnLocation && <div className="text-red-500 text-xs mt-1">{errors.returnLocation}</div>}
                  </div>
                )}
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
                  onClick={handleSubmit}
                >
                  MAKE RESERVATION
                </Button>
              </div>
            </Spin>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;