import supabase from "@/services/supabase";

export async function fetchUserCartApi(userId) {
  try {
    const { data, error } = await supabase
      .from("cart")
      .select(`id, quantity, createdAt, updatedAt, productId, userId, product(*)`)
      .eq("userId", userId);

    if (error) {
      return [];
    }

    return data;
  } catch (error) {
    throw error;
  }
}

export async function addToCartApi({ userId, productId, quantity }) {
  try {
    const { data, error } = await supabase
      .from("cart")
      .insert([{ userId, productId, quantity }])
      .select(`id, quantity, createdAt, updatedAt, productId, userId`)
      .single();

    if (error) throw error;

    return data;
  } catch (error) {
    throw error;
  }
}

export async function updateQuantityProductApi({ cartId, quantity }) {
  try {
    debugger;
    const { data, error } = await supabase
      .from("cart")
      .update({ quantity, updatedAt: new Date().toISOString() })
      .eq("id", cartId)
      .select()
      .single();

    if (error) throw error;

    return data;
  } catch (error) {
    throw error;
  }
}

export async function removeFromCartApi(cartId) {
  try {
    const { error } = await supabase.from("cart").delete().eq("id", cartId);

    if (error) throw error;

    return cartId;
  } catch (error) {
    throw error;
  }
}
