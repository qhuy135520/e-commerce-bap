import React from "react";
import { Button } from "antd";
import { formatDate } from "date-fns/format";

import { OrderHistoryTableStyled as OHTS } from "@/components";

import { formatCurrency } from "@/utils/helpers";

export default function OrderHistoryTable() {
  return (
    <>
      <OHTS.OrderWrapper>
        <OHTS.OrderTitleHeader>
          <OHTS.StatusOrder>HOÀN THÀNH</OHTS.StatusOrder>
          <p> {formatDate(new Date(), "dd/MM/yyyy")}</p>
        </OHTS.OrderTitleHeader>
        <hr />
        <OHTS.OrderVendor>
          <OHTS.VendorName>yutianing3.vn</OHTS.VendorName>
          <OHTS.OrderContent>
            <OHTS.ItemInfo>
              <OHTS.Image src="https://bizweb.dktcdn.net/thumb/1024x1024/100/401/951/products/iphone-14-pro-29-ff5703aa-730b-41fb-a818-3e4a2bd7c314.jpg?v=1730111476340" />
              <OHTS.InfoItem>
                <p>Iphon 14 Promax sieu cap prono1</p>
                <p>x1</p>
              </OHTS.InfoItem>
            </OHTS.ItemInfo>
            <OHTS.Price>{formatCurrency("2999999")}</OHTS.Price>
          </OHTS.OrderContent>
          <OHTS.OrderContent>
            <OHTS.ItemInfo>
              <OHTS.Image src="https://bizweb.dktcdn.net/thumb/1024x1024/100/401/951/products/iphone-14-pro-29-ff5703aa-730b-41fb-a818-3e4a2bd7c314.jpg?v=1730111476340" />
              <OHTS.InfoItem>
                <p>Iphon 14 Promax sieu cap prono1</p>
                <p>x1</p>
              </OHTS.InfoItem>
            </OHTS.ItemInfo>
            <OHTS.Price>{formatCurrency("2999999")}</OHTS.Price>
          </OHTS.OrderContent>
        </OHTS.OrderVendor>
        <OHTS.OrderVendor>
          <OHTS.VendorName>yutianing3.vn</OHTS.VendorName>
          <OHTS.OrderContent>
            <OHTS.ItemInfo>
              <OHTS.Image src="https://bizweb.dktcdn.net/thumb/1024x1024/100/401/951/products/iphone-14-pro-29-ff5703aa-730b-41fb-a818-3e4a2bd7c314.jpg?v=1730111476340" />
              <OHTS.InfoItem>
                <p>Iphon 14 Promax sieu cap prono1</p>
                <p>x1</p>
              </OHTS.InfoItem>
            </OHTS.ItemInfo>
            <OHTS.Price>{formatCurrency("2999999")}</OHTS.Price>
          </OHTS.OrderContent>
        </OHTS.OrderVendor>
        <hr />
        <OHTS.ActionButton>
          <p>
            Thành tiền: <OHTS.PriceTotal>{formatCurrency("9999999")}</OHTS.PriceTotal>
          </p>
          <Button size="large" color="red" variant="solid">
            Mua lại
          </Button>
        </OHTS.ActionButton>
      </OHTS.OrderWrapper>
    </>
  );
}
