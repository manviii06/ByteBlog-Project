// SingleBlog.jsx
import React, { useEffect, useState } from "react";
import { Calendar, User, Eye } from "lucide-react";
import { useParams } from "react-router-dom";
import axios from "axios";

const SingleBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/blogs/blogs/${id}`)
      .then(res => setBlog(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!blog) {
    return <p className="text-center mt-10">Loading blog...</p>;
  }

  return (
    <section className="py-10 px-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">{blog.title}</h1>
      <div className="flex items-center gap-6 text-sm text-gray-600 mb-6">
        <span className="flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          {new Date(blog.createdAt).toLocaleDateString()}
        </span>
        <span className="flex items-center gap-1">
          <User className="w-4 h-4" />
          {blog.author?.name || "Unknown"}
        </span>
        <span className="flex items-center gap-1">
          <Eye className="w-4 h-4" />
          {blog.views}
        </span>
      </div>
      {blog.imageURL && (
        <img
          src={blog.imageURL}
          alt={blog.title}
          className="rounded-lg shadow mb-6 w-full"
        />
      )}
      <div className="prose max-w-none text-gray-700 leading-relaxed">
        {blog.content}
      </div>
    </section>
  );
};

export default SingleBlog;
