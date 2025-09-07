import { DividerTitle, HeadingStyled, CartHeaderStyled as CHS } from "@/components";

export default function CartHeader() {
  return (
    <CHS.FlexCartHeader justify="space-between">
      <div>
        <HeadingStyled as={"h2"}>
          <span>Giỏ hàng</span> <DividerTitle type="vertical" />
        </HeadingStyled>
      </div>
    </CHS.FlexCartHeader>
  );
}
