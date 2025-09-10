import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  addToCartApi,
  fetchUserCartApi,
  removeFromCartApi,
  updateQuantityAndSelectProductApi,
  updateQuantityProductApi,
} from "@/services/apiCart";

export const fetchCart = createAsyncThunk("cart/fetchCart", async (userId) => {
  try {
    const data = await fetchUserCartApi(userId);
    return data;
  } catch (error) {
    return error;
  }
});

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ userId, productId, quantity }, { dispatch, getState }) => {
    try {
      const state = getState();
      const existingItem = state.cart.items.find((item) => item.productId === productId);
      let data;
      if (existingItem) {
        data = await updateQuantityProductApi({
          cartId: existingItem.id,
          quantity: existingItem.quantity + quantity,
        });
      } else {
        data = await addToCartApi({ userId, productId, quantity });
      }
      await dispatch(fetchCart(userId));
    } catch (error) {
      return error;
    }
  }
);

export const updateQuantity = createAsyncThunk("cart/updateQuantity", async ({ items, userId }, { dispatch }) => {
  try {
    await Promise.all(items.map((item) => updateQuantityProductApi({ cartId: item.cartId, quantity: item.quantity })));
    await dispatch(fetchCart(userId));
  } catch (error) {
    return error;
  }
});

export const updateQuantityAndSelect = createAsyncThunk(
  "cart/updateQuantityAndSelect",
  async ({ items, userId }, { dispatch }) => {
    try {
      await Promise.all(
        items.map((item) =>
          updateQuantityAndSelectProductApi({ cartId: item.id, quantity: item.quantity, isSelect: item.isSelect })
        )
      );
      await dispatch(fetchCart(userId));
    } catch (error) {
      return error;
    }
  }
);

export const removeFromCart = createAsyncThunk("cart/removeFromCart", async ({ cartId, userId }, { dispatch }) => {
  try {
    await removeFromCartApi(cartId);
    await dispatch(fetchCart(userId));
  } catch (error) {
    return error;
  }
});
