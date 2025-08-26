import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';

const AdminUserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('authToken');

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`https://byteblog-wfa2.onrender.com/api/admin/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (err) {
        console.error(err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id, token]);

  if (loading || !user) {
    return (
      <div className="flex justify-center items-center mt-20">
        <ClipLoader size={40} color="blue" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      
      <div className="bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-3xl font-bold mb-4">{user.user.username}</h1>
        <p className="text-gray-600 mb-2">Email: {user.user.email}</p>
        <p className="text-gray-600 mb-2">Role: {user.user.role}</p>
        <p className="text-gray-600 mb-4">Joined: {new Date(user.user.createdAt).toLocaleDateString()}</p>

        <h2 className="text-2xl font-semibold mb-4">Blogs by {user.user.username}</h2>
        {user.blogs.length > 0 ? (
          <ul className="space-y-3">
            {user.blogs.map((blog) => (
              <li key={blog._id} className="p-3 bg-gray-50 rounded-lg shadow hover:shadow-md transition-all">
                <h3 className="font-semibold">{blog.title}</h3>
                <p className="text-gray-500 text-sm">Category: {blog.category}</p>
                <p className="text-gray-400 text-xs">Likes: {blog.likes.length}, Comments: {blog.comments.length}</p>
                <p className="text-gray-400 text-xs">Created: {new Date(blog.createdAt).toLocaleDateString()}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">This user has not posted any blogs yet.</p>
        )}
      </div>
    </div>
  );
};

export default AdminUserDetails;
