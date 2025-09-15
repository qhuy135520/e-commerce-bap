import { Breadcrumb, Button, Row } from "antd";
import { BsArrowReturnLeft } from "react-icons/bs";
import styled from "styled-components";
import { BiWalletAlt } from "react-icons/bi";

import { DividerTitle, HeadingStyled } from "@/components";

export const FlexDepositHeader = styled(Row)`
  margin: 1.4rem 0;
  padding: 1.8rem 2rem;
  width: 100%;
  border-radius: 1rem;
`;

export default function DepositHeader({ onBackToHome }) {
  return (
    <FlexDepositHeader justify="space-between" align="center">
      <div>
        <HeadingStyled as="h2" style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <BiWalletAlt style={{ color: "var(--color-brand-600)", fontSize: 28 }} />
          <span>Nạp tiền</span>
          <DividerTitle type="vertical" />
        </HeadingStyled>

        <Breadcrumb
          items={[{ title: "Trang chủ" }, { title: "Nạp tiền" }]}
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
        Quay về Trang chủ
      </Button>
    </FlexDepositHeader>
  );
}
