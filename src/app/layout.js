// app/layout.js
import { AntdRegistry } from '@ant-design/nextjs-registry';
import ClientLayout from './ClientLayout';
import './globals.css';

export const metadata = {
  title: "Car Rental - Find the Perfect Vehicle for Your Journey",
  description: "Rent high-quality cars at affordable prices. Choose from our wide selection of vehicles for your next trip or business needs.",
  keywords: ["car rental", "vehicle hire", "rent a car", "car hire", "best car rental"],
  authors: [{ name: "Your Company Name" }],
  openGraph: {
    title: "Car Rental - Find the Perfect Vehicle for Your Journey",
    description: "Rent high-quality cars at affordable prices. Choose from our wide selection of vehicles.",
    url: "https://yourcarrentalwebsite.com",
    siteName: "Car Rental",
    images: [
      {
        url: "https://yourcarrentalwebsite.com/images/og-image.jpg",
        width: 800,
        height: 600,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Car Rental - Find the Perfect Vehicle for Your Journey",
    description: "Rent high-quality cars at affordable prices. Choose from our wide selection of vehicles.",
    images: ["https://yourcarrentalwebsite.com/images/twitter-card.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`antialiased`} cz-shortcut-listen="true">
        <AntdRegistry>
          <ClientLayout>{children}</ClientLayout>
        </AntdRegistry>
      </body>
    </html>
  );
}