import { configureStore } from '@reduxjs/toolkit';
import itemReducer from './itemSlide';

const store = configureStore({
  reducer: {
    items: itemReducer,
  },
});

export default store;
