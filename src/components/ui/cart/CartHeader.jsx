import { CiShoppingCart } from "react-icons/ci";
import { BsArrowReturnLeft } from "react-icons/bs";

import { CartHeaderStyled as CHS, DividerTitle } from "@/components";
import { useTranslation } from "react-i18next";

export default function CartHeader({ itemCount = 0, onBackToShop }) {
  const { t } = useTranslation(["cart"]);
  return (
    <CHS.FlexCartHeader>
      <div>
        <CHS.HeadingWrapper as="h2">
          <CHS.CartIconWrapper>
            <CiShoppingCart />
          </CHS.CartIconWrapper>
          <span>
            {t("header.title")}
            <CHS.CartBadge count={itemCount} />
          </span>
          <DividerTitle type="vertical" />
        </CHS.HeadingWrapper>
        <CHS.CartBreadcrumb items={[{ title: t("header.home") }, { title: t("header.cart") }]} />
      </div>

      <CHS.BackButton type="default" icon={<BsArrowReturnLeft />} onClick={onBackToShop}>
        {t("header.back")}
      </CHS.BackButton>
    </CHS.FlexCartHeader>
  );
}
