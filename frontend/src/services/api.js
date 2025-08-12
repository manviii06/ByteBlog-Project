
// // for subscriber
// export const subscribeUser = async (data) => {
//   const res = await axios.post('/api/subscribe', data);
//   return res.data;
// };

// //for contact form
// export const sendContactMessage = async (formData) => {
//   try {
//     const res = await axios.post(
//       "https://localhost:5000/api/contact",
//       formData,
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     return res.data;
//   } catch (error) {
//     throw new Error(error.response?.data?.error || "Something went wrong");
//   }
// };

// export const fetchContactMessages = () =>
//   api.get("/admin/contact", { requiresAuth: true });



import axios from "axios";

// Create a reusable axios instance with a base URL
const api = axios.create({
  baseURL: "http://localhost:5000", // change to your production API in deployment
  headers: {
    "Content-Type": "application/json",
  },
});

// Subscriber
export const subscribeUser = async (data) => {
  try {
    const res = await api.post("/api/subscribe", data);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Subscription failed");
  }
};

// Contact form
export const sendContactMessage = async (formData) => {
  try {
    const res = await api.post("/api/contact", formData);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Something went wrong");
  }
};

// Fetch contact messages
export const fetchContactMessages = () =>
  api.get("/admin/contact", { requiresAuth: true });
