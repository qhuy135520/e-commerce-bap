import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAllProductsApi } from "@/services/apiProduct";

export const fetchAllProducts = createAsyncThunk("products/fetchAll", async () => {
  try {
    const data = await fetchAllProductsApi();
    return data;
  } catch (error) {
    throw error;
  }
});
