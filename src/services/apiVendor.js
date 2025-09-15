import supabase from "@/services/supabase";

export async function getVendorApi() {
  try {
    const { data, error } = await supabase.from("vendor_info").select("*");
    if (error) throw error;
    return data;
  } catch (error) {
    throw error;
  }
}

export async function updateVendorStatus(vendorId, newStatus) {
  try {
    const { data, error } = await supabase
      .from("userInfo")
      .update({ status: newStatus })
      .eq("userId", vendorId)
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data;
  } catch (error) {
    throw error;
  }
}
