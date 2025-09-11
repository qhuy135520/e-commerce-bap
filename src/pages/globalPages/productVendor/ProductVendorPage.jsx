import React, { useEffect } from "react";

import { InfoVendor, Loading, ProductsList } from "@/components";
import useProducts from "@/hooks/products/useProducts";

export default function ProductVendorPage() {
  const { error, fetchDataProducts, vendorId, isLoading } = useProducts();

  useEffect(() => {
    fetchDataProducts();
  }, [vendorId]);
  return (
    <Loading isLoading={isLoading} error={error}>
      <InfoVendor />
      <ProductsList />
    </Loading>
  );
}
