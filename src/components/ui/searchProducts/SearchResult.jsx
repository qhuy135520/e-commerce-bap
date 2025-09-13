import { Card, Pagination, Rate } from "antd";

import useSearchProducts from "@/hooks/useProduct/useSearchProduct";

import { EmptyCommon, Loading } from "@/components/common";

import * as Styled from "@/components/ui/Products/ProductsList.styled";
import noimage from "@/assets/images/noImage/noimage.jpg";
import { formatCurrency } from "@/utils/helpers";

export default function SearchResult() {
  const { products, totalProducts, status, query, page, pageSize, handleNavigate, handlePageChange, t } =
    useSearchProducts();

  if (status === "succeeded" && !products.length)
    <EmptyCommon description={<p>No results for {query}</p>} buttonText={null} />;
  console.log(products);

  return (
    <Loading isLoading={status === "loading"}>
      <Styled.Header>
        <h2>Kết quả tìm kiếm</h2>
      </Styled.Header>
      <Styled.ProductGrid>
        {products.map((product) => (
          <Styled.ProductItem key={product.id}>
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
          </Styled.ProductItem>
        ))}
      </Styled.ProductGrid>

      <Pagination align="center" current={page} pageSize={pageSize} total={totalProducts} onChange={handlePageChange} />
    </Loading>
  );
}
