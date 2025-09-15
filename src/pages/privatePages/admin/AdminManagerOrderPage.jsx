import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AdminManagerOrderHeader, AdminManagerOrderTable } from "@/components";

import { ordersSelector } from "@/stores/rootSelector";
import { ordersThunk } from "@/stores/rootThunk";

export default function AdminManagerOrderPage() {
  const dispatch = useDispatch();
  const order = useSelector(ordersSelector.selectAllOrdersAdmin);

  useEffect(() => {
    dispatch(ordersThunk.fetchAllOrdersAdmin());
  }, [dispatch]);

  return (
    <>
      <AdminManagerOrderHeader />
      <AdminManagerOrderTable orders={order} />
    </>
  );
}
