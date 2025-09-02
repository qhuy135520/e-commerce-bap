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

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    status: "idle",
    error: null,
  },
  reducers: {},
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
      });
  },
});

export default productSlice.reducer;
