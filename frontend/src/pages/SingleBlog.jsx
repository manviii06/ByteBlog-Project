import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { fetchBlogById, toggleLikeBlog, addComment } from "../services/api";

const SingleBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [comment, setComment] = useState("");

  const token = localStorage.getItem("authToken"); // Check if user is logged in
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    getBlog();
  }, [id]);

  const getBlog = async () => {
    try {
      const res = await fetchBlogById(id);
      const blogData = res.data;
      setBlog(blogData);
      setLikes(blogData.likes?.length || 0);
      setLiked(blogData.likes?.includes(userId));
    } catch (err) {
      console.error(err);
    }
  };

  const handleLike = async () => {
    if (!token) return alert("You must be logged in to like a blog!");
    try {
      await toggleLikeBlog(id);
      getBlog();
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!token) return alert("You must be logged in to comment!");
    if (!comment.trim()) return;

    try {
      await addComment(id, comment);
      setComment("");
      getBlog();
    } catch (err) {
      console.error(err);
    }
  };

  if (!blog) return <p className="text-center mt-20">Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Blog Title */}
      <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-8">
        {blog.title}
      </h1>

      {/* Image + Info */}
      <div className="flex flex-col md:flex-row gap-10 mb-10">
        {blog.imageURL && (
          <div className="relative w-full md:w-1/2 rounded-2xl overflow-hidden shadow-lg">
            <img
              src={
                blog.imageURL.startsWith("http")
                  ? blog.imageURL
                  : `https://byteblog-wfa2.onrender.com${blog.imageURL}`
              }
              alt={blog.title}
              className="w-full h-96 object-cover transform hover:scale-105 transition duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </div>
        )}

        <div className="flex flex-col justify-between w-full md:w-1/2">
          <div className="space-y-4">
            <div>
              <span className="text-gray-600 font-medium">Category:</span>
              <span className="ml-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full font-semibold text-sm shadow-md">
                {blog.category}
              </span>
            </div>

            <div>
              <span className="text-gray-600 font-medium">Author:</span>
              <span className="ml-2 font-semibold text-gray-800">
                {blog.author?.username || "Unknown"}
              </span>
            </div>

            <div>
              <span className="text-gray-600 font-medium">Uploaded:</span>
              <span className="ml-2 px-2 py-1 bg-gray-100 rounded-md text-gray-700 shadow-sm">
                {new Date(blog.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>

          {/* Like Button */}
          <button
            onClick={handleLike}
            className={`flex items-center gap-2 mt-6 px-5 py-2.5 rounded-full shadow-md font-medium transition ${
              liked
                ? "bg-red-500 text-white hover:bg-red-600"
                : "bg-white/80 text-indigo-600 backdrop-blur-md hover:shadow-lg"
            }`}
          >
            <FaHeart /> {likes}
          </button>
        </div>
      </div>

      {/* Blog Content */}
      <div
        className="prose prose-lg max-w-none text-gray-800 leading-relaxed mb-12"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />

      {/* Comments */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">Comments</h2>
        <form onSubmit={handleAddComment} className="flex gap-3 mb-6">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment..."
            className="flex-1 border border-gray-300 rounded-2xl bg-white/70 backdrop-blur-md shadow-sm p-4 text-sm resize-none focus:border-blue-500 focus:ring-2 focus:ring-blue-400 outline-none transition-all"
            rows={1}
            disabled={!token}
          />
          <button
            type="submit"
            className={`px-5 py-3 rounded-2xl shadow-md text-white bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-200 ${
              !token ? "opacity-50 cursor-not-allowed" : "hover:scale-105 hover:from-blue-700 hover:to-indigo-700"
            }`}
            disabled={!token}
          >
            Post
          </button>
        </form>

        <div className="space-y-4">
          {blog.comments?.length > 0 ? (
            blog.comments.map((c, i) => (
              <div
                key={i}
                className="bg-gradient-to-r from-indigo-50 via-white to-indigo-50 shadow-md rounded-xl p-4 hover:shadow-lg transition-all duration-300"
              >
                
                <p className="text-gray-700 leading-relaxed">{c.text}</p>
                <p className="text-xs text-gray-500">{new Date(c.createdAt).toLocaleString()}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 italic text-center mt-4">
              No comments yet. Be the first to comment!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleBlog;
