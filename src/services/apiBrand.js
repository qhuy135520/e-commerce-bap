import supabase from "@/services/supabase";

export async function fetchBrandApi() {
  try {
    const { data, error } = await supabase.from("brand").select("*");

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    throw error;
  }
}
