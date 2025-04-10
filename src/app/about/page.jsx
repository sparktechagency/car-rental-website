// pages/about.js
"use client"
import { Button, Card, Col, Row, Typography } from 'antd';
import { 
  EnvironmentOutlined, 
  CarOutlined, 
  ShopOutlined, 
  CustomerServiceOutlined, 
  PlayCircleOutlined 
} from '@ant-design/icons';
import Head from 'next/head';

const { Title, Paragraph } = Typography;

export default function About() {
  return (
    <div className="bg-gray-50">
      <Head>
        <title>About Us - The Lux Auto</title>
        <meta name="description" content="Learn more about The Lux Auto chauffeur services" />
      </Head>

      {/* Hero Section */}
      <div className="relative w-full">
        <div className="container mx-auto px-4 py-8 md:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <img
                src="/api/placeholder/340/200" 
                alt="The Lux Auto chauffeurs"
                className="rounded-lg shadow-md"
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
              <Button type="primary" size="large" className="mt-4 bg-blue-600 hover:bg-blue-700">
                COME SAY HELLO
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Video Section */}
      <div className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="relative">
            <img 
              src="/api/placeholder/800/400" 
              alt="Luxury car on the road"
              className="w-full rounded-lg shadow-xl"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Button 
                icon={<PlayCircleOutlined />} 
                type="primary" 
                shape="circle" 
                size="large"
                className="w-16 h-16 flex items-center justify-center bg-yellow-400 hover:bg-yellow-500 border-0"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <Row gutter={[24, 24]} className="mb-12">
            <Col xs={24} md={8}>
              <Card 
                cover={<img alt="Mercedes car" src="/api/placeholder/300/200" className="h-56 object-cover" />}
                bordered={false}
                className="h-full shadow-md hover:shadow-lg transition-shadow"
              />
            </Col>
            <Col xs={24} md={8}>
              <Card 
                cover={<img alt="Chauffeur with car" src="/api/placeholder/300/200" className="h-56 object-cover" />}
                bordered={false}
                className="h-full shadow-md hover:shadow-lg transition-shadow"
              />
            </Col>
            <Col xs={24} md={8}>
              <Card 
                className="h-full bg-green-500 text-white flex flex-col items-center justify-center p-8 shadow-md"
                bordered={false}
              >
                <Title level={1} className="text-6xl font-bold mb-2 text-white">10</Title>
                <div className="text-center">
                  <Title level={4} className="text-white m-0">YEARS</Title>
                  <Title level={4} className="text-white m-0">IN BUSINESS</Title>
                </div>
              </Card>
            </Col>
          </Row>

          {/* Service Features */}
          <Row gutter={[24, 24]} className="mt-16">
            <Col xs={24} sm={12} md={6}>
              <Card className="text-center h-full border-0 shadow-md hover:shadow-lg transition-shadow">
                <EnvironmentOutlined className="text-4xl text-green-500 mb-4" />
                <Title level={5} className="font-bold mb-2">MORE LOCATIONS</Title>
                <Paragraph className="text-gray-600">
                  Rent from multiple convenient locations.
                </Paragraph>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card className="text-center h-full border-0 shadow-md hover:shadow-lg transition-shadow">
                <CarOutlined className="text-4xl text-green-500 mb-4" />
                <Title level={5} className="font-bold mb-2">AIRPORT DELIVERY</Title>
                <Paragraph className="text-gray-600">
                  Direct delivery to the airport.
                </Paragraph>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card className="text-center h-full border-0 shadow-md hover:shadow-lg transition-shadow">
                <ShopOutlined className="text-4xl text-green-500 mb-4" />
                <Title level={5} className="font-bold mb-2">CURBSIDE DELIVERY</Title>
                <Paragraph className="text-gray-600">
                  Quick drop-off service curbside.
                </Paragraph>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card className="text-center h-full border-0 shadow-md hover:shadow-lg transition-shadow">
                <CustomerServiceOutlined className="text-4xl text-green-500 mb-4" />
                <Title level={5} className="font-bold mb-2">24/7 SUPPORT</Title>
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