"use client";
import { CalendarOutlined, ClockCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Checkbox, DatePicker, Input, Select, Spin, TimePicker } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

const Hero = () => {
  const [sameLocation, setSameLocation] = useState(true);
  const [pickupLocation, setPickupLocation] = useState('');
  const [returnLocation, setReturnLocation] = useState('');
  const [customPickupLocation, setCustomPickupLocation] = useState('');
  const [customReturnLocation, setCustomReturnLocation] = useState('');
  const [showCustomPickupInput, setShowCustomPickupInput] = useState(false);
  const [showCustomReturnInput, setShowCustomReturnInput] = useState(false);
  const [pickupDate, setPickupDate] = useState(dayjs());
  const [returnDate, setReturnDate] = useState(dayjs());
  const [pickupTime, setPickupTime] = useState(dayjs().set('hour', 0).set('minute', 0));
  const [returnTime, setReturnTime] = useState(dayjs().set('hour', 12).set('minute', 0));
  const [isloading, setIsloading] = useState(false);
  const [errors, setErrors] = useState({
    pickupDate: '',
    pickupTime: '',
    returnDate: '',
    returnTime: '',
    pickupLocation: '',
    returnLocation: ''
  });

  useEffect(() => {
    // Validate return date/time when pickup date/time changes
    if (pickupDate && returnDate && pickupTime && returnTime) {
      validateDateTime();
    }
  }, [pickupDate, returnDate, pickupTime, returnTime]);

  const validateDateTime = () => {
    const newErrors = { ...errors };
    let hasError = false;

    // Combine date and time for comparison
    const pickupDateTime = dayjs(pickupDate)
      .set('hour', pickupTime.hour())
      .set('minute', pickupTime.minute());
    const returnDateTime = dayjs(returnDate)
      .set('hour', returnTime.hour())
      .set('minute', returnTime.minute());

    // Check if return is at least 3 hours after pickup
    const minReturnDateTime = pickupDateTime.add(3, 'hour');
    if (returnDateTime.isBefore(minReturnDateTime)) {
      newErrors.returnDate = 'Return must be at least 3 hours after pickup';
      hasError = true;
    } else {
      newErrors.returnDate = '';
    }

    setErrors(newErrors);
    return !hasError;
  };

  const handleValues = () => {
    return {
      pickupDate: pickupDate ? pickupDate.format('YYYY-MM-DD') : null,
      returnDate: returnDate ? returnDate.format('YYYY-MM-DD') : null,
      pickupTime: pickupTime ? pickupTime.format('HH:mm') : null,
      returnTime: returnTime ? returnTime.format('HH:mm') : null,
      pickupLocation,
      returnLocation,
      sameLocation
    };
  };

  const handleLocationChange = (checked) => {
    setSameLocation(checked);
    if (checked) {
      setReturnLocation(pickupLocation);
      setErrors({ ...errors, returnLocation: '' });
    }
  };

  const handlePickupLocationChange = (value) => {
    if (value === 'custom') {
      setShowCustomPickupInput(true);
      return;
    }
    setPickupLocation(value);
    setErrors({ ...errors, pickupLocation: '' });
    if (sameLocation) {
      setReturnLocation(value);
      setErrors({ ...errors, returnLocation: '' });
    }
  };

  const handleReturnLocationChange = (value) => {
    if (value === 'custom') {
      setShowCustomReturnInput(true);
      return;
    }
    setReturnLocation(value);
    setErrors({ ...errors, returnLocation: '' });
  };

  const handleCustomPickupSubmit = () => {
    if (!customPickupLocation.trim()) {
      setErrors({ ...errors, pickupLocation: 'Please enter a pickup location' });
      return;
    }
    setPickupLocation(customPickupLocation);
    setErrors({ ...errors, pickupLocation: '' });
    if (sameLocation) {
      setReturnLocation(customPickupLocation);
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
    setReturnLocation(customReturnLocation);
    setErrors({ ...errors, returnLocation: '' });
    setShowCustomReturnInput(false);
    setCustomReturnLocation('');
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
    if (!pickupLocation) {
      newErrors.pickupLocation = 'Please select a pickup location';
      valid = false;
    }
    if (!returnLocation) {
      newErrors.returnLocation = 'Please select a return location';
      valid = false;
    }

    // Additional validation for date/time constraints
    if (pickupDate && returnDate && pickupTime && returnTime) {
      if (!validateDateTime()) {
        valid = false;
      }
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

  const disabledDate = (current) => {
    // Can not select days before today
    return current && current < dayjs().startOf('day');
  };

  const locationOptions = [
    { value: 'Muritala Mohammed International', label: 'Muritala Mohammed International' },
    { value: 'Lagos Airport', label: 'Lagos Airport' },
    { value: 'Ikeja City Mall', label: 'Ikeja City Mall' },
    {
      value: 'custom',
      label: (
        <div className="flex items-center text-green-500">
          <PlusOutlined className="mr-1" />
          <span>Add custom location</span>
        </div>
      )
    },
  ];

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
                    onChange={(date) => {
                      setPickupDate(date);
                      setErrors({ ...errors, pickupDate: '' });
                    }}
                    value={pickupDate}
                    disabledDate={disabledDate}
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
                    onChange={(time) => {
                      setPickupTime(time);
                      setErrors({ ...errors, pickupTime: '' });
                    }}
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
                    onChange={(date) => {
                      setReturnDate(date);
                      setErrors({ ...errors, returnDate: '' });
                    }}
                    value={returnDate}
                    disabledDate={(current) => {
                      // Can't select dates before pickup date
                      return pickupDate ? current && current < pickupDate.startOf('day') : false;
                    }}
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
                    onChange={(time) => {
                      setReturnTime(time);
                      setErrors({ ...errors, returnTime: '' });
                    }}
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
                      value={pickupLocation || undefined}
                      onChange={handlePickupLocationChange}
                      options={locationOptions}
                      style={{ borderColor: errors.pickupLocation ? '#ff4d4f' : '#10B981' }}
                      placeholder="Select your pickup location"
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
                      value={returnLocation || undefined}
                      onChange={handleReturnLocationChange}
                      options={locationOptions}
                      disabled={sameLocation}
                      style={{ borderColor: errors.returnLocation ? '#ff4d4f' : '#10B981' }}
                      placeholder="Select your return location"
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