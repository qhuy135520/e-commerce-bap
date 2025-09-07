import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./products/products.slice";
import cartReducer from "@/stores/cart/cart.slice";

export const store = configureStore({
  reducer: { products: productReducer, cart: cartReducer },
});
