import { Card, Pagination } from "antd";

import useSearchProducts from "@/hooks/useProduct/useSearchProduct";

import { Loading } from "@/components/common";

import * as Styled from "@/components/ui/Products/ProductsList.styled";
import noimage from "@/assets/images/noImage/noimage.jpg";
import { formatCurrency } from "@/utils/helpers";

export default function SearchResult() {
  const { products, totalProducts, status, query, page, pageSize, handleNavigate, handlePageChange, t } =
    useSearchProducts();

  if (status === "succeeded" && !products.length) return <p>No results for "{query}"</p>;

  return (
    <Loading isLoading={status === "loading"}>
      <Styled.ProductGrid>
        {products.map((product) => (
          <Styled.ProductItem key={product.id}>
            <div className="product-card" onClick={() => handleNavigate(product.id)}>
              <div className="image-wrapper">
                <img src={product.images[0]?.imageUrl || noimage} alt={product.name} />
              </div>

              <div className="product-info">
                {product.total_sold > 10 && <span className="badge">Bán chạy</span>}
                {product.stock < 5 && <span className="badge badge-stock">Sắp hết hàng</span>}

                <div>
                  <p className="brand">{product.brandname}</p>
                  <p className="name">{product.name}</p>
                  <p className="description">{product.description}</p>
                </div>

                <div>
                  <p className="price">{formatCurrency(product.price)}</p>
                  <p className="sold-stock">
                    Đã bán: {product.total_sold || 0} | Còn lại: {product.stock || 0}
                  </p>
                </div>
              </div>
            </div>
          </Styled.ProductItem>
        ))}
      </Styled.ProductGrid>

      <Pagination align="center" current={page} pageSize={pageSize} total={totalProducts} onChange={handlePageChange} />
    </Loading>
  );
}
