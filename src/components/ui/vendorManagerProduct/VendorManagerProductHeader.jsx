import React from "react";
import { useTranslation } from "react-i18next";

import { DividerTitle, HeadingStyled, VendorManagerProductHeaderStyled as VMPHS } from "@/components";

export default function VendorManagerProductHeader() {
  const { t } = useTranslation(["vendor"]);
  return (
    <VMPHS.FlexHeader justify="space-between">
      <div>
        <HeadingStyled as={"h2"}>
          <span>{t("productTable.managerProduct")}</span> <DividerTitle type="vertical" />
        </HeadingStyled>
      </div>
    </VMPHS.FlexHeader>
  );
}
