import React, { useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

const Header = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

 useEffect(() => {
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    const user = JSON.parse(storedUser);
    setIsLoggedIn(true);
    setUserName(user.firstName || "User");
  } else {
    setIsLoggedIn(false);
    setUserName("");
  }
}, []);

useEffect(() => {
  const firstName = localStorage.getItem("firstName");
  const lastName = localStorage.getItem("lastName");
  const email = localStorage.getItem("userEmail");

  if (firstName && email) {
    setIsLoggedIn(true);
    setUserName(firstName + " " + (lastName || ""));
  } else {
    setIsLoggedIn(false);
    setUserName("");
  }
}, []);
  


  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  const handleLogout = () => {
      localStorage.removeItem("authToken");
  localStorage.removeItem("userRole");
  localStorage.removeItem("firstName");
  localStorage.removeItem("lastName");
  localStorage.removeItem("userEmail");
  localStorage.removeItem("userId");
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
  <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-4">
    
    {/* Logo Section */}
    <div className="flex items-center">
      <img
        onClick={() => navigate('/')}
        src={assets.logo}
        alt="logo"
        className="w-1 h-18 sm:w-40 cursor-pointer transition-transform hover:scale-105"
      />
      <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500">
        ByteBlog
      </h1>
    </div>

    {/* Nav + Auth in one flex row */}
    <div className="hidden md:flex items-center gap-6 ml-auto">
      
      {/* Nav Links */}
      <nav className="flex space-x-6">
        {isLoggedIn
          ? ['All Blogs','Dashboard', 'My Blogs', 'Profile', ].map((text, i) => (
              <button
                key={i}
                onClick={() => {
                  if (text === 'Dashboard') navigate('/user-dashboard');
                  else if (text === 'My Blogs') navigate('/my-blogs');
                  else if (text === 'Profile') navigate('/profile');
                  else if (text === 'All Blogs') navigate('/all-blogs');
                }}
                className="relative cursor-pointer text-xl font-serif text-purple-700 
                  hover:text-purple-800 transition-all duration-300
                  after:content-[''] after:absolute after:left-0 after:-bottom-1 
                  after:h-[2px] after:w-0 hover:after:w-full 
                  after:bg-gradient-to-r after:from-indigo-600 after:via-purple-500 after:to-pink-500 
                  after:transition-all after:duration-300"
              >
                {text}
              </button>
            ))
          : ['Home', 'Features', 'Contact', 'All Blogs'].map((text, i) => (
              <button
                key={i}
                onClick={() => {
                  if (text === 'Home') {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    navigate('/');
                  } else if (text === 'Features') {
                    navigate('/');
                    scrollToSection('features-section');
                  } else if (text === 'Contact') {
                    navigate('/Contact-us');
                  } else if (text === 'All Blogs') {
                    navigate('/all-blogs');
                  }
                }}
                className="relative cursor-pointer text-xl font-serif text-purple-700 
                  hover:text-purple-800 transition-all duration-300
                  after:content-[''] after:absolute after:left-0 after:-bottom-1 
                  after:h-[2px] after:w-0 hover:after:w-full 
                  after:bg-gradient-to-r after:from-indigo-600 after:via-purple-500 after:to-pink-500 
                  after:transition-all after:duration-300"
              >
                {text}
              </button>
            ))}
      </nav>

      {/* Auth Button */}
      {isLoggedIn ? (
        <button
          onClick={handleLogout}
          className="cursor-pointer bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 
            text-white flex items-center justify-center gap-2 px-5 py-2 rounded-md 
            hover:bg-gradient-to-l hover:from-indigo-600 hover:via-purple-500 hover:to-pink-500 
            transition-colors duration-200"
        >
          Logout
        </button>
      ) : (
        <button
          onClick={() => navigate('/Login')}
          className="cursor-pointer bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 
            text-white flex items-center justify-center gap-2 px-5 py-2 rounded-md 
            hover:bg-gradient-to-l hover:from-indigo-600 hover:via-purple-500 hover:to-pink-500 
            transition-colors duration-200"
        >
          <span>Get Signin</span>
          <FaArrowRight />
        </button>
      )}
    </div>
  </div>
</header>

  );
};

export default Header;
