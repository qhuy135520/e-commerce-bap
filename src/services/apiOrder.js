import supabase from "@/services/supabase";

export async function fetchOrderApi(userId) {
  try {
    const { data, error } = await supabase.rpc("get_user_orders_grouped", { userid: userId });
    if (error) throw error;
    return data;
  } catch (error) {
    throw error;
  }
}
