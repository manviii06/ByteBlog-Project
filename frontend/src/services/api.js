import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Interceptor for auth
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");

    if (config.requiresAuth && token) {
      // ✅ FIXED string interpolation
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    if (config.contentType) {
      config.headers["Content-Type"] = config.contentType;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* ===========================
   AUTH APIs
=========================== */
export const loginUser = (credentials) =>
  api.post("/auth/login", credentials, {
    headers: { "Content-Type": "application/json" },
  });

export const signupUser = (userData) => api.post("/auth/register", userData);

export const sendOtp = (email) => api.post("/auth/send-otp", { email });
export const verifyOtp = (email, otp) =>
  api.post("/auth/verify-otp", { email, otp });
export const resetPassword = (email, newPassword) =>
  api.post("/auth/reset-password", { email, newPassword });

export const googleSignIn = () => {
  window.location.href = "http://localhost:5000/api/auth/google";
};

export const getCurrentUser = async () => {
  try {
    const res = await api.get("/auth/me", { requiresAuth: true });
    return res.data;
  } catch (err) {
    console.error("Fetch User Error:", err.response?.data || err.message);
    throw err;
  }
};

/* ===========================
   USER APIs (fixed)
=========================== */

// Fetch logged-in user profile
export const getUserProfile = async () => {
  const res = await api.get("/users/profile", { requiresAuth: true }); // ✅ fixed path
  return res.data.user;
};

// Update profile (text fields)
export const updateUserProfile = async (userData) => {
  const res = await api.put("/users/profile", userData, { requiresAuth: true }); // ✅ fixed path
  return res.data;
};

// Upload profile picture
export const uploadProfilePicture = async (imageFile) => {
  const formData = new FormData();
  formData.append("profilePic", imageFile);

  const res = await api.put("/users/profile", formData, {
    requiresAuth: true,
    contentType: "multipart/form-data",
  });
  return res.data;
};

// Subscribe
export const subscribeUser = async (data) => {
  const res = await api.post("/users/subscribe", data);
  return res.data;
};

// User Dashboard
export const fetchUserDashboard = async () => {
  const res = await api.get("/users/dashboard", { requiresAuth: true });
  return res.data;
};

/* ===========================
   CONTACT APIs
=========================== */
export const sendContactMessage = async (formData) => {
  try {
    const res = await api.post("/contact", formData);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Something went wrong");
  }
};

export const fetchContactMessages = () =>
  api.get("/admin/contact", { requiresAuth: true });
