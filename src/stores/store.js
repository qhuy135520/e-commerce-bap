import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./products/products.slice";

export const store = configureStore({
  reducer: { products: productReducer },
});
