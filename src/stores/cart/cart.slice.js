import { createSlice } from "@reduxjs/toolkit";

import {
  fetchCart,
  addToCart,
  updateQuantity,
  removeFromCart,
  updateQuantityAndSelect,
} from "@/stores/cart/cart.thunks";

const initialState = {
  items: [],
  status: "idle",
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      })
      .addCase(addToCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      })
      .addCase(updateQuantity.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateQuantity.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(updateQuantity.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      })
      .addCase(updateQuantityAndSelect.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateQuantityAndSelect.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(updateQuantityAndSelect.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      })
      .addCase(removeFromCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = state.items.filter((item) => item.id !== action.payload);
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      });
  },
});

export const { clearCart } = cartSlice.actions;

export default cartSlice.reducer;
