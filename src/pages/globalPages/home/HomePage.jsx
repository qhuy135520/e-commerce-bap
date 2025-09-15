import { useEffect } from "react";

import {
  Loading,
  ProductsBanner,
  ProductsCategories,
  ProductsFeatureInLogo,
  ProductsList,
  ProductsPromo,
  ProductsRandom,
  ProductsSlider,
} from "@/components";

import useProducts from "@/hooks/products/useProducts";

export default function HomePage() {
  const { error, fetchDataProducts, vendorId, isLoading } = useProducts();

  useEffect(() => {
    fetchDataProducts();
  }, [vendorId]);

  return (
    <Loading isLoading={isLoading} error={error}>
      <ProductsBanner />
      <ProductsFeatureInLogo />
      <ProductsPromo />
      <ProductsCategories />
      <ProductsSlider />
      <ProductsList />
      <ProductsRandom />
    </Loading>
  );
}
