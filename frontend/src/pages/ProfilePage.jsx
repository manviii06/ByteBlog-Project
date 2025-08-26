import React, { useEffect, useState } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";

const ProfilePage = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    bio: "",
    role: "user",
    profilePicture: "",
  });

  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("authToken");
        if (!token) return setLoading(false);

        const res = await axios.get("https://byteblog-wfa2.onrender.com/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(res.data.user || res.data);
      } catch (err) {
        console.error("Error fetching user:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => setImage(e.target.files[0]);

  const handleImageUpload = async () => {
    if (!image) return alert("Please select an image first!");
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("profilePicture", image);

      const token = localStorage.getItem("authToken");
      const res = await axios.post(
        "https://byteblog-wfa2.onrender.com/api/users/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setUser((prev) => ({ ...prev, profilePicture: res.data.profilePicture }));
      alert("Profile picture updated!");
    } catch (err) {
      console.error("Error uploading image:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const token = localStorage.getItem("authToken");
      const res = await axios.put(
        "https://byteblog-wfa2.onrender.com/api/users/profile",
        user,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUser(res.data.user);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Error updating profile:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-12 p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-xl relative">
      {loading && (
        <div className="absolute inset-0 bg-white/70 flex items-center justify-center z-50 rounded-2xl">
          <ClipLoader size={50} color="#6366F1" />
        </div>
      )}

      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        My Profile
      </h1>

      <div className="flex flex-col items-center mb-8 space-y-4">
        <div className="relative">
          {user?.profilePicture ? (
            <img
              src={`https://byteblog-wfa2.onrender.com/uploads/${user.profilePicture}`}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-indigo-500 shadow-lg"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-gray-300 flex items-center justify-center text-gray-500 text-2xl font-semibold">
              {user.username?.[0]?.toUpperCase() || "U"}
            </div>
          )}

          <input
            type="file"
            onChange={handleImageChange}
            className="absolute -bottom-2 left-1/2 -translate-x-1/2 opacity-0 w-full h-full cursor-pointer"
          />
        </div>

        <button
          onClick={handleImageUpload}
          className="bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 text-white font-semibold px-6 py-2 rounded-full shadow-md hover:scale-105 transition-transform duration-200"
          disabled={loading}
        >
          {loading ? <ClipLoader size={20} color="white" /> : "Upload Photo"}
        </button>
      </div>

      <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col">
          <label className="mb-1 font-medium text-gray-700">First Name</label>
          <input
            type="text"
            name="firstName"
            value={user.firstName}
            onChange={handleChange}
            className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 font-medium text-gray-700">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={user.lastName}
            onChange={handleChange}
            className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          />
        </div>

        <div className="flex flex-col md:col-span-2">
          <label className="mb-1 font-medium text-gray-700">Username</label>
          <input
            type="text"
            name="username"
            value={user.username}
            onChange={handleChange}
            className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          />
        </div>

        <div className="flex flex-col md:col-span-2">
          <label className="mb-1 font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          />
        </div>

        <div className="flex flex-col md:col-span-2">
          <label className="mb-1 font-medium text-gray-700">Bio</label>
          <textarea
            name="bio"
            value={user.bio}
            onChange={handleChange}
            className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition h-28 resize-none"
          />
        </div>

        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white py-3 rounded-xl font-semibold shadow-md hover:scale-105 transition-transform duration-200"
            disabled={loading}
          >
            {loading ? <ClipLoader size={25} color="white" /> : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfilePage;
