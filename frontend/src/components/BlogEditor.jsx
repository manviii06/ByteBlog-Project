import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addBlog, editBlog } from './blogsSlice';
import { Editor } from '@tinymce/tinymce-react';

export default function BlogEditor({ onClose, editBlog: blog }) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(blog?.title || '');
  const [category, setCategory] = useState(blog?.category || '');
  const [image, setImage] = useState(blog?.image || '');
  const [content, setContent] = useState(blog?.content || '');

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (blog) {
      dispatch(editBlog({ ...blog, title, category, image, content }));
    } else {
      dispatch(addBlog({ title, category, image, content }));
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-2/3 max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">{blog ? 'Edit Blog' : 'Add Blog'}</h2>

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

        <input type="file" accept="image/*" onChange={handleImageUpload} className="mb-4" />

        {image && <img src={image} alt="Preview" className="w-full h-40 object-cover mb-4 rounded" />}

        <Editor
          apiKey="bw5ykmln1losfs3128y2n2pzzwpv5i447r9lcugobcqxsm64"
          value={content}
          init={{
            height: 300,
            menubar: false,
            plugins: 'link image code lists',
            toolbar:
              'undo redo | formatselect | bold italic underline | ' +
              'alignleft aligncenter alignright | bullist numlist | link image | code',
          }}
          onEditorChange={(newContent) => setContent(newContent)}
        />

        <div className="flex justify-end gap-4 mt-4">
          <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
          <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded">
            {blog ? 'Update' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  );
}
