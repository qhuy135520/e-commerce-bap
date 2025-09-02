import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../../slices/productSlice";
import { Spin, message } from "antd";
import ProductCard from "../../../components/ui/Cart/ProductCart.component";
import {
  ProductListWrapper,
  ProductTitle,
  ErrorText,
  ProductGrid,
} from "./ProductList.styled";

const ProductList = () => {
  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state) => state.products);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts()).catch(() =>
        message.error("Lỗi khi tải sản phẩm")
      );
    }
  }, [status, dispatch]);

  return (
    <ProductListWrapper>
      <ProductTitle level={3}>Danh sách sản phẩm</ProductTitle>
      {status === "loading" && (
        <Spin size="large" style={{ display: "block", margin: "20px auto" }} />
      )}
      {status === "failed" && <ErrorText type="danger">Lỗi: {error}</ErrorText>}
      {status === "succeeded" && (
        <ProductGrid>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ProductGrid>
      )}
    </ProductListWrapper>
  );
};

export default ProductList;
