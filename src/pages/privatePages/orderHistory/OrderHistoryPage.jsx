import React from "react";
import { OrderHistoryHeader, OrderHistoryTable } from "@/components";
import useOrderHistory from "@/hooks/order/useOrderHistory";

export default function OrderHistoryPage() {
  const { handleBackToHome } = useOrderHistory();
  return (
    <>
      <OrderHistoryHeader onBackToHome={handleBackToHome} />
      <OrderHistoryTable />
    </>
  );
}
