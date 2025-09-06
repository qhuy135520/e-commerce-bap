import { createSlice } from "@reduxjs/toolkit";
import { fetchAllProducts, getProduct } from "@/stores/products/products.thunks";

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    product: {
      images: [],
    },
    sortType: null,
    sortOrder: null,
    status: "idle",
    error: null,
  },
  reducers: {
    sortByPrice: (state, action) => {
      state.sortType = "price";
      state.sortOrder = action.payload;
    },
    sortBySales: (state, action) => {
      state.sortType = "sales";
      state.sortOrder = action.payload;
    },
    resetSort: (state) => {
      state.sortType = null;
      state.sortOrder = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      })

      //GET ONE PRODUCT DETAIL
      .addCase(getProduct.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.product = action.payload;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      });
  },
});

export const { sortByPrice, sortBySales, resetSort } = productSlice.actions;

export default productSlice.reducer;
