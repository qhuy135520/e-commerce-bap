import supabase from "@/services/supabase";

export async function fetchAllProductsApi() {
  try {
    const { data, error } = await supabase.rpc("get_products_with_sales_and_images");
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
    if (error) throw error;
    return data || [];
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

export async function updateProductDetailApi(id, newDataUpdate) {
  try {
    const { data, error } = await supabase
      .from("product")
      .update([{ ...newDataUpdate }])
      .eq("id", id);
    if (error) throw error;
    return data;
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
    return dataCreate;
  } catch (error) {
    console.error("Error creating product:", error.message);
    throw error;
  }
}

export async function updateProductVendorApi(productId, dataUpdate) {
  try {
    const { data, error } = await supabase
      .from("product")
      .update({ ...dataUpdate })
      .eq("id", productId)
      .select();
    if (error) throw error;
    return data;
  } catch (error) {
    throw error;
  }
}

export async function uploadImage(file, isPrimary) {
  if (file.url) {
    return { imageUrl: file.url, isPrimary };
  }

  const realFile = file.originFileObj || file;
  const fileName = realFile.name || `${Date.now()}.jpg`;

  const { data, error } = await supabase.storage.from("ProductImage").upload(`${Date.now()}_${fileName}`, realFile);

  if (error) throw error;

  const { data: urlData } = supabase.storage.from("ProductImage").getPublicUrl(data.path);

  return { imageUrl: urlData.publicUrl, isPrimary };
}

export async function uploadProductImages(fileList, primaryIndex) {
  const uploadedFiles = [];
  for (let i = 0; i < fileList.length; i++) {
    const result = await uploadImage(fileList[i], i === primaryIndex);
    uploadedFiles.push(result);
  }
  return uploadedFiles;
}

export async function updateProductWithImages(productId, data) {
  try {
    const { fileList, primaryIndex, ...values } = data;

    let updatedProduct = null;
    if (Object.keys(values).length > 0) {
      updatedProduct = await updateProductVendorApi(productId, values);
    }

    let uploadedFiles = [];
    if (fileList && fileList.length > 0) {
      await supabase.from("productImage").delete().eq("productId", productId);

      uploadedFiles = await Promise.all(
        fileList.map(async (file, idx) => {
          const result = await uploadImage(file, idx === primaryIndex);
          return result;
        })
      );

      const imagesData = uploadedFiles.map((f) => ({
        ...f,
        productId,
      }));

      await apiCreateProductImages(imagesData);
    }

    return {
      product: updatedProduct,
      images: uploadedFiles,
    };
  } catch (error) {
    console.error("Error updating product with images:", error.message);
    throw error;
  }
}

export async function apiCreateProductImages(imagesData) {
  try {
    const { data, error } = await supabase.from("productImage").insert(imagesData).select();
    if (error) throw error;
    return data;
  } catch (error) {
    throw error;
  }
}

export async function createProductWithImages(vendorId, data) {
  try {
    const { fileList, primaryIndex, ...values } = data;

    const uploadedFiles = await uploadProductImages(fileList, primaryIndex);

    const resProduct = await createProductVendorApi(vendorId, {
      ...values,
      status: false,
    });

    const imagesData = uploadedFiles.map((f) => ({
      ...f,
      productId: resProduct.id,
    }));

    await apiCreateProductImages(imagesData);

    return resProduct;
  } catch (error) {
    throw error;
  }
}
export async function getAllProductsApi() {
  try {
    const { data, error } = await supabase.from("product").select("*");

    if (error) throw error;
    console.log("Fetched products:", data);

    return data;
  } catch (error) {
    console.error("Error fetching products:", error.message);
    throw error;
  }
}
