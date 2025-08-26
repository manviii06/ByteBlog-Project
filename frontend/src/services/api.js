import axios from "axios";

const api = axios.create({
  baseURL: "https://byteblog-wfa2.onrender.com/api"
  
});
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");

    if (config.requiresAuth && token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    if (config.contentType) {
      config.headers["Content-Type"] = config.contentType;
    }

    return config;
  },
  (error) => Promise.reject(error)
);


// Login
export const loginUser = (credentials) =>  api.post("/auth/login", credentials, {
    headers: { "Content-Type": "application/json" }
  });

// Signup
export const signupUser = (userData) => api.post("/auth/register", userData);


    
   

// FORGOT PASSWORD FLOW
export const sendOtp = (email) =>
  api.post('/auth/send-otp', { email });

export const verifyOtp = (email, otp) =>
  api.post('/auth/verify-otp', { email, otp });

export const resetPassword = (email, newPassword) =>
  api.post('/auth/reset-password', { email, newPassword });

// Google Sign-in Redirect
export const googleSignIn = () => {
  window.location.href = "https://byteblog-wfa2.onrender.com/api/auth/google";
};

// Get Logged-in User
export const getCurrentUser = async () => {
  try {
    const res = await api.get("/auth/me");
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
    const res = await api.post("/users/subscribe", data);
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
    const res = await api.post("/contact", formData);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Something went wrong");
  }
};

export const fetchContactMessages = () =>
  api.get("/admin/contact", { requiresAuth: true });

export const fetchUserDashboard = () =>
  api.get("/users/dashboard", { requiresAuth: true });

// Get all blogs
export const fetchBlogs = () => api.get("/blogs/blogs");

// Get single blog by ID
export const fetchBlogById = (id) => api.get(`/blogs/blogs/${id}`);

// Create blog
export const createBlog = (blogData) =>
  api.post("/blogs", blogData, { requiresAuth: true });

// Update blog
export const updateBlog = (id, blogData) =>
  api({
    method: "put",
    url: `/blogs/${id}`,
    data: blogData,
    requiresAuth: true,
  });

// Delete blog
export const deleteBlog = (id) =>
  api.delete(`/blogs/${id}`, { requiresAuth: true });

// Like/unlike blog
export const toggleLikeBlog = (id) =>
  api.put(`/blogs/${id}/like`, {}, { requiresAuth: true });

// Add comment
export const addComment = (id, text) =>
  api.post(`/blogs/${id}/comments`, { text }, { requiresAuth: true });

export const fetchComments = (id) =>
  api.get(`/comments/${id}`);

// Delete comment
export const deleteComment = (id, commentId) =>
  api.delete(`/blogs/${id}/comments/${commentId}`, { requiresAuth: true });

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
