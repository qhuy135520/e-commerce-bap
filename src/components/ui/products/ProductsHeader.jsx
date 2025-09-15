import { Breadcrumb, Row } from "antd";
import { BiHome } from "react-icons/bi";

import { DividerTitle, HeadingStyled } from "@/components";

import styled from "styled-components";

export const FlexHomeHeader = styled(Row)`
  margin: 1.4rem 0;
  padding: 1.8rem 2rem;
  width: 100%;
  border-radius: 1rem;
`;

export default function ProductsHeader() {
  return (
    <FlexHomeHeader justify="space-between" align="center">
      <div>
        <HeadingStyled as="h2" style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <BiHome style={{ color: "var(--color-brand-600)", fontSize: 28 }} />
          <span>Trang chủ</span>
          <DividerTitle type="vertical" />
        </HeadingStyled>

        <Breadcrumb
          items={[{ title: "Trang chủ" }]}
          style={{ marginTop: 4, fontSize: 13, color: "var(--color-grey-500)" }}
        />
      </div>
    </FlexHomeHeader>
  );
}
