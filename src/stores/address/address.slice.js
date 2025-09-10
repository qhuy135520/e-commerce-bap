import { createSlice } from "@reduxjs/toolkit";

import {
  addAddress,
  fetchAddress,
  removeAddress,
  updateAddress,
  updateDefaultAddress,
} from "@/stores/address/address.thunks";

const initialState = {
  items: [],
  status: "idle",
  error: null,
};

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddress.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchAddress.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      })
      .addCase(addAddress.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addAddress.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(addAddress.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      })
      .addCase(updateAddress.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateAddress.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(updateAddress.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      })
      .addCase(updateDefaultAddress.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateDefaultAddress.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(updateDefaultAddress.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      })
      .addCase(removeAddress.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeAddress.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(removeAddress.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      });
  },
});

export default addressSlice.reducer;
