// pages/checkout.js

"use client";
import React from 'react';
import { 
  Button, 
  Form, 
  Input, 
  Select, 
  Checkbox,
  Typography,
  Divider 
} from 'antd';
import { 
  CarOutlined, 
  EnvironmentOutlined, 
  UserOutlined, 
  SettingOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined
} from '@ant-design/icons';
import Link from 'next/link';
import PhoneInput from "antd-phone-input";
import { useRouter } from 'next/navigation';

const { Title } = Typography;
const { Option } = Select;

export default function Checkout() {
    const [form] = Form.useForm();
    const router = useRouter();
  
    const onFinish = (values) => {
      console.log('Form values:', values);
   router.push('/BookingConfirmation')
      // Process form submission here
    };

    return (
      <div className="container mx-auto px-4 py-8">
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
                <div className="flex items-start mb-2">
                  <EnvironmentOutlined className="mt-1 mr-2 text-gray-500" />
                  <div>
                    <p className="text-sm">Murtala Mohammed International Airport Lagos</p>
                    <p className="text-xs text-gray-500">25/3/2025, 12:00 am</p>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <p className="font-semibold mb-2">Return</p>
                <div className="flex items-start mb-2">
                  <EnvironmentOutlined className="mt-1 mr-2 text-gray-500" />
                  <div>
                    <p className="text-sm">Murtala Mohammed International Airport Lagos</p>
                    <p className="text-xs text-gray-500">25/3/2025, 4:00 pm</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mb-6 border border-gray-200 p-3 rounded-md">
              <h3 className="font-bold mb-4 border-b border-gray-200 pb-3">Selected Car</h3>
              <div className="rounded-md overflow-hidden">
                <img 
                  src="/images/maserati.png" 
                  alt="Mercedes-Benz" 
                  className="w-full h-40 sm:h-48 object-cover"
                />
                <div className="p-4">
                  <div className="flex items-center mb-1">
                    <span className="text-sm mr-1">4.8</span>
                    <span className="text-xs text-gray-500">(162 Reviews)</span>
                  </div>
                  <h4 className="font-bold text-lg mb-1">MERCEDES-BENZ</h4>
                  <p className="text-xs text-gray-500 mb-1">Starts From</p>
                  <p className="text-green-500 font-bold mb-4 border-b border-gray-200 pb-4">₦ 109,999/Day</p>
                  
                  <div className="flex justify-between mb-3">
                    <div className="flex items-center">
                      <UserOutlined className="mr-1 text-gray-500" />
                      <span className="text-xs">6 Seats</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-xs">5</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <div className="flex items-center">
                      <CarOutlined className="mr-1 text-gray-500" />
                      <span className="text-xs">2 Doors</span>
                    </div>
                    <div className="flex items-center">
                      <SettingOutlined className="mr-1 text-gray-500" />
                      <span className="text-xs">Automatic</span>
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
                  <span>₦299,800</span>
                </div>
                <div className="flex justify-between text-sm border-b border-gray-200 pb-3">
                  <span>Extras price</span>
                  <span>₦0.00</span>
                </div>
                <div className="flex justify-between text-sm font-semibold border-b border-gray-200 pb-3">
                  <span>Sub-total</span>
                  <span>₦299,800</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>VAT (7.5%)</span>
                  <span>₦22,485</span>
                </div>
                <Divider className="my-2" />
                <div className="flex justify-between font-bold">
                  <span>TOTAL</span>
                  <span className="text-green-500">₦322,285</span>
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
            >
              {/* Personal Details Section */}
              <div className="mb-6">
                <Title level={5} className="font-medium text-gray-800 py-2 px-1 bg-gray-50 -mx-4 sm:-mx-6 px-4 sm:px-6">Personal Details</Title>
                <div className="mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Form.Item
                      name="firstName"
                      label="First Name"
                      rules={[{ required: true, message: 'Please enter your first name' }]}
                    >
                      <Input className="w-full" />
                    </Form.Item>
                    
                    <Form.Item
                      name="lastName"
                      label="Last Name"
                      rules={[{ required: true, message: 'Please enter your last name' }]}
                    >
                      <Input className="w-full" />
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
                      <Input className="w-full" />
                    </Form.Item>
                    
                    <Form.Item
                      name="phone"
                      label="Phone Number"
                    >
                      <PhoneInput 
                        enableSearch
                        defaultCountry="ng" 
                        className="w-full"
                      />
                    </Form.Item>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Form.Item
                      name="address"
                      label="Address"
                      rules={[{ required: true, message: 'Please enter your address' }]}
                    >
                      <Input className="w-full" />
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
                      label="Address"
                      rules={[{ required: true, message: 'Please enter your address' }]}
                    >
                      <Input className="w-full" />
                    </Form.Item>
                    
                    <Form.Item
                      name="state"
                      label="Region/State"
                    >
                      <Input className="w-full" />
                    </Form.Item>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Form.Item
                      name="postcode"
                      label="Postcode/ZIP Code"
                    >
                      <Input className="w-full" />
                    </Form.Item>
                  </div>
                </div>
              </div>
              
              {/* Payment Method Section */}
              <div className="mb-6">
                <Title level={5} className="font-medium text-gray-800 py-2 px-1 bg-gray-50 -mx-4 sm:-mx-6 px-4 sm:px-6">Payment Method</Title>
                <div className="mt-4">
                  <p className="mb-2">Please choose one of the available payment methods:</p>
                  <ol className="list-decimal pl-5 mb-4">
                    <li className="mb-1">STRIPE – For Non-Naira Credit/Debit card payments.</li>
                    <li>Bank Transfer – For Naira payments. Please transfer to FCMB Bank, Account # 8949197011.</li>
                  </ol>
                  
                  <Form.Item
                    name="paymentMethod"
                    label="Select Payment Method"
                    rules={[{ required: true, message: 'Please select a payment method' }]}
                  >
                    <Select placeholder="Select Payment Method">
                      <Option value="stripe">STRIPE</Option>
                      <Option value="bank">Bank Transfer</Option>
                    </Select>
                  </Form.Item>
                </div>
              </div>
              
              {/* Rental Terms Section */}
              <div className="mb-6">
                <Title level={5} className="font-medium text-gray-800 py-2 px-1 bg-gray-50 -mx-4 sm:-mx-6 px-4 sm:px-6">Rental Terms</Title>
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