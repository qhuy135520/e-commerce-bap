import { createSlice } from "@reduxjs/toolkit";
import {
  fetchAllProducts,
  getProduct,
  fetchProductsByVendor,
  createProductVendor,
  updateProductVendor,
  getAllProducts,
  updateStockProduct,
} from "@/stores/products/products.thunks";

const productSlice = createSlice({
  name: "products",
  initialState: {
    allProducts: [],
    products: [],
    product: {
      images: [],
      reviews: [],
    },
    productsVendor: [],
    status: "idle",
    error: null,
    searchTerm: "",
    filterCategory: "all",
    filterBrand: "all",
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setFilterCategory: (state, action) => {
      state.filterCategory = action.payload;
    },
    setFilterBrand: (state, action) => {
      state.filterBrand = action.payload;
    },
    resetSortVendor: (state) => {
      state.products = state.productsVendor;
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
      })

      //CREATE PRODUCT
      .addCase(createProductVendor.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createProductVendor.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(createProductVendor.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      })
      .addCase(updateStockProduct.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateStockProduct.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(updateStockProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      })

      //UPDATE PRODUCT VENDOR
      .addCase(updateProductVendor.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateProductVendor.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(updateProductVendor.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      })
      .addCase(getAllProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allProducts = action.payload;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      });
  },
});

export const { setSearchTerm, setFilterCategory, setFilterBrand } = productSlice.actions;

export default productSlice.reducer;
