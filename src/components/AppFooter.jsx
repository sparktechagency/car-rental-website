"use client";
import { MailOutlined, MessageOutlined, PhoneOutlined } from '@ant-design/icons';
import { Col, Layout, Row, Space, Typography } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { GoCodeReview } from "react-icons/go";
import { useGetFAQQuery } from '../features/Home_page/HomeApi';

const { Footer } = Layout;
const { Title, Text } = Typography;

const AppFooter = () => {
  const { data: faq, isLoading, isError } = useGetFAQQuery();
  return (
    <Footer style={{ backgroundColor: "#101A12", color: "#ffffff" }} className="p-0 bg-[#101A12] text-white">
      <div className="max-w-7xl mx-auto py-16 px-4 ">
        <Row gutter={[48, 24]} className="mb-12">
          <Col xs={24} sm={24} md={8} lg={8}>
            <div className="flex flex-col">
              <div className="mb-6">
                <Image
                  src="/images/footerLogo.png"
                  alt="TheLuxAUTO"
                  width={70}
                  height={50}
                  className="mb-4"
                />
              </div>
              <Text style={{ color: 'white', width: "250px" }} className="text-white text-base mb-6">
                Your go-to destination for luxury car rentals in Lagos. Enjoy a premium experience with top-class vehicles
              </Text>
            </div>
          </Col>

          <Col xs={24} sm={12} md={5} lg={5}>
            <Title style={{ color: 'white' }} level={4} className="text-white mb-6">Company</Title>
            <Space style={{ color: 'white' }} direction="vertical" size="middle">
              <Link style={{ color: 'white' }} href="/" className="text-white hover:text-gray-300">Home</Link>
              <Link style={{ color: 'white' }} href="/about" className="text-white hover:text-gray-300">About Us</Link>
              <Link style={{ color: 'white' }} href="/contact" className="text-white hover:text-gray-300">Contact us</Link>
              <Link style={{ color: 'white' }} href="/team" className="text-white hover:text-gray-300">Team</Link>
            </Space>
          </Col>

          <Col xs={24} sm={12} md={5} lg={5}>
            <Title style={{ color: 'white' }} level={4} className="text-white mb-6">Quick Link</Title>
            <Space direction="vertical" size="middle">
              {/* <Link style={{color:'white'}} href="/partner" className="text-white hover:text-gray-300">Become a partner</Link> */}
              <Link style={{ color: 'white' }} href="/terms-conditions" className="text-white hover:text-gray-300">Term & Conditions</Link>
              <Link style={{ color: 'white' }} href="/privacy-policy" className="text-white hover:text-gray-300">Privacy Policy </Link>
              <Link style={{ color: 'white' }} href="/faq" className="text-white hover:text-gray-300">Faq</Link>
              <Link style={{ color: 'white' }} href="/fleet" className="text-white hover:text-gray-300">Fleet</Link>
            </Space>
          </Col>

          <Col xs={24} sm={24} md={6} lg={6}>
            <Title style={{ color: 'white' }} level={4} className="text-white mb-6">Contact</Title>
            <Space direction="vertical" size="middle">
              <Space>
                <PhoneOutlined style={{ color: 'white' }} />
                <Text style={{ color: 'white' }} className="text-white">{isLoading ? 'Loading...' : faq?.data?.contact?.phone}</Text>
              </Space>
              <Space>
                <MessageOutlined style={{ color: 'white' }} />
                <Text style={{ color: 'white' }} className="text-white">{isLoading ? 'Loading...' : faq?.data?.contact?.phone}</Text>
              </Space>
              <Space>
                <MailOutlined style={{ color: 'white' }} />
                <Text style={{ color: 'white' }} className="text-white">{isLoading ? 'Loading...' : faq?.data?.contact?.email}</Text>
              </Space>
              <Space>
                {/* <MailOutlined style={{ color: 'white' }} /> */}
                <GoCodeReview style={{ color: 'white', fontSize: '16px' }} />
                <a href="https://www.google.com/search?sca_esv=fb03314f468d4f44&sxsrf=AE3TifNWwM4jnX0HROcU7JQnM0Xn6VQ-GA:1750504273447&si=AMgyJEtREmoPL4P1I5IDCfuA8gybfVI2d5Uj7QMwYCZHKDZ-E40EGIDnNFJdFdBrTGiLkjBffYo0U6dSsc2XJ-Je_ZB9Riv9070KVyWEbDc62fNzWuKjCtuSDVYyAB7HNld64td6N6WS&q=TheLuxAuto+Reviews&sa=X&ved=2ahUKEwjT8JXLsIKOAxV4-TgGHWY3C3IQ0bkNegQIKRAE&biw=1920&bih=911&dpr=1#lrd=0x103bf58e9b6025bd:0x3d28813529ffe89f,3,,,," target="_blank" rel="noopener noreferrer"><Text style={{ color: 'white', textDecoration: 'underline' }} className="text-white">Give FeedBack</Text></a>
              </Space>
            </Space>
          </Col>
        </Row>

        <div style={{ color: 'white', borderTop: "1px solid white" }} className="border-t border-gray-700 pt-6 text-center">
          <Text style={{ color: 'white' }} className="text-white">©2025 TheLuxAUTO All Rights Reserved</Text>
        </div>
      </div>
    </Footer>
  );
};

export default AppFooter;