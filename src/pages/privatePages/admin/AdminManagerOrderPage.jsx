import AdminManageOrderrHeader from "@/components/ui/admin/AdminManagerOrderHeader";
import { ordersSelector } from "@/stores/rootSelector";
import { fetchAllOrdersAdmin } from "@/stores/order/orders.thunks";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminManagerOrderTable from "@/components/ui/admin/AdminManagerOrderTable";

export default function AdminManagerOrderPage() {
  const dispatch = useDispatch();
  const order = useSelector(ordersSelector.selectAllOrdersAdmin);

  useEffect(() => {
    dispatch(fetchAllOrdersAdmin());
  }, [dispatch]);

  return (
    <>
      <AdminManageOrderrHeader />
      <AdminManagerOrderTable orders={order} />
    </>
  );
}
