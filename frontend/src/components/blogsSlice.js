
import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    addBlog: (state, action) => {
      state.push({
        id: uuidv4(),
        ...action.payload,
        date: new Date().toISOString().split('T')[0],
        comments: [],
      });
    },
    editBlog: (state, action) => {
      const index = state.findIndex((blog) => blog.id === action.payload.id);
      if (index !== -1) {
        state[index] = {
          ...action.payload,
          comments: Array.isArray(action.payload.comments)
            ? action.payload.comments
            : [],
        };
      }
    },
    deleteBlog: (state, action) => {
      return state.filter((blog) => blog.id !== action.payload);
    },
    addComment: (state, action) => {
      const { blogId, name, text } = action.payload;
      const blog = state.find((b) => b.id === blogId);
      if (blog) {
        if (!Array.isArray(blog.comments)) {
          blog.comments = [];
        }
        blog.comments.push({
          id: uuidv4(),
          name,
          text,
          date: new Date().toISOString(),
        });
      }
    },
  },
});

export const { addBlog, editBlog, deleteBlog, addComment } = blogsSlice.actions;
export default blogsSlice.reducer;












