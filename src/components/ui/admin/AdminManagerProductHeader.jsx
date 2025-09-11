import React from "react";
import { DividerTitle, HeadingStyled } from "@/components";
import * as AMUS from "@/components/ui/admin/AdminManagerUser.styled";

export default function AdminManagerProductHeader() {
  return (
    <AMUS.FlexHeader justify="space-between">
      <div>
        <HeadingStyled as="h2">
          <span>Quản lý sản phẩm</span> <DividerTitle type="vertical" />
        </HeadingStyled>
      </div>
    </AMUS.FlexHeader>
  );
}
