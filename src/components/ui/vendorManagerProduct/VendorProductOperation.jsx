import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input, Select } from "antd";

import { categorySelector, brandSelector, productsSelector } from "@/stores/rootSelector";
import { productsSlice } from "@/stores/rootReducer";

import { VendorManagerProductTableStyled as VMPTS } from "@/components";

const { Option } = Select;

export default function VendorProductOperation() {
  const dispatch = useDispatch();

  const { searchTerm, filterCategory, filterBrand } = useSelector(productsSelector.selectFilteredProductsVendor);
  const categories = useSelector(categorySelector.selectCategoryItems);
  const brands = useSelector(brandSelector.selectBrandItems);

  return (
    <VMPTS.FlexOptionOperation>
      <Input
        type="text"
        placeholder="Tìm kiếm sản phẩm..."
        value={searchTerm}
        onChange={(e) => dispatch(productsSlice.setSearchTerm(e.target.value))}
      />

      <Select
        value={filterCategory || "all"}
        onChange={(value) => dispatch(productsSlice.setFilterCategory(value))}
        style={{ width: "40rem" }}
      >
        <Option value="all">-- Tất cả danh mục --</Option>
        {categories?.map((cat) => (
          <Option key={cat.id} value={cat.id}>
            {cat.name}
          </Option>
        ))}
      </Select>

      <Select
        value={filterBrand || "all"}
        onChange={(value) => dispatch(productsSlice.setFilterBrand(value))}
        style={{ width: "40rem" }}
      >
        <Option value="all">-- Tất cả thương hiệu --</Option>
        {brands?.map((brand) => (
          <Option key={brand.id} value={brand.id}>
            {brand.name}
          </Option>
        ))}
      </Select>
    </VMPTS.FlexOptionOperation>
  );
}
