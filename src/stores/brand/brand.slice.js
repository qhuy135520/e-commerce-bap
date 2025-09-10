import { fetchAllBrand } from "@/stores/brand/brand.thunks";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  status: "idle",
  error: null,
};

const brandSlice = createSlice({
  name: "brand",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllBrand.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllBrand.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchAllBrand.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default brandSlice.reducer;
