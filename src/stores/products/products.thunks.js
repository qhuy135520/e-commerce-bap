import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAllProductsApi, getProductDetailApi } from "@/services/apiProduct";

export const fetchAllProducts = createAsyncThunk("products/fetchAll", async () => {
  try {
    const data = await fetchAllProductsApi();
    return data;
  } catch (error) {
    throw error;
  }
});

export const getProduct = createAsyncThunk("products/getProductDetail", async (id) => {
  try {
    return await getProductDetailApi(id);
  } catch (error) {
    throw error;
  }
});
