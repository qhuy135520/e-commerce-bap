import React from "react";

import useVendorManager from "@/hooks/vendor/useVendorManager";

import { VendorManagerProductHeader, VendorManagerProductTable } from "@/components";

export default function VendorManagerProductPage() {
  const { products } = useVendorManager();
  return (
    <>
      <VendorManagerProductHeader />
      <VendorManagerProductTable products={products} />
    </>
  );
}
