import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./products/products.slice";
import cartReducer from "@/stores/cart/cart.slice";
import reviewReducer from '@/stores/reviews/reviews.slice'

export const store = configureStore({
  reducer: { products: productReducer, cart: cartReducer, review: reviewReducer },
});
