








import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import BlogCard from './BlogCard';
import BlogEditor from './BlogEditor';

export default function BlogList() {
  const blogs = useSelector((state) => state.blogs);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [showEditor, setShowEditor] = useState(false);
  const [editBlog, setEditBlog] = useState(null);

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch = blog.title.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'All' || blog.category === filter;
    return matchesSearch && matchesFilter;
  });

  const categories = ['All', ...new Set(blogs.map((blog) => blog.category))];

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between mb-6 gap-3">
        <h1 className="text-2xl font-bold">All Posts</h1>
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-2 rounded w-80"
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border p-2 rounded"
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
            className="bg-black text-white px-4 py-2 rounded"
          >
            + Add Blog
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBlogs.length ? (
          filteredBlogs.map((blog) => (
            <BlogCard
              key={blog.id}
              blog={blog}
              onEdit={() => {
                setEditBlog(blog);
                setShowEditor(true);
              }}
            />
          ))
        ) : (
          <p className="text-gray-500">No blogs found</p>
        )}
      </div>

      {showEditor && (
        <BlogEditor onClose={() => setShowEditor(false)} editBlog={editBlog} />
      )}
    </div>
  );
}
