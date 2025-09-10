import { Modal, Rate } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { OrderHistoryTableStyled as OHTS } from "@/components";

export default function ReviewModal({ visible, onCancel, onSubmit, product, loading }) {
  const { t } = useTranslation("order");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleOk = () => {
    if (!rating) return;
    onSubmit({ rating, comment });
  };

  return (
    <Modal
      open={visible}
      onCancel={onCancel}
      footer={null}
      title={t("order.review.title", { name: product?.name || "" })}
    >
      <Rate value={rating} onChange={setRating} />
      <OHTS.TextArea
        rows={4}
        placeholder={t("order.review.placeholder")}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <OHTS.SubmitButton type="primary" onClick={handleOk} loading={loading}>
        {t("order.review.submit")}
      </OHTS.SubmitButton>
    </Modal>
  );
}
