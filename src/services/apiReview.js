import supabase from "@/services/supabase";

export async function createReviewApi({ userId, productId, content, rating }) {
  try {
    const { data, error } = await supabase
      .from("review")
      .insert([{ content, rating, productId, userId }])
      .select(`content, rating, productId, userId, orderDetailId`)
      .single();
    if (error) throw error;

    return data;
  } catch (error) {
    if (error.code === "23505") {
      throw new Error("Product has reviewed");
    }
    throw error;
  }
}
export async function submitReviewApi({ userId, productId, orderDetailId, rating, content }) {
  try {
    const { data, error } = await supabase.from("review").insert([
      {
        userId,
        productId,
        orderDetailId,
        content,
        rating,
      },
    ]);

    if (error) throw error;
    return data;
  } catch (error) {
    throw error;
  }
}
