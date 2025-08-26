import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaTrash, FaEdit, FaThumbsUp } from "react-icons/fa";
import BlogEditor from "./BlogEditor";
import {
  deleteBlog,
  
  fetchBlogById,
  toggleLikeBlog,
  addComment,
} from "../services/api"; // 👈 import your api.js
export default function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [likes, setLikes] = useState(0);
  const [showEditor, setShowEditor] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const fetchBlog = async () => {
    try {
      const res = await fetchBlogById(id);
      setBlog(res.data);
      setLikes(res.data.likes?.length || 0);
      setComments(res.data.comments || []);
    } catch (err) {
      console.error("Error fetching blog:", err);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this blog?")) return;
    try {
      await deleteBlog(blog._id)
      navigate("/");
    } catch (err) {
      console.error("Error deleting blog:", err);
    }
  };

  const toggleLike = async () => {
    try {
      const res = await toggleLikeBlog(id);
      setLikes(res.data.totalLikes);
    } catch (err) {
      console.error("Error liking blog:", err);
    }
  };


  const handleAddComment = async () => {
    if (!comment.trim()) return;
    try {
      const updatedComments = await addComment(id, comment);
      setBlog((prev) => ({ ...prev, comments: updatedComments }));
      setComment("");
    } catch (error) {
      console.error(error);
    }
  };


  if (!blog) return <p className="text-center mt-20">Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <Link
        to="/my-blogs"
        className="text-blue-600 hover:underline mb-6 inline-block"
      >
        ← Back to All Posts
      </Link>

      {/* Blog Title */}
      {/* Blog Title */}
      <h1 className="text-5xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4">
        {blog.title}
      </h1>
      <div className="mb-12 flex flex-col md:flex-row md:items-start gap-10 p-6  ">
  {/* Blog Image */}
  <div className="relative w-full md:w-1/2 overflow-hidden rounded-2xl">
    <img
      src={
        blog.imageURL?.startsWith("http")
          ? blog.imageURL
          : `https://byteblog-wfa2.onrender.com${blog.imageURL}`
      }
      alt={blog.title}
      className="w-full h-96 object-cover rounded-2xl transform hover:scale-105 transition duration-500 ease-in-out"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-2xl" />
  </div>

  {/* Blog Info + Actions */}
  <div className="flex flex-col justify-between gap-6 w-full md:w-1/2">
    <div className="space-y-4">
      {/* Category */}
      <div className="flex items-center gap-3">
        <span className="text-gray-600 font-medium">Category:</span>
        <span className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full text-sm font-semibold shadow-md">
          {blog.category}
        </span>
      </div>

      {/* Author */}
      <div className="flex items-center gap-3">
        <span className="text-gray-600 font-medium">Author:</span>
        <span className="flex items-center gap-2">
          
          <span className="font-semibold text-gray-800">
            {blog.author?.username || "Unknown"}
          </span>
        </span>
      </div>

      {/* Date */}
      <div className="flex items-center gap-3">
        <span className="text-gray-600 font-medium">Uploaded:</span>
        <span className="px-2 py-1 bg-gray-100 rounded-md text-gray-700 shadow-sm">
          {new Date(blog.createdAt).toLocaleDateString()}
        </span>
      </div>
    </div>

    {/* Action Buttons */}
    <div className="flex gap-4 mt-4">
      <button
        onClick={toggleLike}
        className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/80 backdrop-blur-md shadow-md hover:shadow-lg hover:bg-white text-indigo-600 font-medium transition"
      >
        <FaThumbsUp /> {likes}
      </button>
      <button
        onClick={handleDelete}
        className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-red-50 text-red-600 shadow-md hover:bg-red-100 hover:shadow-lg font-medium transition"
      >
        <FaTrash /> Delete
      </button>
      <button
        onClick={() => setShowEditor(true)}
        className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-50 text-blue-600 shadow-md hover:bg-blue-100 hover:shadow-lg font-medium transition"
      >
        <FaEdit /> Edit
      </button>
    </div>
  </div>
</div>

      {/* Meta Info */}

      {/* Blog Image */}


      {/* Action Buttons */}


      {/* Blog Content */}
      <div
        className="prose prose-lg max-w-none mb-12 text-gray-800 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />


      {/* Comment Section */}
      <div className="border-t pt-6">
        <h3 className="text-xl font-semibold mb-4">Comments</h3>

        {/* Comment Input */}
        <div className="flex gap-4 mb-6">
          <textarea
            value={comment}
            rows={1}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your comment..."
            className="w-full peer border border-gray-300 rounded-2xl bg-white/70 backdrop-blur-md shadow-sm p-4 text-sm resize-none focus:border-blue-500 focus:ring-2 focus:ring-blue-400 outline-none transition-all"
          />
          <button
            onClick={handleAddComment}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-3 rounded-2xl shadow-md hover:scale-105 hover:from-blue-700 hover:to-indigo-700 transition-all duration-200"
          >
            Post
          </button>
        </div>

        {/* Comment List */}
        {blog.comments.length > 0 ? (
          blog.comments.map((c) => (
            <div
              key={c._id}
              className="bg-gradient-to-r from-indigo-50 via-white to-indigo-50 shadow-md rounded-xl p-4 mb-4 border border-gray-200 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-2">

                <div>
                  <p className="font-semibold text-gray-800">{c.user?.username}</p>
                  <span className="text-xs text-gray-500">
                    {new Date(c.createdAt).toLocaleString()}
                  </span>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">{c.text}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 italic text-center mt-4">
            No comments yet. Be the first to comment!
          </p>
        )}


      </div>

      {/* Blog Editor (Edit Mode) */}
      {showEditor && (
        <BlogEditor
          onClose={() => {
            setShowEditor(false);
            fetchBlog();
          }}
          editBlog={blog}
        />
      )}
    </div>
  );
}
