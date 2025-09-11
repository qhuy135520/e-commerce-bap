import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createProductWithImages,
  fetchAllProductsApi,
  getProductDetailApi,
  getProductsByVendorApi,
  updateProductDetailApi,
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

export const updateStockProduct = createAsyncThunk(
  "products/updateStockProduct",
  async ({ productId, quantity }, { dispatch }) => {
    try {
      debugger;
      const productDetail = await getProductDetailApi(productId);

      if (!productDetail) throw new Error("Product not found!");

      if (productDetail.stock < quantity) {
        throw new Error("This product is temporarily out of stock!");
      }

      await updateProductDetailApi(productId, { stock: productDetail.stock - quantity });

      dispatch(fetchAllProducts());
    } catch (error) {
      throw error;
    }
  }
);

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
