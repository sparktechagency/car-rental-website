// // pages/team.js
// "use client";
// import CustomBanner from '@/components/CustomBanner';
// import Head from 'next/head';
// import { baseURL } from '../../../utils/BaseURL';
// import { SemiColln } from '../../../utils/svgImage';
// import { useTeamQuery } from '../../features/meetTeam/MeetTeamApi';

// export default function Team() {
//   const { data, isLoading } = useTeamQuery();

//   // Extracting team members from API response
//   const teamMembers = data?.data?.result || [];

//   console.log(teamMembers)

//   // Separate first two as featured
//   const [featuredOne, featuredTwo] = teamMembers;

//   // Rest of the team
//   const otherMembers = teamMembers.slice(2);

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
//         <div className="relative">
//           <div className="w-20 h-20 border-4 border-emerald-200 border-t-emerald-500 rounded-full animate-spin"></div>
//           <div className="absolute inset-0 w-16 h-16 m-auto border-4 border-transparent border-r-blue-400 rounded-full animate-spin animate-reverse"></div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
//       <Head>
//         <title>Our Amazing Team</title>
//         <meta name="description" content="Meet our exceptional team of innovative professionals" />
//       </Head>

//       <CustomBanner
//         title={"Meet the Team"}
//         backgroundImage='/images/banner.jpg'
//         breadcrumbs={[
//           { label: "Home", href: "/" },
//           { label: "Team", href: "/team" }
//         ]}
//       />

//       <main className="container mx-auto py-16 px-4 relative">
//         {/* Decorative background elements */}
//         <div className="absolute inset-0 overflow-hidden pointer-events-none">
//           <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-emerald-400/10 to-blue-400/10 rounded-full blur-3xl"></div>
//           <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-l from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"></div>
//           <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-tr from-cyan-400/5 to-teal-400/5 rounded-full blur-2xl"></div>
//         </div>

//         {/* Section Header */}
//         <div className="text-center mb-16 relative z-10">
//           <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-emerald-100 to-blue-100 rounded-full mb-4">
//             <span className="text-emerald-600 font-medium">✨ Leadership Excellence</span>
//           </div>
//           <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 bg-clip-text text-transparent mb-4">
//             Our Visionary Leaders
//           </h2>
//           <p className="text-gray-600 max-w-2xl mx-auto text-lg">
//             Meet the brilliant minds driving innovation and excellence in everything we do
//           </p>
//         </div>

//         {/* Featured team members - Enhanced Design */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20 relative z-10">
//           {/* First featured team member */}
//           {featuredOne && (
//             <div className="group relative overflow-hidden rounded-3xl bg-white shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
//               <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-blue-500/5"></div>
//               <div className="relative flex h-80">
//                 <div className="w-2/5 relative overflow-hidden">
//                   <img
//                     src={baseURL + featuredOne.image}
//                     alt={featuredOne.name}
//                     className="object-cover h-full w-full transition-transform duration-700 group-hover:scale-110"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//                 </div>
//                 <div className="w-3/5 p-8 flex flex-col justify-between">
//                   <div>
//                     <div className="relative mb-6">
//                       <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
//                       <div className="relative bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full w-16 h-16 flex items-center justify-center text-white text-xl shadow-lg">
//                         <SemiColln />
//                       </div>
//                     </div>
//                     <p className="text-gray-700 mb-6 leading-relaxed text-sm">
//                       {featuredOne.teamDescription || "Driving excellence through innovation and leadership."}
//                     </p>
//                   </div>
//                   <div>
//                     <h3 className="font-bold text-xl text-gray-800 mb-1">{featuredOne.name}</h3>
//                     <p className="text-emerald-600 font-medium">{featuredOne.designation}</p>
//                     <div className="mt-3 w-12 h-1 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full"></div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Second featured team member */}
//           {featuredTwo && (
//             <div className="group relative overflow-hidden rounded-3xl bg-white shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
//               <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5"></div>
//               <div className="relative flex h-80">
//                 <div className="w-2/5 relative overflow-hidden">
//                   <img
//                     src={baseURL + featuredTwo.image}
//                     alt={featuredTwo.name}
//                     className="object-cover h-full w-full transition-transform duration-700 group-hover:scale-110"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//                 </div>
//                 <div className="w-3/5 p-8 flex flex-col justify-between">
//                   <div>
//                     <div className="relative mb-6">
//                       <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
//                       <div className="relative bg-gradient-to-r from-blue-500 to-purple-500 rounded-full w-16 h-16 flex items-center justify-center text-white text-xl shadow-lg">
//                         <SemiColln />
//                       </div>
//                     </div>
//                     <p className="text-gray-700 mb-6 leading-relaxed text-sm">
//                       {featuredTwo.teamDescription || "Inspiring teams to achieve extraordinary results."}
//                     </p>
//                   </div>
//                   <div>
//                     <h3 className="font-bold text-xl text-gray-800 mb-1">{featuredTwo.name}</h3>
//                     <p className="text-blue-600 font-medium">{featuredTwo.designation}</p>
//                     <div className="mt-3 w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Section Header for Team Grid */}
//         <div className="text-center mb-12 relative z-10">
//           <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full mb-4">
//             <span className="text-purple-600 font-medium">🌟 Our Talented Team</span>
//           </div>
//           <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
//             The People Behind Our Success
//           </h2>
//         </div>

