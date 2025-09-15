import { createSelector } from "@reduxjs/toolkit";

export const selectFilterStatus = (state) => state.order.filterStatus;

export const selectOrderVendor = (state) => state.order.orderVendor;

export const selectFilteredOrderVendor = createSelector(
  [selectOrderVendor, selectFilterStatus],
  (orderVendor, filterStatus) => {
    if (filterStatus === "all") return orderVendor;
    return orderVendor.filter((order) => order.status === filterStatus);
  }
);

export const selectOrders = (state) => state.order.items;
export const selectAllOrdersAdmin = (state) => state.order.allOrders;
export const selectOrderStatus = (state) => state.order.status;
export const selectOrderError = (state) => state.order.error;
