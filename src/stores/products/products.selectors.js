import { createSelector } from "@reduxjs/toolkit";

export const selectProducts = (state) => state.products.products;
export const selectStatus = (state) => state.products.status;
export const selectError = (state) => state.products.error;
export const selectSearchTerm = (state) => state.products.searchTerm;
export const selectProductById = (state) => state.products.product;
export const selectProductsVendor = (state) => state.products.productsVendor;

export const selectFilteredProducts = createSelector([selectProducts, selectSearchTerm], (products, searchTerm) => {
  if (!searchTerm) return products;
  return products.filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
});
