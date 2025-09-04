import supabase from './supabase'

export async function fetchAllProductsApi({ sort, search } = {}) {
  try {
    let query = supabase.from('product').select('*')

    if (sort === 'priceAsc') {
      query = query.order('price', { ascending: true })
    } else if (sort === 'priceDesc') {
      query = query.order('price', { ascending: false })
    }

    const { data: products, error: productsError } = await query
    if (productsError) throw productsError

    const { data: images, error: imagesError } = await supabase
      .from('productImage')
      .select('productId, imageUrl')
    if (imagesError) throw imagesError

    const productsWithImages = products.map((product) => {
      const productImage = images.find((img) => img.productId === product.id)
      return {
        ...product,
        image_url: productImage ? productImage.imageUrl : null,
      }
    })

    return {
      products: productsWithImages,
      totalCount: productsWithImages.length,
    }
  } catch (error) {
    throw error
  }
}

export async function fetchProductSalesApi() {
  try {
    const { data: salesData, error: salesError } = await supabase.rpc(
      'get_product_sales'
    )
    if (salesError) throw salesError
    const salesMap = {}
    salesData.forEach((item) => {
      salesMap[item.productId] = item.totalQuantity || 0
    })

    return salesMap
  } catch (error) {
    throw error
  }
}
