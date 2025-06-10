"use client";

import { PrinterOutlined } from '@ant-design/icons';
import { Button, Card } from 'antd';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useManageBookingQuery } from '../../features/Booking/BookingApi';

const ReservationDetails = () => {
  const bookingId = useSearchParams().get("bookingId");
  const { data, isLoading } = useManageBookingQuery(bookingId, { skip: !bookingId });
  const bookingData = data?.data;

  const [activeSection, setActiveSection] = useState('details');

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB');
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const handlePrint = () => {
    if (!bookingData) return;

    const printContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Reservation Details - ${bookingData._id}</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 20px;
            line-height: 1.5;
            color: #333;
          }
          .header {
            text-align: center;
            border-bottom: 2px solid #22c55e;
            padding-bottom: 20px;
            margin-bottom: 30px;
          }
          .section {
            margin-bottom: 30px;
            page-break-inside: avoid;
          }
          .section-title {
            background-color: #22c55e;
            color: white;
            padding: 10px 15px;
            margin-bottom: 15px;
            font-size: 18px;
            font-weight: bold;
          }
          .info-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
            margin-bottom: 15px;
          }
          .info-item {
            border-bottom: 1px solid #eee;
            padding-bottom: 8px;
          }
          .info-label {
            color: #666;
            font-size: 14px;
            margin-bottom: 3px;
          }
          .info-value {
            font-weight: bold;
            color: #333;
          }
          .status-badge {
            display: inline-block;
            padding: 4px 12px;
            border-radius: 4px;
            color: white;
            font-size: 12px;
            font-weight: bold;
          }
          .status-confirmed { background-color: #22c55e; }
          .status-pending { background-color: #eab308; }
          .status-paid { background-color: #22c55e; }
          .extras-item {
            background-color: #f9f9f9;
            padding: 12px;
            margin-bottom: 10px;
            border-radius: 6px;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .price-breakdown {
            border: 1px solid #ddd;
            padding: 15px;
            border-radius: 6px;
          }
          .price-item {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
            padding-bottom: 8px;
            border-bottom: 1px solid #eee;
          }
          .price-total {
            border-top: 2px solid #22c55e;
            padding-top: 15px;
            margin-top: 15px;
            font-size: 18px;
            font-weight: bold;
            display: flex;
            justify-content: space-between;
          }
          .total-amount {
            color: #22c55e;
          }
          @media print {
            body { margin: 0; }
            .section { page-break-inside: avoid; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Reservation Details</h1>
          <p>Reference ID: ${bookingData._id}</p>
          <p>Generated on: ${new Date().toLocaleDateString('en-GB')} at ${new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</p>
        </div>

        <!-- Booking Details Section -->
        <div class="section">
          <div class="section-title">Reservation Details</div>
          <div class="info-grid">
            <div class="info-item">
              <div class="info-label">Reference ID</div>
              <div class="info-value">${bookingData._id}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Created on</div>
              <div class="info-value">${bookingData.createdAt ? formatDate(bookingData.createdAt) : 'N/A'}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Status</div>
              <div class="info-value">
                <span class="status-badge ${bookingData.status === 'CONFIRMED' ? 'status-confirmed' : 'status-pending'}">
                  ${bookingData.status || 'N/A'}
                </span>
              </div>
            </div>
            <div class="info-item">
              <div class="info-label">Vehicle Type</div>
              <div class="info-value">${bookingData.vehicle?.vehicleType || 'N/A'}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Pickup Date & Time</div>
              <div class="info-value">
                ${bookingData.pickupDate ? formatDate(bookingData.pickupDate) : 'N/A'}, 
                ${bookingData.pickupTime ? formatTime(bookingData.pickupTime) : 'N/A'}
              </div>
            </div>
            <div class="info-item">
              <div class="info-label">Return Date & Time</div>
              <div class="info-value">
                ${bookingData.returnDate ? formatDate(bookingData.returnDate) : 'N/A'}, 
                ${bookingData.returnTime ? formatTime(bookingData.returnTime) : 'N/A'}
              </div>
            </div>
            <div class="info-item">
              <div class="info-label">Pick-up Location</div>
              <div class="info-value">${bookingData.pickupLocation || 'N/A'}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Return Location</div>
              <div class="info-value">${bookingData.returnLocation || 'N/A'}</div>
            </div>
          </div>
        </div>

        <!-- Personal Details Section -->
        <div class="section">
          <div class="section-title">Personal Details</div>
          <div class="info-grid">
            <div class="info-item">
              <div class="info-label">First Name</div>
              <div class="info-value">${bookingData.clientId?.firstName || 'N/A'}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Last Name</div>
              <div class="info-value">${bookingData.clientId?.lastName || 'N/A'}</div>
            </div>
            <div class="info-item">
              <div class="info-label">E-Mail</div>
              <div class="info-value">${bookingData.clientId?.email || 'N/A'}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Phone</div>
              <div class="info-value">${bookingData.clientId?.phone || 'N/A'}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Country</div>
              <div class="info-value">${bookingData.clientId?.country || 'N/A'}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Region/State</div>
              <div class="info-value">${bookingData.clientId?.state || 'N/A'}</div>
            </div>
            <div class="info-item">
              <div class="info-label">City</div>
              <div class="info-value">${bookingData.clientId?.presentAddress?.split(', ')[1] || 'N/A'}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Address</div>
              <div class="info-value">${bookingData.clientId?.presentAddress || 'N/A'}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Postcode/ZIP</div>
              <div class="info-value">${bookingData.clientId?.postCode || 'N/A'}</div>
            </div>
          </div>
        </div>

        <!-- Extras & Protection Section -->
        <div class="section">
          <div class="section-title">Extras & Protection</div>
          ${bookingData.extraServices?.length > 0 ?
        bookingData.extraServices.map((service, index) => `
              <div class="extras-item">
                <div>
                  <strong>${service.serviceId}</strong><br>
                  <span style="color: #666; font-size: 14px;">Quantity: ${service.quantity}</span>
                </div>
                <span style="color: #22c55e; font-weight: bold;">Included</span>
              </div>
            `).join('') :
        '<p style="color: #666;">No extra services selected</p>'
      }
        </div>

        <!-- Price & Payment Section -->
        <div class="section">
          <div class="section-title">Price Breakdown</div>
          <div class="price-breakdown">
            <div class="price-item">
              <span>Base Rental (${bookingData.carRentedForInDays || 0} days)</span>
              <span>$${((bookingData.vehicle?.dailyRate || 0) * (bookingData.carRentedForInDays || 0)).toFixed(2)}</span>
            </div>
            ${bookingData.extraServices?.map((service, index) => `
              <div class="price-item">
                <span>Extra Service ${index + 1}</span>
                <span>$0.00</span>
              </div>
            `).join('') || ''}
            <div class="price-item">
              <span>Taxes & Fees</span>
              <span>$${((bookingData.amount || 0) - ((bookingData.vehicle?.dailyRate || 0) * (bookingData.carRentedForInDays || 0))).toFixed(2)}</span>
            </div>
            <div class="price-total">
              <span>Total Amount</span>
              <span class="total-amount">$${(bookingData.amount || 0).toFixed(2)}</span>
            </div>
          </div>
        </div>

        <!-- Payment Information Section -->
        <div class="section">
          <div class="section-title">Payment Information</div>
          <div class="info-grid">
            <div class="info-item">
              <div class="info-label">Payment Method</div>
              <div class="info-value">${bookingData.paymentMethod || 'N/A'}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Payment Status</div>
              <div class="info-value">
                <span class="status-badge ${bookingData.paymentId?.status === 'PAID' ? 'status-paid' : 'status-pending'}">
                  ${bookingData.paymentId?.status || 'N/A'}
                </span>
              </div>
            </div>
            <div class="info-item">
              <div class="info-label">Transaction ID</div>
              <div class="info-value">${bookingData.paymentId?._id || 'N/A'}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Payment Date</div>
              <div class="info-value">${bookingData.paymentId?.createdAt ? formatDate(bookingData.paymentId.createdAt) : 'N/A'}</div>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    // Create a new window for printing
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();

      // Wait for content to load, then print
      printWindow.onload = () => {
        printWindow.print();
        // Close the window after printing (optional)
        printWindow.onafterprint = () => {
          printWindow.close();
        };
      };
    }
  };

  const renderSideMenu = () => (
    <div className="w-full max-w-sm">
      <div className="rounded-md overflow-hidden border border-gray-200">
        <div className="bg-green-500 text-white p-4">
          <h2 className="font-medium text-lg">Bookings</h2>
        </div>
        <div className="divide-y divide-gray-200">
          <div
            className={`p-4 cursor-pointer transition-colors ${activeSection === 'details'
              ? 'bg-green-50 border-r-4 border-green-500 text-green-700'
              : 'hover:bg-gray-50'
              }`}
            onClick={() => setActiveSection('details')}
          >
            Details
          </div>
          <div
            className={`p-4 cursor-pointer transition-colors ${activeSection === 'extras'
              ? 'bg-green-50 border-r-4 border-green-500 text-green-700'
              : 'hover:bg-gray-50'
              }`}
            onClick={() => setActiveSection('extras')}
          >
            Extras & Protection
          </div>
          <div
            className={`p-4 cursor-pointer transition-colors ${activeSection === 'payments'
              ? 'bg-green-50 border-r-4 border-green-500 text-green-700'
              : 'hover:bg-gray-50'
              }`}
            onClick={() => setActiveSection('payments')}
          >
            Price & Payments
          </div>
        </div>
        <div className="p-4">
          <Button
            icon={<PrinterOutlined />}
            className="flex items-center w-full"
            onClick={handlePrint}
            loading={isLoading}
            disabled={!bookingData}
          >
            Print Details
          </Button>
        </div>
      </div>
    </div>
  );

  const renderDetailsSection = () => (
    <div className="w-full flex flex-col gap-5">
      <Card className="mb-6">
        <h2 className="text-lg font-medium mb-4">Your Reservation Details</h2>
        <div className="border-t border-gray-200 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-500 text-sm">Reference ID</p>
              <p className="font-medium">{bookingData?._id}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Created on</p>
              <p className="font-medium">{bookingData?.createdAt && formatDate(bookingData.createdAt)}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className='flex flex-col gap-1'>
              <p className="text-gray-500 text-sm">Status</p>
              <span className={`${bookingData?.status === 'CONFIRMED' ? 'bg-green-500' : 'bg-yellow-500'} w-24 text-center text-white px-3 py-1 rounded-md text-sm`}>
                {bookingData?.status || 'N/A'}
              </span>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Type</p>
              <p className="font-medium">{bookingData?.vehicle?.vehicleType}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <p className="text-gray-500 text-sm">Pickup Date & Time</p>
              <p className="font-medium">
                {bookingData?.pickupDate && formatDate(bookingData.pickupDate)},
                {bookingData?.pickupTime && formatTime(bookingData.pickupTime)}
              </p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Return Date & Time</p>
              <p className="font-medium">
                {bookingData?.returnDate && formatDate(bookingData.returnDate)},
                {bookingData?.returnTime && formatTime(bookingData.returnTime)}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <p className="text-gray-500 text-sm">Pick-up Location</p>
              <p className="font-medium">{bookingData?.pickupLocation}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Return Location</p>
              <p className="font-medium">{bookingData?.returnLocation}</p>
            </div>
          </div>
        </div>
      </Card>

      <Card className='sm:max-w-md w-full'>
        <div>
          <h2 className="text-lg font-medium mb-4">Personal Details</h2>
          <div className="border-t border-gray-200 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-500 text-sm">First Name</p>
                <p className="font-medium">{bookingData?.clientId?.firstName}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Last Name</p>
                <p className="font-medium">{bookingData?.clientId?.lastName}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <p className="text-gray-500 text-sm">E-Mail</p>
                <p className="font-medium">{bookingData?.clientId?.email}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Phone</p>
                <p className="font-medium">{bookingData?.clientId?.phone}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <p className="text-gray-500 text-sm">Country</p>
                <p className="font-medium">{bookingData?.clientId?.country}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Region/State</p>
                <p className="font-medium">{bookingData?.clientId?.state}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <p className="text-gray-500 text-sm">City</p>
                <p className="font-medium">{bookingData?.clientId?.presentAddress?.split(', ')[1]}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Address</p>
                <p className="font-medium">{bookingData?.clientId?.presentAddress}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <p className="text-gray-500 text-sm">Postcode/ZIP</p>
                <p className="font-medium">{bookingData?.clientId?.postCode}</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );

  const renderExtrasSection = () => (
    <div className="w-full">
      <Card>
        <h2 className="text-lg font-medium mb-4">Extras & Protection</h2>
        <div className="border-t border-gray-200 pt-4">
          {bookingData?.extraServices?.length > 0 ? (
            <div className="space-y-4">
              {bookingData.extraServices.map((service, index) => (
                <div key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium">{service.serviceId}</h3>
                    <p className="text-sm text-gray-500">Quantity: {service.quantity}</p>
                  </div>
                  <span className="font-medium text-green-600">Included</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No extra services selected</p>
          )}
        </div>
      </Card>
    </div>
  );

  const renderPaymentsSection = () => (
    <div className="w-full">
      <Card className="mb-6">
        <h2 className="text-lg font-medium mb-4">Price Breakdown</h2>
        <div className="border-t border-gray-200 pt-4">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Base Rental ({bookingData?.carRentedForInDays} days)</span>
              <span className="font-medium">${(bookingData?.vehicle?.dailyRate * bookingData?.carRentedForInDays).toFixed(2)}</span>
            </div>
            {bookingData?.extraServices?.map((service, index) => (
              <div key={index} className="flex justify-between">
                <span>Extra Service {index + 1}</span>
                <span className="font-medium">$0.00</span>
              </div>
            ))}
            <div className="flex justify-between">
              <span>Taxes & Fees</span>
              <span className="font-medium">${(bookingData?.amount - (bookingData?.vehicle?.dailyRate * bookingData?.carRentedForInDays)).toFixed(2)}</span>
            </div>
            <div className="border-t border-gray-200 pt-3 flex justify-between text-lg font-bold">
              <span>Total Amount</span>
              <span className="text-green-600">${bookingData?.amount?.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <h2 className="text-lg font-medium mb-4">Payment Information</h2>
        <div className="border-t border-gray-200 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-500 text-sm">Payment Method</p>
              <p className="font-medium">{bookingData?.paymentMethod}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Payment Status</p>
              <span className={`${bookingData?.paymentId?.status === 'PAID' ? 'bg-green-500' : 'bg-yellow-500'} text-white px-3 py-1 rounded-md text-sm`}>
                {bookingData?.paymentId?.status}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <p className="text-gray-500 text-sm">Transaction ID</p>
              <p className="font-medium">{bookingData?.paymentId?._id}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Payment Date</p>
              <p className="font-medium">{bookingData?.paymentId?.createdAt && formatDate(bookingData.paymentId.createdAt)}</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );

  const renderContent = () => {
    if (isLoading) {
      return <div className="w-full flex justify-center">Loading...</div>;
    }

    if (!bookingData) {
      return <div className="w-full flex justify-center">No booking data found</div>;
    }

    switch (activeSection) {
      case 'details':
        return renderDetailsSection();
      case 'extras':
        return renderExtrasSection();
      case 'payments':
        return renderPaymentsSection();
      default:
        return renderDetailsSection();
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-6">
        {renderSideMenu()}
        {renderContent()}
      </div>
    </div>
  );
};

export default ReservationDetails;