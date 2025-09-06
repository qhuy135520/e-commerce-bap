import React from "react";
import { Card, Typography } from "antd";

import { ProductListStyled as PLS } from "@/components/ui/products";

import useProducts from "@/hooks/products/useProducts";

import noimage from "@/assets/images/noImage/noimage.jpg";

const { Title } = Typography;

export default function ProductsRandom() {
  const { randomProducts, handleNavigate, t } = useProducts();

  return (
    <>
      <Title level={2}>{t("productSuggest.title")}</Title>
      <PLS.RandomProductGrid>
        {randomProducts.map((product) => (
          <PLS.ProductItem onClick={() => handleNavigate(product.id)} key={product.id}>
            <Card>
              <PLS.ProductImage src={product.image || noimage} alt={product.name} />
              <p>{product.name}</p>
              <p>${product.price}</p>
              <p>
                {t("productCard.sold")}: {product.total_sold}
              </p>
            </Card>
          </PLS.ProductItem>
        ))}
      </PLS.RandomProductGrid>
    </>
  );
}
