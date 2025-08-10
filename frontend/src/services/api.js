import axios from 'axios';
// for subscriber
export const subscribeUser = async (data) => {
  const res = await axios.post('/api/subscribe', data);
  return res.data;
};

//for contact form
export const sendContactMessage = async (formData) => {
  try {
    const res = await axios.post(
      "https://localhost:5000/api/contact",
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Something went wrong");
  }
};

export const fetchContactMessages = () =>
  api.get("/admin/contact", { requiresAuth: true });