import { createSlice } from "@reduxjs/toolkit";
import { fetchAllVendor, subtractVendorBalance, updateVendor } from "@/stores/vendor/vendor.thunks";

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
        const { userId, newStatus } = action.payload;
        state.data = state.data.map((vendor) => (vendor.id === userId ? { ...vendor, status: newStatus } : vendor));
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
      });
  },
});

export default vendorSlice.reducer;
