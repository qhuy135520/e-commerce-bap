import { useDispatch, useSelector } from "react-redux";

import { categorySelector, brandSelector } from "@/stores/rootSelector";
import { productsSlice } from "@/stores/rootReducer";

import { useTranslation } from "react-i18next";

export default function useVendorProductOperation() {
  const { t } = useTranslation(["vendor"]);
  const dispatch = useDispatch();

  const { searchTerm, filterCategory, filterBrand } = useSelector((state) => state.products);
  const categories = useSelector(categorySelector.selectCategoryItems);
  const brands = useSelector(brandSelector.selectBrandItems);

  const handleCategoryChange = (value) => {
    dispatch(productsSlice.setFilterCategory(String(value)));
  };

  const handleBrandChange = (value) => {
    dispatch(productsSlice.setFilterBrand(String(value)));
  };

  return {
    t,
    dispatch,
    handleCategoryChange,
    handleBrandChange,
    categories,
    brands,
    searchTerm,
    filterCategory,
    filterBrand,
  };
}
