import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import { useState } from "react";

import { submitReviewApi } from "@/services/apiReview";
import { useUser } from "@/hooks/authentication/useUser";

export default function useReview() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation(["order"]);
  const { user } = useUser();

  const openReviewModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeReviewModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  const handleSubmitReview = async ({ rating, comment }) => {
    if (!selectedProduct || !user) return;

    try {
      setLoading(true);
      await submitReviewApi({
        userId: user.id,
        productId: selectedProduct.productId,
        orderDetailId: selectedProduct.orderDetailId,
        rating,
        content: comment,
      });
      toast.success(t("order.review.toast.success"));

      closeReviewModal();
    } catch (error) {
      console.error(error);
      toast.error(t("order.review.toast.error"));
    } finally {
      setLoading(false);
    }
  };

  return {
    isModalOpen,
    selectedProduct,
    openReviewModal,
    closeReviewModal,
    handleSubmitReview,
    loading,
    t,
  };
}
