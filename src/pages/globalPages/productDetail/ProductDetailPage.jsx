import React from "react";
import { useParams } from "react-router-dom";
import { Col, Row } from "antd";

import { InfoVendor, ProductImage, ProductInfo, Loading, ProductDetailStyled as PDS } from "@/components";

import { useProductDetail } from "@/hooks/productDetail/useProductDetail";

export default function ProductDetail() {
  const { id } = useParams();
  const { isLoadingProduct, settings, productDetail, quantity, setQuantity, handleIncrease, handleDecrease, error } =
    useProductDetail(id);
  return (
    <Loading isLoading={isLoadingProduct} error={error}>
      <PDS.ProductPage>
        <PDS.ProductDetail>
          <Row gutter={[12, 12]}>
            <Col sm={12} lg={10}>
              <ProductImage productDetail={productDetail} settings={settings} />
            </Col>
            <Col sm={12} lg={14}>
              <ProductInfo
                productDetail={productDetail}
                quantity={quantity}
                onIncrease={handleIncrease}
                onDecrease={handleDecrease}
                onQuantity={setQuantity}
              />
            </Col>
          </Row>
        </PDS.ProductDetail>
        <InfoVendor />
      </PDS.ProductPage>
    </Loading>
  );
}
