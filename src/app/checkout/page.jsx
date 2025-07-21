// pages/checkout.js
"use client";
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  CalendarOutlined,
  CarOutlined,
  ClockCircleOutlined,
  EnvironmentOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Button,
  Checkbox,
  DatePicker,
  Divider,
  Form,
  Input,
  message,
  Modal,
  Select,
  TimePicker,
  Typography,
} from "antd";
import PhoneInput from "antd-phone-input";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { baseURL } from "../../../utils/BaseURL";
import CustomLoading from '../../components/CustomLoading';
import { useCreatingBookingMutation, useGetVatQuery } from "../../features/reservation_page/reservationApi";

const { Title } = Typography;
const { Option } = Select;

// Function to calculate days difference between two dates
const calculateDaysDifference = (startDate, endDate) => {
  if (!startDate || !endDate) return 1;

  // Parse dates using dayjs to ensure consistency
  const start = dayjs(startDate).startOf('day');
  const end = dayjs(endDate).startOf('day');

  // Handle invalid dates
  if (!start.isValid() || !end.isValid()) return 1;

  // Calculate difference in days
  const diffDays = end.diff(start, 'day');

  // Return at least 1 day, but add 1 to include both start and end dates
  return diffDays < 1 ? 1 : diffDays + 1;
};

