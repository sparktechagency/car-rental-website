"use client";
import CustomBanner from '@/components/CustomBanner';
import { Spin } from 'antd';
import { useGetFAQQuery } from '../../features/Home_page/HomeApi';

const PrivacyPolicyPage = () => {
  const { data, isLoading } = useGetFAQQuery();

  const createMarkup = (htmlContent) => {
    return { __html: htmlContent || '' }; // Added fallback for empty content
  };

  return (
    <div className="min-h-screen flex flex-col">
      <CustomBanner backgroundImage='/images/banner.jpg' title={"Privacy Policy"} routeName={"Privacy Policy"} breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Privacy Policy", href: "/privacy-policy" }
      ]} />
      <div className="container mx-auto flex-1 w-full px-4 py-8">
        <div className=" ">
          <Spin
            spinning={isLoading}
            tip="Loading privacy policy..."
            wrapperClassName="min-h-[200px] flex items-center justify-center" // Fixed height issue
          >
            <div
              className="prose max-w-none" // Added prose for better HTML content styling
              dangerouslySetInnerHTML={createMarkup(data?.data?.privacyPolicy)}
            />
          </Spin>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;