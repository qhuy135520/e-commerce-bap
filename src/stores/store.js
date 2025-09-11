import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./products/products.slice";
import cartReducer from "@/stores/cart/cart.slice";
import reviewReducer from "@/stores/reviews/reviews.slice";
import orderReducer from "@/stores/order/orders.slice";
import addressReducer from "@/stores/address/address.slice";
import depositReducer from "@/stores/deposit/deposit.slice";
import brandReducer from "@/stores/brand/brand.slice";
import cateogryReducer from "@/stores/category/category.slice";
import userReducer from "@/stores/user/users.slice";
import transactionsReducer from "@/stores/transactions/transactions.slice";
import vendorReducer from "@/stores/vendor/vendor.slice";

export const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    review: reviewReducer,
    order: orderReducer,
    address: addressReducer,
    deposit: depositReducer,
    brand: brandReducer,
    category: cateogryReducer,
    users: userReducer,
    transactions: transactionsReducer,
    vendor: vendorReducer,
  },
});
