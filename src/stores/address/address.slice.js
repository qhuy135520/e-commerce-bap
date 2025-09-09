import { createSlice } from "@reduxjs/toolkit";

import { fetchAddress } from "@/stores/address/address.thunks";

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
      });
  },
});

export default addressSlice.reducer;
