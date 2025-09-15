import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { List, Typography } from "antd";

import { CartPopoverContentStyled as CPS } from "@/components";

import { formatCurrency } from "@/utils/helpers";
import NoImage from "@/assets/images/NoImage/noimage.jpg";

const { Text } = Typography;

export default function CartPopoverContent({ cart, t }) {
  const navigate = useNavigate();

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
    [t, cart]
  );

  const handleNavigate = (id) => {
    navigate(`/product/${id}`);
  };

  if (!cart || cart.length === 0) {
    return <Text>{t("header.cartEmpty")}</Text>;
  }

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
          <CPS.ListItem onClick={() => handleNavigate(item.productId)}>
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
