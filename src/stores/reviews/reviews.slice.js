import { createSlice } from "@reduxjs/toolkit";

import { createReview } from "@/stores/reviews/reviews.thunks";

const initialState = {
  status: "idle",
  error: null,
};

const reviewSlice = createSlice({
  name: "reiviews",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //CREATE REVIEW
      .addCase(createReview.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createReview.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(createReview.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      });
  },
});

export default reviewSlice.reducer;
