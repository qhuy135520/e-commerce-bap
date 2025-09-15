import { useState } from "react";

const useVendorModal = (handleStatusToggle) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);

  const showConfirmModal = (vendor) => {
    setSelectedVendor(vendor);
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    if (selectedVendor) {
      handleStatusToggle(selectedVendor.id, selectedVendor.status);
    }
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
        ? `Bạn muốn hủy tư cách bán hàng của <strong>${selectedVendor.name}</strong>?`
        : `Bạn có chắc chắn muốn duyệt vendor <strong>${selectedVendor.name}</strong> làm người bán hàng?`;
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
