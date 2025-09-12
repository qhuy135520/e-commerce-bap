import {
  Loading,
  ProductsBanner,
  ProductsCategories,
  ProductsFeatureInLogo,
  ProductsList,
  ProductsPromo,
  ProductsSlider,
} from "@/components";
import useProducts from "@/hooks/products/useProducts";
import { useEffect } from "react";

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
    </Loading>
  );
}
