import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createProductWithImages,
  fetchAllProductsApi,
  getProductDetailApi,
  getProductsByVendorApi,
  updateProductVendorApi,
  getAllProductsApi,
} from "@/services/apiProduct";

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

export const createProductVendor = createAsyncThunk("products/createProductVendor", async ({ vendorId, data }) => {
  try {
    return await createProductWithImages(vendorId, data);
  } catch (error) {
    throw error;
  }
});

export const updateProductVendor = createAsyncThunk(
  "products/updateProductVendor",
  async ({ vendorId, productId, dataUpdate }, { dispatch }) => {
    try {
      await updateProductVendorApi(productId, dataUpdate);
      dispatch(fetchProductsByVendor(vendorId));
    } catch (error) {
      throw error;
    }
  }
);
export const getAllProducts = createAsyncThunk("products/getAllProducts", async () => {
  try {
    const data = await getAllProductsApi();
    return data;
  } catch (error) {
    throw error;
  }
});
