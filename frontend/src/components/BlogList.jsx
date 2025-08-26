import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "./BlogCard";
import BlogEditor from "./BlogEditor";
import { Plus } from "lucide-react";

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [showEditor, setShowEditor] = useState(false);
  const [editBlog, setEditBlog] = useState(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get("https://byteblog-wfa2.onrender.com/api/blogs");
      setBlogs(res.data);
    } catch (err) {
      console.error("Error fetching blogs:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this blog?")) return;
    try {
      await axios.delete(`https://byteblog-wfa2.onrender.com/api/blogs/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setBlogs((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      console.error("Error deleting blog:", err);
    }
  };

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch = blog.title.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "All" || blog.category === filter;
    return matchesSearch && matchesFilter;
  });

  const categories = ["All", ...new Set(blogs.map((blog) => blog.category))];

  return (
    <section className="py-10 px-6 max-w-7xl mx-auto space-y-6">
      {/* Header + Search + Add Blog */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-bold text-gray-900">All Posts</h1>
        <div className="flex flex-wrap items-center gap-3">
          <input
            type="text"
            placeholder="Search blogs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 w-64 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          >
            {categories.map((cat, idx) => (
              <option key={idx} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <button
            onClick={() => {
              setEditBlog(null);
              setShowEditor(true);
            }}
            className="flex items-center gap-1 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-2 rounded-lg shadow hover:shadow-lg hover:scale-105 transform transition"
          >
            <Plus className="w-4 h-4" /> Add Blog
          </button>
        </div>
      </div>

      {/* Blog cards (horizontal) */}
      {filteredBlogs.length > 0 ? (
        <div className="flex flex-col gap-6">
          {filteredBlogs.map((blog) => (
            <BlogCard
  key={blog._id}
  blog={blog}
  onEdit={setEditBlog}
  onDelete={handleDelete}
/>

          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20">
          <p className="text-gray-400 text-lg mb-4">No blogs found</p>
          <img
            src="https://img.icons8.com/external-flatart-icons-outline-flatarticons/64/000000/external-empty-folder-file-flatart-icons-outline-flatarticons.png"
            alt="No blogs"
          />
        </div>
      )}

      {/* Blog Editor */}
      {showEditor && (
        <BlogEditor
          onClose={() => {
            setShowEditor(false);
            setEditBlog(null);
            fetchBlogs();
          }}
          editBlog={editBlog}
        />
      )}
    </section>
  );
}
