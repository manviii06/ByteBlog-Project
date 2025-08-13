import React, { useState } from "react";
import { sendContactMessage } from '../services/api';
const ContactUs = () => {

const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [statusMessage, setStatusMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await sendContactMessage(formData);
    setStatusMessage("✅ Message sent successfully!");
    alert("✅ Message sent successfully!");
    setFormData({ name: "", email: "", subject: "", message: "" });
  } catch (err) {
    console.error("Contact error:", err.message);
    setStatusMessage("❌ " + err.message);
  }
};

  return (
    <section className="bg-white py-12 px-4" id="contact">
      <div className="max-w-6xl min-h-4xl mx-auto grid md:grid-cols-2 gap-8 bg-white rounded-2xl shadow-2xl shadow-purple-900 p-8">
        {/* Left side - Contact Info */}
        <div className="flex flex-col justify-center">
          <h2
            className="text-6xl font-bold bg-gradient-to-r 
from-indigo-600 from-[0%] 
via-purple-500 via-[15%] 
to-pink-800 to-[100%] 
bg-clip-text text-transparent mb-4


"
          >
            Contact Us
          </h2>
          <p className="text-gray-600 mb-6">
            Have questions or want to work with us? Fill out the form and we’ll
            get back to you as soon as possible.
          </p>
          <ul className="space-y-4 text-gray-700">
            <li>
              📍 <span className="ml-2">123 Main Street, New Delhi, India</span>
            </li>
            <li>
              📞 <span className="ml-2">+91 98765 43210</span>
            </li>
            <li>
              📧 <span className="ml-2">support@example.com</span>
            </li>
          </ul>
        </div>

        {/* Right side - Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Your Full Name"
              className="mt-1 block w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={formData.Fullname}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              className="mt-1 block w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:outline-none"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Subject
            </label>
            <textarea
              rows="4"
              name="subject"
              placeholder="Your Subject..."
              className="mt-1 block w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:outline-none"
              value={formData.subject}
              onChange={handleChange}
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              rows="4"
              name="message"
              placeholder="Your message..."
              className="mt-1 block w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:outline-none"
              value={formData.message}
              onChange={handleChange}
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer bg-gradient-to-r 
           from-indigo-600 from-[5%] 
           via-purple-500 via-[45%] 
           to-pink-800 to-[100%] 
           text-white font-semibold py-3 rounded-lg 
           hover:bg-gradient-to-l 
           hover:from-indigo-600 hover:from-[5%] 
           hover:via-purple-500 hover:via-[35%] 
           hover:to-pink-800 hover:to-[80%] 
           transition duration-300"

          >
            Send Message
          </button>
           {statusMessage && (
              <p className="text-sm mt-2 text-green-600">{statusMessage}</p>
            )}
        </form>
      </div>
    </section>
  );
};

export default ContactUs;
