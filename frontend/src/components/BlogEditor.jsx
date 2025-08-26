import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { createBlog, updateBlog } from "../services/api"; // ✅ use your centralized API

export default function BlogEditor({ onClose, editBlog }) {
  const [title, setTitle] = useState(editBlog?.title || "");
  const [category, setCategory] = useState(editBlog?.category || "");
  const [imageFile, setImageFile] = useState(null);
  const [content, setContent] = useState(editBlog?.content || "");

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("category", category);
      formData.append("content", content);

      if (imageFile) {
        formData.append("image", imageFile);
      }

      if (editBlog) {
        await updateBlog(editBlog._id, formData);
      } else {
        await createBlog(formData);
      }

      onClose();
    } catch (err) {
      console.error("Error saving blog:", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-2/3 max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">
          {editBlog ? "Edit Blog" : "Add Blog"}
        </h2>

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 w-full mb-4"
        />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 w-full mb-4"
        />

        {/* 🔹 File Upload */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="border p-2 w-full mb-4"
        />
        {imageFile && (
          <img
            src={URL.createObjectURL(imageFile)}
            alt="Preview"
            className="w-32 h-32 object-cover mb-4 rounded"
          />
        )}

        <Editor
          apiKey="bw5ykmln1losfs3128y2n2pzzwpv5i447r9lcugobcqxsm64"
          value={content}
          init={{
            height: 300,
            menubar: false,
            plugins: "link image code lists",
            toolbar:
              "undo redo | formatselect | bold italic underline | " +
              "alignleft aligncenter alignright | bullist numlist | link image | code",
          }}
          onEditorChange={(newContent) => setContent(newContent)}
        />

        <div className="flex justify-end gap-4 mt-4">
          <button
            onClick={onClose}
            className="bg-gray-300 px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {editBlog ? "Update" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}
