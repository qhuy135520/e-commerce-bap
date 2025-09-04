import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchProductSalesApi, fetchProductsApi } from '@/services/apiProduct'

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (
    { sort, search, page = 1, pageSize = PAGE_SIZE.PRODUCT_LIST },
    { rejectWithValue }
  ) => {
    try {
      const data = await fetchProductsApi()
      return data
    } catch (error) {
      throw error
    }
  }
)

export const fetchProductSales = createAsyncThunk(
  'products/fetchProductSales',
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchProductSalesApi()
      return data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const fetchTopProducts = createAsyncThunk(
  'products/fetchTopProducts',
  async (_, { rejectWithValue }) => {
    try {
      const { products } = await fetchProductsApi({
        page: 1,
        pageSize: PAGE_SIZE.TOP_PRODUCTS,
      })
      return products
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    filteredProducts: [],
    topProducts: [],
    sales: {},
    filterOption: '',
    searchTerm: '',
    totalCount: 0,
    status: 'idle',
    error: null,
  },
  reducers: {
    syncWithURL: (state, action) => {
      const { sort, search } = action.payload
      state.filterOption = sort || ''
      state.searchTerm = search || ''
      state.filteredProducts = [...state.products]

      if (search) {
        state.filteredProducts = state.filteredProducts.filter((product) =>
          product.name.toLowerCase().includes(search.toLowerCase())
        )
      }

      if (sort === 'sales') {
        state.filteredProducts.sort(
          (a, b) => (state.sales[b.id] || 0) - (state.sales[a.id] || 0)
        )
      }
    },
    sortProductsBySales: (state) => {
      state.topProducts = [...state.topProducts].sort(
        (a, b) => (state.sales[b.id] || 0) - (state.sales[a.id] || 0)
      )
    },
    filterProducts: (state, action) => {
      const { sort, search } = action.payload
      state.filterOption = sort || ''
      state.searchTerm = search || ''
      state.filteredProducts = [...state.products]

      if (search) {
        state.filteredProducts = state.filteredProducts.filter((product) =>
          product.name.toLowerCase().includes(search.toLowerCase())
        )
      }

      if (sort === 'sales') {
        state.filteredProducts.sort(
          (a, b) => (state.sales[b.id] || 0) - (state.sales[a.id] || 0)
        )
      } else if (sort === 'priceDesc') {
        state.filteredProducts.sort((a, b) => b.price - a.price)
      } else if (sort === 'priceAsc') {
        state.filteredProducts.sort((a, b) => a.price - b.price)
      }
    },
    resetFilter: (state) => {
      state.filterOption = ''
      state.searchTerm = ''
      state.filteredProducts = [...state.products]
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.products = action.payload.products
        state.filteredProducts = action.payload.products
        state.totalCount = action.payload.totalCount

        const { sort, search } = action.payload
        state.filterOption = sort || ''
        state.searchTerm = search || ''

        if (search) {
          state.filteredProducts = state.filteredProducts.filter((product) =>
            product.name.toLowerCase().includes(search.toLowerCase())
          )
        }

        if (sort === 'sales') {
          state.filteredProducts.sort(
            (a, b) => (state.sales[b.id] || 0) - (state.sales[a.id] || 0)
          )
        }
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
      .addCase(fetchTopProducts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.topProducts = action.payload
      })
      .addCase(fetchTopProducts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
      .addCase(fetchProductSales.fulfilled, (state, action) => {
        state.sales = action.payload
        if (state.topProducts.length > 0) {
          state.topProducts = [...state.topProducts].sort(
            (a, b) => (state.sales[b.id] || 0) - (state.sales[a.id] || 0)
          )
        }
      })
      .addCase(fetchProductSales.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
  },
})

export const { syncWithURL, sortProductsBySales, filterProducts, resetFilter } =
  productSlice.actions
export default productSlice.reducer
