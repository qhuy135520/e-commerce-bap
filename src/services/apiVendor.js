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

export async function subtractVendorBalanceApi(vendorId, amount) {
  try {
    const { data: vendor, error } = await supabase
      .from("userInfo")
      .select("moneyBalance")
      .eq("userId", vendorId)
      .single();

    if (error) throw error;
    if (!vendor) throw new Error("Vendor không tồn tại");

    const newBalance = Number(vendor.moneyBalance || 0) - Number(amount);

    const { data, error: updateError } = await supabase
      .from("userInfo")
      .update({ moneyBalance: newBalance })
      .eq("userId", vendorId)
      .select()
      .single();
    if (updateError) throw updateError;

    return data;
  } catch (error) {
    console.error("Lỗi khi trừ balance vendor:", error.message);
    throw error;
  }
}
