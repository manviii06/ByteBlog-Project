

import React from "react";
import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col justify-between">
      <Link to={`/blog/${blog.id}`}>
        {blog.image && (
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-48 object-cover rounded"
          />
        )}
        <h2 className="text-lg font-bold mb-2 line-clamp-1">{blog.title}</h2>
        <div
          className="text-gray-700 text-sm mb-3 line-clamp-3"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </Link>

      <div className="mt-auto flex justify-end items-center border-t pt-3">
        <Link
          to={`/blog/${blog.id}`}
          className="text-blue-500 hover:underline text-sm"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
