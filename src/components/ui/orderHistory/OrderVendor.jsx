import React from "react";
import { OrderHistoryTableStyled as OHTS, OrderItemInfo } from "@/components";

export default function OrderVendor({ productByVendor, orderStatus }) {
  return (
    <>
      {productByVendor.map((vendor) => (
        <OHTS.OrderVendor key={vendor.vendorId}>
          <OHTS.VendorHeader>
            <OHTS.VendorName>{vendor.vendorName}</OHTS.VendorName>
            <OHTS.SmallMuted>{vendor.products.length} sản phẩm</OHTS.SmallMuted>
          </OHTS.VendorHeader>

          <OHTS.OrderContent>
            <OrderItemInfo vendorProduct={vendor.products} orderStatus={orderStatus} />
          </OHTS.OrderContent>
        </OHTS.OrderVendor>
      ))}
    </>
  );
}
