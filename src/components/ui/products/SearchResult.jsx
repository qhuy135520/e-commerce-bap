import { Card, Pagination } from "antd";

import useSearchProducts from "@/hooks/useProduct/useSearchProduct";

import { Loading } from "@/components/common";

import * as Styled from "@/components/ui/Products/ProductsList.styled";
import noimage from "@/assets/images/noImage/noimage.jpg";

export default function SearchResult() {
  const { products, totalProducts, status, query, page, pageSize, handleNavigate, handlePageChange, t } =
    useSearchProducts();

  if (status === "succeeded" && !products.length) return <p>No results for "{query}"</p>;

  return (
    <Loading isLoading={status === "loading"}>
      <Styled.ProductGrid>
        {products.map((product) => (
          <Styled.ProductItem onClick={() => handleNavigate(product.id)} key={product.id}>
            <Card>
              <Styled.ProductImage src={product.images[0]?.imageUrl || noimage} alt={product.name} />
              <p>{product.name}</p>
              <p>${product.price}</p>
              <p>
                {t("productCard.sold")}: {product.total_sold}
              </p>
            </Card>
          </Styled.ProductItem>
        ))}
      </Styled.ProductGrid>

      <Pagination align="center" current={page} pageSize={pageSize} total={totalProducts} onChange={handlePageChange} />
    </Loading>
  );
}
