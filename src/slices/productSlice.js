import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProductSalesApi, fetchProductsApi } from '@/services/apiProduct';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    try {
      const data = await fetchProductsApi();
      return data;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchProductSales = createAsyncThunk(
  'products/fetchProductSales',
  async () => {
    try {
      const data = await fetchProductSalesApi();
      return data;
    } catch (error) {
      throw error;
    }
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    filteredProducts: [],
    sales: {},
    filterOption: '',
    searchTerm: '',
    status: 'idle',
    error: null,
  },
  reducers: {
    sortProductsBySales: (state) => {
      state.filteredProducts.sort(
        (a, b) => (state.sales[b.id] || 0) - (state.sales[a.id] || 0)
      );
    },
    filterProducts: (state, action) => {
      state.filterOption = action.payload;
      state.filteredProducts = [...state.products];

      if (action.payload === 'sales') {
        state.filteredProducts.sort(
          (a, b) => (state.sales[b.id] || 0) - (state.sales[a.id] || 0)
        );
      } else if (action.payload === 'priceDesc') {
        state.filteredProducts.sort((a, b) => b.price - a.price);
      } else if (action.payload === 'priceAsc') {
        state.filteredProducts.sort((a, b) => a.price - b.price);
      }
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      state.filteredProducts = state.products.filter((product) =>
        product.name.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
    resetFilter: (state) => {
      state.filterOption = '';
      state.filteredProducts = [...state.products];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
        state.filteredProducts = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error;
      })
      .addCase(fetchProductSales.fulfilled, (state, action) => {
        state.sales = action.payload;
      });
  },
});

export const {
  sortProductsBySales,
  filterProducts,
  setSearchTerm,
  resetFilter,
} = productSlice.actions;
export default productSlice.reducer;
