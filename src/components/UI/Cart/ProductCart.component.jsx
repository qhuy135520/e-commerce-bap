import React from 'react';
import noImage from '../../../assets/images/NoImage/noimage.jpg';
import {
  StyledCard,
  ProductImage,
  ProductPrice,
  ProductDescription,
} from './ProductCart.styled';

const ProductCard = ({ product }) => {
  return (
    <StyledCard
      hoverable
      title={product.name}
      cover={
        <ProductImage alt={product.name} src={product.image_url || noImage} />
      }
    >
      <ProductPrice>Giá: {product.price} VND</ProductPrice>
      <ProductDescription>
        {product.description || 'Không có mô tả'}
      </ProductDescription>
    </StyledCard>
  );
};

export default ProductCard;
