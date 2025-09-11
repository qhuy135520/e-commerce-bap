import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminManagerProductTable from "@/components/ui/admin/AdminManagerProductTable";
import { productsSelector } from "@/stores/rootSelector";
import { getAllProducts } from "@/stores/products/products.thunks";
import AdminManagerProductHeader from "@/components/ui/admin/AdminManagerProductHeader";

export default function AdminManagerProductPage() {
  const dispatch = useDispatch();
  const products = useSelector(productsSelector.selectAllProducts);
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <>
      <AdminManagerProductHeader />
      <AdminManagerProductTable products={products} />;
    </>
  );
}
