import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useUser } from "@/hooks/authentication/useUser";
import { ordersThunk, vendorThunk } from "@/stores/rootThunk";
import { ordersSelector } from "@/stores/rootSelector";

export function getNextStatusOptions(currentStatus) {
  switch (currentStatus) {
    case "pending":
      return ["canceled", "shipped"];
    case "shipped":
      return ["completed"];
    default:
      return [];
  }
}

export default function useUpdateStatus() {
  const dispatch = useDispatch();
  const { user } = useUser();
  const orders = useSelector(ordersSelector.selectFilteredOrderVendor);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectOrder, setSelectOrder] = useState(null);

  const handleCancel = () => setIsModalOpen(false);

  function openUpdateModal(order) {
    const options = getNextStatusOptions(order.status);
    if (options.length === 0) return;
    if (options.length === 1) {
      updateOrderStatus(order, options[0]);
    } else {
      setSelectOrder(order);
      setIsModalOpen(true);
    }
  }

  const updateOrderStatus = async (order, nextStatus) => {
    if (!nextStatus) return;

    if (nextStatus === "canceled") {
      await dispatch(
        vendorThunk.refundToUser({
          vendorId: user.id,
          userId: order.userid,
          amount: order.totalorder,
        })
      );
    }

    await dispatch(
      ordersThunk.updateStatusOrder({
        vendorId: user.id,
        orderId: order.orderid,
        nextStatus,
      })
    );

    setIsModalOpen(false);
    setSelectOrder(null);
  };
  return {
    orders,
    selectOrder,
    isModalOpen,
    openUpdateModal,
    handleCancel,
    updateOrderStatus,
  };
}
