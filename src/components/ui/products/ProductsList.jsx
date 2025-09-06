import React, { useEffect, useMemo } from "react";
import { Card, Select, Pagination, ConfigProvider, Typography } from "antd";

import { Loading, ProductListStyled as PLS } from "@/components";

import { productsThunk } from "@/stores/rootThunk";
import useProducts from "@/hooks/products/useProducts";

import noimage from "@/assets/images/noImage/noimage.jpg";

const { Option } = Select;
const { Title } = Typography;

const ProductsList = () => {
  const {
    sortedProducts,
    status,
    error,
    sort,
    page,
    pageSize,
    handleSortChange,
    handlePageChange,
    paginatedProducts,
    handleSort,
    dispatch,
    handleNavigate,
    t,
    vendorId,
  } = useProducts();

  useEffect(() => {
    dispatch(productsThunk.fetchAllProducts(vendorId));
  }, [dispatch, vendorId]);

  useEffect(() => {
    handleSort();
  }, [sort, dispatch]);

  const sortOptions = useMemo(
    () => [
      { value: "price-asc", label: t("productList.filter.priceAsc") },
      { value: "price-desc", label: t("productList.filter.priceDesc") },
      { value: "sales-asc", label: t("productList.filter.salesAsc") },
      { value: "sales-desc", label: t("productList.filter.salesDesc") },
    ],
    [t]
  );

  return (
    <ConfigProvider>
      <PLS.Container>
        <PLS.Box>
          <Title level={2}>{t("productList.title")}</Title>
          <PLS.SelectSort value={sort || t("productList.filter.placeholder")} onChange={handleSortChange}>
            {sortOptions.map((opt) => (
              <Option key={opt.value} value={opt.value}>
                {opt.label}
              </Option>
            ))}
          </PLS.SelectSort>
        </PLS.Box>

        <Loading isLoading={status === "loading"} error={error}>
          <PLS.ProductGrid>
            {paginatedProducts.map((product) => (
              <PLS.ProductItem onClick={() => handleNavigate(product.id)} key={product.id}>
                <Card>
                  <PLS.ProductImage src={product.images[0]?.imageUrl || noimage} alt={product.name} />
                  <p>{product.name}</p>
                  <p>${product.price}</p>
                  <p>
                    {t("productCard.sold")}: {product.total_sold}
                  </p>
                </Card>
              </PLS.ProductItem>
            ))}
          </PLS.ProductGrid>
          <Pagination
            align="center"
            current={page}
            pageSize={pageSize}
            total={sortedProducts.length}
            onChange={handlePageChange}
          />
        </Loading>
      </PLS.Container>
    </ConfigProvider>
  );
};

export default ProductsList;
