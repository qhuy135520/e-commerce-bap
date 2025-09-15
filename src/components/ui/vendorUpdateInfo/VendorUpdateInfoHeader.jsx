import React from "react";

import { DividerTitle, HeadingStyled, VendorManagerProductHeaderStyled as VMPHS } from "@/components";
import { useTranslation } from "react-i18next";

export default function VendorUpdateInfoHeader() {
  const { t } = useTranslation(["vendor"]);

  return (
    <VMPHS.FlexHeader justify="space-between">
      <div>
        <HeadingStyled as={"h2"}>
          <span>{t("productTable.updateInfo")}</span> <DividerTitle type="vertical" />
        </HeadingStyled>
      </div>
    </VMPHS.FlexHeader>
  );
}
