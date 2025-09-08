import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAllProductsApi, getProductDetailApi, getProductsByVendorApi } from "@/services/apiProduct";

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

export const fetchProductsByVendor = createAsyncThunk("products/fetchByVendor", async (vendorId) => {
  try {
    const data = await getProductsByVendorApi(vendorId);
    return data;
  } catch (error) {
    throw error;
  }
});
