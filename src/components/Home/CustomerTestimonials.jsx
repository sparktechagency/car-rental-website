"use client";
import { useState, useEffect } from 'react';
import { Button, Rate, Card, Avatar, Row, Col, Typography, Space } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

export default function CustomerTestimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [slideDirection, setSlideDirection] = useState('');
  const [prevIndex, setPrevIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const testimonials = [
    {
      name: "Wade Warren",
      rating: 5,
      text: "The service was exceptional! The car was spotless, and the chauffeur was professional and friendly. Highly recommend!",
      title: "Satisfied Client",
      avatarColor: '#1890ff'
    },
    {
      name: "Devon Lane",
      rating: 5,
      text: "I rented a car for my wedding, and it was a perfect experience. The driver was on time, and the car was beautiful!",
      title: "Satisfied Client",
      avatarColor: '#52c41a'
    },
    {
      name: "Jane Smith",
      rating: 4,
      text: "Great service overall. The car was clean and comfortable. Would definitely use again for my business trips.",
      title: "Frequent Traveler",
      avatarColor: '#faad14'
    },
    {
      name: "Robert Johnson",
      rating: 5,
      text: "Outstanding customer service. They went above and beyond to accommodate my last-minute booking request.",
      title: "First-time Customer",
      avatarColor: '#f5222d'
    }
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handlePrev = () => {
    if (isAnimating) return;
    setPrevIndex(currentIndex);
    setSlideDirection('right');
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => 
        prev === 0 ? testimonials.length - (isMobile ? 1 : 2) : prev - (isMobile ? 1 : 2)
      );
    }, 300);
  };

  const handleNext = () => {
    if (isAnimating) return;
    setPrevIndex(currentIndex);
    setSlideDirection('left');
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => 
        prev >= testimonials.length - (isMobile ? 1 : 2) ? 0 : prev + (isMobile ? 1 : 2)
      );
    }, 300);
  };

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  const getVisibleTestimonials = () => {
    if (isMobile) {
      return [testimonials[currentIndex]];
    } else {
      return [
        testimonials[currentIndex],
        testimonials[(currentIndex + 1) % testimonials.length]
      ];
    }
  };

  const getPrevVisibleTestimonials = () => {
    if (isMobile) {
      return [testimonials[prevIndex]];
    } else {
      return [
        testimonials[prevIndex],
        testimonials[(prevIndex + 1) % testimonials.length]
      ];
    }
  };

  const paginationDots = testimonials.map((_, index) => {
    let isActive;
    if (isMobile) {
      isActive = index === currentIndex;
    } else {
      isActive = index === currentIndex || index === (currentIndex + 1) % testimonials.length;
    }
    
    return (
      <div
        key={index}
        style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: isActive ? '#52c41a' : '#d9d9d9',
          margin: '0 4px',
          transition: 'background-color 0.3s ease',
        }}
      />
    );
  });

  return (
    <div className='container mx-auto pb-16 sm:px-0 px-2.5'>
      <Space direction="vertical" size="large" style={{ width: '100%', textAlign: 'center' }}>
        <Title level={2}>What our customers are saying about us</Title>
        <Text type="secondary" style={{ display: 'block', marginBottom: 48 }}>
          Here's what some of our happy clients have to say about their experience with us
        </Text>
      </Space>

      <Row gutter={[24, 24]} align="middle">
        <Col xs={24} md={8}>
          <Space direction="vertical" size="middle">
            <Title level={3}>What Clients Say About Us</Title>
            <Paragraph type="secondary">
              Discover authentic experiences and genuine feedback from our satisfied clients.
            </Paragraph>
            <Space>
              <Button 
                shape="circle" 
                icon={<LeftOutlined />} 
                onClick={handlePrev}
                style={{ 
                  borderColor: '#52c41a', 
                  color: '#52c41a',
                  transition: 'all 0.3s ease',
                  boxShadow: isAnimating ? 'none' : '0 2px 8px rgba(82, 196, 26, 0.15)',
                  transform: isAnimating ? 'scale(0.95)' : 'scale(1)'
                }}
                disabled={isAnimating}
              />
              <Button 
                shape="circle" 
                icon={<RightOutlined />} 
                onClick={handleNext}
                style={{ 
                  borderColor: '#52c41a', 
                  color: '#52c41a',
                  transition: 'all 0.3s ease',
                  boxShadow: isAnimating ? 'none' : '0 2px 8px rgba(82, 196, 26, 0.15)',
                  transform: isAnimating ? 'scale(0.95)' : 'scale(1)'
                }}
                disabled={isAnimating}
              />
            </Space>
            
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}>
              {paginationDots}
            </div>
          </Space>
        </Col>

        <Col xs={24} md={16}>
          <div style={{ 
            overflow: 'hidden', 
            position: 'relative', 
            borderRadius: 8,
            height: '100%',
            minHeight: 240
          }}>
            {isAnimating && (
              <Row 
                gutter={[16, 16]} 
                style={{
                  position: 'absolute',
                  width: '100%',
                  zIndex: 1,
                  transition: 'all 0.5s cubic-bezier(0.645, 0.045, 0.355, 1)',
                  transform: `translateX(${slideDirection === 'left' ? '-100%' : '100%'})`,
                  opacity: 0
                }}
              >
                {getPrevVisibleTestimonials().map((testimonial, index) => (
                  <Col key={`prev-${index}`} xs={24} sm={24} md={12}>
                    <Card 
                      hoverable
                      style={{
                        height: '100%',
                        transition: 'all 0.3s ease',
                        transform: 'scale(0.98)',
                      }}
                    >
                      <Space size="middle" align="start">
                        <Avatar 
                          size={64} 
                          style={{ 
                            backgroundColor: testimonial.avatarColor,
                            color: '#fff',
                            fontSize: 24,
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
                          }}
                        >
                          {testimonial.name.charAt(0)}
                        </Avatar>
                        <Space direction="vertical" size={4}>
                          <Rate 
                            disabled 
                            value={testimonial.rating} 
                            style={{ fontSize: 14 }} 
                          />
                          <Text strong>{testimonial.name}</Text>
                          <Text type="secondary" style={{ fontSize: 12 }}>
                            {testimonial.title}
                          </Text>
                        </Space>
                      </Space>
                      <Paragraph style={{ marginTop: 16 }}>
                        {testimonial.text}
                      </Paragraph>
                    </Card>
                  </Col>
                ))}
              </Row>
            )}

            <Row 
              gutter={[16, 16]} 
              style={{
                position: 'relative',
                zIndex: 2,
                transition: 'all 0.5s cubic-bezier(0.645, 0.045, 0.355, 1)',
                transform: isAnimating 
                  ? `translateX(${slideDirection === 'left' ? '100%' : '-100%'})` 
                  : 'translateX(0)',
                opacity: isAnimating ? 0 : 1
              }}
            >
              {getVisibleTestimonials().map((testimonial, index) => (
                <Col key={index} xs={24} sm={24} md={12}>
                  <Card 
                    hoverable
                    style={{
                      height: '100%',
                      transition: 'all 0.3s ease',
                      transform: isAnimating ? 'scale(1.02)' : 'scale(1)',
                      boxShadow: isAnimating ? '0 10px 20px rgba(0, 0, 0, 0.1)' : '0 4px 8px rgba(0, 0, 0, 0.05)'
                    }}
                  >
                    <Space size="middle" align="start">
                      <Avatar 
                        size={64} 
                        style={{ 
                          backgroundColor: testimonial.avatarColor,
                          color: '#fff',
                          fontSize: 24,
                          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
                        }}
                      >
                        {testimonial.name.charAt(0)}
                      </Avatar>
                      <Space direction="vertical" size={4}>
                        <Rate 
                          disabled 
                          value={testimonial.rating} 
                          style={{ fontSize: 14 }} 
                        />
                        <Text strong>{testimonial.name}</Text>
                        <Text type="secondary" style={{ fontSize: 12 }}>
                          {testimonial.title}
                        </Text>
                      </Space>
                    </Space>
                    <Paragraph style={{ marginTop: 16 }}>
                      {testimonial.text}
                    </Paragraph>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
}