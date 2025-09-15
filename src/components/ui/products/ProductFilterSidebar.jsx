import React, { useState, useEffect } from "react";
import { Checkbox, Input, Rate } from "antd";
import { useTranslation } from "react-i18next";

import { ProductListStyled as PLS } from "@/components";

const ProductFilterSidebar = ({
  brandList = [],
  categoryList = [],
  brand,
  category,
  priceMin,
  priceMax,
  stock,
  bestSeller,
  minReview,
  onFilterChange,
  isOpen,
  setIsOpen,
}) => {
  const [localPriceMin, setLocalPriceMin] = useState(priceMin || "");
  const [localPriceMax, setLocalPriceMax] = useState(priceMax || "");
  const { t } = useTranslation(["product"]);

  useEffect(() => {
    setLocalPriceMin(priceMin || "");
    setLocalPriceMax(priceMax || "");
  }, [priceMin, priceMax]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <PLS.Overlay $isOpen={isOpen} onClick={toggleSidebar} />
      <PLS.Sidebar $isOpen={isOpen}>
        <PLS.FilterGroup>
          <PLS.SidebarTitle>{t("filter.brand")}</PLS.SidebarTitle>
          {brandList.map((b) => (
            <PLS.FilterItem key={b.id}>
              <Checkbox checked={brand === b.id} onChange={() => onFilterChange({ brand: brand === b.id ? "" : b.id })}>
                {b.name}
              </Checkbox>
            </PLS.FilterItem>
          ))}
        </PLS.FilterGroup>

        <PLS.FilterGroup>
          <PLS.SidebarTitle>{t("filter.category")}</PLS.SidebarTitle>
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
          <PLS.SidebarTitle>{t("filter.priceRange")}</PLS.SidebarTitle>
          <Input
            placeholder={t("filter.minPrice")}
            type="number"
            value={localPriceMin}
            onChange={(e) => setLocalPriceMin(e.target.value)}
            onBlur={() => onFilterChange({ priceMin: Number(localPriceMin) || 0 })}
            style={{ marginBottom: 8 }}
          />
          <Input
            placeholder={t("filter.maxPrice")}
            type="number"
            value={localPriceMax}
            onChange={(e) => setLocalPriceMax(e.target.value)}
            onBlur={() => onFilterChange({ priceMax: Number(localPriceMax) || 0 })}
          />
        </PLS.FilterGroup>

        <PLS.FilterGroup>
          <PLS.SidebarTitle>{t("filter.status")}</PLS.SidebarTitle>
          <Checkbox checked={stock === "low"} onChange={() => onFilterChange({ stock: stock === "low" ? "" : "low" })}>
            {t("filter.lowStock")}
          </Checkbox>
          <Checkbox checked={bestSeller} onChange={() => onFilterChange({ bestSeller: !bestSeller })}>
            {t("filter.bestSeller")}
          </Checkbox>
        </PLS.FilterGroup>

        <PLS.FilterGroup>
          <PLS.SidebarTitle>{t("filter.minReview")}</PLS.SidebarTitle>
          {[5, 4, 3, 2, 1].map((r) => (
            <PLS.FilterItem key={r}>
              <Checkbox
                checked={Number(minReview) === r}
                onChange={() => onFilterChange({ minReview: Number(minReview) === r ? 0 : r })}
              >
                <Rate disabled defaultValue={r} />
                <span style={{ marginLeft: 8 }}>{t("filter.stars", { count: r })}</span>
              </Checkbox>
            </PLS.FilterItem>
          ))}
        </PLS.FilterGroup>
      </PLS.Sidebar>
    </>
  );
};

export default ProductFilterSidebar;
