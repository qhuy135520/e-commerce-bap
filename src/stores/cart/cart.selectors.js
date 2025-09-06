import { createSelector } from "@reduxjs/toolkit";

export const selectCartState = (state) => state.cart;
export const selectCartItems = (state) => state.cart.items;
export const selectCartStatus = (state) => state.cart.status;
export const selectCartError = (state) => state.cart.error;

export const selectCartTotalQuantity = createSelector([selectCartItems], (items) =>
  items.reduce((sum, item) => sum + item.quantity, 0)
);

export const selectCartTotalPrice = createSelector([selectCartItems], (items) =>
  items.reduce((sum, item) => sum + (item.product?.price || 0) * item.quantity, 0)
);
