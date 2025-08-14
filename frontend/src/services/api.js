import axios from "axios";

// Create a reusable axios instance with a base URL
const api = axios.create({
  baseURL: "http://localhost:5000", // Change for production
  headers: {
    "Content-Type": "application/json",
  },
});

/* ===========================
   AUTH APIs
=========================== */

// Signup
export const signupUser = async (userData) => {
  try {
    const res = await api.post("/api/auth/register", userData);
    return res.data;
  } catch (err) {
    console.error("Signup Error:", err.response?.data || err.message);
    throw err;
  }
};

// Login
export const loginUser = async (credentials) => {
  try {
    const res = await api.post("/api/auth/login", credentials);
    
   console.log(res.data);
    return res.data;
  } catch (err) {
    console.error("Login Error:", err.response?.data || err.message);
    throw err;
  }
};

// FORGOT PASSWORD FLOW
export const sendOtp = (email) =>
  api.post('/api/auth/send-otp', { email });

export const verifyOtp = (email, otp) =>
  api.post('/api/auth/verify-otp', { email, otp });

export const resetPassword = (email, newPassword) =>
  api.post('/api/auth/reset-password', { email, newPassword });

// Google Sign-in Redirect
export const googleSignIn = () => {
  window.location.href = "http://localhost:5000/api/auth/google";
};

// Get Logged-in User
export const getCurrentUser = async () => {
  try {
    const res = await api.get("/api/auth/me");
    return res.data;
  } catch (err) {
    console.error("Fetch User Error:", err.response?.data || err.message);
    throw err;
  }
};

/* ===========================
   SUBSCRIBER APIs
=========================== */
export const subscribeUser = async (data) => {
  try {
    const res = await api.post("/api/users/subscribe", data);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Subscription failed");
  }
};

/* ===========================
   CONTACT APIs
=========================== */
export const sendContactMessage = async (formData) => {
  try {
    const res = await api.post("/api/contact", formData);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Something went wrong");
  }
};

export const fetchContactMessages = () =>
  api.get("/api/admin/contact", { requiresAuth: true });