
"use client"
import { CaretRightOutlined } from '@ant-design/icons';
import { Collapse, Spin } from 'antd';
import { useEffect, useState } from 'react';

const FAQ = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeKey, setActiveKey] = useState(null);

  // Custom styles
  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      padding: '2rem 0',
    },
    heroSection: {
      position: 'relative',
      height: '300px',
      marginBottom: '3rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundImage: 'url("https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1983&auto=format&fit=crop")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    },
    heroContent: {
      position: 'relative',
      zIndex: 2,
      textAlign: 'center',
      color: 'white',
      fontSize: '20px',
    },
    heroOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      zIndex: 1,
    },
    mainContent: {
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '0 2rem',
      position: 'relative',
    },
    gridContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '1rem',
      gridAutoRows: 'auto',
    },
    loadingContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '200px',
    },
    errorMessage: {
      color: 'red',
      textAlign: 'center',
      padding: '2rem',
    },
  };

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const response = await fetch('http://10.0.60.110:5000/api/v1/company-cms');
        if (!response.ok) {
          throw new Error('Failed to fetch FAQs');
        }
        const data = await response.json();

        const formattedFaqs = data.data.faqs.map((faq) => ({
          key: faq._id,
          label: faq.question.trim(),
          children: <p className="py-4">{faq.answer}</p>,
        }));

        setFaqs(formattedFaqs);
        if (formattedFaqs.length > 0) {
          setActiveKey(formattedFaqs[0].key); // Set the first FAQ's key as active
        }
      } catch (error) {
        console.error('Error fetching FAQs:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFAQs();
  }, []);

  if (error) {
    return (
      <div style={styles.errorMessage}>
        Error loading FAQs: {error}
      </div>
    );
  }

  // Split faqs into two arrays for the grid
  const splitFaqs = faqs.reduce((acc, faq, index) => {
    const column = index % 2;
    if (!acc[column]) acc[column] = [];
    acc[column].push(faq);
    return acc;
  }, []);

  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <div style={styles.heroSection}>
        <div style={styles.heroOverlay} />
        <div style={styles.heroContent}>
          <h1 className="text-5xl font-bold mb-4 uppercase">
            Frequently Asked Questions
          </h1>
        </div>
      </div>

      {/* FAQ Content */}
      <div style={styles.mainContent}>
        {loading ? (
          <div style={styles.loadingContainer}>
            <Spin size="large" />
          </div>
        ) : (
          <div style={styles.gridContainer}>
            {splitFaqs.map((columnFaqs, columnIndex) => (
              <div key={columnIndex}>
                <Collapse
                  activeKey={activeKey}
                  items={columnFaqs}
                  size="large"
                  accordion
                  onChange={(key) => setActiveKey(key)}
                  expandIcon={({ isActive }) => (
                    <CaretRightOutlined
                      rotate={isActive ? 90 : 0}
                      style={{ color: isActive ? 'white' : '#666' }}
                    />
                  )}
                  style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                  }}
                  className="custom-collapse"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add custom styles */}
      <style jsx global>{`
        .custom-collapse .ant-collapse-item-active {
          background-color: #04bf61 !important;
        }
        .custom-collapse .ant-collapse-item-active .ant-collapse-header {
          color: white !important;
        }
        .custom-collapse .ant-collapse-item-active .ant-collapse-content {
          background-color: white !important;
        }
        .custom-collapse .ant-collapse-item {
          margin-bottom: 1rem !important;
          border-radius: 8px !important;
          overflow: hidden;
        }
        .custom-collapse .ant-collapse-content {
          border-top: 1px solid #f0f0f0;
        }
        @media (max-width: 768px) {
          .custom-collapse {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default FAQ;