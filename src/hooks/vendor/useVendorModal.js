import { useState } from "react";
import toast from "react-hot-toast";

const useVendorModal = (handleStatusToggle) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);

  const showConfirmModal = (vendor) => {
    if (!vendor || !vendor.vendorId || !vendor.vendorName) {
      toast.error("Dữ liệu vendor không hợp lệ");
      return;
    }
    setSelectedVendor(vendor);
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    if (!selectedVendor || !selectedVendor.vendorId || !selectedVendor.status) {
      toast.error("Không có vendor được chọn hoặc dữ liệu không hợp lệ");
      setIsModalVisible(false);
      return;
    }
    handleStatusToggle(selectedVendor.vendorId, selectedVendor.status);
    setIsModalVisible(false);
    setSelectedVendor(null);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setSelectedVendor(null);
  };

  const getModalContent = () => {
    if (!selectedVendor) return "";
    const message =
      selectedVendor.status === "active"
        ? `Bạn muốn hủy tư cách bán hàng của <strong>${selectedVendor.vendorName}</strong>?`
        : `Bạn có chắc chắn muốn duyệt vendor <strong>${selectedVendor.vendorName}</strong> làm người bán hàng?`;
    return { __html: message };
  };

  return {
    isModalVisible,
    selectedVendor,
    showConfirmModal,
    handleModalOk,
    handleModalCancel,
    getModalContent,
  };
};

export default useVendorModal;
