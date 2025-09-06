import { createSlice } from "@reduxjs/toolkit";
import { fetchAllProducts, getProduct, fetchProductsByVendor } from "@/stores/products/products.thunks";

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    product: {
      images: [],
    },
    productsVendor: [],
    status: "idle",
    error: null,
    searchTerm: "",
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
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
        state.error = action.error;
      })
      .addCase(fetchProductsByVendor.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProductsByVendor.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.productsVendor = action.payload;
      })
      .addCase(fetchProductsByVendor.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      });
  },
});

export const { sortByPrice, sortBySales, resetSort, setSearchTerm } = productSlice.actions;

export default productSlice.reducer;
