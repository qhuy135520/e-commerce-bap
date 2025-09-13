import { createAsyncThunk } from "@reduxjs/toolkit";
import { getVendorApi, subtractVendorBalanceApi, updateVendorStatus } from "@/services/apiVendor";

export const fetchAllVendor = createAsyncThunk("vendor/fetchAll", async () => {
  try {
    const data = await getVendorApi();
    return data;
  } catch (error) {
    throw error;
  }
});

export const updateVendor = createAsyncThunk("vendor/update", async ({ userId, newStatus }) => {
  try {
    await updateVendorStatus(userId, newStatus);
    return { userId, newStatus };
  } catch (error) {
    throw error;
  }
});

export const subtractVendorBalance = createAsyncThunk("vendor/subtract", async ({ vendorId, amount }) => {
  try {
    return await subtractVendorBalanceApi(vendorId, amount);
  } catch (error) {
    throw error;
  }
});
