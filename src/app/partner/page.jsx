import React from "react";

const BecomePartner = () => (
  <div className="bg-[#f9f9f8] min-h-screen flex flex-col w-full">
    {/* Banner Image */}
    <div className="w-full h-48 md:h-64 overflow-hidden relative">
      <img
        src="https://ext.same-assets.com/115718355/3353468605.webp"
        alt="Partner Banner"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-[#213832]/40" />
    </div>

    <div className="max-w-6xl w-full mx-auto -mt-20 mb-8 p-4 flex flex-col gap-6 z-10 relative">
      {/* Title and subtitle */}
      <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col gap-2 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-[#213832]">Partner with us</h1>
        <p className="text-lg text-[#785f2d]">Become an entrepreneur, list your car with us and earn money daily</p>
      </div>

      {/* How Does It Work Section */}
      <div className="bg-[#f9f9f8] rounded-lg shadow p-6 flex flex-col gap-1">
        <h2 className="text-xl md:text-2xl font-semibold text-[#4f363b] mb-4">How DOES IT WORK?</h2>
        <div className="flex items-center gap-4 flex-col md:flex-row">
          <img src="https://ext.same-assets.com/115718355/943829757.webp" alt="Money" className="w-24 md:w-32 h-auto" />
          <ul className="text-base text-[#666a75] flex-1 flex flex-col gap-2">
            <li>Contact us for inspection of your car and how the program works</li>
            <li>Upon approval we send our care staff to come take pictures and list your car on our site</li>
            <li>Start receiving income in your account every time your car is rented</li>
          </ul>
        </div>
        <div className="mt-4 flex justify-center">
          <a
            href="/signAsPartner"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#04bf61] text-white font-semibold rounded-lg shadow hover:bg-[#04bf87] transition"
          >
            Sign Up Today
          </a>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white rounded-lg shadow p-6 grid grid-cols-3 gap-4 items-start">
        <div className="border border-gray-300 p-3 rounded-md">
          <div className="flex items-center flex-col gap-2 mb-4">
            <img src="https://ext.same-assets.com/115718355/2392729274.svg" alt="FAQ" className="w-15 h-15" />
            <h3 className="text-lg md:text-xl font-bold">How do you ensure the customer drives my car with care?</h3>
          </div>
          <p className="text-[#666a75] leading-8">
            We understand how critical it is that cars are driven with care especially with the poor road conditions in Nigeria. We never allow our clients to drive any of our cars nor our partners' cars.<br /><br />
            All the cars rented out by TheLuxAuto are driven by our well-trained Chauffeurs. You can be rest assured your cars are in great hands.
          </p>
        </div>
        <div className="border border-gray-300 p-3 rounded-md">
          <div className="flex items-center flex-col gap-2 mb-4">
            <img src="https://ext.same-assets.com/115718355/2392729274.svg" alt="FAQ" className="w-15 h-15" />
            <h3 className="text-lg md:text-xl font-bold">When do I get paid for any car I list with you?</h3>
          </div>
          <p className="text-[#666a75] leading-8">
            We pay our partners at the end of every rental. We do not delay payment under any circumstances.
          </p>
        </div>
        <div className="border border-gray-300 p-3 rounded-md">
          <div className="flex items-center flex-col gap-2 mb-4">
            <img src="https://ext.same-assets.com/115718355/2392729274.svg" alt="FAQ" className="w-15 h-15" />
            <h3 className="text-lg md:text-xl font-bold">Do you accept all kind of cars?</h3>
          </div>
          <p className="text-[#666a75] leading-8">
            No, we do not accept all cars into our fleet. We are a very customer-centric organization. The comfort, safety and splendor of cars in our fleet is very important to us. Please feel free to Whatsapp us for a precheck if your car qualifies to be in our fleet.
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default BecomePartner;
