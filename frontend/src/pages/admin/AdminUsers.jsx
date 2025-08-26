import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEnvelope, FaUser, FaUserShield, FaRegCalendarAlt } from 'react-icons/fa';
import { ClipLoader } from 'react-spinners';
import { Link } from 'react-router-dom';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('authToken'); // admin token

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await axios.get('https://byteblog-wfa2.onrender.com/api/admin/users', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(res.data.users);
      } catch (err) {
        console.error(err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [token]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
        Users Management
      </h1>

      {loading ? (
        <div className="flex justify-center items-center mt-20">
          <ClipLoader size={40} color="blue" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {users.map((user) => (
            <div key={user._id} className="bg-white shadow-lg rounded-xl p-5 hover:shadow-2xl transition-all">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                  {user.profilePicture ? (
                    <img
                      src={`https://byteblog-wfa2.onrender.com/uploads/${user.profilePicture}`}
                      alt={user.username}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <FaUser className="text-gray-400 text-3xl" />
                  )}
                </div>
                <div>
                  <h2 className="text-xl font-semibold">{user.username}</h2>
                  <p className="text-gray-500">{user.email}</p>
                  <p className="text-sm text-gray-400">{user.role.toUpperCase()}</p>
                </div>
              </div>
              <div className="mt-4 space-y-1">
                <p><FaUserShield className="inline mr-2 text-indigo-500" /> Role: {user.role}</p>
                <p><FaEnvelope className="inline mr-2 text-green-500" /> Email: {user.email}</p>
                <p><FaRegCalendarAlt className="inline mr-2 text-purple-500" /> Joined: {new Date(user.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="mt-4 flex justify-end">
                <Link
                  to={`/admin/admin-users/${user._id}`}
                  className="bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:scale-105 transition-all"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
