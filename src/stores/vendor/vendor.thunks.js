import { createAsyncThunk } from "@reduxjs/toolkit";
import { getVendorApi, updateVendorStatus } from "@/services/apiVendor";

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
