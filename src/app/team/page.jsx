"use client";


import { baseURL } from '../../../utils/BaseURL';
import CustomBanner from '../../components/CustomBanner';
import { useTeamQuery } from '../../features/meetTeam/MeetTeamApi';

const TeamPage = () => {
  const { data } = useTeamQuery();

  return (
    <div className=" bg-gray-50">
      <CustomBanner title={"Team"} backgroundImage='/images/banner.jpg' breadcrumbs={[{ label: "Home", href: "/" },
      { label: "Team", href: "/team" }]} />
      <div className="">
        {/* Top Section with Quote Cards */}
        <div>
          <div className="bg-[#F1F4F7] py-5 mb-5">
            <div className='container mx-auto grid grid-cols-1 bg-[#F1F4F7] md:grid-cols-2 gap-8 '>
              {data?.data.result.AUTHORITY.map((member) => (
                <div key={member.id} className="bg-white rounded-lg shadow-lg p-6 flex flex-col md:flex-row items-start gap-6">
                  <div className="w-52 flex flex-col gap-5">
                    <img
                      src={`${baseURL}${member.image}`}
                      alt={member.name}
                      className=" rounded-lg object-cover"
                    />
                    <div className="text-left">
                      <h3 className="font-bold text-lg text-gray-900">{member.name}</h3>
                      <p className="text-sm text-gray-600">{member.role}</p>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col items-start gap-3 mb-3">

                      <img className='w-10 h-10' src="/images/team/quote.png" alt="quote" />

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
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {data?.data.result.MEMBER.map((member, index) => (
              <div
                key={member.id}
                className={`bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl group ${member.isHighlighted ? 'bg-green-500 text-white' : 'hover:bg-green-500 hover:text-white'
                  }`}
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={`${baseURL}${member.image}`}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className={`p-6 text-center ${member.isHighlighted ? 'text-white' : 'text-gray-900 group-hover:text-white'}`}>
                  <h3 className="font-bold text-lg mb-1">{member.name}</h3>
                  <p className={`text-sm ${member.isHighlighted ? 'text-green-100' : 'text-gray-600 group-hover:text-green-100'}`}>
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Our Commitment Section */}
          <div className="text-center bg-[#F1F4F7] py-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Commitment</h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-gray-600 leading-relaxed mb-4">
                Our promise to you our customers is to always provide great experience at a great value. We will always stand by that promise. If at anytime you feel our services
                have fallen short of this standard, please reach out directly with our management staffs via the dedicated message box below.
              </p>
              <p className="text-gray-600 font-medium">
                We will make it right, every call, every time!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamPage;