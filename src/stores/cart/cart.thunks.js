import { createAsyncThunk } from "@reduxjs/toolkit";

import { addToCartApi, fetchUserCartApi, removeFromCartApi, updateQuantityProductApi } from "@/services/apiCart";

export const fetchCart = createAsyncThunk("cart/fetchCart", async (userId) => {
  try {
    const data = await fetchUserCartApi(userId);
    return data;
  } catch (error) {
    return error;
  }
});

export const addToCart = createAsyncThunk("cart/addToCart", async ({ userId, productId, quantity }) => {
  try {
    const data = await addToCartApi({ userId, productId, quantity });
    return data;
  } catch (error) {
    return error;
  }
});

export const updateQuantity = createAsyncThunk("cart/updateQuantity", async ({ cartId, quantity }) => {
  try {
    const data = await updateQuantityProductApi({ cartId, quantity });
    return data;
  } catch (error) {
    return error;
  }
});

export const removeFromCart = createAsyncThunk("cart/removeFromCart", async (cartId) => {
  try {
    const data = await removeFromCartApi(cartId);
    return data;
  } catch (error) {
    return error;
  }
});
