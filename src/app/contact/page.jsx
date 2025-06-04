// pages/contact.js
"use client";
import CustomBanner from '@/components/CustomBanner';
import { Button, Form, Input, Select, Spin } from 'antd';
import Head from 'next/head';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { ContactSvg, EmailSvg, Location } from '../../../utils/svgImage';
import { useCreatingContactMutation } from '../../features/ContactApi';
import { useGetFAQQuery } from '../../features/Home_page/HomeApi';

const { Option } = Select;
const { TextArea } = Input;

export default function Contact() {
  const [conatact, { isLoading: isSubmitting }] = useCreatingContactMutation();
  const { data, isLoading: isContactDataLoading, isError } = useGetFAQQuery();

  const onFinish = async (values) => {
    console.log('Form values:', values);
    try {
      const response = await conatact(values).unwrap();
      toast.success(response?.message);
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || 'Failed to send message');
    }
  };


  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500">Failed to load contact information</p>
      </div>
    );
  }

  return (
    <div className="">
      <Head>
        <title>Contact Us | LuxAuto</title>
      </Head>

      <CustomBanner title={"CONTACT us"} breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact Us", href: "/contact" }]} />

      <div className='container mx-auto px-4 py-8'>
        <Spin size="small" spinning={isContactDataLoading} tip="Loading contact information...">
          <div className="flex flex-col lg:flex-row items-stretch gap-6">
            {/* Left sidebar with contact info */}
            <div className="w-full lg:w-4/12 space-y-4">
              {/* Visit Us */}
              <div className="bg-[#F1F7F4] rounded-xl p-6">
                <div className="flex items-start">
                  <div className="bg-gray-200 p-2 rounded-full">
                    <div className="bg-white px-5 py-4 rounded-full">
                      <Location />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold">Visit Us</h3>
                    <p className="text-gray-700">{data?.data.contact.location}</p>
                  </div>
                </div>
              </div>

              {/* Contact */}
              <div className="bg-[#F1F7F4] rounded-xl p-6">
                <div className="flex items-start">
                  <div className="bg-gray-200 p-2 rounded-full">
                    <div className="bg-white px-4 py-4 rounded-full">
                      <ContactSvg />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold">Contact</h3>
                    <p className="text-gray-700">{data?.data.contact.phone}</p>
                  </div>
                </div>
              </div>

              {/* Support Email */}
              <div className="bg-[#F1F7F4] rounded-xl p-6">
                <div className="flex items-start">
                  <div className="bg-gray-200 p-2 rounded-full">
                    <div className="bg-white px-4 py-5 rounded-full">
                      <EmailSvg />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold">Support Email</h3>
                    <p className="text-gray-700">{data?.data.contact.email}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Car Image + Contact Form Side by Side */}
            <div className="flex flex-col md:flex-row w-full lg:w-8/12 gap-6 bg-[#F1F7F4] p-6 rounded-lg overflow-hidden">
              {/* Car Image - hidden on small screens, visible on medium and up */}
              <div className="hidden md:block relative w-full md:w-1/2 h-64 lg:h-auto">
                <Image
                  src="/images/contact.png"
                  alt="Luxury Car on Bridge"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                  priority
                />
              </div>

              {/* Contact Form - full width on small screens, half on medium and up */}
              <div className="w-full md:w-1/2 bg-gray-50 p-6">
                <Form
                  name="contact"
                  layout="vertical"
                  onFinish={onFinish}
                  className="w-full"
                >
                  <Form.Item
                    name="name"
                    rules={[{ required: true, message: 'Please enter your name' }]}
                  >
                    <Input placeholder="Name" className="py-2" />
                  </Form.Item>

                  <Form.Item
                    name="email"
                    rules={[
                      { required: true, message: 'Please enter your email' },
                      { type: 'email', message: 'Please enter a valid email' }
                    ]}
                  >
                    <Input placeholder="Email Address" className="py-2" />
                  </Form.Item>

                  <Form.Item
                    name="subject"
                    rules={[{ required: true, message: 'Please select a subject' }]}
                  >
                    <Select placeholder="Select Subject">
                      <Option value="sales">Sales Inquiry</Option>
                      <Option value="service">Service Request</Option>
                      <Option value="support">Technical Support</Option>
                      <Option value="other">Other</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item
                    name="message"
                    rules={[{ required: true, message: 'Please enter your message' }]}
                  >
                    <TextArea
                      rows={6}
                      placeholder="Write Message..."
                      className="resize-none"
                    />
                  </Form.Item>

                  <Form.Item>
                    <Button
                      loading={isSubmitting}
                      type="primary"
                      htmlType="submit"
                      className="bg-green-500 cursor-pointer hover:bg-green-600 border-none w-full h-10"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="my-12 md:my-24 rounded-lg overflow-hidden border border-gray-200">
            <iframe
              src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63427.97620249539!2d3.3288253771179342!3d6.5076982108365325!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8c0f7e31d467%3A0xd2fc0a14415d1098!2s${data?.data.contact.location}!5e0!3m2!1sen!2sus!4v1681234567890!5m2!1sen!2sus`}
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </Spin>
      </div>
    </div>
  );
}