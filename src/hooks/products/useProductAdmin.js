// useProductAdmin.js
import { useState, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import supabase from "@/services/supabase";
import { updateProductVendor } from "@/stores/products/products.thunks";
import toast from "react-hot-toast";

export default function useProductAdmin(products) {
  const dispatch = useDispatch();

  const [localProducts, setLocalProducts] = useState(products ?? []);
  const [modal, setModal] = useState({ type: null, visible: false, product: null });
  const [searchInput, setSearchInput] = useState("");
  const [searchKey, setSearchKey] = useState(""); // key thực sự dùng để lọc
  const [statusFilter, setStatusFilter] = useState("all"); // 'all' | 'approved' | 'pending'

  // Sync khi props products thay đổi
  useEffect(() => {
    setLocalProducts(products ?? []);
  }, [products]);

  // Modal actions
  const handleAction = (type, product) => setModal({ type, visible: true, product });
  const handleCancel = () => setModal({ type: null, visible: false, product: null });

  const handleConfirm = async () => {
    if (!modal.product) return;

    if (modal.type === "approve") {
      await dispatch(
        updateProductVendor({
          vendorId: modal.product.vendorId,
          productId: modal.product.id,
          dataUpdate: { status: true },
        })
      );
      setLocalProducts((prev) => prev.map((p) => (p.id === modal.product.id ? { ...p, status: true } : p)));
      toast.success("Duyệt sản phẩm thành công");
    } else if (modal.type === "delete") {
      await supabase.from("product").delete().eq("id", modal.product.id);
      setLocalProducts((prev) => prev.filter((p) => p.id !== modal.product.id));
      toast.success("Xóa sản phẩm thành công");
    }

    setModal({ type: null, visible: false, product: null });
  };

  // Khi enter hoặc click tìm kiếm
  const handleSearch = () => setSearchKey(searchInput);

  // Filter + search
  const filteredProducts = useMemo(() => {
    return localProducts.filter((p) => {
      const matchesSearch =
        !searchKey ||
        p.name?.toLowerCase().includes(searchKey.toLowerCase()) ||
        p.id?.toLowerCase().includes(searchKey.toLowerCase());
      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "approved" && p.status) ||
        (statusFilter === "pending" && !p.status);
      return matchesSearch && matchesStatus;
    });
  }, [localProducts, searchKey, statusFilter]);

  // Pie data: approved vs pending
  const statusData = useMemo(() => {
    const approved = filteredProducts.filter((p) => p.status === true).length;
    const pending = filteredProducts.filter((p) => p.status === false).length;
    return [
      { name: "Đã duyệt", value: approved },
      { name: "Chưa duyệt", value: pending },
    ];
  }, [filteredProducts]);

  // Top 5 tồn kho
  const topStock = useMemo(() => {
    return [...filteredProducts]
      .sort((a, b) => (b.stock || 0) - (a.stock || 0))
      .slice(0, 5)
      .map((p) => ({ name: p.name || p.id, stock: p.stock || 0 }));
  }, [filteredProducts]);

  return {
    localProducts,
    filteredProducts,
    statusData,
    topStock,
    modal,
    searchInput,
    setSearchInput,
    handleSearch,
    statusFilter,
    setStatusFilter,
    handleAction,
    handleConfirm,
    handleCancel,
    setLocalProducts,
  };
}
