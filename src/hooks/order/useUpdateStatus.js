import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useUser } from "@/hooks/authentication/useUser";
import { ordersThunk } from "@/stores/rootThunk";
import { ordersSelector } from "@/stores/rootSelector";

function getNextStatus(current) {
  if (current === "pending") return "shipped";
  if (current === "shipped") return "completed";
  return "completed";
}

export default function useUpdateStatus() {
  const dispatch = useDispatch();
  const { user } = useUser();
  const orders = useSelector(ordersSelector.selectOrderVendor);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectOrder, setSelectOrder] = useState({});

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  function openUpdateModal(order) {
    setIsModalOpen(true);
    setSelectOrder(order);
  }
  const updateOrderStatus = async (order) => {
    if (order.status === "completed") return;

    await dispatch(
      ordersThunk.updateStatusOrder({
        vendorId: user.id,
        orderId: order.orderid,
        nextStatus: getNextStatus(order.status),
      })
    );
    setIsModalOpen(false);
  };

  return {
    orders,
    selectOrder,
    isModalOpen,
    updateOrderStatus,
    handleCancel,
    openUpdateModal,
    setIsModalOpen,
    openUpdateModal,
  };
}
