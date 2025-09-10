import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCategoryApi } from "@/services/apiCategory";

export const fetchCategory = createAsyncThunk("category/fetchCategory", async () => {
  try {
    return await fetchCategoryApi();
  } catch (error) {
    throw error;
  }
});
