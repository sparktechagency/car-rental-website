"use client";
import CustomBanner from '@/components/CustomBanner';
import { App, Button, Form, Input, Typography } from 'antd';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useGetBookingEmailAndIdQuery } from '../../features/Booking/BookingApi';

const { Title } = Typography;
const { useApp } = App;

export default function ReservationPage() {
  const [form] = Form.useForm();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const { message } = useApp(); // Get message from App context
  const { data: bookingData, isLoading, error } = useGetBookingEmailAndIdQuery(data, { skip: !data.email || !data.referenceId });

  // Handle API response
  useEffect(() => {
    if (bookingData) {
      if (bookingData.success === false) {
        message.error(bookingData.message || 'Client not found');
        setLoading(false);
      } else if (bookingData.success === true) {
        router.push(`/reservationdetails?bookingId=${data.referenceId}&clientEmail=${data.email}`);
        toast.success('Booking details retrieved successfully');
        setLoading(false);
      }
    }

    if (error) {
      message.error('Not found please try again');
      setLoading(false);
    }
  }, [bookingData, error, data, router, message]); // Add message to dependencies

  const handleSubmit = (values) => {
    setLoading(true);
    setData({ ...values });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <CustomBanner
        title={"Booking"}
        backgroundImage='/images/banner.jpg'
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Booking", href: "/booking" }
        ]}
      />

      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
        <div className="flex justify-center items-center">
          <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl bg-white rounded-lg shadow-sm p-6 sm:p-8 md:p-10">
            <div className="text-center mb-6 md:mb-8">
              <Title level={3} className="!text-xl sm:!text-2xl md:!text-3xl !font-medium !text-gray-800 !mb-2">
                View Your Reservation
              </Title>
              <p className="text-gray-600 text-sm sm:text-base">
                Use your email address and reference ID to view reservation details.
              </p>
            </div>

            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              className="space-y-4 md:space-y-6"
            >
              <Form.Item
                name="email"
                label={<span className="text-gray-700 font-medium">Email Address</span>}
                rules={[
                  { required: true, message: 'Please enter your email address' },
                  { type: 'email', message: 'Please enter a valid email' }
                ]}
              >
                <Input
                  placeholder="your@email.com"
                  className="h-12 sm:h-14 rounded-lg border-gray-300 hover:border-emerald-400 focus:border-emerald-500"
                  size="large"
                />
              </Form.Item>

              <Form.Item
                name="referenceId"
                label={<span className="text-gray-700 font-medium">Reference ID</span>}
                rules={[
                  { required: true, message: 'Please enter your reference ID' }
                ]}
              >
                <Input
                  placeholder="e.g. ABC12345"
                  className="h-12 sm:h-14 rounded-lg border-gray-300 hover:border-emerald-400 focus:border-emerald-500"
                  size="large"
                />
              </Form.Item>

              <Form.Item className="!mt-8">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading || isLoading}
                  className="w-full h-12 sm:h-14 rounded-lg bg-emerald-500 hover:bg-emerald-600 border-emerald-500 hover:border-emerald-600 text-white font-medium text-base sm:text-lg transition-all duration-300 shadow-md hover:shadow-lg"
                  size="large"
                >
                  {loading || isLoading ? 'Processing...' : 'Manage Reservation'}
                </Button>
              </Form.Item>
            </Form>

            <div className="mt-6 text-center">
              <p className="text-gray-500 text-xs sm:text-sm">
                Having trouble? <a href="/contact" className="text-emerald-600 hover:text-emerald-700">Contact support</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}