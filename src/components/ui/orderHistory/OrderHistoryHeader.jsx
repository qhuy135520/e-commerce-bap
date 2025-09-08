import { DividerTitle, HeadingStyled, OrderHistoryHeaderStyled as OHHS } from "@/components";
import React from "react";

export default function OrderHistoryHeader() {
  return (
    <OHHS.FlexOrderHeader justify="space-between">
      <div>
        <HeadingStyled as={"h2"}>
          <span>Đơn hàng của bạn</span> <DividerTitle type="vertical" />
        </HeadingStyled>
      </div>
    </OHHS.FlexOrderHeader>
  );
}
