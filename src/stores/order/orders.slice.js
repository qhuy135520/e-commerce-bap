import { createSlice } from "@reduxjs/toolkit";

import { createOrder, fetchAllOrder } from "@/stores/order/orders.thunks";

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
        state.items = action.payload;
      })
      .addCase(fetchAllOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      })
      .addCase(createOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      });
  },
});

export default orderSlice.reducer;
