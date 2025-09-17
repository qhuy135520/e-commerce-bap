import { createSlice } from "@reduxjs/toolkit";
import {
  fetchAllVendor,
  getVendorInfo,
  refundToUser,
  subtractVendorBalance,
  updateVendor,
} from "@/stores/vendor/vendor.thunks";

const vendorSlice = createSlice({
  name: "vendor",
  initialState: { data: [], status: "idle", error: null },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllVendor.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllVendor.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchAllVendor.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      })
      .addCase(updateVendor.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateVendor.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { vendorId, newStatus } = action.payload;
        state.data = state.data.map((vendor) =>
          vendor.vendorId === vendorId ? { ...vendor, status: newStatus } : vendor
        );
      })
      .addCase(updateVendor.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      })

      .addCase(subtractVendorBalance.pending, (state) => {
        state.status = "loading";
      })
      .addCase(subtractVendorBalance.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(subtractVendorBalance.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      })

      .addCase(getVendorInfo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getVendorInfo.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(getVendorInfo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      })

      .addCase(refundToUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(refundToUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(refundToUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      });
  },
});

export default vendorSlice.reducer;
