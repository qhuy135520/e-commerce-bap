import React from "react";

import { DividerTitle, HeadingStyled, VendorManagerOrderHeaderStyled as VMOHS } from "@/components";

export default function VendorManagerOrderHeader() {
  return (
    <VMOHS.FlexHeader justify="space-between">
      <div>
        <HeadingStyled as={"h2"}>
          <span>Quản lý đơn hàng</span> <DividerTitle type="vertical" />
        </HeadingStyled>
      </div>
    </VMOHS.FlexHeader>
  );
}
