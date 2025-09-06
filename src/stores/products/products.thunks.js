import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAllProductsApi, getProductsByVendorApi } from "@/services/apiProduct";

export const fetchAllProducts = createAsyncThunk("products/fetchAll", async (vendorId = null) => {
  try {
    let data;
    if (vendorId) {
      data = await getProductsByVendorApi(vendorId);
      return data;
    } else {
      data = await fetchAllProductsApi();
      return data;
    }
  } catch (error) {
    throw error;
  }
});
