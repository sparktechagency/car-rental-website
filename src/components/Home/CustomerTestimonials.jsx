"use client";

import { useEffect, useRef, useState } from 'react';
import { useGetReviewsQuery } from '../../features/Home_page/HomeApi';

export default function CustomerTestimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [slidesPerView, setSlidesPerView] = useState(2);
  const swiperRef = useRef(null);
  const [page] = useState(1);
  const [expandedCards, setExpandedCards] = useState({});

  const { data: reviewData, isLoading } = useGetReviewsQuery(page);

  // Function to truncate the comment to 10 words
  const truncateComment = (comment) => {
    const words = comment.split(' ');
    if (words.length > 10) {
      return words.slice(0, 10).join(' ') + '...';
    }
    return comment;
  };

  const handleSeeMore = (id) => {
    setExpandedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Format API data
  useEffect(() => {
    if (reviewData?.data?.reviews) {
      setTestimonials(reviewData?.data?.reviews);
      // Initialize all cards as not expanded
      const initialExpandedState = {};
      reviewData.data.reviews.forEach(review => {
        initialExpandedState[review._id] = false;
      });
      setExpandedCards(initialExpandedState);
    }
  }, [reviewData]);

  const getRandomColor = () => {
    const colors = ['#1890ff', '#52c41a', '#faad14', '#f5222d', '#722ed1', '#13c2c2'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setSlidesPerView(mobile ? 1 : 2);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Initialize Swiper manually using vanilla JavaScript
  useEffect(() => {
    if (testimonials.length > 0 && swiperRef.current) {
      // Load Swiper CSS
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://cdnjs.cloudflare.com/ajax/libs/Swiper/8.4.5/swiper-bundle.min.css';
      document.head.appendChild(link);

      // Load Swiper JS
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/Swiper/8.4.5/swiper-bundle.min.js';
      script.onload = () => {
        if (window.Swiper) {
          const swiper = new window.Swiper(swiperRef.current, {
            slidesPerView: slidesPerView,
            spaceBetween: 24,
            loop: testimonials.length > slidesPerView,
            speed: 600,
            effect: 'slide',
            allowTouchMove: true,
            breakpoints: {
              768: {
                slidesPerView: 2,
                spaceBetween: 24,
              },
              0: {
                slidesPerView: 1,
                spaceBetween: 16,
              }
            },
            on: {
              slideChange: function () {
                setCurrentSlide(this.realIndex);
              }
            }
          });

          // Store swiper instance for navigation
          swiperRef.current.swiper = swiper;
        }
      };
      document.body.appendChild(script);

      return () => {
        if (swiperRef.current?.swiper) {
          swiperRef.current.swiper.destroy();
        }
      };
    }
  }, [testimonials, slidesPerView]);

  const handlePrev = () => {
    if (swiperRef.current?.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperRef.current?.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const canGoPrev = () => {
    return currentSlide > 0 || testimonials.length > slidesPerView;
  };

  const canGoNext = () => {
    return currentSlide < testimonials.length - slidesPerView || testimonials.length > slidesPerView;
  };

  const paginationDots = testimonials.map((_, index) => {
    let isActive;
    if (isMobile) {
      isActive = index === currentSlide;
    } else {
      isActive = index === currentSlide || index === currentSlide + 1;
    }

    return (
      <div
        key={index}
        className="w-2 h-2 rounded-full mx-1 transition-colors duration-300 cursor-pointer"
        style={{
          backgroundColor: isActive ? '#52c41a' : '#d9d9d9',
        }}
        onClick={() => {
          if (swiperRef.current?.swiper) {
            swiperRef.current.swiper.slideTo(index);
          }
        }}
      />
    );
  });

  const StarRating = ({ rating }) => (
    <div className="flex gap-0.5 text-yellow-400">
      {[...Array(5)].map((_, i) => (
        <svg key={i} className="w-4 h-4" fill={i < rating ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      ))}
    </div>
  );

  const TestimonialCard = ({ testimonial }) => {
    return (
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg p-6 h-full transition-all duration-300">
        <div className="flex items-start gap-4 mb-4">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center bg-amber-200 text-black text-xl font-bold shadow-md"
          >
            <h3 className=''>{testimonial?.clientName?.charAt(0, 5)}</h3>
          </div>
          <div className="flex-1">
            <StarRating rating={testimonial.rating} />
            <h4 className="font-semibold mt-1 text-gray-900">{testimonial.clientName}</h4>
            <p className="text-sm text-gray-500">{testimonial.title}</p>
          </div>
        </div>
        <p className="text-gray-700 mb-3">
          {expandedCards[testimonial._id] ? testimonial.comment : truncateComment(testimonial.comment)}
          {testimonial.comment.split(' ').length > 10 && (
            <button
              className="text-sm text-blue-500 cursor-pointer"
              onClick={() => handleSeeMore(testimonial._id)}
            >
              {expandedCards[testimonial._id] ? 'Show Less' : 'See More'}
            </button>
          )}
        </p>

        <p className="text-xs text-gray-400">
          {new Date(testimonial.createdAt).toLocaleDateString()}
        </p>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="container mx-auto pb-16 px-4">
        <div className="text-center">Loading reviews...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto pb-16 px-4 flex flex-col gap-7 sm:pt-10 pt-0">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          What our customers are saying about us
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Here's what some of our happy clients have to say about their experience with us
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column - Controls */}
        <div className="lg:col-span-4 text-center lg:text-left">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            What Clients Say About Us
          </h3>
          <p className="text-gray-600 mb-6">
            Discover authentic experiences and genuine feedback from our satisfied clients.
          </p>

          <div className="flex gap-3 justify-center lg:justify-start mb-6">
            <button
              onClick={handlePrev}
              disabled={!canGoPrev()}
              className="w-10 h-10 cursor-pointer rounded-full border-2 flex items-center justify-center transition-all duration-300 disabled:cursor-not-allowed hover:scale-105"
              style={{
                borderColor: canGoPrev() ? '#52c41a' : '#d9d9d9',
                color: canGoPrev() ? '#52c41a' : '#d9d9d9',
                boxShadow: canGoPrev() ? '0 2px 8px rgba(82, 196, 26, 0.15)' : 'none',
              }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={handleNext}
              disabled={!canGoNext()}
              className="w-10 h-10 rounded-full cursor-pointer border-2 flex items-center justify-center transition-all duration-300 disabled:cursor-not-allowed hover:scale-105"
              style={{
                borderColor: canGoNext() ? '#52c41a' : '#d9d9d9',
                color: canGoNext() ? '#52c41a' : '#d9d9d9',
                boxShadow: canGoNext() ? '0 2px 8px rgba(82, 196, 26, 0.15)' : 'none',
              }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center lg:justify-start">
            {paginationDots}
          </div>
        </div>

        {/* Right Column - Swiper Testimonials */}
        <div className="lg:col-span-8">
          <div className="swiper" ref={swiperRef} style={{ minHeight: '250px' }}>
            <div className="swiper-wrapper  px-5 ">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="swiper-slide">
                  <TestimonialCard testimonial={testimonial} />
                </div>
              ))}
            </div>
          </div>

          {/* Empty state */}
          {testimonials.length === 0 && !isLoading && (
            <div className="text-center py-10">
              <p className="text-gray-500">No reviews available yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}