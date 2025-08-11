import React, { useState } from "react";
import { assets } from '../assets/assets';

const signupInitialValues = {
  name: "",
  username: "",
  password: "",
};

const Login = () => {
  const [account, toggleAccount] = useState("login");
  const [signup, setSignup] = useState(signupInitialValues);

  const toggleSignup = () => {
    account === "signup" ? toggleAccount("login") : toggleAccount("signup");
  };

  const handleGoogleSignin = () => {
    console.log("Google Sign-In Clicked");
  };

  const onInputChange = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };

  const signupUser = () => {
    // Signup logic
  };

  return (
    <div className="w-[400px] mx-auto shadow-lg m-20 shadow-black">
      <div>
        <img
          src={assets.logo}
          alt="login"
          className="w-34 h-45 mx-auto"
        />

        {account === "login" ? (
          <div className="p-6 flex flex-col space-y-5">
            <input
              type="text"
              placeholder="Enter username"
              className="border-b border-gray-400 focus:outline-none"
            />
            <input
              type="password"
              placeholder="Enter password"
              className="border-b border-gray-400 focus:outline-none"
            />
            <button className="bg-gradient-to-r from-indigo-700 to-purple-400 text-white h-12 rounded">
              Login
            </button>
            <button
              className="bg-white text-[#93259d] h-12 rounded shadow"
              onClick={toggleSignup}
            >
              Create an account
            </button>
            <button
              className="bg-gradient-to-r from-indigo-700 to-purple-400 text-white h-12 rounded hover-red-700" 
              onClick={handleGoogleSignin}
            >
              Sign in with Google
            </button>
          </div>
        ) : (
          <div className="p-6 flex flex-col space-y-5">
            <input
              type="text"
              name="name"
              placeholder="Enter Name"
              onChange={onInputChange}
              className="border-b border-gray-400 focus:outline-none"
            />
            <input
              type="text"
              name="username"
              placeholder="Enter username"
              onChange={onInputChange}
              className="border-b border-gray-400 focus:outline-none"
            />
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              onChange={onInputChange}
              className="border-b border-gray-400 focus:outline-none"
            />
            <button
              className="bg-white text-[#93259d] hover-text-red-600 h-12 rounded shadow"
              onClick={signupUser}
            >
              Signup
            </button>
            <p className="text-gray-500 text-center py-1">OR</p>
            <button
              className="bg-gradient-to-r from-indigo-700 to-purple-400 text-white h-12 rounded"
              onClick={toggleSignup}
            >
              Already have an account
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;