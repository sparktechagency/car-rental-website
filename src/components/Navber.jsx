"use client";
import { MenuOutlined } from '@ant-design/icons';
import { Button, Drawer, Menu } from 'antd';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const [current, setCurrent] = useState('home');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Function to get current page key from pathname
  const getCurrentPageKey = (path) => {
    if (path === '/') return 'home';
    if (path === '/fleet') return 'fleet';
    if (path === '/team') return 'team';
    if (path === '/booking' || path === '/reservationdetails') return 'booking';
    if (path === '/about') return 'about';
    return 'home'; // default fallback
  };

  // Set current page based on pathname on mount and pathname changes
  useEffect(() => {
    const currentPageKey = getCurrentPageKey(pathname);
    setCurrent(currentPageKey);
  }, [pathname]);

  const handleClick = (e) => {
    setCurrent(e.key);
    if (window.innerWidth < 992) { //992px is lg breakpoint
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
    { key: 'home', label: <Link href="/">HOME</Link> },
    { key: 'fleet', label: <Link href="/fleet">FLEET</Link> },
    { key: 'booking', label: <Link href="/booking">MY BOOKING</Link> },
    { key: 'about', label: <Link href="/about">ABOUT US</Link> },
    { key: 'team', label: <Link href="/team">TEAM</Link> },
  ];

  // Mobile menu items
  const mobileMenuItems = menuItems.map(item => ({
    key: item.key,
    label: (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Link href={item.key === 'home' ? '/' : `/${item.key}`}>
          {item.key === 'home' ? 'HOME' :
            item.key === 'fleet' ? 'FLEET' :
              item.key === 'team' ? 'TEAM' :
                item.key === 'booking' ? 'MY BOOKING' : 'ABOUT US'}
        </Link>
      </motion.div>
    ),
  }));

  return (
    <div className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 flex items-center justify-between py-3 md:py-4">
        {/* Logo - responsive sizing */}
        <Link href={'/'} className="flex items-center cursor-pointer">
          <img
            src="/images/logo.png"
            alt="Logo"
            className="h-10 sm:h-8 md:h-9 lg:h-14 "
          />
        </Link>

        {/* Desktop Navigation Menu */}
        <div className='hidden sm:flex items-center w-5/12'>
          <Menu
            mode="horizontal"
            style={{
              fontWeight: "600",
              fontSize: "15px",
              width: "100%",
              display: "flex",
              justifyContent: "space-around"
            }}
            selectedKeys={[current]}
            onClick={handleClick}
            className="border-none"
            overflowedIndicator={null}
            items={menuItems}
          />
        </div>

        {/* Desktop Contact Button */}
        <div className="hidden lg:flex items-center">
          <Button
            type="primary"
            size="large"
            className="font-semibold text-sm md:text-base ml-4"
            style={{ minWidth: 140, backgroundColor: '#04BF61' }}
            onClick={() => {
              setCurrent('contact');
              handleClick({ key: 'contact' });
              router.push('/contact');
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
                items={mobileMenuItems}
              />
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
                  router.push('/contact');
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