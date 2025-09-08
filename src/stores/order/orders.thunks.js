import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchOrderApi } from "@/services/apiOrder";

export const fetchAllOrder = createAsyncThunk("orders/fetchAllOrder", async (userId) => {
  try {
    return await fetchOrderApi(userId);
  } catch (error) {
    throw error;
  }
});
