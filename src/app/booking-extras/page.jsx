"use client";
import {
  CarOutlined,
  EnvironmentOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Alert, Button, Spin } from "antd";
import Image from "next/image";
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback, useEffect, useState } from "react";
import { baseURL } from "../../../utils/BaseURL";
import CustomLoading from '../../components/CustomLoading';
import { useGetExtraServicesofvehiclebyvehicleidQuery } from "../../features/reservation_page/reservationApi";

// Utility functions
const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
  }).format(amount);
};

const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const formatTime = (timeString) => {
  if (!timeString) return "";
  let date = new Date(timeString);
  if (isNaN(date.getTime())) {
    const [hours, minutes] = timeString?.split(":").map(Number);
    if (!isNaN(hours) && !isNaN(minutes)) {
      date = new Date();
      date.setHours(hours, minutes, 0, 0);
    }
  }
  if (isNaN(date.getTime())) {
    return timeString;
  }
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12;
  return `${hours}:${minutes.toString().padStart(2, "0")} ${ampm}`;
};

// Function to calculate days difference between two dates
const calculateDaysDifference = (startDate, endDate) => {
  if (!startDate || !endDate) return 1;

  const start = new Date(startDate);
  const end = new Date(endDate);

  // Handle invalid dates
  if (isNaN(start.getTime()) || isNaN(end.getTime())) return 1;

  // Calculate difference in milliseconds
  const diffTime = end - start;

  // Convert to days and round up
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  // Return at least 1 day
  return diffDays < 1 ? 1 : diffDays;
};

// Function to fetch location details
const fetchLocationDetails = async (locationId) => {
  try {
    const response = await fetch(`${baseURL}/api/locations/${locationId}`);
    const data = await response.json();
    return data.data || data; // Adjust based on your API response structure
  } catch (error) {
    console.error("Error fetching location:", error);
    return null;
  }
};

