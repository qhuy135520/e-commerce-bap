import React from "react";
import { DividerTitle, HeadingStyled, VendorDashboardChartHeaderStyled as VDCHS } from "@/components";

export default function VendorDashboardChartHeader() {
  return (
    <VDCHS.FlexHeader justify="space-between">
      <div>
        <HeadingStyled as={"h2"}>
          <span>Dashboard</span> <DividerTitle type="vertical" />
        </HeadingStyled>
      </div>
    </VDCHS.FlexHeader>
  );
}
