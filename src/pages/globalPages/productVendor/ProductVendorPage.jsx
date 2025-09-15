import React, { useEffect, useState } from "react";

import { InfoVendor, Loading, ProductsList } from "@/components";
import useProducts from "@/hooks/products/useProducts";

export default function ProductVendorPage() {
  const { error, fetchDataProducts, vendorId, isLoading, dataVendor } = useProducts();

  useEffect(() => {
    fetchDataProducts();
  }, [vendorId]);
  return (
    <Loading isLoading={isLoading} error={error}>
      <InfoVendor vendorName={dataVendor.vendorName} vendorId={vendorId} dataVendor={dataVendor} />
      <ProductsList />
    </Loading>
  );
}
