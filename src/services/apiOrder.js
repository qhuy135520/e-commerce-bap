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

export async function createOrderApi(cartItems, userId) {
  const { data: order, error: orderError } = await supabase.from("order").insert([{ userId }]).select().single();

  if (orderError) throw orderError;

  const orderDetails = cartItems.map((item) => ({
    orderId: order.id,
    productId: item.productId,
    quantity: item.quantity,
    price: item.productPrice,
  }));

  const { error: detailError } = await supabase.from("orderDetail").insert(orderDetails);

  if (detailError) throw detailError;

  return order;
}
