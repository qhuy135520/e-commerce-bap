import React from "react";
import { DividerTitle, HeadingStyled, AdminManagerUserStyled as AMUS } from "@/components";

export default function AdminManagerUserHeader() {
  return (
    <AMUS.FlexHeader justify="space-between">
      <div>
        <HeadingStyled as="h2">
          <span>Quản lý người dùng</span> <DividerTitle type="vertical" />
        </HeadingStyled>
      </div>
    </AMUS.FlexHeader>
  );
}
