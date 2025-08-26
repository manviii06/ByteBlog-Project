import React, { useEffect, useState } from "react";
import { Eye, Heart, MessageCircle } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SearchFilterBar from "../components/SearchFilterBar";

const BlogCard = ({ post }) => {
  const navigate = useNavigate();

  return (
    <article
      className="flex flex-col md:flex-row bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 cursor-pointer"
      onClick={() => navigate(`/all-blogs/${post._id}`)}
    >
      {/* Thumbnail */}
      {post.imageURL && (
        <div className="w-full md:w-48 h-48 md:h-auto flex-shrink-0">
          <img
            src={post.imageURL.startsWith("http") ? post.imageURL : `https://byteblog-wfa2.onrender.com${post.imageURL}`}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Content */}
      <div className="p-4 flex flex-col justify-between flex-grow">
        {/* Top badges */}
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-semibold text-indigo-600 bg-indigo-100 px-2 py-1 rounded-full">
            {post.category || "General"}
          </span>
          {post.featured && (
            <span className="text-xs font-semibold text-yellow-700 bg-yellow-100 px-2 py-1 rounded-full">
              Featured
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 hover:text-indigo-600 transition">
          {post.title}
        </h3>

        {/* Author & Date */}
        <div className="flex items-center gap-3 text-gray-500 text-sm mb-3">
          {post.author?.profilePicture ? (
            <img
              src={`https://byteblog-wfa2.onrender.com/${post.author.profilePicture}`}
              alt={post.author.username}
              className="w-7 h-7 rounded-full object-cover"
            />
          ) : (
            <div className="w-7 h-7 rounded-full bg-gray-300 flex items-center justify-center text-xs text-white">
              {post.author?.username?.[0]?.toUpperCase() || "U"}
            </div>
          )}
          <span>{post.author?.username || "Unknown"}</span>
          <span className="text-gray-400">•</span>
          <span>
            {new Date(post.createdAt).toLocaleDateString(undefined, {
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>

        {/* Content preview */}
        <p
          className="text-gray-600 text-sm mb-4 line-clamp-4"
          dangerouslySetInnerHTML={{ __html: post.content.slice(0, 180) + "..." }}
        />

        {/* Footer stats */}
        <div className="flex items-center gap-6 text-gray-500 text-sm justify-between">
          <div className="flex items-center gap-1">
            <Eye className="w-4 h-4" /> {post.views}
          </div>
          <div className="flex items-center gap-1">
            <Heart className="w-4 h-4 text-red-500" /> {post.likes?.length || 0}
          </div>
          <div className="flex items-center gap-1">
            <MessageCircle className="w-4 h-4" /> {post.comments?.length || 0}
          </div>
          <span
            className="text-indigo-600 font-semibold hover:underline"
          >
            Read More →
          </span>
        </div>
      </div>
    </article>
  );
};

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);

  useEffect(() => {
    axios
      .get("https://byteblog-wfa2.onrender.com/api/blogs/blogs")
      .then((res) => {
        setBlogs(res.data);
        setFilteredBlogs(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleFilterChange = ({ search, category, sortBy, minViews, onlyMostLiked }) => {
    let filtered = [...blogs];

    if (search) {
      filtered = filtered.filter(
        (b) =>
          b.title.toLowerCase().includes(search.toLowerCase()) ||
          b.content.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category) filtered = filtered.filter((b) => b.category === category);
    if (minViews) filtered = filtered.filter((b) => b.views >= Number(minViews));
    if (onlyMostLiked) {
      const maxLikes = Math.max(...filtered.map((b) => b.likes?.length || 0));
      filtered = filtered.filter((b) => (b.likes?.length || 0) === maxLikes);
    }

    if (sortBy === "latest") filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    else if (sortBy === "views") filtered.sort((a, b) => b.views - a.views);
    else if (sortBy === "likes") filtered.sort((a, b) => (b.likes?.length || 0) - (a.likes?.length || 0));

    setFilteredBlogs(filtered);
  };

  return (
    <section className="py-10 px-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">All Blogs</h1>

      <SearchFilterBar
        onFilterChange={handleFilterChange}
        categories={[...new Set(blogs.map((b) => b.category).filter(Boolean))]}
      />

      <div className="grid md:grid-row gap-8 mt-6">
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog) => <BlogCard key={blog._id} post={blog} />)
        ) : (
          <p className="text-gray-500">No blogs found</p>
        )}
      </div>
    </section>
  );
};

export default AllBlogs;
