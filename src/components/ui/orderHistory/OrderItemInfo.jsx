import React from "react";

import { OrderHistoryTableStyled as OHTS } from "@/components";

import { formatCurrency } from "@/utils/helpers";

export default function OrderItemInfo({ vendorProduct }) {
  return (
    <>
      {vendorProduct.map((product, index) => (
        <OHTS.ItemInfo key={index}>
          <OHTS.ItemLeft>
            <OHTS.Image src={product.productImg} alt="product-img" />
            <OHTS.InfoItem>
              <p>{product.productName}</p>
              <p>x{product.quantity}</p>
            </OHTS.InfoItem>
          </OHTS.ItemLeft>
          <OHTS.Price>{formatCurrency(product.price)}</OHTS.Price>
        </OHTS.ItemInfo>
      ))}
    </>
  );
}
