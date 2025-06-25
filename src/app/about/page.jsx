// pages/about.js
"use client"
import CustomBanner from '@/components/CustomBanner';
import { Card, Col, Row, Typography } from 'antd';
import Head from 'next/head';
import Image from 'next/image';

const { Title, Paragraph } = Typography;

export default function About() {
  return (
    <div className="bg-gray-50">
      <CustomBanner title={"About Us"} backgroundImage='/images/banner.jpg' breadcrumbs={[{ label: "Home", href: "/" },
      { label: "About us", href: "/about" }]} />
      <Head>
        <title>About Us - The Lux Auto</title>
        <meta name="description" content="Learn more about The Lux Auto chauffeur services" />
      </Head>

      <div className="container mx-auto px-4 py-8 md:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="relative w-full mb-16">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <img
                src="/images/aboutpage1.png"
                alt="The Lux Auto chauffeurs"
                className="rounded-lg shadow-md w-full"
              />
            </div>
            <div className="md:w-1/2">
              <Title level={2} className="text-3xl font-bold mb-4">The Lux Auto</Title>
              <Paragraph className="text-gray-700">
                Customer Focused Chauffeur Services. The Lux Auto is a company that focus
                on providing great customer experience in Chauffeur services that is more
                than just a car hire. We offer packages to suite our customer needs including
                airport transfers, tours for executives on the move, tour-guide-drive,
                transportation options for personal events like weddings, birthdays and other
                social outings and corporate events like conferences and business meetings.
              </Paragraph>
              <div type="primary" size="large" className="mt-4 bg-green-500 w-3/12 text-center py-3 rounded-lg text-white cursor-text">
                COME SAY HELLO
              </div>
            </div>
          </div>
        </div>

        {/* Video Section */}
        {/* code video section */}

        {/* Features Grid */}
        <div className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
            {/* First car image */}
            <div className="relative overflow-hidden rounded-lg shadow-lg">
              <img
                src="/images/aboutPage2.png"
                alt="Luxury Mercedes G-Class"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-opacity-20 flex items-end">
                <div className="p-4 text-white">
                  <h3 className="font-bold">Mercedes G-Class</h3>
                  <p className="text-sm">Premium chauffeur service</p>
                </div>
              </div>
            </div>

            {/* Second car image */}
            <div className="relative overflow-hidden rounded-lg shadow-lg">
              <img
                src="/images/aboutPage2.png"
                alt="Luxury Porsche Cayenne"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-opacity-20 flex items-end">
                <div className="p-4 text-white">
                  <h3 className="font-bold">Porsche Cayenne</h3>
                  <p className="text-sm">Executive transport</p>
                </div>
              </div>
            </div>

            {/* Third column with split content */}
            <div className="flex flex-col gap-4">
              {/* 10 Years banner */}
              <div className="bg-green-500 rounded-lg p-6 flex items-center justify-center shadow-lg">
                <div className="text-white text-center">
                  <div className="flex items-baseline">
                    <span className="text-6xl font-bold">10</span>
                    <div className="ml-2 text-left">
                      <div className="text-2xl font-bold">YEARS</div>
                      <div className="text-2xl font-bold">IN BUSINESS</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bentley image */}
              <div className="relative overflow-hidden rounded-lg shadow-lg flex-grow">
                <img
                  src="/images/aboutCar.png"
                  alt="Luxury Bentley Continental"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-opacity-20 flex items-end">
                  <div className="p-4 text-white">
                    <h3 className="font-bold">Bentley Continental</h3>
                    <p className="text-sm">VIP experience</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Service Features */}
          <Row gutter={[24, 24]} className="mt-16">
            <Col xs={24} sm={12} md={6}>
              <Card className="text-center h-full border-0 shadow-md hover:shadow-lg transition-shadow">
                <div className='bg-green-500 w-20 h-20 flex items-center justify-center rounded-full mx-auto'>
                  <Image src={'/images/about/location.png'} width={25} height={25} alt={''} />
                </div>
                <Title level={5} className="font-bold mb-2 mt-4">MORE LOCATIONS</Title>
                <Paragraph className="text-gray-600">
                  Rent from multiple convenient locations.
                </Paragraph>
              </Card>

            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card className="text-center h-full border-0 shadow-md hover:shadow-lg transition-shadow">
                <div className='bg-green-500 w-20 h-20 flex items-center justify-center rounded-full mx-auto'>
                  <Image src={'/images/about/plan.png'} width={25} height={25} alt={''} />
                </div>
                <Title level={5} className="font-bold mb-2 mt-4">airport delivery</Title>
                <Paragraph className="text-gray-600">
                  Direct delivery to the airport.
                </Paragraph>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card className="text-center h-full border-0 shadow-md hover:shadow-lg transition-shadow">
                <div className='bg-green-500 w-20 h-20 flex items-center justify-center rounded-full mx-auto'>
                  <Image src={'/images/about/delevry.png'} width={25} height={25} alt={''} />
                </div>
                <Title level={5} className="font-bold mb-2 mt-4">curbside delivery</Title>
                <Paragraph className="text-gray-600">
                  Quick drop-off at the curbside.
                </Paragraph>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card className="text-center h-full border-0 shadow-md hover:shadow-lg transition-shadow">
                <div className='bg-green-500 w-20 h-20 flex items-center justify-center rounded-full mx-auto'>
                  <Image src={'/images/about/support.png'} width={25} height={25} alt={''} />
                </div>
                <Title level={5} className="font-bold mb-2 mt-4">24/7 support</Title>
                <Paragraph className="text-gray-600">
                  Assistance available anytime.
                </Paragraph>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}