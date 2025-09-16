import { createAsyncThunk } from "@reduxjs/toolkit";
import { getVendorApi, getVendorInfoApi, subtractVendorBalanceApi, updateVendorStatus } from "@/services/apiVendor";
import { COMMISSION } from "@/constants";
import { getUserById } from "@/services/apiUser";
import { userThunk } from '@/stores/rootThunk';

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

export const subtractVendorBalance = createAsyncThunk("vendor/subtract", async ({ vendorId, amount }, { dispatch }) => {
  try {
    const vendorLoss = amount * COMMISSION;
    await subtractVendorBalanceApi(vendorId, vendorLoss);
    await dispatch(getVendorInfo(vendorId));
  } catch (error) {
    throw error;
  }
});

export const refundToUser = createAsyncThunk(
  "vendor/refundToUser",
  async ({ vendorId, userId, amount }, { dispatch }) => {
    try {
      const vendorLoss = amount * COMMISSION;
      await subtractVendorBalanceApi(vendorId, vendorLoss);

      const { user } = await getUserById(userId);
      const newBalance = (user?.moneyBalance || 0) + amount;
      await dispatch(userThunk.updateUser({ id: userId, updates: { moneyBalance: newBalance } }));

      await dispatch(getVendorInfo(vendorId));

      return { vendorId, userId, amount };
    } catch (error) {
      throw error;
    }
  }
);

export const getVendorInfo = createAsyncThunk("vendor/getInfoVendor", async (vendorId) => {
  try {
    return await getVendorInfoApi(vendorId);
  } catch (error) {
    throw error;
  }
});
