"use client";
import { useState, useRef, useEffect } from 'react';
import { Collapse, Button } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { motion, AnimatePresence } from 'framer-motion';

export default function Frequently() {
  const [activeKey, setActiveKey] = useState(['1']);
  const [showAll, setShowAll] = useState(false);
  const [height, setHeight] = useState(0);
  const faqRef = useRef(null);

  // FAQ data array for better maintainability
  const faqItems = [
    {
      key: '1',
      label: 'Where are your pick up locations?',
      children: (
        <motion.p 
          className="text-gray-600 py-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          Our vehicles are usually located inside the International Airport in Ikeja Lagos or at our Lekki VI office. However, as we offer strictly chauffeur services, we can pick you up at any location of your convenience.
        </motion.p>
      )
    },
    {
      key: '2',
      label: 'How do we find the chauffeur at the airport?',
      children: (
        <motion.p 
          className="text-gray-600 py-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          Our professional chauffeur will be waiting for you at the arrival area holding a sign with your name on it. We also provide you with the chauffeur's contact information prior to your arrival.
        </motion.p>
      )
    },
    {
      key: '3',
      label: 'Will my chauffeur assist with my bags and dress professionally?',
      children: (
        <motion.p 
          className="text-gray-600 py-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          Yes, all our chauffeurs are trained to assist with your luggage and are required to wear professional attire at all times. Customer service is our top priority.
        </motion.p>
      )
    },
    {
      key: '4',
      label: 'What types of cars do you offer?',
      children: (
        <motion.p 
          className="text-gray-600 py-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          We offer a wide range of luxury vehicles including Mercedes-Benz, BMW, Rolls-Royce, and more. Our fleet consists of sedans, SUVs, and premium vans to suit all your needs.
        </motion.p>
      )
    },
    {
      key: '5',
      label: 'How can I pay for my booking?',
      children: (
        <motion.p 
          className="text-gray-600 py-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          We accept major credit/debit cards, bank transfers, and mobile payments. You can pay online during booking or arrange for payment upon arrival.
        </motion.p>
      )
    },
    {
      key: '6',
      label: 'What is your cancellation policy?',
      children: (
        <motion.p 
          className="text-gray-600 py-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          We offer free cancellation up to 24 hours before your scheduled pickup. Cancellations made within 24 hours may be subject to a fee. Please contact our customer service for specific details.
        </motion.p>
      )
    },
    {
      key: '7',
      label: 'Do you offer long-term rentals?',
      children: (
        <motion.p 
          className="text-gray-600 py-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          Yes, we offer special rates for long-term chauffeur services and extended rentals. Please contact us directly for a customized quote based on your specific needs.
        </motion.p>
      )
    }
  ];

  // Calculate initial height on mount
  useEffect(() => {
    if (faqRef.current) {
      setHeight(faqRef.current.clientHeight);
    }
  }, []);

  // Display all FAQs or just the first 5
  const displayFaqs = showAll ? faqItems : faqItems.slice(0, 5);

  // Custom panel style function
  const getPanelStyle = (key) => {
    return activeKey.includes(key) 
      ? 'border-l-4 border-green-500 bg-gray-50 transition-all duration-300'
      : 'border-l-4 border-transparent transition-all duration-300';
  };

  // Animation variants for the button
  const buttonVariants = {
    initial: { scale: 1 },
    tap: { scale: 0.95 },
    hover: { scale: 1.05 }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:pt-10 pt-0 bg-white">
      {/* FAQ Section */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-center mb-3">Frequently Asked Questions</h2>
        <p className="text-center mb-10 text-gray-600 max-w-2xl mx-auto">
          Find quick answers to common questions about our luxury car rentals. If you need more information, 
          don't hesitate to contact us!
        </p>

        <div ref={faqRef}>
          <Collapse 
            activeKey={activeKey} 
            onChange={setActiveKey}
            expandIconPosition="end"
            className="mb-8 shadow-sm border-0"
            expandIcon={({ isActive }) => (
              isActive ? 
                <UpOutlined className="text-green-500 text-lg" /> : 
                <DownOutlined className="text-gray-400 text-lg" />
            )}
            items={displayFaqs.map(item => ({
              ...item,
              className: `mb-4 rounded-lg overflow-hidden ${getPanelStyle(item.key)}`,
              label: (
                <div className="flex items-center py-2">
                  <span className="text-lg font-medium">{item.label}</span>
                </div>
              )
            }))}
          />
        </div>

        <div className="flex justify-center mt-8">
          <motion.div
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            variants={buttonVariants}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            <Button 
              onClick={() => {
                setShowAll(!showAll);
                // Smooth scroll to bottom when showing more
                if (!showAll) {
                  setTimeout(() => {
                    window.scrollTo({
                      top: faqRef.current.offsetTop + faqRef.current.clientHeight - window.innerHeight + 200,
                      behavior: 'smooth'
                    });
                  }, 300);
                }
              }}
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium px-8 py-3 h-auto rounded-md shadow-md transition-all duration-300 flex items-center"
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={showAll ? 'less' : 'more'}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {showAll ? 'Show Less' : 'View More'}
                </motion.span>
              </AnimatePresence>
              {showAll ? (
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 180 }}
                  transition={{ duration: 0.3 }}
                >
                  <UpOutlined className="ml-2" />
                </motion.div>
              ) : (
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <DownOutlined className="ml-2" />
                </motion.div>
              )}
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}