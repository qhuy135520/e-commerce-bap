import React from "react";

import { VendorManagerProductHeader, VendorManagerProductTable } from "@/components";
import useVendorManager from "@/hooks/vendor/useVendorManager";

export default function VendorManagerProductPage() {
  const { products } = useVendorManager();
  return (
    <>
      <VendorManagerProductHeader />
      <VendorManagerProductTable products={products} />
    </>
  );
}
