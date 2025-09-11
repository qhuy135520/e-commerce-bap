import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { productsSelector } from "@/stores/rootSelector";
import { productsThunk } from "@/stores/rootThunk";

import { AdminManagerProductTable, AdminManagerProductHeader } from "@/components";

export default function AdminManagerProductPage() {
  const dispatch = useDispatch();
  const products = useSelector(productsSelector.selectAllProducts);
  useEffect(() => {
    dispatch(productsThunk.getAllProducts());
  }, [dispatch]);

  return (
    <>
      <AdminManagerProductHeader />
      <AdminManagerProductTable products={products} />;
    </>
  );
}
