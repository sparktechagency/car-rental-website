"use client"
import CustomBanner from '@/components/CustomBanner';
import { Card, Col, Row, Typography } from 'antd';
import Head from 'next/head';
import Image from 'next/image';

const { Title, Paragraph } = Typography;

export default function About() {
  return (
    <div className="bg-gray-50">
      <Head>
        <title>About Us - The Lux Auto</title>
        <meta name="description" content="Learn more about The Lux Auto chauffeur services" />
      </Head>

      <CustomBanner
        title={"About Us"}
        backgroundImage='/images/banner.jpg'
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About us", href: "/about" }
        ]}
      />

      <div className="max-w-[1920px] mx-auto px-4 py-8 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        {/* Hero Section */}
        <div className="w-full mb-12 md:mb-16 lg:mb-20">
          <div className="flex flex-col lg:flex-row items-center gap-6 md:gap-8 lg:gap-12">
            <div className="w-full lg:w-1/2">
              <img
                src="/images/aboutpage1.png"
                alt="The Lux Auto chauffeurs"
                className="rounded-lg shadow-md w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
            <div className="w-full lg:w-1/2">
              <Title level={2} className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                The Lux Auto
              </Title>
              <Paragraph className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed">
                Customer Focused Chauffeur Services. The Lux Auto is a company that focuses
                on providing great customer experience in Chauffeur services that is more
                than just a car hire. We offer packages to suit our customer needs including
                airport transfers, tours for executives on the move, tour-guide-drive,
                transportation options for personal events like weddings, birthdays and other
                social outings and corporate events like conferences and business meetings.
              </Paragraph>
              <div className="mt-6 bg-green-500 w-full sm:w-3/12 text-center py-3 rounded-lg text-white font-medium cursor-pointer hover:bg-green-600 transition-colors duration-300">
                COME SAY HELLO
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-12 md:mb-16 lg:mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-12 md:mb-16">
            {/* First car image */}
            <div className="relative overflow-hidden rounded-lg shadow-lg aspect-[4/3]">
              <img
                src="/images/aboutPage2.png"
                alt="Luxury Mercedes G-Class"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end p-4">
                <div className="text-white">
                  <h3 className="font-bold text-lg">Mercedes G-Class</h3>
                  <p className="text-sm opacity-90">Premium chauffeur service</p>
                </div>
              </div>
            </div>

            {/* Second car image */}
            <div className="relative overflow-hidden rounded-lg shadow-lg aspect-[4/3]">
              <img
                src="/images/aboutPage2.png"
                alt="Luxury Porsche Cayenne"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end p-4">
                <div className="text-white">
                  <h3 className="font-bold text-lg">Porsche Cayenne</h3>
                  <p className="text-sm opacity-90">Executive transport</p>
                </div>
              </div>
            </div>

            {/* Third column with split content */}
            <div className="flex flex-col gap-4 md:gap-6">
              {/* 10 Years banner */}
              <div className="bg-green-500 rounded-lg p-4 md:p-6 flex items-center justify-center shadow-lg h-full min-h-[120px] md:min-h-[150px]">
                <div className="text-white text-center">
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl sm:text-5xl md:text-6xl font-bold">10</span>
                    <div className="ml-2 text-left">
                      <div className="text-xl sm:text-2xl font-bold">YEARS</div>
                      <div className="text-xl sm:text-2xl font-bold">IN BUSINESS</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bentley image */}
              <div className="relative overflow-hidden rounded-lg shadow-lg flex-grow aspect-[4/3]">
                <img
                  src="/images/aboutCar.png"
                  alt="Luxury Bentley Continental"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end p-4">
                  <div className="text-white">
                    <h3 className="font-bold text-lg">Bentley Continental</h3>
                    <p className="text-sm opacity-90">VIP experience</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Service Features */}
          <Row gutter={[16, 16]} className="mt-8 md:mt-12 lg:mt-16">
            <Col xs={24} sm={12} md={6}>
              <Card className="text-center h-full border-0 shadow-md hover:shadow-lg transition-shadow duration-300 hover:border-green-500/20">
                <div className='bg-green-500 w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-full mx-auto transition-transform duration-300 hover:scale-110'>
                  <Image
                    src={'/images/about/location.png'}
                    width={25}
                    height={25}
                    alt="Location icon"
                    className="w-5 h-5 md:w-6 md:h-6"
                  />
                </div>
                <Title level={5} className="font-bold mb-2 mt-4 text-base md:text-lg">MORE LOCATIONS</Title>
                <Paragraph className="text-gray-600 text-sm md:text-base">
                  Rent from multiple convenient locations.
                </Paragraph>
              </Card>
            </Col>

            <Col xs={24} sm={12} md={6}>
              <Card className="text-center h-full border-0 shadow-md hover:shadow-lg transition-shadow duration-300 hover:border-green-500/20">
                <div className='bg-green-500 w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-full mx-auto transition-transform duration-300 hover:scale-110'>
                  <Image
                    src={'/images/about/plan.png'}
                    width={25}
                    height={25}
                    alt="Airport icon"
                    className="w-5 h-5 md:w-6 md:h-6"
                  />
                </div>
                <Title level={5} className="font-bold mb-2 mt-4 text-base md:text-lg">AIRPORT DELIVERY</Title>
                <Paragraph className="text-gray-600 text-sm md:text-base">
                  Direct delivery to the airport.
                </Paragraph>
              </Card>
            </Col>

            <Col xs={24} sm={12} md={6}>
              <Card className="text-center h-full border-0 shadow-md hover:shadow-lg transition-shadow duration-300 hover:border-green-500/20">
                <div className='bg-green-500 w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-full mx-auto transition-transform duration-300 hover:scale-110'>
                  <Image
                    src={'/images/about/delevry.png'}
                    width={25}
                    height={25}
                    alt="Delivery icon"
                    className="w-5 h-5 md:w-6 md:h-6"
                  />
                </div>
                <Title level={5} className="font-bold mb-2 mt-4 text-base md:text-lg">CURBSIDE DELIVERY</Title>
                <Paragraph className="text-gray-600 text-sm md:text-base">
                  Quick drop-off at the curbside.
                </Paragraph>
              </Card>
            </Col>

            <Col xs={24} sm={12} md={6}>
              <Card className="text-center h-full border-0 shadow-md hover:shadow-lg transition-shadow duration-300 hover:border-green-500/20">
                <div className='bg-green-500 w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-full mx-auto transition-transform duration-300 hover:scale-110'>
                  <Image
                    src={'/images/about/support.png'}
                    width={25}
                    height={25}
                    alt="Support icon"
                    className="w-5 h-5 md:w-6 md:h-6"
                  />
                </div>
                <Title level={5} className="font-bold mb-2 mt-4 text-base md:text-lg">24/7 SUPPORT</Title>
                <Paragraph className="text-gray-600 text-sm md:text-base">
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