import { useState, useEffect, useMemo } from "react";
import supabase from "@/services/supabase";
import toast from "react-hot-toast";

export default function useOrderAdmin(orders) {
  const [localOrders, setLocalOrders] = useState(orders);
  const [modal, setModal] = useState({ type: null, visible: false, order: null });
  const [searchInput, setSearchInput] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [statusFilter, setStatusFilter] = useState("all"); // all | pending | completed | cancelled

  // Sync props orders → state
  useEffect(() => {
    setLocalOrders(orders);
  }, [orders]);

  // Modal actions
  const handleAction = (type, order) => setModal({ type, visible: true, order });
  const handleCancel = () => setModal({ type: null, visible: false, order: null });

  const handleConfirm = async () => {
    if (!modal.order) return;

    if (modal.type === "approve") {
      await supabase.from("order").update({ status: "completed" }).eq("id", modal.order.order_id);

      setLocalOrders((prev) =>
        prev.map((o) => (o.order_id === modal.order.order_id ? { ...o, status: "completed" } : o))
      );
      toast.success("Đã duyệt đơn hàng thành công");
    } else if (modal.type === "cancel") {
      await supabase.from("order").update({ status: "cancelled" }).eq("id", modal.order.order_id);

      setLocalOrders((prev) =>
        prev.map((o) => (o.order_id === modal.order.order_id ? { ...o, status: "cancelled" } : o))
      );
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
        o.order_id?.toLowerCase().includes(searchKey.toLowerCase()) ||
        o.userId?.toLowerCase().includes(searchKey.toLowerCase());
      const matchesStatus = statusFilter === "all" || o.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [localOrders, searchKey, statusFilter]);

  return {
    filteredOrders,
    modal,
    searchInput,
    setSearchInput,
    handleSearch,
    statusFilter,
    setStatusFilter,
    handleAction,
    handleConfirm,
    handleCancel,
  };
}
