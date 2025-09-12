// useOrderAdmin.js
import { useState, useEffect, useMemo } from "react";
import supabase from "@/services/supabase";
import toast from "react-hot-toast";

export default function useOrderAdmin(orders) {
  const [localOrders, setLocalOrders] = useState(orders ?? []);
  const [modal, setModal] = useState({ type: null, visible: false, order: null });
  const [searchInput, setSearchInput] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [statusFilter, setStatusFilter] = useState("all"); // all | pending | completed | cancelled | shipped

  // Sync props orders → state
  useEffect(() => {
    setLocalOrders(orders ?? []);
  }, [orders]);

  // Modal actions
  const handleAction = (type, order) => setModal({ type, visible: true, order });
  const handleCancel = () => setModal({ type: null, visible: false, order: null });

  const handleConfirm = async () => {
    if (!modal.order) return;

    if (modal.type === "approve") {
      await supabase.from("order").update({ status: "completed" }).eq("id", modal.order.id);
      setLocalOrders((prev) => prev.map((o) => (o.id === modal.order.id ? { ...o, status: "completed" } : o)));
      toast.success("Đã duyệt đơn hàng thành công");
    } else if (modal.type === "cancel") {
      await supabase.from("order").update({ status: "cancelled" }).eq("id", modal.order.id);
      setLocalOrders((prev) => prev.map((o) => (o.id === modal.order.id ? { ...o, status: "cancelled" } : o)));
      toast.success("Đã hủy đơn hàng");
    }

    setModal({ type: null, visible: false, order: null });
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
    searchInput,
    setSearchInput,
    handleSearch,
    statusFilter,
    setStatusFilter,
    handleAction,
    handleConfirm,
    handleCancel,
    setLocalOrders,
  };
}
