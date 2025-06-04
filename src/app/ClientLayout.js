// app/ClientLayout.jsx
'use client';
import Header from "@/components/Header";
import Navbar from "@/components/Navber";
import '@ant-design/v5-patch-for-react-19';
import { ConfigProvider } from "antd";
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { store } from '../../utils/store';
import AppFooter from "../components/AppFooter";


export default function ClientLayout({ children }) {
  return (
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
      <Provider store={store}>
        <Header />
        <Navbar />
        {children}
        <AppFooter />
        <ToastContainer position="top-center" autoClose={2000} />
      </Provider>
    </ConfigProvider>
  );
}