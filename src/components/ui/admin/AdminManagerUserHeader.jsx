import React from "react";
import { useTranslation } from "react-i18next";

import { DividerTitle, HeadingStyled, AdminManagerUserStyled as AMUS } from "@/components";

export default function AdminManagerUserHeader() {
  const { t } = useTranslation(["admin"]);
  return (
    <AMUS.FlexHeader justify="space-between">
      <div>
        <HeadingStyled as="h2">
          <span>{t("user.userManager")}</span> <DividerTitle type="vertical" />
        </HeadingStyled>
      </div>
    </AMUS.FlexHeader>
  );
}
