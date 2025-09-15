import { Breadcrumb, Button } from "antd";
import { BiShoppingBag } from "react-icons/bi";
import { BsArrowReturnLeft } from "react-icons/bs";

import { DividerTitle, HeadingStyled, CartHeaderStyled as CHS } from "@/components";

export default function OrderHeader({ onBackToCart }) {
  return (
    <CHS.FlexCartHeader justify="space-between" align="center">
      <div>
        <HeadingStyled as="h2" style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <BiShoppingBag style={{ color: "var(--color-brand-600)", fontSize: 28 }} />
          <span>Đặt hàng</span>
          <DividerTitle type="vertical" />
        </HeadingStyled>

        <Breadcrumb
          items={[{ title: "Trang chủ" }, { title: "Giỏ hàng" }, { title: "Đặt hàng" }]}
          style={{ marginTop: 4, fontSize: 13, color: "var(--color-grey-500)" }}
        />
      </div>

      <Button
        type="default"
        icon={<BsArrowReturnLeft />}
        onClick={onBackToCart}
        style={{
          borderRadius: "6px",
          borderColor: "var(--color-grey-300)",
          color: "var(--color-grey-700)",
        }}
      >
        Quay lại giỏ hàng
      </Button>
    </CHS.FlexCartHeader>
  );
}
