import React from "react";

import { ProductsList, ProductsRandom, ProductsSlider } from "@/components";

export default function HomePage() {
  return (
    <>
      <ProductsSlider />
      <ProductsList />
      <ProductsRandom />
    </>
  );
}
