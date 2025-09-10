import React from "react";
import { Modal } from "antd";

import { OrderEditAddressForm } from "@/components";

export default function OrderUpdateAddressModal({ open, onCancel, address }) {
  return (
    <Modal title="Cập nhật địa chỉ" open={open} onCancel={onCancel} footer={null}>
      <OrderEditAddressForm address={address} onCancel={onCancel} />
    </Modal>
  );
}
