import supabase from "@/services/supabase";

export async function fetchCategoryApi() {
  try {
    const { data, error } = await supabase.from("category").select("*");

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    throw error;
  }
}
