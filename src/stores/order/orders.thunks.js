import { createAsyncThunk } from "@reduxjs/toolkit";
import { productsThunk } from "@/stores/rootThunk";
import { incrementVendorBalance } from "@/services/apiAuth";
import {
  createOrderApi,
  fetchOrderApi,
  getOrderVendorApi,
  updateStatusOrderApi,
  fetchAllOrderApi,
} from "@/services/apiOrder";

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
        incrementVendorBalance(item.vendorId, vendorEarnings);
        dispatch(productsThunk.updateStockProduct({ productId: item.productId, quantity: item.quantity }));
      })
    );

    return dispatch(fetchAllOrder(userId));
  } catch (error) {
    throw error;
  }
});
export const fetchAllOrdersAdmin = createAsyncThunk("orders/fetchAllOrdersAdmin", async () => {
  try {
    return await fetchAllOrderApi();
  } catch (error) {
    throw error;
  }
});

export const getOrderVendor = createAsyncThunk("orders/getOrderVendor", async (vendorId) => {
  try {
    return await getOrderVendorApi(vendorId);
  } catch (error) {
    throw error;
  }
});

export const updateStatusOrder = createAsyncThunk(
  "orders/updateStatusOrder",
  async ({ vendorId, orderId, nextStatus }, { dispatch }) => {
    try {
      await updateStatusOrderApi(orderId, nextStatus);
      dispatch(getOrderVendor(vendorId));
    } catch (error) {
      throw error;
    }
  }
);
