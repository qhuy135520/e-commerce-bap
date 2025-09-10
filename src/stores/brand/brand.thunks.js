import { fetchBrandApi } from '@/services/apiBrand';
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAllBrand = createAsyncThunk("brand/fetchAllBrand", async () => {
  try {
    return await fetchBrandApi();
  } catch (error) {
    throw error;
  }
});
