import { createAsyncThunk } from "@reduxjs/toolkit";
import { createOrderApi, fetchOrderApi } from "@/services/apiOrder";

export const fetchAllOrder = createAsyncThunk("orders/fetchAllOrder", async (userId) => {
  try {
    return await fetchOrderApi(userId);
  } catch (error) {
    throw error;
  }
});

export const createOrder = createAsyncThunk("orders/createOrder", async ({ userId, cartItems }, { dispatch }) => {
  try {
    debugger;
    await createOrderApi(cartItems, userId);

    return dispatch(fetchAllOrder(userId));
  } catch (error) {
    throw error;
  }
});
