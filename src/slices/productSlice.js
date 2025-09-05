// import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit'
// import { fetchAllProductsApi } from '@/services/apiProduct'

// export const fetchAllProducts = createAsyncThunk(
//   'products/fetchAll',
//   async () => {
//     try {
//       const data = await fetchAllProductsApi()
//       return data
//     } catch (error) {
//       throw error
//     }
//   }
// )

// const productSlice = createSlice({
//   name: 'products',
//   initialState: {
//     products: [],
//     status: 'idle',
//     error: null,
//     searchTerm: '',
//   },
//   reducers: {
//     setSearchTerm: (state, action) => {
//       state.searchTerm = action.payload
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchAllProducts.pending, (state) => {
//         state.status = 'loading'
//         state.error = null
//       })
//       .addCase(fetchAllProducts.fulfilled, (state, action) => {
//         state.status = 'succeeded'
//         state.products = action.payload
//       })
//       .addCase(fetchAllProducts.rejected, (state, action) => {
//         state.status = 'failed'
//         state.error = action.error
//       })
//   },
// })

// export const { setSearchTerm } = productSlice.actions

// export const selectProducts = (state) => state.products.products
// export const selectStatus = (state) => state.products.status
// export const selectError = (state) => state.products.error
// export const selectSearchTerm = (state) => state.products.searchTerm

// export const selectFilteredProducts = createSelector(
//   [selectProducts, selectSearchTerm],
//   (products, searchTerm) => {
//     if (!searchTerm) return products
//     return products.filter((p) =>
//       p.name.toLowerCase().includes(searchTerm.toLowerCase())
//     )
//   }
// )

// export default productSlice.reducer

