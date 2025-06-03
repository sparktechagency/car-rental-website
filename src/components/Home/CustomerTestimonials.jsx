"use client";
import { useState, useEffect } from 'react';
import { Button, Rate, Card, Avatar, Row, Col, Typography, Space } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { useGetReviewsQuery } from '../../features/Home_page/HomeApi';

const { Title, Text, Paragraph } = Typography;

export default function CustomerTestimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [slideDirection, setSlideDirection] = useState('');
  const [prevIndex, setPrevIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [page, setPage] = useState(1);

  const { data: reviewData, isLoading } = useGetReviewsQuery(page);
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    if (reviewData?.data?.reviews) {
      const formattedReviews = reviewData.data.reviews.map(review => ({
        name: review.clientEmail.split('@')[0],
        rating: review.rating,
        text: review.comment,
        title: "Satisfied Client",
        avatarColor: getRandomColor(),
        createdAt: review.createdAt
      }));
      setTestimonials(formattedReviews);
    }
  }, [reviewData]);

  const getRandomColor = () => {
    const colors = ['#1890ff', '#52c41a', '#faad14', '#f5222d', '#722ed1', '#13c2c2'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const canGoNext = () => {
    if (isMobile) {
      return testimonials.length > 1 && currentIndex < testimonials.length - 1;
    } else {
      return testimonials.length > 2 && currentIndex < testimonials.length - 2;
    }
  };

  const canGoPrev = () => {
    return currentIndex > 0;
  };

  const handlePrev = () => {
    if (isAnimating || !canGoPrev()) return;
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
    if (isAnimating || !canGoNext()) return;
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
    if (testimonials.length === 0) return [];
    if (isMobile) {
      return [testimonials[currentIndex % testimonials.length]];
    } else {
      return [
        testimonials[currentIndex % testimonials.length],
        testimonials[(currentIndex + 1) % testimonials.length]
      ].filter(Boolean);
    }
  };

  const getPrevVisibleTestimonials = () => {
    if (testimonials.length === 0) return [];
    if (isMobile) {
      return [testimonials[prevIndex % testimonials.length]];
    } else {
      return [
        testimonials[prevIndex % testimonials.length],
        testimonials[(prevIndex + 1) % testimonials.length]
      ].filter(Boolean);
    }
  };

  const paginationDots = testimonials.map((_, index) => {
    let isActive;
    if (isMobile) {
      isActive = index === currentIndex % testimonials.length;
    } else {
      isActive = index === currentIndex % testimonials.length || 
                index === (currentIndex + 1) % testimonials.length;
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

  if (isLoading && testimonials.length === 0) {
    return <div>Loading reviews...</div>;
  }

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
                  borderColor: canGoPrev() ? '#52c41a' : '#d9d9d9', 
                  color: canGoPrev() ? '#52c41a' : '#d9d9d9',
                  transition: 'all 0.3s ease',
                  boxShadow: isAnimating ? 'none' : canGoPrev() ? '0 2px 8px rgba(82, 196, 26, 0.15)' : 'none',
                  transform: isAnimating ? 'scale(0.95)' : 'scale(1)',
                  cursor: canGoPrev() ? 'pointer' : 'not-allowed'
                }}
                disabled={isAnimating || !canGoPrev()}
              />
              <Button 
                shape="circle" 
                icon={<RightOutlined />} 
                onClick={handleNext}
                style={{ 
                  borderColor: canGoNext() ? '#52c41a' : '#d9d9d9', 
                  color: canGoNext() ? '#52c41a' : '#d9d9d9',
                  transition: 'all 0.3s ease',
                  boxShadow: isAnimating ? 'none' : canGoNext() ? '0 2px 8px rgba(82, 196, 26, 0.15)' : 'none',
                  transform: isAnimating ? 'scale(0.95)' : 'scale(1)',
                  cursor: canGoNext() ? 'pointer' : 'not-allowed'
                }}
                disabled={isAnimating || !canGoNext()}
              />
            </Space>
            
            {testimonials.length > 0 && (
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}>
                {paginationDots}
              </div>
            )}
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
                      <Text type="secondary" style={{ fontSize: 12, display: 'block', marginTop: 8 }}>
                        {new Date(testimonial.createdAt).toLocaleDateString()}
                      </Text>
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
                    <Text type="secondary" style={{ fontSize: 12, display: 'block', marginTop: 8 }}>
                      {new Date(testimonial.createdAt).toLocaleDateString()}
                    </Text>
                  </Card>
                </Col>
              ))}
            </Row>

            {testimonials.length === 0 && !isLoading && (
              <div style={{ textAlign: 'center', padding: 40 }}>
                <Text type="secondary">No reviews available yet</Text>
              </div>
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
}