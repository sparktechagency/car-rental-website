// pages/checkout.js

"use client";
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  CarOutlined,
  EnvironmentOutlined,
  SettingOutlined,
  UserOutlined
} from '@ant-design/icons';
import {
  Button,
  Checkbox,
  Divider,
  Form,
  Input,
  Select,
  Typography,
  message
} from 'antd';
import PhoneInput from "antd-phone-input";
import { useRouter } from 'next/navigation';
import { baseURL } from '../../../utils/BaseURL';
import { useCreatingBookingMutation } from '../../features/reservation_page/reservationApi';

const { Title } = Typography;
const { Option } = Select;

export default function Checkout() {
  const [createBooking, { isLoading }] = useCreatingBookingMutation();
  const reservationData = typeof window !== 'undefined' ? localStorage.getItem("reservation") : null;
  const reservation = reservationData ? JSON.parse(reservationData) : [];
  const [messageApi, contextHolder] = message.useMessage();

  const [form] = Form.useForm();
  const router = useRouter();

  const onFinish = async (values) => {
    try {
      if (!reservation || reservation.length === 0) {
        messageApi.error('No reservation data found');
        return;
      }

      const item = reservation[0];

      // Validate and format dates
      const pickupDate = new Date(item.pickupDate);
      const returnDate = new Date(item.returnDate);

      // Combine date and time
      const [pickupHours, pickupMinutes] = item.pickupTime.split(':');
      const [returnHours, returnMinutes] = item.returnTime.split(':');

      pickupDate.setHours(pickupHours, pickupMinutes);
      returnDate.setHours(returnHours, returnMinutes);

      if (isNaN(pickupDate.getTime()) || isNaN(returnDate.getTime())) {
        messageApi.error('Invalid date format');
        return;
      }

      if (pickupDate >= returnDate) {
        messageApi.error('Return date must be after pickup date');
        return;
      }

      // Validate required IDs
      if (!item._id) {
        messageApi.error('Vehicle ID is missing');
        return;
      }

      // Format phone
      const phoneNumber = values.phone?.countryCode && values.phone?.phoneNumber
        ? `+${values.phone.countryCode}${values.phone.phoneNumber}`
        : '';

      // Prepare extra services
      const extraServices = item.addedServices
        ? Object.entries(item.addedServices)
          .filter(([_, service]) => service?.added)
          .map(([serviceId, service]) => ({
            serviceId,
            quantity: service.quantity || 1
          }))
        : [];

      // Build payload
      const bookingPayload = {
        pickupDate: pickupDate.toISOString(),
        pickupTime: pickupDate.toISOString(),
        pickupLocation: item.pickupLocation,
        returnDate: returnDate.toISOString(),
        returnTime: returnDate.toISOString(),
        returnLocation: item.returnLocation,
        vehicle: item._id,
        extraServices: extraServices,
        clientDetails: {
          firstName: values.firstName.trim(),
          lastName: values.lastName.trim(),
          email: values.email.trim(),
          phone: phoneNumber.trim(),
          parmanentAddress: values.address.trim(),
          country: values.country.trim(),
          presentAddress: values.addressLine2.trim(),
          state: values.state.trim(),
          postCode: values.postcode.trim()
        },
        paymentMethod: values.paymentMethod.toUpperCase()
      };

      const response = await createBooking(bookingPayload).unwrap();
      console.log(response);
      messageApi.success('Booking created successfully!');
      router.push('/BookingConfirmation?referenceId=' + item._id);

    } catch (error) {
      console.error('Booking error:', error);
      messageApi.error(error?.data?.message || 'Failed to create booking');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return dateString; // Return original if invalid
    }
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formatTime = (timeString) => {
    if (!timeString) return '';

    // Handle case where time is already in HH:mm format
    if (timeString.includes(':')) {
      const [hours, minutes] = timeString.split(':').map(Number);
      if (!isNaN(hours)) {
        const ampm = hours >= 12 ? 'pm' : 'am';
        const displayHours = hours % 12 || 12;
        return `${displayHours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
      }
    }

    // Handle case where time is in ISO format
    const date = new Date(timeString);
    if (!isNaN(date.getTime())) {
      let hours = date.getHours();
      const minutes = date.getMinutes();
      const ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12;
      hours = hours ? hours : 12;
      return `${hours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
    }

    return timeString; // Return original if format is unknown
  };

  if (!reservation || reservation.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        {contextHolder}
        <div className="bg-white p-8 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4">No Reservation Found</h2>
          <p className="mb-6">It seems you don't have any active reservations. Please start a new reservation.</p>
          <Button
            type="primary"
            onClick={() => router.push('/')}
            className="bg-green-500"
          >
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  const item = reservation[0];
  const subtotal = item.dailyRate + (item.extraCost || 0);
  const vat = subtotal * 0.075;
  const total = subtotal + vat;

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
          <div className="bg-green-500 h-full" style={{ width: '75%' }}></div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 xl:gap-8">
        {/* Left sidebar */}
        <div className="lg:w-1/4 w-full">
          <div className="mb-6 border border-gray-200 rounded-md p-3">
            <h3 className="font-bold mb-4 border-b border-gray-200 pb-3">Location</h3>

            <div className="mb-4">
              <p className="font-semibold mb-2">Pick-up</p>
              <div className="flex items-center mb-2">
                <EnvironmentOutlined className="mt-1 mr-2 text-gray-500" />
                <div>
                  <p className="text-base">{item.pickupLocation}</p>
                  <p className="text-xs text-gray-500">
                    {formatDate(item.pickupDate)}, {formatTime(item.pickupTime)}
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <p className="font-semibold mb-2">Return</p>
              <div className="flex items-center mb-2">
                <EnvironmentOutlined className="mt-1 mr-2 text-gray-500" />
                <div>
                  <p className="text-base">{item.returnLocation}</p>
                  <p className="text-xs text-gray-500">
                    {formatDate(item.returnDate)}, {formatTime(item.returnTime)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6 border border-gray-200 p-3 rounded-md">
            <h3 className="font-bold mb-4 border-b border-gray-200 pb-3">Selected Car</h3>
            <div className="rounded-md overflow-hidden">
              <img
                src={`${baseURL}${item.image}` || "/images/maserati.png"}
                alt={`${item.brand} ${item.model}`}
                className="w-full h-40 sm:h-48 object-cover"
              />
              <div className="p-4">
                <h4 className="font-bold text-lg mb-1">{item.brand} | {item.model}</h4>
                <p className="text-xs text-gray-500 mb-1">Starts From</p>
                <p className="text-green-500 font-bold mb-4 border-b border-gray-200 pb-4">₦ {item.dailyRate.toLocaleString()}/Day</p>

                <div className="flex justify-between mb-3">
                  <div className="flex items-center">
                    <UserOutlined className="mr-1 text-gray-500" />
                    <span className="text-xs">{item.noOfSeats} Seats</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-xs">{item.noOfLuggages} Luggages</span>
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

          <div className='border border-gray-200 p-3 rounded-md'>
            <h3 className="font-bold mb-4 border-b border-gray-200 pb-3">Price</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm border-b border-gray-200 pb-3">
                <span>Car rental fee</span>
                <span>₦{item.dailyRate.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm border-b border-gray-200 pb-3">
                <span>Extras price</span>
                <span>₦{(item.extraCost || 0).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm font-semibold border-b border-gray-200 pb-3">
                <span>Sub-total</span>
                <span>₦{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>VAT (7.5%)</span>
                <span>₦{vat.toFixed(2)}</span>
              </div>
              <Divider className="my-2" />
              <div className="flex justify-between font-bold">
                <span>TOTAL</span>
                <span className="text-green-500">
                  ₦{total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
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
              paymentMethod: "stripe"
            }}
          >
            {/* Personal Details Section */}
            <div className="mb-6">
              <Title level={5} className="font-medium text-gray-800 py-2 bg-gray-50 -mx-4 sm:-mx-6 px-4 sm:px-6">Personal Details</Title>
              <div className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Form.Item
                    name="firstName"
                    label="First Name"
                    rules={[{ required: true, message: 'Please enter your first name' }]}
                  >
                    <Input className="w-full" placeholder='Enter your first name' />
                  </Form.Item>

                  <Form.Item
                    name="lastName"
                    label="Last Name"
                    rules={[{ required: true, message: 'Please enter your last name' }]}
                  >
                    <Input className="w-full" placeholder='Enter your last name' />
                  </Form.Item>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Form.Item
                    name="email"
                    label="E-Mail"
                    rules={[
                      { required: true, message: 'Please enter your email' },
                      { type: 'email', message: 'Please enter a valid email' }
                    ]}
                  >
                    <Input className="w-full" placeholder='Enter your email' />
                  </Form.Item>

                  <Form.Item
                    name="phone"
                    label="Phone Number"
                    rules={[{ required: true, message: 'Please enter your phone number' }]}
                  >
                    <PhoneInput
                      enableSearch
                      defaultCountry="ng"
                      className="w-full"
                      placeholder='Enter your phone number'
                    />
                  </Form.Item>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Form.Item
                    name="address"
                    label="Permanent Address"
                    rules={[{ required: true, message: 'Please enter your permanent address' }]}
                  >
                    <Input className="w-full" placeholder='Enter your permanent address' />
                  </Form.Item>

                  <Form.Item
                    name="country"
                    label="Country"
                    rules={[{ required: true, message: 'Please select your country' }]}
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
                  <Form.Item
                    name="addressLine2"
                    label="Present Address"
                    rules={[{ required: true, message: 'Please enter your present address' }]}
                  >
                    <Input className="w-full" placeholder='Enter your present address' />
                  </Form.Item>

                  <Form.Item
                    name="state"
                    label="Region/State"
                    rules={[{ required: true, message: 'Please enter your region/state' }]}
                  >
                    <Input className="w-full" placeholder='Enter your region/state' />
                  </Form.Item>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Form.Item
                    name="postcode"
                    label="Postcode/ZIP Code"
                    rules={[{ required: true, message: 'Please enter your postcode' }]}
                  >
                    <Input className="w-full" placeholder='Enter your postcode' />
                  </Form.Item>
                </div>
              </div>
            </div>

            {/* Payment Method Section */}
            <div className="mb-6">
              <Title level={5} className="font-medium text-gray-800 py-2 bg-gray-50 -mx-4 sm:-mx-6 px-4 sm:px-6">Payment Method</Title>
              <div className="mt-4">
                <p className="mb-2">Please choose one of the available payment methods:</p>
                <ol className="list-decimal pl-5 mb-4">
                  <li className="mb-1">STRIPE – For Non-Naira Credit/Debit card payments.</li>
                </ol>

                <Form.Item
                  name="paymentMethod"
                  label="Select Payment Method"
                  rules={[{ required: true, message: 'Please select a payment method' }]}
                >
                  <Select placeholder="Select Payment Method">
                    <Option value="stripe">STRIPE</Option>
                  </Select>
                </Form.Item>
              </div>
            </div>

            {/* Rental Terms Section */}
            <div className="mb-6">
              <Title level={5} className="font-medium text-gray-800 py-2 bg-gray-50 -mx-4 sm:-mx-6 px-4 sm:px-6">Rental Terms</Title>
              <div className="mt-4">
                <Form.Item
                  name="termsAgreed"
                  valuePropName="checked"
                  rules={[{
                    validator: (_, value) =>
                      value ? Promise.resolve() : Promise.reject(new Error('You must agree to the rental terms')),
                  }]}
                >
                  <Checkbox>
                    I have read and agree to the <a href="#" className="text-green-500">rentals terms</a>
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
    </div>
  );
}