import { useState, useEffect, useMemo } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

import { subtractVendorBalance } from "@/stores/vendor/vendor.thunks";
import { fetchAllOrdersAdmin, updateStatusOrder } from "@/stores/order/orders.thunks";

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
      if (modal.type === "cancel") {
        // Cập nhật trạng thái đơn hàng
        await dispatch(
          updateStatusOrder({ vendorId: modal.order.vendor_id, orderId: modal.order.order_id, nextStatus: "canceled" })
        ).unwrap();
        setLocalOrders((prev) =>
          prev.map((o) => (o.order_id === modal.order.order_id ? { ...o, status: "canceled" } : o))
        );
        // Cập nhật lại danh sách đơn hàng
        await dispatch(fetchAllOrdersAdmin());

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
        subtractVendorBalance({ vendorId: payModal.order.vendor_id, amount: payModal.order.total_amount  })
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
        o.user_name?.toLowerCase().includes(searchKey.toLowerCase());

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
      const uid = o.user_id || "unknown"; // dùng user_id thực tế
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
