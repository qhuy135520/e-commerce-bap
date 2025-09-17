import { Breadcrumb, Button, Row } from "antd";
import { BsArrowReturnLeft } from "react-icons/bs";
import styled from "styled-components";
import { BiWalletAlt } from "react-icons/bi";

import { DividerTitle, HeadingStyled } from "@/components";
import { useTranslation } from "react-i18next";

export const FlexDepositHeader = styled(Row)`
  margin: 1.4rem 0;
  padding: 1.8rem 2rem;
  width: 100%;
  border-radius: 1rem;
`;

export default function DepositHeader({ onBackToHome }) {
  const { t } = useTranslation(["deposit"]);

  return (
    <FlexDepositHeader justify="space-between" align="center">
      <div>
        <HeadingStyled as="h2" style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <BiWalletAlt style={{ color: "var(--color-brand-600)", fontSize: 28 }} />
          <span>{t("tab.deposit")}</span>
          <DividerTitle type="vertical" />
        </HeadingStyled>

        <Breadcrumb
          items={[{ title: t("breadcrumb.home") }, { title: t("breadcrumb.deposit") }]}
          style={{ marginTop: 4, fontSize: 13, color: "var(--color-grey-500)" }}
        />
      </div>

      <Button
        type="default"
        icon={<BsArrowReturnLeft />}
        onClick={onBackToHome}
        style={{
          borderRadius: "6px",
          borderColor: "var(--color-grey-300)",
          color: "var(--color-grey-700)",
        }}
      >
        {t("button.backHome")}
      </Button>
    </FlexDepositHeader>
  );
}
