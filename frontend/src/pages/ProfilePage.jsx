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
        if (!token) {
          console.error("No token found! Please log in first.");
          setLoading(false);
          return;
        }

        const res = await axios.get("http://localhost:5000/api/users/profile", {
    
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

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleImageUpload = async () => {
    if (!image) return alert("Please select an image first!");
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("profilePicture", image);

      const token = localStorage.getItem("authToken");
      const res = await axios.post(
        "http://localhost:5000/api/users/upload",
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
        "http://localhost:5000/api/users/profile",
        user,
        {
          
          headers: { Authorization: `Bearer ${token}` },
        }
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
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-6 mt-10 relative">
      <h1 className="text-2xl font-bold mb-4 text-center">My Profile</h1>

      {loading && (
        <div className="absolute inset-0 bg-white/70 flex items-center justify-center z-50">
          <ClipLoader size={40} color="blue" />
        </div>
      )}

      <div className="mb-4 text-center">
        {user?.profilePicture ? (
          <img
            
            src={`http://localhost:5000/uploads/${user.profilePicture}`}
            alt="Profile"
            className="w-32 h-32 mx-auto rounded-full object-cover mb-2"
          />
        ) : (
          <div className="w-32 h-32 mx-auto rounded-full bg-gray-200 mb-2"></div>
        )}

        <input type="file" onChange={handleImageChange} className="mt-2" />
        <button
          onClick={handleImageUpload}
          className="bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 
             text-white font-semibold px-3 py-2 rounded text-lg mt-2"
          disabled={loading}
        >
          {loading ? <ClipLoader size={20} color="white" /> : "Upload Photo"}
        </button>
      </div>

      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">First Name</label>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={user.firstName}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Last Name</label>
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={user.lastName}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Username</label>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={user.username}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={user.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Bio</label>
          <textarea
            name="bio"
            placeholder="Bio"
            value={user.bio}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold"
          disabled={loading}
        >
          {loading ? <ClipLoader size={25} color="white" /> : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;
