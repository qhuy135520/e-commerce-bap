import { createAsyncThunk } from "@reduxjs/toolkit";
import { createOrderApi, fetchOrderApi } from "@/services/apiOrder";
import { incrementVendorBalance } from "@/services/apiAuth";

export const fetchAllOrder = createAsyncThunk("orders/fetchAllOrder", async (userId) => {
  try {
    return await fetchOrderApi(userId);
  } catch (error) {
    throw error;
  }
});

export const createOrder = createAsyncThunk("orders/createOrder", async ({ userId, cartItems }, { dispatch }) => {
  try {
    await createOrderApi(cartItems, userId);

    await Promise.all(
      cartItems.map((item) => {
        const vendorEarnings = item.productPrice * 0.85 * item.quantity;
        return incrementVendorBalance(item.vendorId, vendorEarnings);
      })
    );

    return dispatch(fetchAllOrder(userId));
  } catch (error) {
    throw error;
  }
});
