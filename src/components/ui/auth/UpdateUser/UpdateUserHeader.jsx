import React from "react";
import { BsArrowReturnLeft } from "react-icons/bs";
import { DividerTitle, OrderHistoryHeaderStyled as OHHS } from "@/components";
import { useTranslation } from "react-i18next";
import { FaUser } from "react-icons/fa";

export default function UpdateUserHeader({ onBackToUserList }) {
  const { t } = useTranslation(["auth"]);
  return (
    <OHHS.FlexOrderHeader>
      <div>
        <OHHS.HeadingWrapper as="h2">
          <OHHS.HistoryIconWrapper>
            <FaUser />
          </OHHS.HistoryIconWrapper>
          <span>{t("user.title")}</span>
          <DividerTitle type="vertical" />
        </OHHS.HeadingWrapper>
        <OHHS.OrderBreadcrumb items={[{ title: t("user.home") }, { title: t("user.title") }]} />
      </div>

      <OHHS.BackButton type="default" icon={<BsArrowReturnLeft />} onClick={onBackToUserList}>
        {t("user.backToHome")}
      </OHHS.BackButton>
    </OHHS.FlexOrderHeader>
  );
}
