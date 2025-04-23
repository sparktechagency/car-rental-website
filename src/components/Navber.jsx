import React, { useState } from 'react';
import { Button, Menu, Drawer } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import Link from 'next/link';

const Navbar = () => {
  const [current, setCurrent] = useState('home');
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleClick = (e) => {
    setCurrent(e.key);
    if (window.innerWidth < 992) { // 992px is lg breakpoint
      setDrawerOpen(false);
    }
  };

  const showDrawer = () => {
    setDrawerOpen(true);
  };

  const onClose = () => {
    setDrawerOpen(false);
  };

  // Menu items data
  const menuItems = [
    { key: 'home', label: 'HOME', path: "/" },
    { key: 'fleet', label: 'FLEET', path: "/fleet" },
    { key: 'reservation', label: 'RESERVATION', path: "/reservation" },
    { key: 'booking', label: 'MY BOOKING', path: "/booking" },
    { key: 'about', label: 'ABOUT US', path: "/about" },
  ];

  // Mobile menu component
  const MobileMenuItem = ({ item }) => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Menu.Item 
        key={item.key} 
        className="text-base"
        onClick={() => handleClick({ key: item.key })}
      >
        <Link href={item.path}>{item.label}</Link>
      </Menu.Item>
    </motion.div>
  );

  return (
    <div className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 flex items-center justify-between py-3 md:py-4">
        {/* Logo - responsive sizing */}
        <Link href={'/'} className="flex items-center cursor-pointer">
          <img 
            src="/images/logo.png" 
            alt="Logo" 
            className="h-7 sm:h-8 md:h-9 lg:h-10" 
          />
        </Link>

        {/* Desktop Navigation Menu */}
        <div className='hidden sm:flex items-center w-5/12'>  {/* Added w-full */}
            <Menu 
              mode="horizontal" 
              style={{ 
                fontWeight: "600", 
                fontSize: "15px",
                width: "100%",  // Ensure menu takes full width
                display: "flex",
                justifyContent: "space-around" // or "space-between"
              }}
              selectedKeys={[current]} 
              onClick={handleClick}
              className="border-none"
              overflowedIndicator={null}  // This hides the ellipsis
            >
              {menuItems.map(item => (
                <Menu.Item key={item.key}>
                  <Link href={item.path}>{item.label}</Link>
                </Menu.Item>
              ))}
            </Menu>
      </div>

        {/* Desktop Contact Button */}
        <div className="hidden lg:flex items-center">
          <Button 
            type="primary" 
            size="large"
            className="font-semibold text-sm md:text-base ml-4"
            style={{ minWidth: 140 }}
            onClick={() => {
              setCurrent('contact');
              handleClick({ key: 'contact' });
            }}
          >
            CONTACT US
          </Button>
        </div>

        {/* Mobile menu button */}
        <div className="lg:hidden">
          <Button 
            type="text" 
            icon={<MenuOutlined style={{ fontSize: '24px' }} />} 
            onClick={showDrawer}
            className="flex items-center justify-center w-10 h-10"
          />
        </div>

        {/* Mobile Drawer */}
        <Drawer
          title={
            <div className="flex items-center">
              <img src="/images/logo.png" alt="Logo" className="h-7" />
            </div>
          }
          placement="right"
          closable={true}
          onClose={onClose}
          open={drawerOpen}
          width={280}
          className="mobile-nav-drawer"
          styles={{
            body: { padding: 0 },
            header: { padding: '16px 20px' }
          }}
        >
          <div className="flex flex-col h-full">
            <div className="flex-grow overflow-y-auto">
              <Menu 
                onClick={handleClick} 
                selectedKeys={[current]} 
                mode="vertical"
                className="border-none"
              >
                {menuItems.map(item => (
                  <MobileMenuItem key={item.key} item={item} />
                ))}
              </Menu>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="p-4 border-t border-gray-100"
            >
              <Button 
                type="primary" 
                block 
                size="large"
                className="font-semibold text-base"
                onClick={() => {
                  setCurrent('contact');
                  handleClick({ key: 'contact' });
                  onClose();
                }}
              >
                CONTACT US
              </Button>
            </motion.div>
          </div>
        </Drawer>
      </div>
    </div>
  );
};

export default Navbar;