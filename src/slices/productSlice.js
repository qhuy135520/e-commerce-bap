import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
  fetchAllProductsApi,
  fetchProductSalesApi,
} from '@/services/apiProduct'

export const fetchAllProducts = createAsyncThunk(
  'products/fetchAllProducts',
  async (_, { rejectWithValue }) => {
    try {
      const { products, totalCount } = await fetchAllProductsApi()
      return { products, totalCount }
    } catch (error) {
      throw error
    }
  }
)

export const fetchProductSales = createAsyncThunk(
  'products/fetchProductSales',
  async (_, { rejectWithValue }) => {
    try {
      return await fetchProductSalesApi()
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const sortProducts = (products, sort, sales = {}) => {
  const sortedProducts = [...products]
  if (sort === 'sales') {
    return sortedProducts.sort(
      (a, b) => (sales[b.id] || 0) - (sales[a.id] || 0)
    )
  } else if (sort === 'priceDesc') {
    return sortedProducts.sort((a, b) => b.price - a.price)
  } else if (sort === 'priceAsc') {
    return sortedProducts.sort((a, b) => a.price - b.price)
  }
  return sortedProducts
}

const filterAndSortProducts = (
  products,
  { sort = '', priceRange = [0, Number.MAX_SAFE_INTEGER], sales = {} }
) => {
  let filtered = [...products]

  if (priceRange && Array.isArray(priceRange)) {
    filtered = filtered.filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    )
  }

  return sortProducts(filtered, sort, sales)
}

const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    filteredProducts: [],
    sliderProducts: [],
    sales: {},
    filterOption: '',
    priceRange: [0, Number.MAX_SAFE_INTEGER],
    totalCount: 0,
    status: 'idle',
    error: null,
  },
  reducers: {
    syncWithURL: (state, action) => {
      const { sort, priceRange } = action.payload
      state.filterOption = sort || ''
      state.priceRange =
        priceRange && Array.isArray(priceRange) ? priceRange : state.priceRange
      state.filteredProducts = filterAndSortProducts(state.products, {
        sort: state.filterOption,
        priceRange: state.priceRange,
        sales: state.sales,
      })
    },
    filterProducts: (state, action) => {
      const { sort, priceRange } = action.payload
      state.filterOption = sort || ''
      state.priceRange =
        priceRange && Array.isArray(priceRange) ? priceRange : state.priceRange
      state.filteredProducts = filterAndSortProducts(state.products, {
        sort: state.filterOption,
        priceRange: state.priceRange,
        sales: state.sales,
      })
    },
    resetFilter: (state) => {
      state.filterOption = ''
      state.priceRange = [0, Number.MAX_SAFE_INTEGER]
      state.filteredProducts = [...state.products]
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.products = action.payload.products
        state.totalCount = action.payload.totalCount
        state.sliderProducts = action.payload.products.slice(0, 20)
        state.filteredProducts = filterAndSortProducts(
          action.payload.products,
          {
            sort: state.filterOption,
            priceRange: state.priceRange,
            sales: state.sales,
          }
        )
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
      .addCase(fetchProductSales.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchProductSales.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.sales = action.payload
        state.filteredProducts = filterAndSortProducts(state.filteredProducts, {
          sort: state.filterOption,
          priceRange: state.priceRange,
          sales: state.sales,
        })
      })
      .addCase(fetchProductSales.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
  },
})

export const { syncWithURL, filterProducts, resetFilter } = productSlice.actions
export default productSlice.reducer
