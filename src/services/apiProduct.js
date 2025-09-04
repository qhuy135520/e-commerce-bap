import supabase from './supabase'
import { PAGE_SIZE } from '@/constants'

export async function fetchProductsApi({
  sort,
  search,
  page = 1,
  pageSize = PAGE_SIZE.PRODUCT_LIST,
} = {}) {
  try {
    let query = supabase.from('product').select('*', { count: 'exact' })

    if (search) {
      query = query.ilike('name', `%${search}%`)
    }

    if (sort === 'priceAsc') {
      query = query.order('price', { ascending: true })
    } else if (sort === 'priceDesc') {
      query = query.order('price', { ascending: false })
    }

    const from = (page - 1) * pageSize
    const to = from + pageSize - 1
    query = query.range(from, to)

    const { data: products, error: productsError, count } = await query
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

    return { products: productsWithImages, totalCount: count }
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
    console.log('data: ', salesMap)

    return salesMap
  } catch (error) {
    throw error
  }
}
