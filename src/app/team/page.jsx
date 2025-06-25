"use client";

import { baseURL } from '../../../utils/BaseURL';
import CustomBanner from '../../components/CustomBanner';
import CustomLoading from '../../components/CustomLoading';
import { useTeamQuery } from '../../features/meetTeam/MeetTeamApi';

const TeamPage = () => {
  const { data, isLoading } = useTeamQuery();
  if (isLoading) {
    return <CustomLoading />;
  }

  return (
    <div className="bg-gray-50">
      <CustomBanner
        title={"Team"}
        backgroundImage='/images/banner.jpg'
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Team", href: "/team" }
        ]}
      />

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section with Quote Cards */}
        <div className="bg-[#F1F4F7] py-8 md:py-12 mb-8 md:mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            {data?.data.result.AUTHORITY.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-lg shadow-lg p-4 sm:p-6 flex flex-col sm:flex-row items-start gap-4 sm:gap-6"
              >
                <div className="w-full sm:w-48 flex flex-col gap-4">
                  <img
                    src={`${baseURL}${member.image}`}
                    alt={member.name}
                    className="w-full h-auto rounded-lg object-cover"
                  />
                  <div className="text-left">
                    <h3 className="font-bold text-lg text-gray-900">{member.name}</h3>
                    <p className="text-sm text-gray-600">{member.role}</p>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex flex-col items-start gap-3">
                    <img
                      className="w-8 h-8 sm:w-10 sm:h-10"
                      src="/images/team/quote.png"
                      alt="quote"
                    />
                    <div className="text-sm text-gray-600 leading-relaxed">
                      {member.teamDescription}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Grid - Last 6 Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-10 md:mb-16">
          {data?.data.result.MEMBER.map((member) => (
            <div
              key={member.id}
              className={`bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl group ${member.isHighlighted
                  ? 'bg-green-500 text-white'
                  : 'hover:bg-green-500 hover:text-white'
                }`}
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={`${baseURL}${member.image}`}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className={`p-4 sm:p-6 text-center ${member.isHighlighted
                  ? 'text-white'
                  : 'text-gray-900 group-hover:text-white'
                }`}>
                <h3 className="font-bold text-lg mb-1">{member.name}</h3>
                <p className={`text-sm ${member.isHighlighted
                    ? 'text-green-100'
                    : 'text-gray-600 group-hover:text-green-100'
                  }`}>
                  {member.role}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Our Commitment Section */}
        <div className="text-center bg-[#F1F4F7] py-10 px-4 sm:px-6 md:py-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-6">
            Our Commitment
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-gray-600 leading-relaxed mb-4 text-sm sm:text-base">
              Our promise to you our customers is to always provide great experience at a great value.
              We will always stand by that promise. If at anytime you feel our services
              have fallen short of this standard, please reach out directly with our
              management staffs via the dedicated message box below.
            </p>
            <p className="text-gray-600 font-medium text-sm sm:text-base">
              We will make it right, every call, every time!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamPage;