import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  addAddressApi,
  fetchAddressUserApi,
  removeAddressApi,
  updateAddressApi,
  updateDefaultAddressApi,
} from "@/services/apiAddress";

export const fetchAddress = createAsyncThunk("address/fetchAddress", async (userId) => {
  try {
    const data = await fetchAddressUserApi(userId);
    return data;
  } catch (error) {
    return error;
  }
});

export const addAddress = createAsyncThunk(
  "address/addAddress",
  async ({ userId, fullAddress, phone, name }, { getState, dispatch }) => {
    try {
      const state = getState();
      const existingAddresses = state.address.items;

      const isDefault = !existingAddresses || existingAddresses.length === 0;

      await addAddressApi({ userId, fullAddress, phone, name, isDefault });

      await dispatch(fetchAddress(userId));
    } catch (error) {
      return error;
    }
  }
);

export const updateAddress = createAsyncThunk("address/updateAddress", async (newAddress, { dispatch }) => {
  try {
    await updateAddressApi(newAddress);

    await dispatch(fetchAddress(userId));
  } catch (error) {
    return error;
  }
});

export const updateDefaultAddress = createAsyncThunk(
  "address/updateDefaultAddress",
  async ({ id, userId }, { getState, dispatch }) => {
    try {
      const state = getState();

      const isDefault = state.address.items.find((item) => item.isDefault && item.id === id);
      if (!isDefault) {
        await updateDefaultAddressApi({ id, userId });
      }

      await dispatch(fetchAddress(userId));
    } catch (error) {
      return error;
    }
  }
);

export const removeAddress = createAsyncThunk("address/removeAddress", async ({ id, userId }, { dispatch }) => {
  try {
    await removeAddressApi(id);
    await dispatch(fetchAddress(userId));
  } catch (error) {
    throw error;
  }
});