export default function Checkout() {
  const [createBooking, { isLoading }] = useCreatingBookingMutation();
  const { data: vatData } = useGetVatQuery(); // Changed variable name to avoid conflict

  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editType, setEditType] = useState(null); // 'pickup' or 'return'
  const [editDate, setEditDate] = useState(null);
  const [editTime, setEditTime] = useState(null);
  const [reservation, setReservation] = useState([]);
  const [daysDifference, setDaysDifference] = useState(1);
  const [carRentalFee, setCarRentalFee] = useState(0);
  const [extrasPrice, setExtrasPrice] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [vatAmount, setVatAmount] = useState(0); // Changed variable name
  const [total, setTotal] = useState(0);

  // Load reservation data from localStorage
  useEffect(() => {
    const reservationData = localStorage.getItem("reservation");
    if (reservationData) {
      const parsedReservation = JSON.parse(reservationData);
      setReservation(parsedReservation);
    }
  }, []);

  // Recalculate prices when reservation or VAT data changes
  useEffect(() => {
    if (reservation.length > 0 && vatData?.data) {
      calculatePrices(reservation);
    }
  }, [reservation, vatData]);

  const calculatePrices = (reservationData) => {
    if (!reservationData || reservationData.length === 0 || !vatData?.data) return;

    const item = reservationData[0];
    const days = calculateDaysDifference(item.pickupDate, item.returnDate);
    setDaysDifference(days);

    // Calculate car rental fee
    const carFee = item.dailyRate * days;
    setCarRentalFee(carFee);

    // Calculate extras price
    let extrasTotal = 0;
    if (item.addedServices) {
      for (const serviceId in item.addedServices) {
        const service = item.addedServices[serviceId];
        if (service?.added) {
          if (service.isPerDay) {
            extrasTotal += service.price * service.quantity * days;
          } else {
            extrasTotal += service.price * service.quantity;
          }
        }
      }
    }
    setExtrasPrice(extrasTotal);

    // Calculate subtotal
    const newSubtotal = carFee + extrasTotal;
    setSubtotal(newSubtotal);

    // Calculate VAT using dynamic rate from API
    const vatRate = parseFloat(vatData.data) / 100; // Convert percentage to decimal
    const newVatAmount = newSubtotal * vatRate;
    setVatAmount(newVatAmount);

    // Calculate total
    const newTotal = newSubtotal + newVatAmount;
    setTotal(newTotal);
  };

  if (reservation.length === 0) {
    return (
      <div>
        <CustomLoading />
      </div>
    );
  }

  const item = reservation[0];

  const formatDate = (dateString) => {
    // Use dayjs for consistent date formatting
    const date = dayjs(dateString);
    if (!date.isValid()) return dateString;
    return date.format('DD/MM/YYYY');
  };

  const formatTime = (timeString) => {
    if (!timeString) return "";
    // Use dayjs for consistent time formatting
    const time = dayjs(timeString, 'HH:mm');
    if (!time.isValid()) return timeString;
    return time.format('HH:mm');
  };

  const showModal = (type) => {
    setEditType(type);
    if (type === 'pickup') {
      setEditDate(dayjs(item.pickupDate));
      setEditTime(dayjs(item.pickupTime, 'HH:mm'));
    } else {
      setEditDate(dayjs(item.returnDate));
      setEditTime(dayjs(item.returnTime, 'HH:mm'));
    }
    setIsModalOpen(true);
  };

  const handleOk = () => {
    if (!editDate || !editTime) {
      messageApi.error('Please select both date and time');
      return;
    }

    const updatedReservation = [...reservation];
    if (editType === 'pickup') {
      updatedReservation[0].pickupDate = editDate.format('YYYY-MM-DD');
      updatedReservation[0].pickupTime = editTime.format('HH:mm');

      // Auto-update return time if pickup is after current return
      const newPickupDateTime = editDate.hour(editTime.hour()).minute(editTime.minute());
      const currentReturnDateTime = dayjs(updatedReservation[0].returnDate)
        .hour(dayjs(updatedReservation[0].returnTime, 'HH:mm').hour())
        .minute(dayjs(updatedReservation[0].returnTime, 'HH:mm').minute());

      if (newPickupDateTime.isAfter(currentReturnDateTime)) {
        const newReturnDateTime = newPickupDateTime.add(3, 'hour');
        updatedReservation[0].returnDate = newReturnDateTime.format('YYYY-MM-DD');
        updatedReservation[0].returnTime = newReturnDateTime.format('HH:mm');
      }
    } else {
      updatedReservation[0].returnDate = editDate.format('YYYY-MM-DD');
      updatedReservation[0].returnTime = editTime.format('HH:mm');
    }

    localStorage.setItem("reservation", JSON.stringify(updatedReservation));
    setReservation(updatedReservation);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const disabledPickupDate = (current) =>
    current && current < dayjs().startOf("day");

  const disabledReturnDate = (current) => {
    const minDate = editType === 'return' ? dayjs(item.pickupDate) : dayjs();
    return current && current < minDate.startOf("day");
  };

  const disabledPickupTime = () => {
    if (!editDate?.isSame(dayjs(), "day")) {
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
    if (editType !== 'return' || !editDate?.isSame(dayjs(item.pickupDate), "day")) {
      return { disabledHours: () => [], disabledMinutes: () => [] };
    }

    const pickupDateTime = dayjs(item.pickupDate)
      .hour(dayjs(item.pickupTime, 'HH:mm').hour())
      .minute(dayjs(item.pickupTime, 'HH:mm').minute());

    const minReturnTime = pickupDateTime.add(3, "hour");
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

  // Custom validation function for phone number
  const validatePhoneNumber = (_, value) => {
    if (!value || (!value.countryCode && !value.phoneNumber)) {
      return Promise.reject(new Error('Phone number is required'));
    }
    if (!value.phoneNumber || value.phoneNumber.trim() === '') {
      return Promise.reject(new Error('Phone number is required'));
    }
    return Promise.resolve();
  };

  const onFinish = async (values) => {
    try {
      // Combine date and time using dayjs for consistency
      const pickupDateTime = dayjs(item.pickupDate).hour(dayjs(item.pickupTime, 'HH:mm').hour()).minute(dayjs(item.pickupTime, 'HH:mm').minute());
      const returnDateTime = dayjs(item.returnDate).hour(dayjs(item.returnTime, 'HH:mm').hour()).minute(dayjs(item.returnTime, 'HH:mm').minute());

      if (pickupDateTime.isAfter(returnDateTime) || pickupDateTime.isSame(returnDateTime)) {
        messageApi.error("Return date and time must be after pickup date and time");
        return;
      }

      // Format phone
      const phoneNumber =
        values.phone?.countryCode && values.phone?.phoneNumber
          ? `+${values.phone.countryCode}${values.phone.phoneNumber}`
          : "";

      // Prepare extra services
      const extraServices = item.addedServices
        ? Object.entries(item.addedServices)
          .filter(([_, service]) => service?.added)
          .map(([serviceId, service]) => ({
            serviceId,
            quantity: service.quantity || 1,
          }))
        : [];

      // Build payload
      const bookingPayload = {
        pickupDate: pickupDateTime.toISOString(),
        pickupTime: pickupDateTime.toISOString(),
        pickupLocation: item.pickupLocationId,
        returnDate: returnDateTime.toISOString(),
        returnTime: returnDateTime.toISOString(),
        returnLocation: item.returnLocationId,
        vehicle: item._id,
        extraServices,
        clientDetails: {
          firstName: values.firstName.trim(),
          lastName: values.lastName.trim(),
          email: values.email.trim(),
          phone: phoneNumber.trim(),
          address: values.address?.trim() || '',
          country: values.country,
          state: values.state.trim(),
          postCode: values.postcode.trim(),
        },
        paymentMethod: values.paymentMethod.toUpperCase(),
      };

      const response = await createBooking(bookingPayload).unwrap();

      console.log(response)
      localStorage.setItem("bookingId", item._id);
      router.push(`${response?.data?.url}`);
    } catch (error) {
      console.error("Booking error:", error);
      messageApi.error(error?.data?.message || "Failed to create booking");
    }
  };

  const vehicle = reservation.length > 0 ? reservation[0] : {};

  return (
    <div className="container mx-auto px-4 py-8">
      {contextHolder}
      <div className="mb-6">
        <div className="flex flex-wrap items-center mb-2 gap-4 sm:gap-8">
          <div className="flex items-center">
            <CarOutlined className="mr-2" />
            <h2 className="text-lg font-semibold">Choose your car</h2>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Extra</h2>
          </div>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="bg-green-500 h-full" style={{ width: "75%" }}></div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 xl:gap-8">
        {/* Left sidebar */}
        <div className="lg:w-1/4 w-full">
          <div className="mb-6 border border-gray-200 rounded-md p-3">
            <h3 className="font-bold mb-4 border-b border-gray-200 pb-3">
              Location
            </h3>

            <div className="mb-4">
              <p className="font-semibold mb-2">Pick-up</p>
              <div
                className="flex items-center mb-2 p-2 rounded"
              // onClick={() => showModal('pickup')}
              >
                <EnvironmentOutlined className="mt-1 mr-2 text-gray-500" />
                <div>
                  <p className="text-base">{vehicle.pickupLocationName}</p>
                  <p className="text-xs text-gray-500">
                    {formatDate(item.pickupDate)}, {formatTime(item.pickupTime)}
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <p className="font-semibold mb-2">Return</p>
              <div
                className="flex items-center mb-2 p-2 rounded"
              // onClick={() => showModal('return')}
              >
                <EnvironmentOutlined className="mt-1 mr-2 text-gray-500" />
                <div>
                  <p className="text-base">
                    {vehicle.returnLocationName}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatDate(item.returnDate)}, {formatTime(item.returnTime)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6 border border-gray-200 p-3 rounded-md">
            <h3 className="font-bold mb-4 border-b border-gray-200 pb-3">
              Selected Car
            </h3>
            <div className="rounded-md overflow-hidden">
              <img
                src={`${baseURL}${item.image}` || "/images/maserati.png"}
                alt={`${item.brand} ${item.model}`}
                className="w-full h-40 sm:h-48 object-cover"
              />
              <div className="p-4">
                <h4 className="font-bold text-lg mb-1">
                  {item.brand} | {item.model}
                </h4>
                <p className="text-xs text-gray-500 mb-1">Starts From</p>
                <p className="text-green-500 font-bold mb-4 border-b border-gray-200 pb-4">
                  ₦ {item.dailyRate.toLocaleString()}/Day
                </p>

                <div className="flex justify-between mb-3">
                  <div className="flex items-center">
                    <UserOutlined className="mr-1 text-gray-500" />
                    <span className="text-xs">{item.noOfSeats} Seats</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-xs">
                      {item.noOfLuggages} Luggages
                    </span>
                  </div>
                </div>

                <div className="flex justify-between">
                  <div className="flex items-center">
                    <CarOutlined className="mr-1 text-gray-500" />
                    <span className="text-xs">{item.noOfDoors} Doors</span>
                  </div>
                  <div className="flex items-center">
                    <SettingOutlined className="mr-1 text-gray-500" />
                    <span className="text-xs">{item.transmissionType}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border border-gray-200 p-3 rounded-md">
            <h3 className="font-bold mb-4 border-b border-gray-200 pb-3">
              Price
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm border-b border-gray-200 pb-3">
                <span>
                  Car rental fee ({daysDifference} day
                  {daysDifference > 1 ? "s" : ""})
                </span>
                <span>₦{carRentalFee.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm border-b border-gray-200 pb-3">
                <span>Extras price</span>
                <span>₦{extrasPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm font-semibold border-b border-gray-200 pb-3">
                <span>Sub-total</span>
                <span>₦{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>VAT ({vatData?.data || 0}%)</span>
                <span>₦{vatAmount.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}</span>
              </div>
              <Divider className="my-2" />
              <div className="flex justify-between font-bold">
                <span>TOTAL</span>
                <span className="text-green-500">
                  ₦
                  {total.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main content - Checkout form */}
        <div className="w-full lg:w-3/4 mx-auto p-4 sm:p-6 bg-white rounded-lg shadow">
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            requiredMark={false}
            initialValues={{
              paymentMethod: "STRIPE",
              phone: { countryCode: "234" } // Setting initial value for phone with Nigeria country code
            }}
          >
            {/* Personal Details Section */}
            <div className="mb-6">
              <Title
                level={5}
                className="font-medium text-gray-800 py-2 bg-gray-50 -mx-4 sm:-mx-6 px-4 sm:px-6"
              >
                Personal Details
              </Title>
              <div className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Form.Item
                    name="firstName"
                    label="First Name"
                    rules={[{ required: true }]}
                  >
                    <Input placeholder="Enter your first name" />
                  </Form.Item>
                  <Form.Item
                    name="lastName"
                    label="Last Name"
                    rules={[{ required: true }]}
                  >
                    <Input placeholder="Enter your last name" />
                  </Form.Item>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Form.Item
                    name="email"
                    label="E-Mail"
                    rules={[{ required: true, type: "email" }]}
                  >
                    <Input placeholder="Enter your email" />
                  </Form.Item>
                  <Form.Item
                    name="phone"
                    label="Phone Number"
                    rules={[{ validator: validatePhoneNumber }]}
                  >
                    <PhoneInput
                      enableSearch
                      country="ng"
                      placeholder="Enter your phone number"
                    />
                  </Form.Item>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Form.Item
                    name="address"
                    label="Address"
                  // rules={[{ required: true }]}
                  >
                    <Input placeholder="Enter your permanent address" />
                  </Form.Item>
                  <Form.Item
                    name="country"
                    label="Country"
                  // rules={[{ required: true }]}
                  >
                    <Select placeholder="-- Select Country --">
                      <Option value="nigeria">Nigeria</Option>
                      <Option value="ghana">Ghana</Option>
                      <Option value="kenya">Kenya</Option>
                      <Option value="usa">United States</Option>
                      <Option value="uk">United Kingdom</Option>
                    </Select>
                  </Form.Item>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* <Form.Item
                    name="addressLine2"
                    label="Present Address"
                    // rules={[{ required: true }]}
                  >
                    <Input placeholder="Enter your present address" />
                  </Form.Item> */}
                  <Form.Item
                    name="state"
                    label="Region/State"
                  // rules={[{ required: true }]}
                  >
                    <Input placeholder="Enter your region/state" />
                  </Form.Item>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Form.Item
                    name="postcode"
                    label="Postcode/ZIP Code"
                  // rules={[{ required: true }]}
                  >
                    <Input placeholder="Enter your postcode" />
                  </Form.Item>
                </div>
              </div>
            </div>

            {/* Payment Method Section */}
            <div className="mb-6">
              <Title
                level={5}
                className="font-medium text-gray-800 py-2 bg-gray-50 -mx-4 sm:-mx-6 px-4 sm:px-6"
              >
                Payment Method
              </Title>
              <div className="mt-4">
                <p className="mb-2">
                  Please choose one of the available payment methods:
                </p>
                <ol className="list-decimal pl-5 mb-4">
                  <li className="mb-1">
                    STRIPE – For Non-Naira Credit/Debit card payments.
                  </li>
                </ol>
                <Form.Item name="paymentMethod" rules={[{ required: true }]}>
                  <Select placeholder="Select Payment Method">
                    <Option value="STRIPE">STRIPE</Option>
                  </Select>
                </Form.Item>
              </div>
            </div>

            {/* Rental Terms Section */}
            <div className="mb-6">
              <Title
                level={5}
                className="font-medium text-gray-800 py-2 bg-gray-50 -mx-4 sm:-mx-6 px-4 sm:px-6"
              >
                Rental Terms
              </Title>
              <div className="mt-4">
                <Form.Item
                  name="termsAgreed"
                  valuePropName="checked"
                  rules={[
                    {
                      validator: (_, value) =>
                        value
                          ? Promise.resolve()
                          : Promise.reject(
                            "You must agree to the rental terms"
                          ),
                    },
                  ]}
                >
                  <Checkbox>
                    I have read and agree to the{" "}
                    <a href="#" className="text-green-500">
                      rentals terms
                    </a>
                  </Checkbox>
                </Form.Item>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-between mt-8 gap-4">
              <Button
                onClick={() => router.back()}
                icon={<ArrowLeftOutlined />}
                className="flex items-center justify-center sm:justify-start order-2 sm:order-1"
              >
                Back
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                className="bg-green-500 flex items-center justify-center sm:justify-start order-1 sm:order-2"
                icon={<ArrowRightOutlined />}
                loading={isLoading}
              >
                Confirm Booking
              </Button>
            </div>
          </Form>
        </div>
      </div>

      {/* Edit Date/Time Modal */}
      <Modal
        title={`Edit ${editType === 'pickup' ? 'Pick-up' : 'Return'} Date & Time`}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Update"
        cancelText="Cancel"
      >
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500 mb-1">Date</p>
            <DatePicker
              className="w-full"
              format="DD/MM/YYYY"
              suffixIcon={<CalendarOutlined className="text-green-500" />}
              allowClear={false}
              disabledDate={editType === 'pickup' ? disabledPickupDate : disabledReturnDate}
              onChange={(date) => setEditDate(date)}
              value={editDate}
            />
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Time</p>
            <TimePicker
              className="w-full"
              format="HH:mm"
              suffixIcon={<ClockCircleOutlined className="text-green-500" />}
              allowClear={false}
              disabledTime={editType === 'pickup' ? disabledPickupTime : disabledReturnTime}
              onChange={(time) => setEditTime(time)}
              value={editTime}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}