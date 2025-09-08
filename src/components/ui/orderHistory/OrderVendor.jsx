import React from "react";

import { OrderHistoryTableStyled as OHTS, OrderItemInfo } from "@/components";

export default function OrderVendor({ productByVendor }) {
  return (
    <>
      {productByVendor.map((vendor, index) => (
        <OHTS.OrderVendor key={index}>
          <OHTS.VendorName>{vendor.vendorName}</OHTS.VendorName>
          <OHTS.OrderContent>
            <OrderItemInfo vendorProduct={vendor.products} />
          </OHTS.OrderContent>
        </OHTS.OrderVendor>
      ))}
    </>
  );
}
