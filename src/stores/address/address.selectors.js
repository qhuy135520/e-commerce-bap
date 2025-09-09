import { createSelector } from "@reduxjs/toolkit";

export const selectAddressState = (state) => state.address;

export const selectAddresses = (state) => state.address.items;

export const selectAddressStatus = (state) => state.address.status;

export const selectAddressError = (state) => state.address.error;
