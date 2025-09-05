import { createSelector } from '@reduxjs/toolkit'

export const selectProducts = (state) => state.products.products
export const selectSortType = (state) => state.products.sortType
export const selectSortOrder = (state) => state.products.sortOrder
export const selectStatus = (state) => state.products.status
export const selectError = (state) => state.products.error

export const selectSortedProducts = createSelector(
  [selectProducts, selectSortType, selectSortOrder],
  (products, sortType, sortOrder) => {
    if (!sortType || !sortOrder) return products

    const sorted = [...products]
    if (sortType === 'price') {
      sorted.sort((a, b) =>
        sortOrder === 'asc' ? a.price - b.price : b.price - a.price
      )
    } else if (sortType === 'sales') {
      sorted.sort((a, b) =>
        sortOrder === 'asc'
          ? a.total_sold - b.total_sold
          : b.total_sold - a.total_sold
      )
    }
    return sorted
  }
)
