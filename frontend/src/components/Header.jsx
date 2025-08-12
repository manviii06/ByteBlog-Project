import React, { useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

const Header = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  // Check login status on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setIsLoggedIn(true);
      setUserName(user.name || 'User');
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
            Blogging Platform
          </h1>
        </div>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-6">
          <nav className="flex space-x-6">
            {isLoggedIn
              ? ['Dashboard', 'My Blogs', 'Profile'].map((text, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      if (text === 'Dashboard') navigate('/dashboard');
                      else if (text === 'My Blogs') navigate('/my-blogs');
                      else if (text === 'Profile') navigate('/profile');
                    }}
                    className="relative text-xl font-serif text-gray-600 hover:text-indigo-600 transition-all duration-300 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 hover:after:w-full after:bg-indigo-600 after:transition-all after:duration-300"
                  >
                    {text}
                  </button>
                ))
              : ['Home', 'Features', 'Contact'].map((text, i) => (
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
                      }
                    }}
                    className="relative text-xl font-serif text-gray-600 hover:text-indigo-600 transition-all duration-300 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 hover:after:w-full after:bg-indigo-600 after:transition-all after:duration-300"
                  >
                    {text}
                  </button>
                ))}
          </nav>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-2">
          {isLoggedIn ? (
            <>
              <span className="text-gray-600 hidden sm:block">
                Hi, {userName}
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate('/Login')}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
              >
                Get Signin
              </button>
              <FaArrowRight className="text-indigo-600" />
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
