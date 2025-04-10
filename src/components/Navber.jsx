import React, { useState } from 'react';
import { Button, Menu, Drawer, Space } from 'antd';
import { DownOutlined, MenuOutlined, UpOutlined } from '@ant-design/icons';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const Navbar = () => {
  const [current, setCurrent] = useState('home');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState(null);

  const handleClick = (e) => {
    if (e.keyPath.length === 1) {
      setCurrent(e.key);
    }
  };

  const toggleSubMenu = (menuKey) => {
    setOpenSubMenu(openSubMenu === menuKey ? null : menuKey);
  };

  const showDrawer = () => {
    setDrawerOpen(true);
  };

  const onClose = () => {
    setDrawerOpen(false);
    setOpenSubMenu(null);
  };

  const partnerMenuItems = [
    { key: 'partner1', label: 'Become a Driver' },
    { key: 'partner2', label: 'Become a Fleet Owner' },
    { key: 'partner3', label: 'Become an Investor' }
  ];

  const moreMenuItems = [
    { key: 'more1', label: 'About Us', path: "/about" },
    { key: 'more2', label: 'Careers', path: "/careers" },
    { key: 'more3', label: 'Blog', path: "/blog" },
    { key: 'more4', label: 'Support', path: "/support" }
  ];

  // Desktop menu items
  const desktopMenuItems = [
    { key: 'home', label: 'HOME' },
    { key: 'fleet', label: 'FLEET' },
    { key: 'booking', label: 'MY BOOKING' },
    { 
      key: 'partner', 
      label: (
        <Space>
          BECOME A PARTNER
          <DownOutlined className="text-xs" />
        </Space>
      ),
      children: partnerMenuItems.map(item => ({
        ...item,
        label: <span style={{ fontWeight: "600" }}>{item.label}</span>
      }))
    },
    { 
      key: 'more', 
      label: (
        <Space>
          MORE
          <DownOutlined className="text-xs" />
        </Space>
      ),
      children: moreMenuItems.map(item => ({
        ...item,
        label: item.path ? (
          <Link href={item.path}>
            <span style={{ fontWeight: "600" }}>{item.label}</span>
          </Link>
        ) : (
          <span style={{ fontWeight: "600" }}>{item.label}</span>
        )
      }))
    }
  ];

  // Mobile menu items with animations
  const MobileMenuItem = ({ item, isSubItem = false }) => (
    <motion.div
      initial={{ opacity: 0, x: isSubItem ? -20 : 0 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Menu.Item 
        key={item.key} 
        className={isSubItem ? 'pl-8' : ''}
        onClick={() => {
          handleClick({ key: item.key, keyPath: [item.key] });
          if (!isSubItem) onClose();
        }}
      >
        {item.path ? <Link href={item.path}>{item.label}</Link> : item.label}
      </Menu.Item>
    </motion.div>
  );

  const MobileSubMenu = ({ title, items, menuKey }) => (
    <div className="border-b border-gray-100">
      <div 
        className="flex justify-between items-center px-4 py-3 cursor-pointer"
        onClick={() => toggleSubMenu(menuKey)}
      >
        <span className="font-medium">{title}</span>
        {openSubMenu === menuKey ? <UpOutlined /> : <DownOutlined />}
      </div>
      <AnimatePresence>
        {openSubMenu === menuKey && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ 
              height: 'auto',
              opacity: 1,
              transition: { 
                height: { duration: 0.3 },
                opacity: { duration: 0.2, delay: 0.1 }
              }
            }}
            exit={{ 
              height: 0,
              opacity: 0,
              transition: { 
                height: { duration: 0.2 },
                opacity: { duration: 0.1 }
              }
            }}
            className="overflow-hidden"
          >
            {items.map(item => (
              <MobileMenuItem key={item.key} item={item} isSubItem />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <div className="bg-white shadow-sm">
      <div className="container mx-auto flex items-center justify-between py-4">
        {/* Logo */}
        <Link href={'/'} className="flex items-center cursor-pointer">
          <img src="/images/logo.png" alt="Logo" className="h-8 md:h-10" />
        </Link>

        {/* Desktop Navigation Menu - hidden on mobile */}
        <Space size="large" className="hidden lg:flex">
          <Menu 
            mode="horizontal" 
            style={{ fontWeight: "600" }}
            selectedKeys={[current]} 
            onClick={handleClick}
            className="border-none"
            items={desktopMenuItems}
          />
        </Space>

        {/* Contact Button - hidden on mobile */}
        <div className="hidden md:block">
          <Button 
            type="primary" 
            size="large"
            className="font-semibold"
            style={{ width: 160 }}
            onClick={() => setCurrent('contact')}
          >
            CONTACT US
          </Button>
        </div>

        {/* Mobile menu button - visible only on mobile */}
        <div className="lg:hidden">
          <Button 
            type="text" 
            icon={<MenuOutlined />} 
            onClick={showDrawer}
            style={{ fontSize: '20px' }}
          />
        </div>

        {/* Mobile Drawer */}
        <Drawer
          title={
            <div className="flex items-center">
              <img src="/images/logo.png" alt="Logo" className="h-8" />
            </div>
          }
          placement="right"
          closable={true}
          onClose={onClose}
          open={drawerOpen}
          width={300}
          className="mobile-nav-drawer"
          styles={{
            body: { padding: 0 }
          }}
        >
          <div className="flex flex-col h-full">
            <div className="flex-grow">
              <Menu 
                onClick={handleClick} 
                selectedKeys={[current]} 
                mode="vertical"
                className="border-none"
              >
                <MobileMenuItem item={{ key: 'home', label: 'HOME' }} />
                <MobileMenuItem item={{ key: 'fleet', label: 'FLEET' }} />
                <MobileMenuItem item={{ key: 'booking', label: 'MY BOOKING' }} />
                
                <MobileSubMenu 
                  title="BECOME A PARTNER" 
                  items={partnerMenuItems} 
                  menuKey="partner" 
                />
                
                <MobileSubMenu 
                  title="MORE" 
                  items={moreMenuItems} 
                  menuKey="more" 
                />
              </Menu>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="p-4"
            >
              <Button 
                type="primary" 
                block 
                size="large"
                className="font-semibold"
                onClick={() => {
                  setCurrent('contact');
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