"use client";
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { Button, Collapse } from 'antd';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useGetFAQQuery } from '../../features/Home_page/HomeApi';

export default function Frequently() {
  const [activeKey, setActiveKey] = useState(['1']);
  const [showAll, setShowAll] = useState(false);
  const [height, setHeight] = useState(0);
  const faqRef = useRef(null);

  const { data: faq, isLoading, isError } = useGetFAQQuery();

  // Transform API data into the format needed for the Collapse component
  const faqItems = faq?.data?.faqs?.map((item, index) => ({
    key: String(index + 1),
    label: item.question.replace('getAllFAQ', '').trim(),
    children: (
      <motion.p
        className="text-gray-600 py-2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {item.answer}
      </motion.p>
    )
  })) || [];

  // Calculate initial height on mount
  useEffect(() => {
    if (faqRef.current) {
      setHeight(faqRef.current.clientHeight);
    }
  }, [faqItems, showAll]); // Add showAll to dependencies to recalculate when toggling

  // Display all FAQs or just the first 5
  const displayFaqs = showAll ? faqItems : faqItems.slice(0, 5);

  // Custom panel style function
  const getPanelStyle = (key) => {
    return activeKey.includes(key)
      ? 'border-l-4 border-green-500 bg-gray-50 transition-all duration-300'
      : 'border-l-4 border-transparent transition-all duration-300';
  };

  if (isLoading) return <div className="text-center py-10">Loading FAQs...</div>;
  if (isError) return <div className="text-center py-10 text-red-500">Error loading FAQs</div>;
  if (!faqItems.length) return <div className="text-center py-10">No FAQs available</div>;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:pt-10 pt-4 bg-white">
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

        {faqItems.length > 5 && (
          <div className="flex justify-center mt-4">
            <Button
              type="text"
              onClick={() => setShowAll(!showAll)}
              className="flex items-center text-blue-500 hover:text-blue-700 font-medium"
              style={{ backgroundColor: "#F2AF1E", fontWeight: "bold", width: "150px" }}
            // icon={showAll ? <UpOutlined /> : <DownOutlined />}
            >
              {showAll ? 'Show Less' : 'View More'}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}