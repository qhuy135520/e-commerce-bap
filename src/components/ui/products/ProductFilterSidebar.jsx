import React, { useState, useEffect } from "react";
import { Checkbox, Input } from "antd";
import { ProductListStyled as PLS } from "@/components";

const ProductFilterSidebar = ({
  brandList,
  categoryList,
  brand,
  category,
  priceMin,
  priceMax,
  stock,
  bestSeller,
  onFilterChange,
}) => {
  const [localPriceMin, setLocalPriceMin] = useState(priceMin || "");
  const [localPriceMax, setLocalPriceMax] = useState(priceMax || "");

  useEffect(() => {
    setLocalPriceMin(priceMin || "");
    setLocalPriceMax(priceMax || "");
  }, [priceMin, priceMax]);

  return (
    <PLS.Sidebar>
      <PLS.FilterGroup>
        <PLS.SidebarTitle>Thương hiệu</PLS.SidebarTitle>
        {brandList.map((b) => (
          <PLS.FilterItem key={b.id}>
            <Checkbox checked={brand === b.id} onChange={() => onFilterChange({ brand: brand === b.id ? "" : b.id })}>
              {b.name}
            </Checkbox>
          </PLS.FilterItem>
        ))}
      </PLS.FilterGroup>

      <PLS.FilterGroup>
        <PLS.SidebarTitle>Danh mục</PLS.SidebarTitle>
        {categoryList.map((c) => (
          <PLS.FilterItem key={c.id}>
            <Checkbox
              checked={category === c.id}
              onChange={() => onFilterChange({ category: category === c.id ? "" : c.id })}
            >
              {c.name}
            </Checkbox>
          </PLS.FilterItem>
        ))}
      </PLS.FilterGroup>

      <PLS.FilterGroup>
        <PLS.SidebarTitle>Khoảng giá</PLS.SidebarTitle>
        <Input
          placeholder="Giá min"
          type="number"
          value={localPriceMin}
          onChange={(e) => setLocalPriceMin(e.target.value)}
          onBlur={() => onFilterChange({ priceMin: Number(localPriceMin) })}
          style={{ marginBottom: 8 }}
        />
        <Input
          placeholder="Giá max"
          type="number"
          value={localPriceMax}
          onChange={(e) => setLocalPriceMax(e.target.value)}
          onBlur={() => onFilterChange({ priceMax: Number(localPriceMax) })}
        />
      </PLS.FilterGroup>

      <PLS.FilterGroup>
        <PLS.SidebarTitle>Trạng thái</PLS.SidebarTitle>
        <Checkbox checked={stock === "low"} onChange={() => onFilterChange({ stock: stock === "low" ? "" : "low" })}>
          Sắp hết hàng
        </Checkbox>
        <Checkbox checked={bestSeller} onChange={() => onFilterChange({ bestSeller: !bestSeller })}>
          Bán chạy
        </Checkbox>
      </PLS.FilterGroup>
    </PLS.Sidebar>
  );
};

export default ProductFilterSidebar;
