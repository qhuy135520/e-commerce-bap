import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./products/products.slice";
import cartReducer from "@/stores/cart/cart.slice";
import reviewReducer from "@/stores/reviews/reviews.slice";
import orderReducer from "@/stores/order/orders.slice";
import addressReducer from "@/stores/address/address.slice";

export const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    review: reviewReducer,
    order: orderReducer,
    address: addressReducer,
  },
});