//         {/* Team members grid - Enhanced Design */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 relative z-10">
//           {(otherMembers.length > 0 ? otherMembers : teamMembers).map((member, index) => (
//             <div
//               key={member._id}
//               className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3"
//               style={{
//                 animationDelay: `${index * 100}ms`
//               }}
//             >
//               {/* Gradient overlay */}
//               <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>

//               {/* Color accent */}
//               <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400"></div>

//               {/* Image container */}
//               <div className="relative h-80 overflow-hidden">
//                 <img
//                   src={baseURL + member.image}
//                   alt={member.name}
//                   className="object-cover h-full w-full transition-transform duration-700 group-hover:scale-110"
//                 />
//                 {/* Hover overlay with subtle pattern */}
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//               </div>

//               {/* Content */}
//               <div className="relative p-6 bg-gradient-to-br from-white to-gray-50 group-hover:from-gray-50 group-hover:to-white transition-all duration-300">
//                 <div className="text-center">
//                   <h3 className="font-bold text-lg text-gray-800 mb-2 group-hover:text-gray-900 transition-colors duration-300">
//                     {member.name}
//                   </h3>
//                   <p className="text-gray-600 text-sm font-medium mb-3 group-hover:text-emerald-600 transition-colors duration-300">
//                     {member.designation}
//                   </p>

//                   {/* Decorative element */}
//                   <div className="flex justify-center">
//                     <div className="w-8 h-0.5 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-300"></div>
//                   </div>
//                 </div>

//                 {/* Floating elements */}
//                 <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform group-hover:scale-110"></div>
//                 <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 transform group-hover:scale-110"></div>
//               </div>
//             </div>
//           ))}
//         </div>

//       </main>

//       <style jsx>{`
//         @keyframes float {
//           0%, 100% { transform: translateY(0px); }
//           50% { transform: translateY(-10px); }
//         }
//         .animate-float {
//           animation: float 3s ease-in-out infinite;
//         }
//         @keyframes reverse {
//           from { transform: rotate(360deg); }
//           to { transform: rotate(0deg); }
//         }
//         .animate-reverse {
//           animation: reverse 1s linear infinite;
//         }
//       `}</style>
//     </div>
//   );
// }



// pages/team.js
"use client";
import CustomBanner from '@/components/CustomBanner';
import Head from 'next/head';
import { baseURL } from '../../../utils/BaseURL';
import { useTeamQuery } from '../../features/meetTeam/MeetTeamApi';

