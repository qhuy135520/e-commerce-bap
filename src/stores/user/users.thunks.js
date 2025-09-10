// stores/user/users.thunks.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUsersApi, createUserApi, updateUserApi, deleteUserApi } from "@/services/apiUser";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  return await fetchUsersApi();
});

export const createUser = createAsyncThunk("users/createUser", async (user) => {
  return await createUserApi(user);
});

export const updateUser = createAsyncThunk("users/updateUser", async ({ id, updates }) => {
  return await updateUserApi(id, updates);
});

export const deleteUser = createAsyncThunk("users/deleteUser", async (id) => {
  return await deleteUserApi(id);
});
