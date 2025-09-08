import { formatCurrency } from "@/utils/helpers";

import * as Styled from "@/pages/privatePages/order/Order.styled";

export default function OrderProductCard({ product }) {
  return (
    <Styled.WrapperCard>
      <Styled.ProductRow>
        <Styled.ProductImage src={product.image} alt={product.name} />
        <Styled.ProductInfo>
          <Styled.ProductName>{product.name}</Styled.ProductName>
          <Styled.ProductQuantity>x{product.quantity}</Styled.ProductQuantity>
        </Styled.ProductInfo>
        <Styled.PriceWrapper>
          <Styled.Price>{formatCurrency(product.price)}</Styled.Price>
        </Styled.PriceWrapper>
      </Styled.ProductRow>
    </Styled.WrapperCard>
  );
}
