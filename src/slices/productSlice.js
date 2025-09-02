import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "../services/supabase";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const { data: products, error: productsError } = await supabase
      .from("product")
      .select("*");
    if (productsError) throw new Error(productsError.message);

    const { data: images, error: imagesError } = await supabase
      .from("productImage")
      .select("productId, imageUrl");
    if (imagesError) throw new Error(imagesError.message);

    const productsWithImages = products.map((product) => {
      const productImage = images.find((img) => img.productId === product.id);
      return {
        ...product,
        image_url: productImage ? productImage.imageUrl : null,
      };
    });

    return productsWithImages;
  }
);

export const fetchProductSales = createAsyncThunk(
  "products/fetchProductSales",
  async () => {
    const { data: orderDetails, error: orderError } = await supabase
      .from("orderDetail")
      .select("productId, quantity");
    if (orderError) throw new Error(orderError.message);

    const salesMap = {};
    orderDetails.forEach((od) => {
      if (!salesMap[od.productId]) {
        salesMap[od.productId] = 0;
      }
      salesMap[od.productId] += od.quantity;
    });
    return salesMap;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    sales: {},
    status: "idle",
    error: null,
  },
  reducers: {
    sortProductsBySales: (state) => {
      state.products.sort(
        (a, b) => (state.sales[b.id] || 0) - (state.sales[a.id] || 0)
      );
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchProductSales.fulfilled, (state, action) => {
        state.sales = action.payload;
      });
  },
});

export const { sortProductsBySales } = productSlice.actions;
export default productSlice.reducer;
