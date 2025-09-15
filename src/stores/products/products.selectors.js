import { createSelector } from "@reduxjs/toolkit";

export const selectProducts = (state) => state.products.products;
export const selectStatus = (state) => state.products.status;
export const selectError = (state) => state.products.error;
export const selectSearchTerm = (state) => state.products.searchTerm;
export const selectProductById = (state) => state.products.product;
export const selectProductsVendor = (state) => state.products.productsVendor;
export const selectAllProducts = (state) => state.products.allProducts;
export const selectFilterCategory = (state) => state.products.filterCategory;
export const selectFilterBrand = (state) => state.products.filterBrand;

export const selectFilteredProducts = createSelector([selectProducts, selectSearchTerm], (products, searchTerm) => {
  if (!searchTerm) return products;
  return products.filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
});

export const selectFilteredProductsVendor = createSelector(
  [selectProductsVendor, selectSearchTerm, selectFilterCategory, selectFilterBrand],
  (products, searchTerm, filterCategory, filterBrand) => {
    let filtered = products;

    if (searchTerm) {
      filtered = filtered.filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    if (filterCategory !== "all") {
      filtered = filtered.filter((p) => String(p.categoryId) === String(filterCategory));
    }

    if (filterBrand !== "all") {
      filtered = filtered.filter((p) => String(p.brandId) === String(filterBrand));
    }

    return filtered;
  }
);
