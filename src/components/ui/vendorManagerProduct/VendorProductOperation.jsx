import React from "react";
import { Input, Select } from "antd";

import { productsSlice } from "@/stores/rootReducer";
import useVendorProductOperation from "@/hooks/vendor/useVendorProductOperation";

import { VendorManagerProductTableStyled as VMPTS } from "@/components";

const { Option } = Select;

export default function VendorProductOperation() {
  const {
    t,
    dispatch,
    handleCategoryChange,
    handleBrandChange,
    categories,
    brands,
    searchTerm,
    filterCategory,
    filterBrand,
  } = useVendorProductOperation();
  return (
    <VMPTS.FlexOptionOperation>
      <Input
        placeholder={t("productTable.operation.searchPlaceholder")}
        value={searchTerm}
        onChange={(e) => dispatch(productsSlice.setSearchTerm(e.target.value))}
      />

      <Select value={filterCategory || "all"} onChange={handleCategoryChange} style={{ width: "40rem" }}>
        <Option value="all">{t("productTable.operation.filterCategoryAll")}</Option>
        {categories?.map((cat) => (
          <Option key={cat.id} value={String(cat.id)}>
            {cat.name}
          </Option>
        ))}
      </Select>

      <Select value={filterBrand || "all"} onChange={handleBrandChange} style={{ width: "40rem" }}>
        <Option value="all">{t("productTable.operation.filterBrandAll")}</Option>
        {brands?.map((brand) => (
          <Option key={brand.id} value={String(brand.id)}>
            {brand.name}
          </Option>
        ))}
      </Select>
    </VMPTS.FlexOptionOperation>
  );
}
