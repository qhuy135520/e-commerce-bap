import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { useUser } from "@/hooks/authentication/useUser";
import { getOrderVendor } from "@/stores/order/orders.thunks";

import { VendorManagerOrderTable, VendorManagerOrderHeader } from "@/components";

export default function VendorManagerOrderPage() {
  const { user } = useUser();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrderVendor(user.id));
  }, []);
  return (
    <>
      <VendorManagerOrderHeader />
      <VendorManagerOrderTable />
    </>
  );
}
