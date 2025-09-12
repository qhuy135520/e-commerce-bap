import React, { useEffect } from "react";

import { Loading, ProductsBanner, ProductsList, ProductsRandom, ProductsSlider } from "@/components";
import useProducts from "@/hooks/products/useProducts";

export default function HomePage() {
  const { error, fetchDataProducts, vendorId, isLoading } = useProducts();

  useEffect(() => {
    fetchDataProducts();
  }, [vendorId]);
  return (
    <Loading isLoading={isLoading} error={error}>
      {/* <ProductsHeader /> */}
      <ProductsBanner />
      <ProductsSlider />
      <ProductsList />
      {/* <ProductsRandom /> */}
    </Loading>
  );
}