export default function Team() {
  const { data, isLoading } = useTeamQuery();

  // Extracting team members from API response
  const teamMembers = data?.data?.result || [];
  teamMembers?.forEach((member) => {
    return console.log(member.teamRole)
  })
  // console.log(teamMembers)

  // Separate members by role - Authority members first, then regular members
  const authorityMembers = teamMembers.filter(member =>
    member.teamRole === 'AUTHORITY'
    // member.designation?.toLowerCase().includes('ceo') ||
    // member.designation?.toLowerCase().includes('director') ||
    // member.designation?.toLowerCase().includes('founder')
  );
  console.log("authorityMembers", authorityMembers)


  const regularMembers = teamMembers.filter(member =>
    member.teamRole
    === 'TEAM MEMBER' || member.teamRole === 'MEMBER'
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-emerald-200 border-t-emerald-500 rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-16 h-16 m-auto border-4 border-transparent border-r-blue-400 rounded-full animate-spin animate-reverse"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Head>
        <title>Meet The Team</title>
        <meta name="description" content="Meet our exceptional team of innovative professionals" />
      </Head>

      <CustomBanner
        title={"MEET THE TEAM"}
        backgroundImage='/images/banner.jpg'
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Team", href: "/team" }
        ]}
      />

      <main className="container mx-auto py-16 px-4 relative">
        {/* Authority Members Section */}
        {authorityMembers.length > 0 && (
          <div className="mb-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
              {authorityMembers.map((member, index) => (
                <div key={member._id} className="flex items-center gap-8">
                  {/* Member Card - Left Side */}
                  <div className="flex-shrink-0">
                    <div className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <div className="w-48 h-56 rounded-2xl overflow-hidden mb-6">
                        <img
                          src={baseURL + member.image}
                          alt={member.name}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                      </div>

                      {/* Member Name and Title */}
                      <div className="text-center">
                        <h3 className="font-bold text-xl text-gray-800 mb-2">
                          {member.name}
                        </h3>
                        <p className="text-gray-600 text-sm font-medium">
                          {member.designation}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Quote and Description - Right Side */}
                  <div className="flex-1 relative">
                    {/* Green Quote Icon */}
                    <div className="absolute -top-4 right-0">
                      <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                        <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                        </svg>
                      </div>
                    </div>

                    {/* Team Description */}
                    <div className="pt-8 pr-8">
                      <p className="text-gray-600 text-base leading-relaxed">
                        {member.teamDescription || `${member.name} is a visionary leader driving innovation and excellence in our organization, creating value for all stakeholders.`}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Regular Team Members Grid */}
        {regularMembers.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {regularMembers.map((member, index) => (
              <div key={member._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
                {/* Member Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={baseURL + member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />

                  {/* Green overlay on hover - matching the image style */}
                  <div className="absolute inset-0 bg-emerald-500 bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-end justify-center pb-4">
                    <div className="transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <div className="bg-emerald-500 text-white px-4 py-2 rounded-full text-xs font-medium">
                        {member.designation}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Member Info */}
                <div className="p-4 text-center">
                  <h4 className="font-semibold text-gray-800 mb-1 text-sm">
                    {member.name}
                  </h4>
                  <p className="text-gray-500 text-xs">
                    {member.designation}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Fallback - show all members if role-based filtering doesn't work */}
        {authorityMembers.length === 0 && regularMembers.length === 0 && teamMembers.length > 0 && (
          <div>
            {/* Featured Members (first 2) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto mb-16">
              {teamMembers.slice(0, 2).map((member, index) => (
                <div key={member._id} className="flex items-center gap-8">
                  {/* Member Card - Left Side */}
                  <div className="flex-shrink-0">
                    <div className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <div className="w-48 h-56 rounded-2xl overflow-hidden mb-6">
                        <img
                          src={baseURL + member.image}
                          alt={member.name}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                      </div>

                      {/* Member Name and Title */}
                      <div className="text-center">
                        <h3 className="font-bold text-xl text-gray-800 mb-2">
                          {member.name}
                        </h3>
                        <p className="text-gray-600 text-sm font-medium">
                          {member.designation}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Quote and Description - Right Side */}
                  <div className="flex-1 relative">
                    {/* Green Quote Icon */}
                    <div className="absolute -top-4 right-0">
                      <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                        <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                        </svg>
                      </div>
                    </div>

                    {/* Team Description */}
                    <div className="pt-8 pr-8">
                      <p className="text-gray-600 text-base leading-relaxed">
                        {member.teamDescription || `${member.name} is a key leader in our organization, driving excellence and innovation, creating value for all stakeholders.`}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Rest of Team Members */}
            {teamMembers.length > 2 && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {teamMembers.slice(2).map((member, index) => (
                  <div key={member._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
                    {/* Member Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={baseURL + member.image}
                        alt={member.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />

                      {/* Green overlay on hover */}
                      <div className="absolute inset-0 bg-emerald-500 bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-end justify-center pb-4">
                        <div className="transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                          <div className="bg-emerald-500 text-white px-4 py-2 rounded-full text-xs font-medium">
                            {member.designation}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Member Info */}
                    <div className="p-4 text-center">
                      <h4 className="font-semibold text-gray-800 mb-1 text-sm">
                        {member.name}
                      </h4>
                      <p className="text-gray-500 text-xs">
                        {member.designation}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </main>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        @keyframes reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        .animate-reverse {
          animation: reverse 1s linear infinite;
        }
      `}</style>
    </div>
  );
}