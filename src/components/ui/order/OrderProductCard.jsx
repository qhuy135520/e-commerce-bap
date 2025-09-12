import { formatCurrency } from "@/utils/helpers";

import { OrderStyled as OS } from "@/components/ui/order";

import NoImage from "@/assets/images/NoImage/noimage.jpg";

export default function OrderProductCard({ product }) {
  return (
    <OS.WrapperCard>
      <OS.ProductRow>
        <OS.ProductImage src={product.image || NoImage} alt={product.name} />
        <OS.ProductInfo>
          <OS.ProductName>{product.name}</OS.ProductName>
          <OS.ProductQuantity>x{product.quantity}</OS.ProductQuantity>
        </OS.ProductInfo>
        <OS.PriceWrapper>
          <OS.Price>{formatCurrency(product.price)}</OS.Price>
        </OS.PriceWrapper>
      </OS.ProductRow>
    </OS.WrapperCard>
  );
}
