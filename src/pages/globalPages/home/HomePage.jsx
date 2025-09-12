import React, { useEffect } from "react";

import { Loading, ProductsList, ProductsRandom, ProductsSlider } from "@/components";
import useProducts from "@/hooks/products/useProducts";
import ProductsHeader from "@/components/ui/products/ProductsHeader";

export default function HomePage() {
  const { error, fetchDataProducts, vendorId, isLoading } = useProducts();

  useEffect(() => {
    fetchDataProducts();
  }, [vendorId]);
  return (
    <Loading isLoading={isLoading} error={error}>
      {/* <ProductsHeader /> */}
      <ProductsSlider />
      <ProductsList />
      {/* <ProductsRandom /> */}
    </Loading>
  );
}
