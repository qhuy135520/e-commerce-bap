import { DividerTitle, HeadingStyled } from "@/components";
import { Breadcrumb, Button, Row } from "antd";
import styled from "styled-components";
import { FaUser } from "react-icons/fa";
import { BsArrowReturnLeft } from "react-icons/bs";

export const FlexUserHeader = styled(Row)`
  margin: 1.4rem 0;
  padding: 1.8rem 2rem;
  width: 100%;
  border-radius: 1rem;
`;

export default function UpdateUserHeader({ onBackToUserList }) {
  return (
    <FlexUserHeader justify="space-between" align="center">
      <div>
        <HeadingStyled as="h2" style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <FaUser style={{ color: "var(--color-brand-600)", fontSize: 28 }} />
          <span>Người dùng</span>
          <DividerTitle type="vertical" />
        </HeadingStyled>

        <Breadcrumb
          items={[{ title: "Trang chủ" }, { title: "Người dùng" }]}
          style={{ marginTop: 4, fontSize: 13, color: "var(--color-grey-500)" }}
        />
      </div>

      <Button
        type="default"
        icon={<BsArrowReturnLeft />}
        onClick={onBackToUserList}
        style={{
          borderRadius: "6px",
          borderColor: "var(--color-grey-300)",
          color: "var(--color-grey-700)",
        }}
      >
        Quay về danh sách
      </Button>
    </FlexUserHeader>
  );
}
