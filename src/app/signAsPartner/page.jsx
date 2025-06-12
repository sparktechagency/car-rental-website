"use client"
import { useState } from "react";

const SignAsPartner = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    carModel: "",
    carLocation: "",
    partnership: "",
    acFunction: "",
    bodyDamage: "",
    mechanicalIssues: "",
    registration: "",
    fixedProblems: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRadio = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Show success message
      const message = `Thank you for your interest in partnering with us!\n\nWe have received your application and our team will review it shortly. You will receive a confirmation email at ${form.email} with next steps.\n\nReference ID: ${Date.now()}\n\nFor any immediate questions, please contact our partnership team.`;

      alert(message);

      // Reset form
      setForm({
        fullName: "",
        email: "",
        carModel: "",
        carLocation: "",
        partnership: "",
        acFunction: "",
        bodyDamage: "",
        mechanicalIssues: "",
        registration: "",
        fixedProblems: "",
      });

    } catch (error) {
      alert("There was an error submitting your application. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#fbfbfb] min-h-screen flex flex-col w-full">
      {/* Banner Image */}
      <div className="w-full h-48 md:h-64 overflow-hidden relative">
        <img
          src="https://ext.same-assets.com/115718355/289829448.webp"
          alt="Partner Sign Up Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#4b526a]/40" />
      </div>
      <div className="max-w-4xl w-full mx-auto -mt-20 mb-10 p-4 flex flex-col gap-6 z-10 relative">
        {/* Title */}
        <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col gap-2 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-[#4b526a]">Partner sign-up</h1>
          <p className="text-lg text-[#ab9048]">Please complete the form below to begin the process of becoming one of our Partners</p>
        </div>
        {/* The Form */}
        <form className="bg-[#fbfbfb] rounded-lg shadow p-6 flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <label className="font-semibold text-[#4b526a]" htmlFor="fullName">First & Last Name</label>
            <input className="border rounded px-3 py-2" id="fullName" name="fullName" value={form.fullName} onChange={handleChange} required />
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-semibold text-[#4b526a]" htmlFor="email">Email Address</label>
            <input className="border rounded px-3 py-2" id="email" name="email" type="email" value={form.email} onChange={handleChange} required />
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-semibold text-[#4b526a]" htmlFor="carModel">Year, Make & Model of Car</label>
            <input className="border rounded px-3 py-2" id="carModel" name="carModel" value={form.carModel} onChange={handleChange} required />
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-semibold text-[#4b526a]" htmlFor="carLocation">Location of Car (Full Address Preferred)</label>
            <input className="border rounded px-3 py-2" id="carLocation" name="carLocation" value={form.carLocation} onChange={handleChange} required />
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-semibold text-[#4b526a]" htmlFor="partnership">How will you like to Partner with us?</label>
            <input className="border rounded px-3 py-2" id="partnership" name="partnership" value={form.partnership} onChange={handleChange} placeholder="Describe Partnership Type" required />
          </div>
          {/* Radio questions */}
          <div>
            <label className="font-semibold text-[#4b526a]">Does your Car have full functioning AC?</label>
            <div className="flex gap-4 mt-1">
              <label><input type="radio" name="acFunction" checked={form.acFunction === "Yes"} onChange={() => handleRadio("acFunction", "Yes")} /> Yes</label>
              <label><input type="radio" name="acFunction" checked={form.acFunction === "No"} onChange={() => handleRadio("acFunction", "No")} /> No</label>
            </div>
          </div>
          <div>
            <label className="font-semibold text-[#4b526a]">Is there any noticeable damage to the body of your Car?</label>
            <div className="flex gap-4 mt-1">
              <label><input type="radio" name="bodyDamage" checked={form.bodyDamage === "Yes"} onChange={() => handleRadio("bodyDamage", "Yes")} /> Yes</label>
              <label><input type="radio" name="bodyDamage" checked={form.bodyDamage === "No"} onChange={() => handleRadio("bodyDamage", "No")} /> No</label>
            </div>
          </div>
          <div>
            <label className="font-semibold text-[#4b526a]">Does your Car have any current mechanical issues?</label>
            <div className="flex gap-4 mt-1">
              <label><input type="radio" name="mechanicalIssues" checked={form.mechanicalIssues === "Yes"} onChange={() => handleRadio("mechanicalIssues", "Yes")} /> Yes</label>
              <label><input type="radio" name="mechanicalIssues" checked={form.mechanicalIssues === "No"} onChange={() => handleRadio("mechanicalIssues", "No")} /> No</label>
            </div>
          </div>
          <div>
            <label className="font-semibold text-[#4b526a]">Is your Car fully registered with all necessary paper work (including insurance) to operate in Nigeria?</label>
            <div className="flex gap-4 mt-1 flex-wrap">
              <label><input type="radio" name="registration" checked={form.registration === "Yes"} onChange={() => handleRadio("registration", "Yes")} /> Yes</label>
              <label><input type="radio" name="registration" checked={form.registration === "No"} onChange={() => handleRadio("registration", "No")} /> No</label>
              <label><input type="radio" name="registration" checked={form.registration === "Working on it"} onChange={() => handleRadio("registration", "Working on it")} /> Working on it</label>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-semibold text-[#4b526a]" htmlFor="fixedProblems">If any, Please list any mechanical problems that has been fixed on your car in the last 6 months</label>
            <textarea className="border rounded px-3 py-2 min-h-[80px]" id="fixedProblems" name="fixedProblems" value={form.fixedProblems} onChange={handleChange} />
          </div>
          <button
            type="submit"
            className={`mt-4 ${isSubmitting ? 'bg-[#04bf87]' : 'bg-[#04bf61] hover:bg-[#04bf87]'
              } transition text-white font-bold px-8 py-3 rounded-full shadow`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignAsPartner;