import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import { useState } from "react";

import { useUser } from "@/hooks/authentication/useUser";
import { createReview } from "@/stores/reviews/reviews.thunks";
import { useDispatch } from "react-redux";
import { fetchAllOrder } from "@/stores/order/orders.thunks";

export default function useReview() {
  const { t } = useTranslation(["order"]);
  const { user } = useUser();
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);

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
      await dispatch(
        createReview({
          userId: user.id,
          productId: selectedProduct.productId,
          content: comment,
          rating,
          orderDetailId: selectedProduct.orderDetailId,
        })
      );
      toast.success(t("order.review.toast.success"));
      await dispatch(fetchAllOrder(user.id));
      closeReviewModal();
    } catch (error) {
      toast.error(t("order.review.toast.error"));
    }
  };

  return {
    isModalOpen,
    selectedProduct,
    t,
    loading,
    openReviewModal,
    closeReviewModal,
    handleSubmitReview,
  };
}
