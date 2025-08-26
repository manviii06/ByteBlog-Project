import React, { useState } from "react";
import { assets } from "../assets/assets";
import { signupUser, loginUser, googleSignIn } from "../services/api";
import { useNavigate } from "react-router-dom";
const signupInitialValues = {
  firstName: "",
  lastName: "",
  username: "",
  password: "",
  email: "",
  // state: "",
  // city: "",
  // country:"",
  // pincode: "",
  bio: "",
};

const Login = () => {
  const [account, toggleAccount] = useState("login");
  const [signup, setSignup] = useState(signupInitialValues);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
const navigate = useNavigate();
  const toggleSignup = () => {
    account === "signup" ? toggleAccount("login") : toggleAccount("signup");
  };

  const onInputChange = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };

  const onLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    setError("");
    try {
      const res = await signupUser(signup);

      if(res.status === 201){
        console.log("Signup Success:", res);
      alert("Signup Successful");
      navigate('/login');
      } else{
        setError("Unexpected response from server.");
      }

    } catch (err) {
      alert("Registration Failed: " + (err.response?.data || err.message));
      console.error("❌ Error details:", err.response?.data || err.message);

      if (
        err.response?.status === 400 &&
        err.response.data === "User already exists"
      ) {
        alert("User already exists. Please try signing in.");
        setError("This email is already registered. Try signing in.");
      } else {
        setError("Registration failed. Please try again.");
      }
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await loginUser(loginData);

      console.log("Sending loginData:", loginData);
      const { token, role, user, _id } = res.data;

       localStorage.setItem("authToken", token);
       localStorage.setItem("userRole", role); 
       localStorage.setItem('firstName', user.firstName);  
       localStorage.setItem('lastName', user.lastName);  
       localStorage.setItem('userEmail', user.email);  
       localStorage.setItem("userId", _id);

      window.dispatchEvent(new Event("authChanged"));
      alert("Login Successful");

    
      
      if (role === "admin") {
        navigate("/admin/dashboard");
      } else if (role === "user") {
        setTimeout(() => {
          navigate("/user-dashboard");
          window.location.reload();
          navigate(0);
        }, 100);
      } else {
        setError("Unknown role. Contact administrator.");
      }

    } catch (err) {
      console.error("Login Failed:", err);
      alert("Login Failed: " + (err.response?.data || err.message));
    }
  };

  const handleGoogleSignin = () => {
    googleSignIn();
  };

  return (
    <div className="w-[500px] mx-auto shadow-lg m-20 shadow-black rounded-lg">
      <div>
        <img src={assets.logo} alt="login" className="w-34 h-45 mx-auto" />

        {account === "login" ? (
          <div className="p-6 flex flex-col space-y-5">
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              onChange={onLoginChange}
              className="border-b border-gray-400 focus:outline-none"
            />
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              onChange={onLoginChange}
              className="border-b border-gray-400 focus:outline-none"
            />
            <button
              className="bg-gradient-to-r from-indigo-700 to-purple-400 text-white h-12 rounded"
              onClick={handleLogin}
            >
              Login
            </button>
            <a
              href="/ForgetPwd"
              className="text-purple-600 font-medium m-1.5 hover:underline hover:text-red-600 text-sm ml-80 "
            >
              Forget Password ?
            </a>


            <button
              className="bg-white text-grey-500 h-12 rounded shadow"
              onClick={toggleSignup}
            >
              Create an account
            </button>

            {/* <button
              className="bg-gradient-to-r from-indigo-700 to-purple-400 text-white h-12 rounded"
              onClick={handleGoogleSignin}
            >
              Sign in with Google
            </button> */}
          </div>
        ) : (
          <div className="p-6 flex flex-col space-y-5">
            <div className="flex gap-4">
              <input type="text" name="firstName" placeholder="First Name" onChange={onInputChange} className="flex-1 border-b border-gray-400 focus:outline-none" />
              <input type="text" name="lastName" placeholder="Last Name" onChange={onInputChange} className="flex-1 border-b border-gray-400 focus:outline-none" />
            </div>

            <div className="flex gap-4">
              <input type="text" name="username" placeholder="Username" onChange={onInputChange} className="flex-1 border-b border-gray-400 focus:outline-none" />
              <input type="password" name="password" placeholder="Password" onChange={onInputChange} className="flex-1 border-b border-gray-400 focus:outline-none" />
            </div>

            <div className="flex gap-4">
              <input type="email" name="email" placeholder="Email" onChange={onInputChange} className="flex-1 border-b border-gray-400 focus:outline-none" />
              {/* <input type="text" name="country" placeholder="Country" onChange={onInputChange} className="flex-1 border-b border-gray-400 focus:outline-none" /> */}
            </div>

            {/* <div className="flex gap-4">
              <input type="text" name="state" placeholder="State" onChange={onInputChange} className="flex-1 border-b border-gray-400 focus:outline-none" />
              <input type="text" name="city" placeholder="City" onChange={onInputChange} className="flex-1 border-b border-gray-400 focus:outline-none" />
            </div> */}

            <div className="flex gap-4">
              {/* <input type="text" name="pincode" placeholder="Pincode" onChange={onInputChange} className="flex-1 border-b border-gray-400 focus:outline-none" /> */}
              <input type="text" name="bio" placeholder="Bio" onChange={onInputChange} className="flex-1 border-b border-gray-400 focus:outline-none" />
            </div>

            <button className="bg-white text-[#93259d] h-12 rounded shadow" onClick={handleSignup}>
              Signup
            </button>

            <p className="text-gray-500 text-center py-1">OR</p>
            <button className="bg-gradient-to-r from-indigo-700 to-purple-400 text-white h-12 rounded" onClick={toggleSignup}>
              Already have an account
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;