import { createSlice } from "@reduxjs/toolkit";
import {
  fetchAllVendor,
  getVendorInfo,
  getVendorTotal,
  refundToUser,
  subtractVendorBalance,
  updateVendor,
} from "@/stores/vendor/vendor.thunks";

const vendorSlice = createSlice({
  name: "vendor",
  initialState: { data: [], vendor: {}, status: "idle", error: null },
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
        state.vendor = action.payload;
      })
      .addCase(getVendorInfo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      })

      .addCase(refundToUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(refundToUser.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(refundToUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      })

      .addCase(getVendorTotal.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getVendorTotal.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(getVendorTotal.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      });
  },
});

export default vendorSlice.reducer;
