import { createAsyncThunk } from "@reduxjs/toolkit";

import { fetchAddressUserApi } from "@/services/apiAddress";

export const fetchAddress = createAsyncThunk("address/fetchAddress", async (userId) => {
  try {
    const data = await fetchAddressUserApi(userId);
    return data;
  } catch (error) {
    return error;
  }
});
