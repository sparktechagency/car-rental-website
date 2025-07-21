"use client";
import {
  CalendarOutlined,
  ClockCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  Button,
  Checkbox,
  DatePicker,
  Input,
  Select,
  Spin,
  TimePicker,
} from "antd";
import dayjs from "dayjs";
import { useRouter } from 'next/navigation';
import { useState } from "react";
import { useGetLocationQuery } from "../../features/LocationApi";

const Hero = () => {

  const router = useRouter();

  const [formData, setFormData] = useState({
    sameLocation: true,
    pickupLocationId: "",
    pickupLocationName: "",
    returnLocationId: "",
    returnLocationName: "",
    pickupDate: dayjs(),
    returnDate: dayjs().add(1, "hour"),
    pickupTime: dayjs().add(1, "minute"),
    returnTime: dayjs().add(1, "hour"),
  });


  const [customInputs, setCustomInputs] = useState({
    pickup: { show: false, value: "" },
    return: { show: false, value: "" },
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const { data: locations, isLoading: locationsLoading } =
    useGetLocationQuery();

  // Validation helpers
  const isPickupTooEarly = (date, time) => {
    if (!date || !time) return false;
    const pickupDateTime = dayjs(date).hour(time.hour()).minute(time.minute());
    return pickupDateTime.isBefore(dayjs().add(1, "minute"));
  };

  const isMinimumDuration = (
    pickupDate,
    pickupTime,
    returnDate,
    returnTime
  ) => {
    if (!pickupDate || !pickupTime || !returnDate || !returnTime) return true;
    const pickup = dayjs(pickupDate)
      .hour(pickupTime.hour())
      .minute(pickupTime.minute());
    const returnDateTime = dayjs(returnDate)
      .hour(returnTime.hour())
      .minute(returnTime.minute());
    return returnDateTime.diff(pickup, "hour", true) >= 1;
  };

  // Update form data helper
  const updateFormData = (updates) => {
    setFormData((prev) => ({ ...prev, ...updates }));
    setErrors({});
  };

  // Auto-update return time when pickup changes
  const updatePickupDateTime = (date, time) => {
    if (date && time) {
      const pickupDateTime = dayjs(date)
        .hour(time.hour())
        .minute(time.minute());
      const returnDateTime = pickupDateTime.add(1, "hour");
      updateFormData({
        pickupDate: date,
        pickupTime: time,
        returnDate: returnDateTime,
        returnTime: returnDateTime,
      });
    }
  };

  // Location handlers
  const handleLocationChange = (type, value, option) => {
    if (value === "custom") {
      setCustomInputs((prev) => ({
        ...prev,
        [type]: { ...prev[type], show: true },
      }));
      return;
    }

    const locationName = option?.label || value;
    const updates = {
      [`${type}LocationId`]: value,
      [`${type}LocationName`]: locationName,
    };

    if (type === "pickup" && formData.sameLocation) {
      updates.returnLocationId = value;
      updates.returnLocationName = locationName;
    }
    updateFormData(updates);
  };

  const handleCustomLocation = (type) => {
    const value = customInputs[type].value.trim();
    if (!value) {
      setErrors({ [`${type}Location`]: `Please enter a ${type} location` });
      return;
    }

    const updates = {
      [`${type}LocationId`]: value,
      [`${type}LocationName`]: value,
    };

    if (type === "pickup" && formData.sameLocation) {
      updates.returnLocationId = value;
      updates.returnLocationName = value;
    }
    updateFormData(updates);

    setCustomInputs((prev) => ({
      ...prev,
      [type]: { show: false, value: "" },
    }));
  };

  const handleSameLocationChange = (checked) => {
    const updates = { sameLocation: checked };
    if (checked) {
      updates.returnLocationId = formData.pickupLocationId;
      updates.returnLocationName = formData.pickupLocationName;
    }
    updateFormData(updates);
  };

  // Date/Time handlers
  const handlePickupDateChange = (date) => {
    updatePickupDateTime(date, formData.pickupTime);
  };

  const handlePickupTimeChange = (time) => {
    if (
      formData.pickupDate?.isSame(dayjs(), "day") &&
      isPickupTooEarly(formData.pickupDate, time)
    ) {
      setErrors({
        pickupTime: "Pickup must be 10+ minutes ahead",
      });
      return;
    }
    updatePickupDateTime(formData.pickupDate, time);
  };

  // Validation
  const validateForm = () => {
    const newErrors = {};
    const {
      pickupDate,
      pickupTime,
      returnDate,
      returnTime,
      pickupLocationId,
      returnLocationId,
    } = formData;

    if (!pickupDate) newErrors.pickupDate = "Please select a pickup date";
    if (!pickupTime) newErrors.pickupTime = "Please select a pickup time";
    if (!returnDate) newErrors.returnDate = "Please select a return date";
    if (!returnTime) newErrors.returnTime = "Please select a return time";
    if (!pickupLocationId)
      newErrors.pickupLocation = "Please select a pickup location";
    if (!returnLocationId)
      newErrors.returnLocation = "Please select a return location";

    if (pickupDate && pickupTime && isPickupTooEarly(pickupDate, pickupTime)) {
      newErrors.pickupTime =
        "Pickup must be 10+ minutes ahead";
    }

    if (!isMinimumDuration(pickupDate, pickupTime, returnDate, returnTime)) {
      newErrors.returnTime = "Minimum reservation 1 hours";
    }

    if (returnDate?.isBefore(pickupDate)) {
      newErrors.returnDate = "Return date cannot be before pickup date";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit handler
  const handleSubmit = () => {
    if (!validateForm()) return;

    const reservationData = {
      pickupDate: formData.pickupDate.format("YYYY-MM-DD"),
      returnDate: formData.returnDate.format("YYYY-MM-DD"),
      pickupTime: formData.pickupTime.format("HH:mm"),
      returnTime: formData.returnTime.format("HH:mm"),
      pickupLocationId: formData.pickupLocationId,
      pickupLocationName: formData.pickupLocationName,
      returnLocationId: formData.returnLocationId,
      returnLocationName: formData.returnLocationName,
      sameLocation: formData.sameLocation,
    };

    setIsLoading(true);
    setTimeout(() => {
      localStorage.setItem("reservation", JSON.stringify([reservationData]));
      setIsLoading(false);
      router.push(`/Reservation?returnTime=${formData.returnTime.toISOString()}&pickupTime=${formData.pickupTime.toISOString()}`);
    }, 1500);
  };

  // Disabled date/time functions
  const disabledPickupDate = (current) =>
    current && current < dayjs().startOf("day");
  const disabledReturnDate = (current) => {
    const minDate = formData.pickupDate || dayjs();
    return current && current < minDate.startOf("day");
  };

  const disabledPickupTime = () => {
    if (!formData.pickupDate?.isSame(dayjs(), "day")) {
      return { disabledHours: () => [], disabledMinutes: () => [] };
    }

    const minTime = dayjs().add(1, "minute");
    const minHour = minTime.hour();
    const minMinute = minTime.minute();

    return {
      disabledHours: () => Array.from({ length: minHour }, (_, i) => i),
      disabledMinutes: (selectedHour) => {
        if (selectedHour === minHour) {
          return Array.from({ length: minMinute }, (_, i) => i);
        }
        if (selectedHour < minHour) {
          return Array.from({ length: 60 }, (_, i) => i);
        }
        return [];
      },
    };
  };

  const disabledReturnTime = () => {
    const { pickupDate, pickupTime, returnDate } = formData;
    if (
      !pickupDate ||
      !pickupTime ||
      !returnDate ||
      !returnDate.isSame(pickupDate, "day")
    ) {
      return { disabledHours: () => [], disabledMinutes: () => [] };
    }

    const minReturnTime = pickupTime.add(1, "hour");
    const minHour = minReturnTime.hour();
    const minMinute = minReturnTime.minute();

    return {
      disabledHours: () => Array.from({ length: minHour }, (_, i) => i),
      disabledMinutes: (selectedHour) => {
        if (selectedHour === minHour) {
          return Array.from({ length: minMinute }, (_, i) => i);
        }
        if (selectedHour < minHour) {
          return Array.from({ length: 60 }, (_, i) => i);
        }
        return [];
      },
    };
  };

  // Location options
  const locationOptions = [
    ...(locations?.data?.result?.map((location) => ({
      value: location._id,
      label: location.location,
    })) || []),
    {
      value: "custom",
      label: (
        <div className="flex items-center text-green-500">
          <PlusOutlined className="mr-1" />
          <span>Add custom location</span>
        </div>
      ),
    },
  ];

  const renderLocationField = (type, label) => {
    const isCustom = customInputs[type].show;
    const fieldName = `${type}Location`;
    const locationId = formData[`${type}LocationId`];

    return (
      <div className="mt-3 sm:mt-4">
        <p className="text-xs text-gray-500 mb-1">{label}*</p>
        {isCustom ? (
          <div>
            <div className="flex">
              <Input
                placeholder={`Enter custom ${type} location*`}
                value={customInputs[type].value}
                onChange={(e) =>
                  setCustomInputs((prev) => ({
                    ...prev,
                    [type]: { ...prev[type], value: e.target.value },
                  }))
                }
                style={{
                  borderColor: errors[fieldName] ? "#ff4d4f" : "#10B981",
                }}
                className="flex-1"
              />
              <Button
                type="primary"
                onClick={() => handleCustomLocation(type)}
                style={{
                  backgroundColor: "#10B981",
                  borderColor: "#10B981",
                  marginLeft: "8px",
                }}
              >
                Save
              </Button>
            </div>
            {errors[fieldName] && (
              <div className="text-red-500 text-xs mt-1">
                {errors[fieldName]}
              </div>
            )}
          </div>
        ) : (
          <div>
            <Select
              className="w-full"
              value={locationId || undefined}
              onChange={(value, option) =>
                handleLocationChange(type, value, option)
              }
              options={locationOptions}
              disabled={type === "return" && formData.sameLocation}
              style={{ borderColor: errors[fieldName] ? "#ff4d4f" : "#10B981" }}
              placeholder={`Select your ${type} location`}
              loading={locationsLoading}
              notFoundContent={
                locationsLoading ? <Spin size="small" /> : "No locations found"
              }
            />
            {errors[fieldName] && (
              <div className="text-red-500 text-xs mt-1">
                {errors[fieldName]}
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="relative w-full min-h-[600px] md:h-[800px]">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/images/hero.png)" }}
      />

      <div className="container mx-auto px-4 sm:px-6 relative z-10 flex flex-col lg:flex-row items-center justify-center lg:justify-between w-full h-full py-12 lg:py-0">
        {/* Hero text */}
        <div className="w-full lg:w-1/2 flex items-center justify-center lg:justify-start mb-8 lg:mb-0">
          <div className="text-white text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl flex flex-col gap-2 sm:gap-3 font-bold mb-4">
              <span>NEED A RIDE?</span>
              <span>WE'VE GOT YOU</span>
              <span>COVERED</span>
            </h1>
            <p className="text-xl sm:text-2xl text-yellow-400">
              Find the Perfect Vehicle for Your Journey
            </p>
          </div>
        </div>

        {/* Reservation form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center lg:justify-end">
          <div className="bg-white rounded-lg shadow-xl px-4 sm:px-6 py-6 sm:py-8 w-full max-w-md">
            <Spin size="small" spinning={isLoading} tip="finding your car...">
              <h2 className="text-xl sm:text-2xl font-bold text-center mb-4 sm:mb-6 text-gray-800">
                RESERVATION
              </h2>

              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {/* Pick-up Date */}
                <div className="col-span-1">
                  <p className="text-xs text-gray-500 mb-1">Pick-up Date</p>
                  <DatePicker
                    placeholder="Pick-up date*"
                    className="w-full"
                    format="DD/MM/YYYY"
                    suffixIcon={<CalendarOutlined className="text-green-500" />}
                    style={{
                      borderColor: errors.pickupDate ? "#ff4d4f" : "#10B981",
                    }}
                    allowClear={false}
                    disabledDate={disabledPickupDate}
                    onChange={handlePickupDateChange}
                    value={formData.pickupDate}
                  />
                  {errors.pickupDate && (
                    <div className="text-red-500 text-xs mt-1">
                      {errors.pickupDate}
                    </div>
                  )}
                </div>

                {/* Pick-up Time */}
                <div className="col-span-1">
                  <p className="text-xs text-gray-500 mb-1">Pick-up Time</p>
                  <TimePicker
                    placeholder="Pick-up time*"
                    className="w-full"
                    format="HH:mm"
                    suffixIcon={
                      <ClockCircleOutlined className="text-green-500" />
                    }
                    style={{
                      borderColor: errors.pickupTime ? "#ff4d4f" : "#10B981",
                    }}
                    allowClear={false}
                    disabledTime={disabledPickupTime}
                    onChange={handlePickupTimeChange}
                    value={formData.pickupTime}
                  />
                  {errors.pickupTime && (
                    <div className="text-red-500 text-xs mt-1">
                      {errors.pickupTime}
                    </div>
                  )}
                </div>

                {/* Return Date */}
                <div className="col-span-1">
                  <p className="text-xs text-gray-500 mb-1">Return Date</p>
                  <DatePicker
                    placeholder="Return date*"
                    className="w-full"
                    format="DD/MM/YYYY"
                    suffixIcon={<CalendarOutlined className="text-green-500" />}
                    style={{
                      borderColor: errors.returnDate ? "#ff4d4f" : "#10B981",
                    }}
                    allowClear={false}
                    disabledDate={disabledReturnDate}
                    onChange={(date) => updateFormData({ returnDate: date })}
                    value={formData.returnDate}
                  />
                  {errors.returnDate && (
                    <div className="text-red-500 text-xs mt-1">
                      {errors.returnDate}
                    </div>
                  )}
                </div>

                {/* Return Time */}
                <div className="col-span-1">
                  <p className="text-xs text-gray-500 mb-1">Return Time</p>
                  <TimePicker
                    placeholder="Return time*"
                    className="w-full"
                    format="HH:mm"
                    suffixIcon={
                      <ClockCircleOutlined className="text-green-500" />
                    }
                    style={{
                      borderColor: errors.returnTime ? "#ff4d4f" : "#10B981",
                    }}
                    allowClear={false}
                    disabledTime={disabledReturnTime}
                    onChange={(time) => updateFormData({ returnTime: time })}
                    value={formData.returnTime}
                  />
                  {errors.returnTime && (
                    <div className="text-red-500 text-xs mt-1">
                      {errors.returnTime}
                    </div>
                  )}
                </div>
              </div>

              {renderLocationField("pickup", "Pick-up Location")}
              {renderLocationField("return", "Return Location")}

              {/* Same Location Checkbox */}
              <div className="mt-3 sm:mt-4 flex items-center">
                <Checkbox
                  checked={formData.sameLocation}
                  onChange={(e) => handleSameLocationChange(e.target.checked)}
                  className="text-primary"
                />
                <span className="ml-2 text-sm text-gray-600">
                  Same as pick-up location
                </span>
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
