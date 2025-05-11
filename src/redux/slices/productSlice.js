import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchSingleProductAPI } from 'api';

export const fetchSingleProduct = createAsyncThunk('product/fetch', async (productId) => {
  return await fetchSingleProductAPI(productId);
});

const productSlice = createSlice({
  name: 'product',
  initialState: { product: {}, status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSingleProduct.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSingleProduct.fulfilled, (state, action) => {
        state.product = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchSingleProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default productSlice.reducer;