// AddonCard Component
const AddonCard = React.memo(
  ({
    icon,
    title,
    description,
    price,
    isFree,
    isPerDay,
    onAddToggle,
    isAdded,
    initialQuantity = 1,
  }) => {
    const [add, setAdd] = useState(isAdded);
    const [count, setCount] = useState(initialQuantity);

    const handleAddClick = useCallback(() => {
      const newAddState = !add;
      setAdd(newAddState);
      if (newAddState) {
        onAddToggle(newAddState, price, count, title, isPerDay);
      } else {
        onAddToggle(newAddState, price, 0, title, isPerDay);
        setCount(1);
      }
    }, [add, count, onAddToggle, price, title, isPerDay]);

    const increment = useCallback(() => {
      const newCount = count + 1;
      setCount(newCount);
      if (add) {
        onAddToggle(true, price, newCount, title, isPerDay);
      }
    }, [add, count, onAddToggle, price, title, isPerDay]);

    const decrement = useCallback(() => {
      if (count > 1) {
        const newCount = count - 1;
        setCount(newCount);
        if (add) {
          onAddToggle(true, price, newCount, title, isPerDay);
        }
      }
    }, [add, count, onAddToggle, price, title, isPerDay]);

    return (
      <div className="border border-gray-200 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 h-full flex flex-col">
        <div className="flex items-start space-x-3 mb-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gray-100 p-2">
            <Image
              src={`${baseURL}/${icon}`}
              height={40}
              width={40}
              alt={title}
              className="object-contain"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-base font-semibold text-gray-900">{title}</h2>
            {isFree && (
              <span className="text-xs text-green-600 bg-green-50 px-1.5 py-0.5 rounded">
                FREE
              </span>
            )}
          </div>
        </div>

        <p className="text-sm text-gray-600 mb-4 flex-grow">{description}</p>

        <div className="mb-3">
          <span className="text-xs text-gray-500">{isPerDay ? "Per Day" : "One-time"}</span>
          <p className="text-green-600 font-bold text-lg">
            {formatCurrency(price)}
          </p>
        </div>

        <div className="mt-auto">
          <div className="flex items-center gap-2">
            <div className="flex items-center border border-gray-300 rounded-md overflow-hidden bg-white">
              <button
                onClick={decrement}
                aria-label={`Decrease quantity of ${title}`}
                className={`px-3 py-1 text-gray-600 hover:bg-gray-50 transition-colors ${count <= 1 ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                disabled={count <= 1}
              >
                −
              </button>
              <div className="px-4 py-1 text-base font-medium text-gray-800 border-x border-gray-300">
                {count}
              </div>
              <button
                onClick={increment}
                aria-label={`Increase quantity of ${title}`}
                className="px-3 py-1 text-gray-600 hover:bg-gray-50 transition-colors"
              >
                +
              </button>
            </div>

            <button
              onClick={handleAddClick}
              aria-label={
                add ? `Remove ${title} from booking` : `Add ${title} to booking`
              }
              className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors duration-200 border ${add
                ? "border-green-500 bg-green-50 text-green-700"
                : "border-gray-200 hover:bg-gray-50"
                }`}
            >
              {add ? (
                <span className="flex items-center justify-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  ADDED
                </span>
              ) : (
                "ADD"
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }
);

AddonCard.displayName = "AddonCard";

// Main Component
export default function BookingExtras() {

  const router = useRouter();



  const [reservation, setReservation] = useState([]);
  const [isClient, setIsClient] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pickupLocation, setPickupLocation] = useState(null);
  const [returnLocation, setReturnLocation] = useState(null);
  const [locationsLoading, setLocationsLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [addedServices, setAddedServices] = useState({
    count: 0,
    cost: 0,
    items: {},
  });
  const [daysDifference, setDaysDifference] = useState(1);

  // Load reservation data and fetch locations
  useEffect(() => {
    const loadReservationAndLocations = async () => {
      setIsClient(true);
      setLoading(true);
      setLocationsLoading(true);

      try {
        const reservationData = localStorage.getItem("reservation");
        if (!reservationData) {
          throw new Error("No reservation data found");
        }

        const parsedReservation = JSON.parse(reservationData);
        if (
          !Array.isArray(parsedReservation) ||
          parsedReservation.length === 0
        ) {
          throw new Error("Invalid reservation data format");
        }

        setReservation(parsedReservation);
        const vehicle = parsedReservation[0];

        // Calculate days difference
        const days = calculateDaysDifference(vehicle.pickupDate, vehicle.returnDate);
        setDaysDifference(days);

        // Fetch location details
        if (vehicle.pickupLocationId) {
          const pickupLocationData = await fetchLocationDetails(
            vehicle.pickupLocationId
          );
          setPickupLocation(pickupLocationData);
        }

        if (vehicle.returnLocationId) {
          const returnLocationData = await fetchLocationDetails(
            vehicle.returnLocationId
          );
          setReturnLocation(returnLocationData);
        }

        // Initialize addedServices
        if (vehicle.addedServices) {
          const { addedServices: storedServices } = vehicle;
          let calculatedCount = 0;
          let calculatedCost = 0;
          const validServices = {};

          for (const serviceId in storedServices) {
            const service = storedServices[serviceId];
            if (
              service &&
              typeof service.price === "number" &&
              typeof service.quantity === "number"
            ) {
              let totalPrice = 0;

              if (service.isPerDay) {
                totalPrice = service.price * service.quantity * days;
              } else {
                totalPrice = service.price * service.quantity;
              }

              calculatedCount += service.quantity;
              calculatedCost += totalPrice;
              validServices[serviceId] = {
                ...service,
                totalPrice,
                isPerDay: service.isPerDay
              };
            }
          }

          setAddedServices({
            count: calculatedCount,
            cost: calculatedCost,
            items: validServices,
          });
        }
      } catch (err) {
        console.error("Error loading reservation:", err);
        setError(err.message);
      } finally {
        setLoading(false);
        setLocationsLoading(false);
      }
    };

    loadReservationAndLocations();
  }, []);


  const searchParams = useSearchParams();
  const valid = searchParams.get('valid');

  const {
    data: servicesData,
    isLoading: servicesLoading,
    error: servicesError,
  } = useGetExtraServicesofvehiclebyvehicleidQuery(valid, { skip: !valid });


  const handleExtraService = useCallback(
    (isAdded, price, quantity, serviceName, isPerDay, serviceId) => {
      setAddedServices((prev) => {
        let newCount = prev.count;
        let newCost = prev.cost;
        const newItems = { ...prev.items };

        if (isAdded && quantity > 0) {
          // Remove previous quantity if exists
          if (newItems[serviceId]) {
            newCount -= newItems[serviceId].quantity;
            newCost -= newItems[serviceId].totalPrice;
          }

          // Calculate total price based on service type
          let totalPrice = 0;
          if (isPerDay) {
            totalPrice = price * quantity * daysDifference;
          } else {
            totalPrice = price * quantity;
          }

          // Add new quantity
          newCount += quantity;
          newCost += totalPrice;
          newItems[serviceId] = {
            price,
            quantity,
            totalPrice,
            name: serviceName,
            added: true,
            isPerDay
          };
        } else {
          // Remove service
          if (newItems[serviceId]) {
            newCount -= newItems[serviceId].quantity;
            newCost -= newItems[serviceId].totalPrice;
            delete newItems[serviceId];
          }
        }

        // Update localStorage
        try {
          const currentReservation =
            JSON.parse(localStorage.getItem("reservation")) || [];
          const updatedVehicle = {
            ...(currentReservation.length > 0 ? currentReservation[0] : {}),
            extraCost: newCost,
            totalCount: newCount,
            addedServices: newItems,
          };

          localStorage.setItem("reservation", JSON.stringify([updatedVehicle]));
        } catch (err) {
          console.error("Error updating localStorage:", err);
        }

        return { count: newCount, cost: newCost, items: newItems };
      });
    },
    [daysDifference]
  );

  const handleContinueBooking = () => {
    setButtonLoading(true);
    setTimeout(() => {
      router.push("/checkout");
    }, 1000);
  };

  const vehicle = reservation.length > 0 ? reservation[0] : {};

  if (!isClient || loading) {
    return (
      <div className="">
        <CustomLoading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert
          message="Error Loading Reservation"
          description={error}
          type="error"
          showIcon
        />
        <Button
          type="primary"
          className="mt-4"
          onClick={() => router.push("/vehicles")}
        >
          Back to Vehicle Selection
        </Button>
      </div>
    );
  }

  if (servicesError) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert
          message="Error Loading Services"
          description="Failed to load additional services. Please try again later."
          type="error"
          showIcon
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
      <div className="mb-6">
        <div className="flex items-center mb-2">
          <CarOutlined className="mr-2" />
          <h2 className="text-lg font-semibold">Choose your car</h2>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="bg-green-500 h-full" style={{ width: "50%" }}></div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left sidebar */}
        <div className="lg:w-1/4">
          <div className="mb-6 border p-3 border-gray-200 rounded-md">
            <h3 className="font-bold mb-4 border-b border-gray-200 pb-4">
              Location
            </h3>
            <div className="mb-4">
              <p className="font-semibold mb-2">Pick-up</p>
              <div className="flex items-center mb-2">
                <EnvironmentOutlined className="mt-1 mr-2 text-gray-500" />
                <div>
                  {locationsLoading ? (
                    <div className="flex items-center">
                      <Spin size="small" className="mr-2" />
                      <span className="text-sm text-gray-500">
                        Loading location...
                      </span>
                    </div>
                  ) : (
                    <>
                      <p className="text-base">
                        {vehicle.pickupLocationName || "Mymensingh"}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatDate(vehicle?.pickupDate)},{" "}
                        {formatTime(vehicle?.pickupTime)}
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="mb-6">
              <p className="font-semibold mb-2">Return</p>
              <div className="flex items-center mb-2">
                <EnvironmentOutlined className="mt-1 mr-2 text-gray-500" />
                <div>
                  {locationsLoading ? (
                    <div className="flex items-center">
                      <Spin size="small" className="mr-2" />
                      <span className="text-sm text-gray-500">
                        Loading location...
                      </span>
                    </div>
                  ) : (
                    <>
                      <p className="text-base">
                        {vehicle.returnLocationName || "Mymensingh"}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatDate(vehicle?.returnDate)},{" "}
                        {formatTime(vehicle?.returnTime)}
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6 border border-gray-200 rounded-md p-3">
            <h3 className="font-bold mb-4 border-b border-gray-200 pb-4">
              Selected Car
            </h3>
            <div className="rounded-md overflow-hidden">
              <img
                src={`${baseURL}${vehicle?.image}`}
                alt={`${vehicle?.brand}`}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h4 className="font-bold text-lg mb-1">
                  {vehicle?.brand || "Car"} | {vehicle?.model || "Model"}
                </h4>
                <p className="text-xs text-gray-500 mb-1">Starts From</p>
                <p className="text-green-500 font-bold mb-4 border-b border-gray-200 pb-2">
                  {formatCurrency(vehicle?.dailyRate || 0)}/Day
                </p>
                <div className="flex justify-between mb-3">
                  <div className="flex items-center">
                    <UserOutlined className="mr-1 text-gray-500" />
                    <span className="text-xs">
                      {vehicle?.noOfSeats || "N/A"} Seats
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-xs">
                      {vehicle?.noOfLuggages || "N/A"} Luggages
                    </span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <CarOutlined className="mr-1 text-gray-500" />
                    <span className="text-xs">
                      {vehicle?.noOfDoors || "N/A"} Doors
                    </span>
                  </div>
                  <div className="flex items-center">
                    <SettingOutlined className="mr-1 text-gray-500" />
                    <span className="text-xs">
                      {vehicle?.transmissionType || "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Added Services Summary */}
          {Object.keys(addedServices.items).length > 0 && (
            <div className="mb-6 border border-gray-200 rounded-md p-3">
              <h3 className="font-bold mb-4 border-b border-gray-200 pb-4">
                Added Services
              </h3>
              <div className="space-y-2">
                {Object.entries(addedServices.items).map(
                  ([serviceId, service]) => (
                    <div
                      key={serviceId}
                      className="flex justify-between items-center text-sm"
                    >
                      <span className="text-gray-700">
                        {service.name} × {service.quantity}
                        {service.isPerDay && ` × ${daysDifference} days`}
                      </span>
                      <span className="text-green-500 font-semibold">
                        {formatCurrency(service.totalPrice)}
                      </span>
                    </div>
                  )
                )}
              </div>
              <div className="border-t border-gray-200 mt-3 pt-3">
                <div className="flex justify-between items-center font-bold">
                  <span>Total Extra Cost:</span>
                  <span className="text-green-500">
                    {formatCurrency(addedServices.cost)}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Main content - Extras */}
        <div className="lg:w-3/4">
          {servicesLoading ? (
            <div className="flex justify-center items-center min-h-[300px]">
              <div className="flex justify-center items-center h-[500px]">
                <Spin />
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {servicesData?.data?.result?.map((addon) => (
                  <AddonCard
                    key={addon._id}
                    icon={addon.image}
                    title={addon.name}
                    isPerDay={addon.isPerDay}
                    description={addon.description}
                    price={addon.cost}
                    isFree={addon.isFree}
                    onAddToggle={(isAdded, price, quantity, serviceName, isPerDay) =>
                      handleExtraService(
                        isAdded,
                        price,
                        quantity,
                        serviceName,
                        isPerDay,
                        addon._id
                      )
                    }
                    isAdded={addedServices.items[addon._id]?.added || false}
                    initialQuantity={
                      addedServices.items[addon._id]?.quantity || 1
                    }
                  />
                ))}
              </div>
              <div className="flex justify-end mt-6">
                <Button
                  loading={buttonLoading}
                  onClick={handleContinueBooking}
                  type="primary"
                  className="bg-green-500 border-green-500 hover:bg-green-600"
                  size="large"
                >
                  Continue Booking
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}