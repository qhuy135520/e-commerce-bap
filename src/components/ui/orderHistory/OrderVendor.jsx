import React from "react";
import { OrderHistoryTableStyled as OHTS, OrderItemInfo } from "@/components";
import { useTranslation } from "react-i18next";

export default function OrderVendor({ productByVendor, orderStatus }) {
  const { t } = useTranslation(["order"]);

  return (
    <>
      {productByVendor.map((vendor) => (
        <OHTS.OrderVendor key={vendor.vendorId}>
          <OHTS.VendorHeader>
            <OHTS.VendorName>{vendor.vendorName}</OHTS.VendorName>
            <OHTS.SmallMuted>
              {vendor.products.length} {t("order.products")}
            </OHTS.SmallMuted>
          </OHTS.VendorHeader>

          <OHTS.OrderContent>
            <OrderItemInfo vendorProduct={vendor.products} orderStatus={orderStatus} />
          </OHTS.OrderContent>
        </OHTS.OrderVendor>
      ))}
    </>
  );
}
