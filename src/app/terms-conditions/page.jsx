"use client";
import CustomBanner from '@/components/CustomBanner';
import { Spin } from 'antd';
import { useGetFAQQuery } from '../../features/Home_page/HomeApi';

const termsConditionsPage = () => {
  const { data, isLoading } = useGetFAQQuery();

  const createMarkup = (htmlContent) => {
    return { __html: htmlContent || '' }; // Added fallback for empty content
  };

  return (
    <div className="min-h-screen flex flex-col">
      <CustomBanner backgroundImage='/images/banner.jpg' title={"Terms & Conditions"} routeName={"Terms & Conditions"} breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Terms & Conditions", href: "/terms-conditions" }
      ]} />
      <div className="container mx-auto flex-1 w-full px-4 py-8">
        <div className=" ">
          <Spin
            spinning={isLoading}
            tip="Loading terms conditions..."
            wrapperClassName="min-h-[200px] flex items-center justify-center"
          >
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={createMarkup(data?.data?.termsConditions)}
            />
          </Spin>
        </div>
      </div>
    </div>
  );
};

export default termsConditionsPage;