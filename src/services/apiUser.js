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
  const { data, error } = await supabase.from("userInfo").update(updates).eq("userId", id).select().single();
  if (error) throw error;
  return data;
}

export async function deleteUserApi(id) {
  const { error } = await supabase.from("userInfo").delete().eq("id", id);
  if (error) throw error;
  return id;
}

export async function getUserById(userId) {
  try {
    const { data: user, error } = await supabase.from("userInfo").select("*").eq("userId", userId).single();

    if (error) {
      throw error;
    }

    return { user };
  } catch (error) {
    throw error;
  }
}
