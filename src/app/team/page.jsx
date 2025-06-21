"use client";


import CustomBanner from '../../components/CustomBanner';
import { useTeamQuery } from '../../features/meetTeam/MeetTeamApi';

const TeamPage = () => {
  const { data } = useTeamQuery();
  console.log(data?.data.result);
  const teamMembers = [
    {
      id: 1,
      name: "Biola A.",
      role: "Director of Finance",
      image: "/images/team/team2.png",
      quote: "Tope Babs is a US based serial entrepreneur. He believes a great company can be measured by the value it creates for its stakeholders. His experience involves his staff, employees, the shareholders as well as the community it operates in. This belief guides his management of TheLuxAuto Nigeria.",
      hasQuote: true
    },
    {
      id: 2,
      name: "Taiye Akimboni",
      role: "Board Member",
      image: "/images/team/team3.png",
      quote: "A serial entrepreneur who believes that excellent customer service is the number one job in any organisation. Give a customer a great experience. They will come back, and the customer will be the best marketing plan you can create. Without the customer, there is no business.",
      hasQuote: true
    },
    {
      id: 3,
      name: "Biola A.",
      role: "Director of Finance",
      image: "/images/team/team4.png",
      hasQuote: false
    },
    {
      id: 4,
      name: "TolaNI B.",
      role: "Hospitality & HR Director",
      image: "/images/team/team5.png",
      hasQuote: false,
      // isHighlighted: true
    },
    {
      id: 5,
      name: "Adeoye A.",
      role: "Logistics Manager",
      image: "/images/team/team6.png",
      hasQuote: false
    },
    {
      id: 6,
      name: "Olukayode A.",
      role: "Product Marketing Manager",
      image: "/images/team/team2.png",
      hasQuote: false
    },
    {
      id: 7,
      name: "Tunde A.",
      role: "Business Development Manager",
      image: "/images/team/team3.png",
      hasQuote: false
    },
    {
      id: 8,
      name: "Funmilayo A.",
      role: "Customer Service Manager",
      image: "/images/team/team4.png",
      hasQuote: false
    }
  ];

  return (
    <div className=" bg-gray-50">
      <CustomBanner title={"Team"} backgroundImage='/images/banner.jpg' breadcrumbs={[{ label: "Home", href: "/" },
      { label: "Team", href: "/team" }]} />
      <div className="">
        {/* Top Section with Quote Cards */}
        <div>
          <div className="bg-[#F1F4F7] py-12 mb-5">
            <div className='container mx-auto grid grid-cols-1 bg-[#F1F4F7] md:grid-cols-2 gap-8 '>
              {teamMembers.slice(0, 2).map((member) => (
                <div key={member.id} className="bg-white rounded-lg shadow-lg p-6 flex flex-col md:flex-row items-start gap-6">
                  <div className="w-52 flex flex-col gap-5">
                    <img
                      src={member.image}
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
                        {member.quote}
                      </div>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Team Grid - Last 6 Cards */}
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {teamMembers.slice(2).map((member, index) => (
              <div
                key={member.id}
                className={`bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl group ${member.isHighlighted ? 'bg-green-500 text-white' : 'hover:bg-green-500 hover:text-white'
                  }`}
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={member.image}
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