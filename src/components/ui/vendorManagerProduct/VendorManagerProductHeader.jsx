import React from "react";

import { DividerTitle, HeadingStyled, VendorManagerProductHeaderStyled as VMPHS } from '@/components';

export default function VendorManagerProductHeader() {
  return (
    <VMPHS.FlexHeader justify="space-between">
      <div>
        <HeadingStyled as={"h2"}>
          <span>Quản lý sản phẩm</span> <DividerTitle type="vertical" />
        </HeadingStyled>
      </div>
    </VMPHS.FlexHeader>
  );
}
