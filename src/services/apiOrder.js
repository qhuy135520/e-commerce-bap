import { fetchAddressUserDefaultApi } from "@/services/apiAddress";
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
  try {
    const address = await fetchAddressUserDefaultApi(userId);
    debugger;
    const groupedByVendor = cartItems.reduce((acc, item) => {
      if (!acc[item.vendorId]) acc[item.vendorId] = [];
      acc[item.vendorId].push(item);
      return acc;
    }, {});

    const results = [];

    for (const [_, items] of Object.entries(groupedByVendor)) {
      const { data: order, error: orderError } = await supabase
        .from("order")
        .insert([{ userId, addressId: address.id }])
        .select()
        .single();

      if (orderError) throw orderError;

      const orderDetails = items.map((item) => ({
        orderId: order.id,
        productId: item.productId,
        quantity: item.quantity,
        price: item.productPrice,
      }));

      const { data: newOrderDetails, error: detailError } = await supabase
        .from("orderDetail")
        .insert(orderDetails)
        .select(
          `
          *,
          product (
            *,
            productImage!left(*)
          )
        `
        )
        .eq("product.productImage.isPrimary", true);

      if (detailError) throw detailError;

      results.push({ order, newOrderDetails });
    }

    return results;
  } catch (error) {
    throw error;
  }
}

export async function fetchAllOrderApi() {
  try {
    const { data, error } = await supabase.rpc("get_orders_with_total");
    if (error) throw error;
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getOrderVendorApi(vendorId) {
  try {
    const { data, error } = await supabase.rpc("get_orders_by_vendor", { vendoridcurrent: vendorId });

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    throw error;
  }
}

export async function updateStatusOrderApi(orderId, nextStatus) {
  try {
    const { data, error } = await supabase.from("order").update({ status: nextStatus }).eq("id", orderId).select();

    if (error) throw error;

    return data;
  } catch (error) {
    throw error;
  }
}

export async function cancelOrderApi(orderId) {
  try {
    const { data, error } = await supabase
      .from("order")
      .update({ status: "cancelled" })
      .eq("id", orderId)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    throw error;
  }
}
