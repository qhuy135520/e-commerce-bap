import { createAsyncThunk } from "@reduxjs/toolkit";
import { getVendorApi, getVendorInfoApi, subtractVendorBalanceApi, updateVendorStatus } from "@/services/apiVendor";

export const fetchAllVendor = createAsyncThunk("vendor/fetchAll", async () => {
  try {
    const data = await getVendorApi();
    return data;
  } catch (error) {
    throw error;
  }
});

export const updateVendor = createAsyncThunk("vendor/update", async ({ vendorId, newStatus }) => {
  try {
    await updateVendorStatus(vendorId, newStatus);
    return { vendorId, newStatus };
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

export const getVendorInfo = createAsyncThunk("vendor/getInfoVendor", async (vendorId) => {
  try {
    return await getVendorInfoApi(vendorId);
  } catch (error) {
    throw error;
  }
});
