import { createSlice } from "@reduxjs/toolkit";

import {
  createOrder,
  fetchAllOrder,
  fetchAllOrdersAdmin,
  getOrderVendor,
  updateStatusOrder,
} from "@/stores/order/orders.thunks";

const initialState = {
  items: [],
  orderVendor: [],
  status: "idle",
  error: null,
  allOrders: [],
  filterStatus: "all",
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setStatusFilter: (state, action) => {
      state.filterStatus = action.payload;
    },
  },
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
      })
      .addCase(fetchAllOrdersAdmin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllOrdersAdmin.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allOrders = action.payload;
      })
      .addCase(fetchAllOrdersAdmin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      })
      //GET ORDER VENDOR
      .addCase(getOrderVendor.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getOrderVendor.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orderVendor = action.payload;
      })
      .addCase(getOrderVendor.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      })

      //UPDATE STATUS ORDER VENDOR
      .addCase(updateStatusOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateStatusOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(updateStatusOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      });
  },
});

export const { setStatusFilter } = orderSlice.actions;
export default orderSlice.reducer;
