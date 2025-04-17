import CustomBanner from '@/components/CustomBanner';
import React from 'react';

export default function LuxAutoTerms() {
  return (
   <div>
    <CustomBanner title={"terms & Conditions"} breadcrumbs={[{label:"T&C" , href:"/terms-conditions"} , {label:"Home" , href:"/"}]} />
     <div className="container mx-auto px-6 py-12 bg-white text-gray-800 font-sans">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Payment Section */}
        <div>
          <h2 className="text-xl font-bold mb-4">Payment</h2>
          <ol className="list-decimal pl-5 space-y-4 text-justify">
            <li>If you make payment by credit or debit card, the charge on your credit card statement will be shown as 'The Lux Auto'.</li>
            <li>Car parking charges that are necessarily incurred in order to fulfil a booking will be charged at cost except where this cost is incorporated into our Airport Meet & Greet service charge. Parking garage fees are extra charges to the customer.</li>
            <li>Any variations to the journey that involves extra time may be subject to additional charges.</li>
            <li>Toll and congestion charges will be applied, where applicable.</li>
            <li>Bookings with pick up times between 23.30pm and 04.59am will be subject to an "unsocial hours" surcharge. This will also apply to bookings carried out on Christmas Day, Boxing Day, New Years Eve from 18pm and all day New Years Day.</li>
            <li>All prices are in US dollar and Naira and exclusive of vat unless otherwise stated.</li>
            <li>All payment is due before pickup. Payment for corporate account bookings is due within 72 hours of the date of invoice</li>
          </ol>
        </div>

        {/* Cancellation Policy Section */}
        <div>
          <h2 className="text-xl font-bold mb-4">Cancellation Policy</h2>
          <ol className="list-decimal pl-5 space-y-3 text-justify">
            <li>If a booking is cancelled within 24 hour of the requested pick-up time we reserve the right to make full charge for the journey. If however the pick-up location necessitates the car being dispatched more than an hour before the pick-up time we again reserve the right to make full charge for the journey.</li>
            <li>If the passenger does not appear and make contact with our driver at the booked time and the designated pick-up point, we reserve the right to make full charge for the journey.</li>
            <li>Our bookings cancellation policy reflects the availability of the vehicles in our fleet. Upon acceptance of your booking we reserve the availability of the vehicle for you and subsequently refuse all other bookings for that vehicle at that time and on that date.</li>
          </ol>
        </div>
      </div>

      {/* Terms & Conditions Section - Full Width */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Terms & Conditions</h2>
        <ol className="list-decimal pl-5 space-y-3 text-justify">
          <li>The Lux Auto service will endeavor to ensure vehicle(s) arrive at the time and place requested. We cannot however accept responsibility for delays caused by circumstances beyond our control, such as mechanical failure, traffic jams, traffic accidents or extreme weather conditions. Nor do we accept responsibility for any consequential loss. The Chauffeur Group shall be under no liability whatsoever to the customer for any indirect loss (including loss of profit) suffered by the Customer arising out of a breach by The Lux Auto of this contract.</li>
          <li>The Driver will travel by the most appropriate route on the day, unless instructed otherwise by the Client, in which case Payment clause 3. may apply.</li>
          <li>Unless specified at the time of booking, we may not automatically be able to accommodate additional pick-ups or drop-offs for any journey, although every effort will be made to meet such requirement.</li>
          <li>If our driver is asked to wait either at the beginning or during a journey, waiting time is chargeable at our current standard rate.</li>
          <li>Nothing contained in these terms and conditions affects the Client's' statutory rights.</li>
          <li>Non-airport collections: Except for a 10 minute 'grace' period waiting charges will apply from the booked time, at our current standard rate.</li>
          <li>We reserve the right to refuse entry to our vehicles to anyone who is thought to be under the influence of alcohol or drugs and/or whose behavior poses a threat to the safety of the driver, the vehicle, or other passengers within the vehicle. We further reserve the right to terminate any journey due to unreasonable or improper behavior by any passenger.</li>
          <li>If special cleaning of any vehicle is required because it has been left in an unreasonable state by a passenger/client, we reserve the right to charge the cost of cleaning to that passenger/client.</li>
          <li>We reserve the right to substitute any vehicle or chauffeur/driver.</li>
          <li>Nothing contained in these terms and conditions affects the Client's' statutory rights.</li>
        </ol>
      </div>
    </div>
   </div>
  );
}