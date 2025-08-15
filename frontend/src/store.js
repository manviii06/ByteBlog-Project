
import { configureStore } from '@reduxjs/toolkit';
import blogsReducer from './components/blogsSlice';

const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('blogData');
    return serializedState ? JSON.parse(serializedState) : [];
  } catch (e) {
    console.error('Could not load from localStorage', e);
    return [];
  }
};

const saveToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state.blogs);
    localStorage.setItem('blogData', serializedState);
  } catch (e) {
    console.error('Could not save to localStorage', e);
  }
};

const store = configureStore({
  reducer: {
    blogs: blogsReducer,
  },
  preloadedState: {
    blogs: loadFromLocalStorage(),
  },
});

store.subscribe(() => {
  saveToLocalStorage(store.getState());
});

export default store;


















