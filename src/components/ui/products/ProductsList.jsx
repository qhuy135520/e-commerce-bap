import React, { useEffect } from "react";
import { Select, Pagination, ConfigProvider, Rate } from "antd";
import { ProductListStyled as PLS, ProductFilterSidebar } from "@/components";
import useProducts from "@/hooks/products/useProducts";
import { formatCurrency } from "@/utils/helpers";
import noimage from "@/assets/images/noImage/noimage.jpg";
import { motion } from "framer-motion";

const { Option } = Select;

const ProductsList = () => {
  const {
    fetchDataProducts,
    paginatedProducts,
    handleSortChange,
    handlePageChange,
    handleFilterChange,
    page,
    pageSize,
    sort,
    brand,
    category,
    priceMin,
    priceMax,
    stock,
    bestSeller,
    brandList,
    categoryList,
    handleNavigate,
    t,
    totalProducts,
    minReview,
    isLoading,
  } = useProducts();

  useEffect(() => {
    fetchDataProducts();
  }, [fetchDataProducts]);

  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
      <ConfigProvider>
        <PLS.Container>
          <ProductFilterSidebar
            brandList={brandList}
            categoryList={categoryList}
            brand={brand}
            category={category}
            priceMin={priceMin}
            priceMax={priceMax}
            stock={stock}
            bestSeller={bestSeller}
            minReview={minReview}
            onFilterChange={handleFilterChange}
          />

          <PLS.Box>
            <PLS.TitleWrapper>
              <span className="title-text">{t("productList.title")}</span>
              <div className="divider"></div>
            </PLS.TitleWrapper>

            <Select
              value={sort}
              style={{ width: 200, marginBottom: 16 }}
              onChange={handleSortChange}
              placeholder={t("productList.filter.placeholder")}
            >
              <Option value="">{t("productList.filter.default")}</Option>
              <Option value="price-asc">{t("productList.filter.priceAsc")}</Option>
              <Option value="price-desc">{t("productList.filter.priceDesc")}</Option>
              <Option value="sales-asc">{t("productList.filter.salesAsc")}</Option>
              <Option value="sales-desc">{t("productList.filter.salesDesc")}</Option>
              <Option value="review-desc">{t("productList.filter.reviewDesc")}</Option>
            </Select>

            {isLoading ? <p>Đang tải...</p> : paginatedProducts.length === 0 ? <p>Không có sản phẩm nào.</p> : null}

            <PLS.ProductGrid>
              {paginatedProducts.map((product) => (
                <PLS.ProductItem key={product.id}>
                  <div className="product-card" onClick={() => handleNavigate(product.id)}>
                    <div className="image-wrapper">
                      <img src={product.images?.[0]?.imageUrl || noimage} alt={product.name} />
                    </div>

                    <div className="product-info">
                      {product.total_sold > 10 && <span className="badge">{t("productCard.bestSeller")}</span>}
                      {product.stock < 5 && <span className="badge badge-stock">{t("productCard.lowStock")}</span>}

                      <div>
                        <p className="brand">{product.brandName}</p>
                        <p className="name">{product.name}</p>
                        <p className="description">{product.description}</p>
                      </div>

                      <div className="bottom-info">
                        <p className="price">{formatCurrency(product.price)}</p>
                        <p className="sold-stock">
                          {t("productCard.sold")}: {product.total_sold || 0}
                        </p>
                      </div>
                      <Rate disabled allowHalf value={product.avgReview || 0} />
                    </div>
                  </div>
                </PLS.ProductItem>
              ))}
            </PLS.ProductGrid>

            <PLS.StyledPagination
              align="center"
              current={page}
              pageSize={pageSize}
              total={totalProducts}
              onChange={handlePageChange}
            />
          </PLS.Box>
        </PLS.Container>
      </ConfigProvider>
    </motion.div>
  );
};

export default ProductsList;
