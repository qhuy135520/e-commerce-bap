import i18n from "@/configs/i18n/i18n";
import { useState, useMemo } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

import { PHONE_REGEX } from "@/constants/regex";

import useCart from "@/hooks/cart/useCart";
import useAddress from "@/hooks/address/useAddress";

export default function useOrder() {
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const { cart } = useCart();
  const { address } = useAddress();

  const { t } = useTranslation("order");
  const navigate = useNavigate();

  const orders = Object.values(
    cart.reduce((acc, item) => {
      if (!acc[item.vendorId]) {
        acc[item.vendorId] = {
          shop: { name: item.vendorName },
          products: [],
          shippingFee: 0,
          shippingMethod: null,
        };
      }

      acc[item.vendorId].products.push({
        id: item.productId,
        name: item.productName,
        price: item.productPrice,
        quantity: item.quantity,
        image: item.productImage,
      });

      return acc;
    }, {})
  );

  const getOrderTotals = (order) => {
    const totalProducts = order.products.reduce((sum, p) => sum + p.price * p.quantity, 0);
    const finalTotal = totalProducts + order.shippingFee;
    return { totalProducts, finalTotal };
  };

  const grandTotal = useMemo(() => {
    return orders.reduce((sum, order) => {
      const subtotal = order.products.reduce((s, p) => s + p.price * p.quantity, 0);
      return sum + subtotal + order.shippingFee;
    }, 0);
  }, [orders]);

  const validateSchema = useMemo(
    () =>
      Yup.object({
        name: Yup.string().required(t("order.validation.nameRequired")),
        phone: Yup.string()
          .required(t("order.validation.phoneRequired"))
          .matches(PHONE_REGEX, t("order.validation.phoneInvalid")),
        detail: Yup.string().required(t("order.validation.addressRequired")),
      }),
    [i18n.language]
  );

  const handleSubmitAddress = (values) => {
    setIsEditing(false);
    toast.success(t("order.toast.success"));
  };

  const handlePayClick = () => setIsModalOpen(true);

  const handlePlaceOrder = () => {
    setIsModalOpen(false);
    toast.success(t("order.orderPlacedSuccessfully"));
    navigate("/order-success");
  };

  // Giả sử số dư ví VNPAY
  const vnpayBalance = 5000000;
  const isInsufficientBalance = grandTotal > vnpayBalance;

  return {
    isEditing,
    setIsEditing,
    address,
    orders,
    paymentMethod,
    setPaymentMethod,
    isModalOpen,
    setIsModalOpen,
    handlePayClick,
    handlePlaceOrder,
    getOrderTotals,
    grandTotal,
    vnpayBalance,
    isInsufficientBalance,
    validateSchema,
    t,
    handleSubmitAddress,
  };
}
