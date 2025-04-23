// pages/reservation.js
"use client";
import CustomBanner from '@/components/CustomBanner';
import { Button, Form, Input, Typography } from 'antd';
import { useState } from 'react';

const { Title } = Typography;

export default function ReservationPage() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      // Replace with your actual API call
      console.log('Submitting values:', values);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
      form.resetFields();
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
  <CustomBanner title={"Booking"} backgroundImage='/images/banner.jpg' breadcrumbs={[  { label: "Home", href: "/" },
          { label: "Booking" , href:"/booking" }]} />
    <div className="flex justify-center items-center bg-gray-50">
      <div className="w-full max-w-3xl my-20 p-6 bg-white rounded-lg shadow-sm">
        <div className="text-center mb-6">
          <Title level={5} className="font-normal text-gray-700">
            Use your email address and reference ID to view reservation details.
          </Title>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className="space-y-4"
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Please enter your email address' },
              { type: 'email', message: 'Please enter a valid email' }
            ]}
          >
            <Input 
              placeholder="Email address" 
              className="h-10 rounded" 
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="referenceId"
            rules={[
              { required: true, message: 'Please enter your reference ID' }
            ]}
          >
            <Input 
              placeholder="Reference ID" 
              className="h-10 rounded" 
              size="large"
            />
          </Form.Item>

          <div className="flex justify-center mt-6">
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="h-10 px-6 bg-emerald-500 hover:bg-emerald-600 border-emerald-500 hover:border-emerald-600"
            >
              Manage
            </Button>
          </div>
        </Form>
      </div>
    </div>
    </>
  );
}