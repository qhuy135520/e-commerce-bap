// services/apiUser.js
import supabase from "@/services/supabase";

export async function fetchUsersApi() {
  const { data, error } = await supabase.from("userInfo").select("*");
  if (error) throw error;
  return data;
}

export async function createUserApi(user) {
  const { data, error } = await supabase.from("userInfo").insert([user]).select().single();
  if (error) throw error;
  return data;
}

export async function updateUserApi(id, updates) {
  const { data, error } = await supabase.from("userInfo").update(updates).eq("id", id).select().single();
  if (error) throw error;
  return data;
}

export async function deleteUserApi(id) {
  const { error } = await supabase.from("userInfo").delete().eq("id", id);
  if (error) throw error;
  return id;
}
