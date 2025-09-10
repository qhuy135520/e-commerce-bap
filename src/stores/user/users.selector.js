import { createSelector } from "@reduxjs/toolkit";
export const usersSelector = (state) => state.users.list;
export const usersLoadingSelector = (state) => state.users.isLoading;
export const usersErrorSelector = (state) => state.users.error;
