// AllBlogs.jsx
import React, { useEffect, useState } from "react";
import { Calendar, User, Eye, ArrowRight } from "lucide-react";
import axios from "axios";
import { Link } from "react-router-dom";
import SearchFilterBar from "../components/SearchFilterBar";

const BlogCard = ({ post }) => {
  return (
    <article className="flex bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
      {/* Thumbnail */}
      {post.image && (
        <div className="w-40 h-40 flex-shrink-0">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Content */}
      <div className="p-4 flex flex-col justify-between flex-grow">
        {/* Top meta */}
        <div className="text-sm text-gray-500 mb-1">
          In <span className="font-medium">{post.category || "General"}</span> by{" "}
          <span className="font-medium">{post.author?.name || "Unknown"}</span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 leading-snug mb-1">
          <Link to={`/blogs/${post._id}`} className="hover:underline">
            {post.title}
          </Link>
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-3">
          {post.content.slice(0, 100)}...
        </p>

        {/* Footer info */}
        <div className="flex items-center text-gray-500 text-xs gap-4">
          <span>★ {post.featured ? "Featured" : ""}</span>
          <span>
            {new Date(post.createdAt).toLocaleDateString(undefined, {
              month: "short",
              day: "numeric",
            })}
          </span>
          <span className="flex items-center gap-1">
            <Eye className="w-3 h-3" />
            {post.views}
          </span>
          <span className="flex items-center gap-1">
            💬 {post.comments?.length || 0}
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
    axios.get("http://localhost:5000/api/blogs/blogs")
      .then(res => setBlogs(res.data))
      .catch(err => console.error(err));
  }, []);


   const handleFilterChange = ({ search, category, sortBy, minViews, onlyMostLiked }) => {
    let filtered = [...blogs];

    // Search by title or content
    if (search) {
      filtered = filtered.filter(
        (b) =>
          b.title.toLowerCase().includes(search.toLowerCase()) ||
          b.content.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filter by category
    if (category) {
      filtered = filtered.filter((b) => b.category === category);
    }
    
  // Min Views
  if (minViews) {
    filtered = filtered.filter((b) => b.views >= Number(minViews));
  }

  // Most Liked toggle
  if (onlyMostLiked) {
    const maxLikes = Math.max(...filtered.map((b) => b.likes.length));
    filtered = filtered.filter((b) => b.likes.length === maxLikes);
  }
    // Sort
    if (sortBy === "latest") {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortBy === "views") {
      filtered.sort((a, b) => b.views - a.views);
    } else if (sortBy === "likes") {
      filtered.sort((a, b) => b.likes.length - a.likes.length);
    }

    setFilteredBlogs(filtered);
  };

  return (
    <section className="py-10 px-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">All Blogs</h1>
       <SearchFilterBar
        onFilterChange={handleFilterChange}
        categories={[...new Set(blogs.map((b) => b.category).filter(Boolean))]}
      />
      <div className="grid md:grid-row gap-8">
        {filteredBlogs.map(blog => (
          <BlogCard key={blog._id} post={blog} />
        ))}
      </div>
    </section>
  );
};

export default AllBlogs;
