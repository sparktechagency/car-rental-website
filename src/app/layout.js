import '@ant-design/v5-patch-for-react-19'
import "./globals.css";
import { ToastContainer } from 'react-toastify';
import Navbar from "@/components/Navber";
import 'react-toastify/dist/ReactToastify.css';
import { ConfigProvider } from "antd";
import Header from "@/components/Header";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import AppFooter from "../components/AppFooter";

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
      <body
        className={`antialiased`}
        cz-shortcut-listen="true"
      >
         <AntdRegistry>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#04BF61',
              colorBorder: '#E5E4E2',
              colorText: 'rgba(0, 0, 0, 0.88)',
              colorTextPlaceholder: '#bfbfbf',
              colorBgContainer: '#ffffff',
              controlOutline: 'rgba(232, 80, 91, 0.1)',
            },
            components: {
              Button: {
                controlHeight: 50,
              },
              Input: {
                controlHeight: 48,
              },
              Select: {
                controlHeight: 48,
              },
              DatePicker: {
                controlHeight: 48,
              },
            },
            Button: {
              colorPrimary: '#0001FB',
            }
          }}
        >
          <Header />
          <Navbar />
          {children}
          <AppFooter />
          <ToastContainer position="top-center" autoClose={2000} />
        </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}