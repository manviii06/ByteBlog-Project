import React from "react";
import {
  FiHome,
  FiBarChart2,
  FiShoppingCart,
  FiUsers,
  FiMail,
  FiClock,
  FiSettings,
  FiLogOut,
  FiUser,
} from "react-icons/fi";
import { FaUserShield } from "react-icons/fa";
import { assets } from '../../assets/assets';
import { useNavigate } from "react-router-dom";
const AdminSidebar = () => {
  const navigate = useNavigate();

    const firstName = localStorage.getItem("firstName") || "Admin";
  const lastName = localStorage.getItem("lastName") || "";
  const email = localStorage.getItem("userEmail") || "admin@example.com";

  const handleLogout = () => {
      localStorage.removeItem("authToken");
  localStorage.removeItem("userRole");
  localStorage.removeItem("firstName");
  localStorage.removeItem("lastName");
  localStorage.removeItem("userEmail");
  localStorage.removeItem("userId");
    localStorage.removeItem('user');
    
    navigate('/');
  };

  return (
    <aside className="w-64 min-h-screen bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 text-white flex flex-col shadow-lg">
      <div className="p-3 border-white items-center justify-center flex bg-white mb-4 ">      
        
        <img
                
                src={assets.logo}
                alt="logo"
                className="w-[50px] h-[50px]  cursor-pointer transition-transform hover:scale-105"
                />
        
        

        <h1 className="text-lg font-semibold text-purple-800">BlogByte</h1>
        
      </div>
      {/* Admin Card */}
      <div className="border-t border-pink-500">
        <div className="bg-white text-gray-800  p-4 shadow-lg flex items-center justify-center gap-3">
          <div className="p-3 bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 rounded-full">

          <FaUserShield className=" text-white text-4xl" />

          </div>
          <div>

          <h2 className=" font-bold text-purple-700 text-lg">{firstName} {lastName}</h2>
          <p className="text-sm text-gray-500">{email}</p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 space-y-2 px-4 mt-5">
        <a href="/admin/dashboard" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gradient-to-r from-indigo-500 via-purple-400 to-pink-400  transition">
          <FiHome className="text-xl" /> <span>Dashboard</span>
        </a>
        <a href="/admin/subscribers" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gradient-to-r from-indigo-500 via-purple-400 to-pink-400 hover:opacity-85 transition">
          <FiBarChart2 className="text-xl" /> <span>Subscribers</span>
        </a>
       
        <a href="/admin/admin-users" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gradient-to-r from-indigo-500 via-purple-400 to-pink-400 hover:opacity-85 transition">
          <FiUsers className="text-xl" /> <span>User Details</span>
        </a>
        <a href="/admin/contact" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gradient-to-r from-indigo-500 via-purple-400 to-pink-400 hover:opacity-85 transition">
          <FiMail className="text-xl" /> <span>Contact</span>
        </a>
       
        
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-white">
        <button className="flex items-center space-x-3 w-full p-3 rounded-lg hover:bg-red-500 transition font-semibold" 
        onClick={handleLogout}>
          <FiLogOut className="text-xl " />
          <span >Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
