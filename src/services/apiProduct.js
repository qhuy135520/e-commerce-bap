import supabase from './supabase';

export async function fetchProductsApi() {
  try {
    const { data: products, error: productsError } = await supabase
      .from('product')
      .select('*');
    if (productsError) throw productsError;

    const { data: images, error: imagesError } = await supabase
      .from('productImage')
      .select('productId, imageUrl');
    if (imagesError) throw imagesError;

    const productsWithImages = products.map((product) => {
      const productImage = images.find((img) => img.productId === product.id);
      return {
        ...product,
        image_url: productImage ? productImage.imageUrl : null,
      };
    });

    return productsWithImages;
  } catch (error) {
    throw error;
  }
}

export async function fetchProductSalesApi() {
  try {
    const { data: orderDetails, error: orderError } = await supabase
      .from('orderDetail')
      .select('productId, quantity');
    if (orderError) throw orderError;
    const salesMap = {};
    orderDetails.forEach((od) => {
      if (!salesMap[od.productId]) {
        salesMap[od.productId] = 0;
      }
      salesMap[od.productId] += od.quantity;
    });
    return salesMap;
  } catch (error) {
    throw error;
  }
}
