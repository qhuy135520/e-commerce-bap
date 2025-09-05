import supabase from './supabase'

export async function fetchAllProductsApi() {
  try {
    const response = await supabase.rpc('get_products_with_sales_and_images')
    return response.data
  } catch (error) {
    throw error
  }
}
