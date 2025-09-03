import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchProducts,
  fetchProductSales,
  sortProductsBySales,
} from '@/slices/productSlice';
import { Spin, Select } from 'antd';
import ProductCard from './ProductCart.component';
import {
  ProductListWrapper,
  ProductTitle,
  ErrorText,
  ProductGrid,
} from './ProductList.styled';
import toast from 'react-hot-toast';
import LoadingComponent from '@/components/common/Loading.component';

const { Option } = Select;

const ProductList = () => {
  const dispatch = useDispatch();
  const { products, sales, status, error } = useSelector(
    (state) => state.products
  );

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filterOption, setFilterOption] = useState('');

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts())
        .then(() => dispatch(fetchProductSales()))
        .then(() => dispatch(sortProductsBySales()))
        .catch(() => toast.error('Lỗi khi tải sản phẩm'));
    }
  }, [status, dispatch]);

  useEffect(() => {
    let updatedProducts = [...products];

    if (filterOption === 'sales') {
      updatedProducts.sort((a, b) => (sales[b.id] || 0) - (sales[a.id] || 0));
    } else if (filterOption === 'priceDesc') {
      updatedProducts.sort((a, b) => b.price - a.price);
    } else if (filterOption === 'priceAsc') {
      updatedProducts.sort((a, b) => a.price - b.price);
    }

    setFilteredProducts(updatedProducts);
  }, [products, sales, filterOption]);

  return (
    <LoadingComponent
      isLoading={status === 'loading' || status === 'idle'}
      error={error}
    >
      <ProductListWrapper>
        <ProductTitle level={3}>Danh sách sản phẩm</ProductTitle>

        <Select
          placeholder="Sắp xếp"
          value={filterOption || undefined}
          onChange={(value) => setFilterOption(value)}
          style={{ width: 150, marginBottom: '20px' }}
        >
          <Option value="sales">Bán nhiều nhất</Option>
          <Option value="priceDesc">Giá cao → thấp</Option>
          <Option value="priceAsc">Giá thấp → cao</Option>
        </Select>

        {status === 'succeeded' && (
          <ProductGrid>
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                sold={sales?.[product.id] || 0}
              />
            ))}
          </ProductGrid>
        )}
      </ProductListWrapper>
    </LoadingComponent>
  );
};

export default ProductList;
