import { useMemo } from "react";
import { List, Typography } from "antd";

import { CartPopoverContentStyled as CPS } from "@/components";

import NoImage from "@/assets/images/NoImage/noimage.jpg";
import i18n from "@/configs/i18n/i18n";
import { formatCurrency } from "@/utils/helpers";

const { Text } = Typography;

export default function CartPopoverContent({ cart, t }) {
  if (!cart || cart.length === 0) {
    return <Text>{t("header.cartEmpty")}</Text>;
  }

  const dataWithHeader = useMemo(
    () => [
      {
        isHeader: true,
        productName: t("header.product"),
        quantity: t("header.quantity"),
        productPrice: t("header.price"),
      },
      ...cart,
    ],
    [i18n.language]
  );

  return (
    <List
      size="small"
      dataSource={dataWithHeader}
      renderItem={(item) =>
        item.isHeader ? (
          <CPS.HeaderListItem>
            <CPS.ProductName>{item.productName}</CPS.ProductName>
            <CPS.QuantityText>{item.quantity}</CPS.QuantityText>
            <CPS.PriceText>{item.productPrice}</CPS.PriceText>
          </CPS.HeaderListItem>
        ) : (
          <CPS.ListItem>
            <CPS.ProductInfo>
              <CPS.ProductAvatar shape="square" size={60} src={item.productImage || NoImage} />
              <Text strong>{item.productName}</Text>
            </CPS.ProductInfo>
            <CPS.QuantityText>x{item.quantity}</CPS.QuantityText>
            <CPS.PriceText>{formatCurrency(item.productPrice)}</CPS.PriceText>
          </CPS.ListItem>
        )
      }
    />
  );
}
