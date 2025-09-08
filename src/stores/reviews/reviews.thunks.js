import { createReviewApi } from "@/services/apiReview";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createReview = createAsyncThunk(
  "reviews/createReview",
  async ({ userId, productId, content, rating, orderDetailId }) => {
    try {
      const data = await createReviewApi({ userId, productId, content, rating, orderDetailId });
      return data;
    } catch (error) {
      throw error;
    }
  }
);
