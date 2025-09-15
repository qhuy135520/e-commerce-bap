import React from "react";
import { useTranslation } from "react-i18next";

import { DividerTitle, HeadingStyled, VendorManagerOrderHeaderStyled as VMOHS } from "@/components";

export default function VendorManagerOrderHeader() {
  const { t } = useTranslation(["vendor"]);

  return (
    <VMOHS.FlexHeader justify="space-between">
      <div>
        <HeadingStyled as={"h2"}>
          <span>{t("productTable.managerOrder")}</span> <DividerTitle type="vertical" />
        </HeadingStyled>
      </div>
    </VMOHS.FlexHeader>
  );
}
