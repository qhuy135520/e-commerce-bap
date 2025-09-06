import supabase from "@/services/supabase";

export async function fetchAllProductsApi() {
  try {
    const response = await supabase.rpc("get_products_with_sales_and_images");
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getProductsByVendorApi(vendorId) {
  try {
    const { data, error } = await supabase.rpc("get_products_by_vendor", {
      vendor: vendorId,
    });
    if (error) {
      throw error;
    }
    return data || [];
  } catch (error) {
    throw error;
  }
}
