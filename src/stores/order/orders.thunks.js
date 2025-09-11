import { createAsyncThunk } from "@reduxjs/toolkit";
import { createOrderApi, fetchAllOrderApi, fetchOrderApi } from "@/services/apiOrder";
import { incrementVendorBalance } from "@/services/apiAuth";
import { productsThunk } from "@/stores/rootThunk";

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
