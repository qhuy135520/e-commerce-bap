import { DividerTitle, HeadingStyled, CartHeaderStyled as CHS } from "@/components";
import { Breadcrumb, Button, Badge } from "antd";
import { CiShoppingCart } from "react-icons/ci";
import { BsArrowReturnLeft } from "react-icons/bs";

export default function CartHeader({ itemCount = 0, onBackToShop }) {
  return (
    <CHS.FlexCartHeader justify="space-between" align="center">
      <div>
        <HeadingStyled as="h2" style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <CiShoppingCart style={{ color: "var(--color-brand-600)", fontSize: 28 }} />
          <span>
            Giỏ hàng{" "}
            <Badge
              count={itemCount}
              style={{
                backgroundColor: "var(--color-red-700)",
                marginLeft: 8,
              }}
            />
          </span>
          <DividerTitle type="vertical" />
        </HeadingStyled>

        <Breadcrumb
          items={[{ title: "Trang chủ" }, { title: "Giỏ hàng" }]}
          style={{ marginTop: 4, fontSize: 13, color: "var(--color-grey-500)" }}
        />
      </div>

      <Button
        type="default"
        icon={<bi />}
        onClick={onBackToShop}
        style={{
          borderRadius: "6px",
          borderColor: "var(--color-grey-300)",
          color: "var(--color-grey-700)",
        }}
      >
        Tiếp tục mua sắm
      </Button>
    </CHS.FlexCartHeader>
  );
}
