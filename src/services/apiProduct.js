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

export async function getProductsByVendorApi(vendorId) {
  try {
    const { data, error } = await supabase.rpc("get_products_by_vendor_with_sales", {
      vendor_id: vendorId,
    });
    if (error) {
      throw error;
    }
    return data || [];
  } catch (error) {
    throw error;
  }
}

export async function createProductVendorApi(vendorId, data) {
  try {
    const { data: dataCreate, error } = await supabase
      .from("product")
      .insert([{ ...data, vendorId }])
      .select()
      .single();

    if (error) throw error;

    console.log("api", dataCreate);
    return dataCreate;
  } catch (error) {
    console.error("Lỗi khi tạo product:", error.message);
    throw error;
  }
}



export async function apiCreateProductImages(imagesData) {
  try {
    const { data, error } = await supabase.from("productImage").insert(imagesData).select();
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error creating product images:", error);
    throw error;
  }
}
