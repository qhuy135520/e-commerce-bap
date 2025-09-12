import { DividerTitle, HeadingStyled, OrderHistoryHeaderStyled as OHHS } from "@/components";
import { Breadcrumb, Button } from "antd";
import { HistoryOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import React from "react";

export default function OrderHistoryHeader({ onBackToHome }) {
  return (
    <OHHS.FlexOrderHeader justify="space-between" align="center">
      <div>
        <HeadingStyled as="h2" style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <HistoryOutlined style={{ color: "var(--color-brand-600)", fontSize: 28 }} />
          <span>Lịch sử đặt hàng</span>
          <DividerTitle type="vertical" />
        </HeadingStyled>

        <Breadcrumb
          items={[{ title: "Trang chủ" }, { title: "Lịch sử đặt hàng" }]}
          style={{ marginTop: 4, fontSize: 13, color: "var(--color-grey-500)" }}
        />
      </div>

      <Button
        type="default"
        icon={<ArrowLeftOutlined />}
        onClick={onBackToHome}
        style={{
          borderRadius: "6px",
          borderColor: "var(--color-grey-300)",
          color: "var(--color-grey-700)",
        }}
      >
        Quay lại trang chủ
      </Button>
    </OHHS.FlexOrderHeader>
  );
}
