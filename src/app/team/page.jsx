// pages/team.js
import React from 'react';
import Head from 'next/head';
import { SemiColln } from '../../../utils/svgImage';
import CustomBanner from '@/components/CustomBanner';


const team = [
    {
        id:1,
        name: "Biola A.",
        des:"Director of Finance",
        image:"/images/team/team2.png"
    },
    {
        id:2,
        name: "TolaNI B.",
        des:"Hospitality & HR Director",
        image:"/images/team/team2.png"
    },
    {
        id:3,
        name: "Adeoye A.",
        des:"Logistics Manager",
        image:"/images/team/team3.png"
    },
    {
        id:4,
        name: "Olukayode A.",
        des:"Product Marketing Manager",
        image:"/images/team/team4.png"
    },
    {
        id:5,
        name: "Tunde A.",
        des:"Business Development Manager",
        image:"/images/team/team5.png"
    },
    {
        id:6,
        name: "Funmilayo A.",
        des:"Customer Service Manager",
        image:"/images/team/team6.png"
    },
]

export default function Team() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Our Team</title>
        <meta name="description" content="Meet our team of professionals" />
      </Head>

      <CustomBanner title={"meet the Team"} breadcrumbs={[{label:"Home" , href:"/"}, {label:"Team" , href:"team"}]} />
      
      <main className="container mx-auto py-10 px-4">
        {/* Top row - featured team members */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 py-20 rounded-md px-10 bg-[#F1F7F4]">
          {/* First featured team member */}
          <div className="flex bg-white rounded-lg shadow overflow-hidden">
            <div className="w-1/3">
              <div className="h-full w-full bg-gray-200 relative">
                <img 
                  src="/images/team/team4.png" 
                  alt="Biola A." 
                  className="object-cover h-full w-full"
                />
              </div>
            </div>
            <div className="w-2/3 p-4">
              <div className="pl-6 ">
              <div className=" bg-green-500 mb-4 rounded-full w-14 h-14 flex items-center justify-center text-white text-xl">
                <SemiColln />
              </div>
                <p className="text-sm text-gray-700 mb-3">
                  Tope Babs is a US based serial entrepreneur. He believes a great company can be measured by the value it creates for its stakeholders which includes the customers, the employees, the shareholders as well as the community it operates in. This belief guides his management of TheLuxAuto Nigeria.
                </p>
                <div className="pt-3 mt-auto">
                  <h3 className="font-bold text-lg">Biola A.</h3>
                  <p className="text-gray-600 text-sm">Director of Finance</p>
                </div>
              </div>
            </div>
          </div>

          {/* Second featured team member */}

          <div className="flex bg-white rounded-lg shadow overflow-hidden">
            <div className="w-1/3">
              <div className="h-full w-full bg-gray-200 relative">
                <img 
                  src="/images/team/team4.png" 
                  alt="Biola A." 
                  className="object-cover h-full w-full"
                />
              </div>
            </div>
            <div className="w-2/3 p-4">
              <div className="pl-6 ">
              <div className=" bg-green-500 mb-4 rounded-full w-14 h-14 flex items-center justify-center text-white text-xl">
                <SemiColln />
              </div>
                <p className="text-sm text-gray-700 mb-3">
                  Tope Babs is a US based serial entrepreneur. He believes a great company can be measured by the value it creates for its stakeholders which includes the customers, the employees, the shareholders as well as the community it operates in. This belief guides his management of TheLuxAuto Nigeria.
                </p>
                <div className="pt-3 mt-auto">
                  <h3 className="font-bold text-lg">Biola A.</h3>
                  <p className="text-gray-600 text-sm">Director of Finance</p>
                </div>
              </div>
            </div>
          </div>
         
        </div>

        {/* Middle row - 3 team members grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {/* Team member 1 */}
        

          {/* Team member 2 */}
         {
            team.map(item=>(
                  <div className=" hover:bg-green-500 transition duration-300  text-black hover:text-white rounded-xl shadow overflow-hidden">
                <div className="h-[350px] bg-gray-200">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="object-cover h-full w-full"
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-bold text-lg">{item.name}</h3>
                  <p className="text-opacity-80 text-sm">{item.des}</p>
                </div>
              </div>
            ))
         }

        </div>
      </main>
    </div>
  );
}