import React from "react";
import { Typography, Rate } from "antd";

import useProducts from "@/hooks/products/useProducts";
import noimage from "@/assets/images/NoImage/noimage.jpg";

import { ProductsRandom as S } from "@/components";
import { formatCurrency } from "@/utils/helpers";

const { Title } = Typography;

export default function ProductsRandom() {
  const { randomProducts, handleNavigate, t } = useProducts();

  return (
    <S.Container>
      <Title level={2}>{t("productSuggest.title")}</Title>
      <S.RandomProductGrid>
        {randomProducts.map((product) => (
          <S.ProductItem onClick={() => handleNavigate(product.id)} key={product.id}>
            <S.ProductImage src={product.images?.[0]?.imageUrl || noimage} alt={product.name} />
            <S.RateWrapper>
              <Rate disabled allowHalf value={product.avgReview || 0} />
            </S.RateWrapper>
            <S.Overlay>
              <p className="name">{product.name}</p>
              <p className="price">{formatCurrency(product.price)}</p>
              <p className="sold">
                {t("productCard.sold")}: {product.total_sold}
              </p>
            </S.Overlay>
          </S.ProductItem>
        ))}
      </S.RandomProductGrid>
    </S.Container>
  );
}
