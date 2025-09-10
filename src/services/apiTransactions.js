import supabase from "@/services/supabase";

export async function getTransactionsApi() {
  try {
    const { data, error } = await supabase.from("transactions").select(`
        *,
        userInfo (
          name,
          role,
          moneyBalance,
          birthdate,
          status
        )
      `);
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Lỗi khi lấy transactions:", error.message);
    throw error;
  }
}
