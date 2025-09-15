import React from "react";
import { BsArrowReturnLeft } from "react-icons/bs";
import { BiHistory } from "react-icons/bi";

import { DividerTitle, OrderHistoryHeaderStyled as OHHS } from "@/components";
import { useTranslation } from "react-i18next";

export default function OrderHistoryHeader({ onBackToHome }) {
  const { t } = useTranslation(["order"]);
  return (
    <OHHS.FlexOrderHeader>
      <div>
        <OHHS.HeadingWrapper as="h2">
          <OHHS.HistoryIconWrapper>
            <BiHistory />
          </OHHS.HistoryIconWrapper>
          <span>{t("order.history.title")}</span>
          <DividerTitle type="vertical" />
        </OHHS.HeadingWrapper>
        <OHHS.OrderBreadcrumb
          items={[{ title: t("order.history.breadcrumb.home") }, { title: t("order.history.breadcrumb.orderHistory") }]}
        />
      </div>

      <OHHS.BackButton type="default" icon={<BsArrowReturnLeft />} onClick={onBackToHome}>
        {t("order.history.backButton")}
      </OHHS.BackButton>
    </OHHS.FlexOrderHeader>
  );
}
