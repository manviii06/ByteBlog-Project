import React from "react";
import { Link } from "react-router-dom";
import { Eye, Heart, MessageCircle } from "lucide-react";

const BlogCard = ({ blog }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-transform transform hover:scale-[1.02] overflow-hidden flex flex-col md:flex-row cursor-pointer">
      {/* Image */}
      {blog.imageURL && (
        <Link to={`/blog/${blog._id}`} className="flex-shrink-0 w-full md:w-48 h-48 md:h-auto">
          <img
            src={
              blog.imageURL.startsWith("http")
                ? blog.imageURL
                : `https://byteblog-wfa2.onrender.com${blog.imageURL}`
            }
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        </Link>
      )}

      {/* Content */}
      <div className="p-5 flex flex-col justify-between flex-grow">
        <Link to={`/blog/${blog._id}`} className="flex-1">
          {/* Title */}
          <h2 className="text-xl font-bold mb-2 text-gray-900 hover:text-indigo-600 transition">
            {blog.title}
          </h2>

          {/* Excerpt */}
          <div
            className="text-gray-700 text-sm mb-4 line-clamp-4"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          {/* Author & Date */}
          <div className="flex items-center gap-3 text-gray-500 text-sm mb-3">
            <div className="w-7 h-7 rounded-full bg-gray-300 flex items-center justify-center text-xs text-white">
              {blog.author?.username?.[0]?.toUpperCase() || "U"}
            </div>
            <span>{blog.author?.username || "Unknown"}</span>
            <span className="text-gray-400">•</span>
            <span>{new Date(blog.createdAt).toLocaleDateString(undefined, { month: "short", day: "numeric" })}</span>
          </div>
        </Link>

        {/* Footer stats */}
        <div className="flex items-center justify-between text-gray-500 text-sm mt-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1"><Eye className="w-4 h-4" /> {blog.views}</span>
            <span className="flex items-center gap-1"><Heart className="w-4 h-4 text-red-500" /> {blog.likes?.length || 0}</span>
            <span className="flex items-center gap-1"><MessageCircle className="w-4 h-4" /> {blog.comments?.length || 0}</span>
          </div>
          <Link
            to={`/blogs/${blog._id}`}
            className="text-indigo-600 font-semibold hover:underline"
          >
            Read More →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
