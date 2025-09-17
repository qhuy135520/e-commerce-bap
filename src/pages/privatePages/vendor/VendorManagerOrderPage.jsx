import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { useUser } from "@/hooks/authentication/useUser";

import { VendorManagerOrderTable, VendorManagerOrderHeader } from "@/components";
import { vendorThunk, ordersThunk } from "@/stores/rootThunk";

export default function VendorManagerOrderPage() {
  const { user } = useUser();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(vendorThunk.getVendorInfo(user.id));
    dispatch(ordersThunk.getOrderVendor(user.id));
  }, []);
  return (
    <>
      <VendorManagerOrderHeader />
      <VendorManagerOrderTable />
    </>
  );
}
