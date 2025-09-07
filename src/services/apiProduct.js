import supabase from "@/services/supabase";

export async function fetchAllProductsApi() {
  try {
    const response = await supabase.rpc("get_products_with_sales_and_images");
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getProductDetailApi(id) {
  try {
    const { data, error } = await supabase
      .rpc("get_one_product_with_sales_images_reviews", { productiddetail: id })
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    throw error;
  }
}
