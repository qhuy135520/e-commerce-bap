import { fetchAllOrder } from '@/stores/order/orders.thunks';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  status: "idle",
  error: null,
};


const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //FETCH ORDER
      .addCase(fetchAllOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload
      })
      .addCase(fetchAllOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default orderSlice.reducer;
