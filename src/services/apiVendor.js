import supabase from "@/services/supabase";

export async function getVendorApi() {
  try {
    const { data, error } = await supabase.from("userInfo").select("*").eq("role", "vendor");
    if (error) throw error;
    return data;
  } catch (error) {
    throw error;
  }
}

export async function updateVendorStatus(userId, newStatus) {
  try {
    const { data, error } = await supabase
      .from("userInfo")
      .update({ status: newStatus })
      .eq("id", userId)
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data;
  } catch (error) {
    throw error;
  }
}
