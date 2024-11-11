import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchItems = createAsyncThunk('items/fetchItems', async () => {
  const response = await fetch('https://645b030265bd868e9328a7a2.mockapi.io/Cau1');
  
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const data = await response.json();
  return data;
});

// Thêm reducer để thêm item vào store
export const addItem = (item) => {
  return {
    type: 'items/addItem',
    payload: item,
  };
};

const itemSlice = createSlice({
  name: 'items',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload); // Thêm item vào mảng items
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default itemSlice.reducer;
