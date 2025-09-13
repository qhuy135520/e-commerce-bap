import { COMMISSION } from "@/constants";
import { useState, useEffect, useMemo } from "react";
import supabase from "@/services/supabase";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

import { subtractVendorBalance } from "@/stores/vendor/vendor.thunks";
import { updateStatusOrder } from "@/stores/order/orders.thunks";

export default function useOrderAdmin(orders) {
  const dispatch = useDispatch();
  const [localOrders, setLocalOrders] = useState(orders ?? []);
  const [modal, setModal] = useState({ type: null, visible: false, order: null });
  const [searchInput, setSearchInput] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [payModal, setPayModal] = useState({ visible: false, order: null });

  useEffect(() => {
    setLocalOrders(orders ?? []);
  }, [orders]);

  // --- Modal hủy/duyệt đơn ---
  const handleAction = (type, order) => setModal({ type, visible: true, order });
  const handleCancel = () => setModal({ type: null, visible: false, order: null });

  const handleConfirm = async () => {
    if (!modal.order) return;

    try {
      if (modal.type === "approve") {
        await supabase.from("order").update({ status: "completed" }).eq("id", modal.order.id);
        setLocalOrders((prev) => prev.map((o) => (o.id === modal.order.id ? { ...o, status: "completed" } : o)));
        toast.success("Đã duyệt đơn hàng thành công");
      } else if (modal.type === "cancel") {
        await supabase.from("order").update({ status: "cancelled" }).eq("id", modal.order.id);
        setLocalOrders((prev) => prev.map((o) => (o.id === modal.order.id ? { ...o, status: "cancelled" } : o)));
        toast.success("Đã hủy đơn hàng");
      }
    } catch (err) {
      toast.error("Có lỗi khi cập nhật đơn hàng");
    }

    setModal({ type: null, visible: false, order: null });
  };

  // --- Thanh toán vendor ---
  const openPayModal = (order) => setPayModal({ visible: true, order });
  const closePayModal = () => setPayModal({ visible: false, order: null });

  const handlePayVendor = async () => {
    if (!payModal.order) return;

    try {
      await dispatch(
        subtractVendorBalance({ vendorId: payModal.order.vendor_id, amount: payModal.order.total_amount * COMMISSION })
      ).unwrap();

      await dispatch(
        updateStatusOrder({ vendorId: payModal.order.vendor_id, orderId: payModal.order.order_id, nextStatus: "paid" })
      ).unwrap();

      setLocalOrders((prev) =>
        prev.map((o) => (o.order_id === payModal.order.order_id ? { ...o, status: "paid" } : o))
      );

      toast.success("Thanh toán thành công!");
    } catch (err) {
      toast.error("Thanh toán thất bại");
    }

    closePayModal();
  };

  // Search
  const handleSearch = () => setSearchKey(searchInput);

  // Filter + Search
  const filteredOrders = useMemo(() => {
    return localOrders.filter((o) => {
      const matchesSearch =
        !searchKey ||
        o.id?.toLowerCase().includes(searchKey.toLowerCase()) ||
        o.userId?.toLowerCase().includes(searchKey.toLowerCase());

      const matchesStatus =
        statusFilter === "all" ||
        o.status === statusFilter ||
        (statusFilter === "canceled" && (o.status === "canceled" || o.status === "cancelled"));

      return matchesSearch && matchesStatus;
    });
  }, [localOrders, searchKey, statusFilter]);

  // Pie data: theo trạng thái
  const statusData = useMemo(() => {
    const completed = filteredOrders.filter((o) => o.status === "completed").length;
    const pending = filteredOrders.filter((o) => o.status === "pending").length;
    const shipped = filteredOrders.filter((o) => o.status === "shipped").length;
    const canceled = filteredOrders.filter((o) => o.status === "cancelled" || o.status === "canceled").length;
    return [
      { name: "Hoàn thành", value: completed },
      { name: "Đang xử lý", value: pending },
      { name: "Đang giao", value: shipped },
      { name: "Hủy", value: canceled },
    ];
  }, [filteredOrders]);

  // Top 5 khách hàng nhiều đơn nhất
  const topCustomers = useMemo(() => {
    const countByUser = {};
    (filteredOrders || []).forEach((o) => {
      const uid = o.user?.id || o.userId || "unknown";
      const name = o.user_name || `User ${uid}`;
      if (!countByUser[uid]) {
        countByUser[uid] = { name, total: 0 };
      }
      countByUser[uid].total += 1;
    });
    return Object.values(countByUser)
      .sort((a, b) => b.total - a.total)
      .slice(0, 5);
  }, [filteredOrders]);

  return {
    filteredOrders,
    statusData,
    topCustomers,
    modal,
    handleAction,
    handleConfirm,
    handleCancel,
    payModal,
    openPayModal,
    closePayModal,
    handlePayVendor,
    searchInput,
    setSearchInput,
    handleSearch,
    statusFilter,
    setStatusFilter,
  };
}
