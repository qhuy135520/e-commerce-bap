import React from "react";

import { DividerTitle, HeadingStyled, VendorManagerProductHeaderStyled as VMPHS } from "@/components";

export default function VendorUpdateInfoHeader() {
  return (
    <VMPHS.FlexHeader justify="space-between">
      <div>
        <HeadingStyled as={"h2"}>
          <span>Cập nhật thông tin</span> <DividerTitle type="vertical" />
        </HeadingStyled>
      </div>
    </VMPHS.FlexHeader>
  );
}
