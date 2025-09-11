import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";

import { PHONE_REGEX } from "@/constants/regex";

import useCart from "@/hooks/cart/useCart";
import { useUser } from "@/hooks/authentication/useUser";
import { useUpdateUser } from "@/hooks/authentication/useUpdateUser";
import { cartThunk, ordersThunk, productsThunk } from "@/stores/rootThunk";
import { cartSelector, ordersSelector, productsSelector } from "@/stores/rootSelector";

import i18n from "@/configs/i18n/i18n";

export default function useOrder() {
  const dispatch = useDispatch();
  const [isEditting, setisEditting] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const { t } = useTranslation(["order"]);
  const { user } = useUser();
  const { updateUser } = useUpdateUser();
  const navigate = useNavigate();
  const errorOrder = useSelector(ordersSelector.selectOrderError);
  const errorProduct = useSelector(productsSelector.selectError);
  const errorCart = useSelector(cartSelector.selectCartError);
  const error = errorOrder || errorProduct || errorCart;

  const { cartSelect, status: statusCart } = useCart();
  const statusOrder = useSelector(ordersSelector.selectOrderStatus);

  const isLoading = ["loading", "idle"].includes(statusCart) || ["loading"].includes(statusOrder);

  const orders = Object.values(
    cartSelect.reduce((acc, item) => {
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
        cartId: item.id,
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
        name: Yup.string().trim().required(t("order.validation.nameRequired")),
        phone: Yup.string()
          .matches(PHONE_REGEX, t("order.validation.phoneInvalid"))
          .required(t("order.validation.phoneRequired")),
        province: Yup.string().nullable().required(t("order.validation.provinceRequired")),
        district: Yup.string().nullable().required(t("order.validation.districtRequired")),
        ward: Yup.string().nullable().required(t("order.validation.wardRequired")),
        detail: Yup.string().trim().required(t("order.validation.detailRequired")),
      }),
    [i18n.language, t]
  );

  const handlePayClick = () => setIsModalOpen(true);

  const handlePlaceOrder = async () => {
    await updateUser({ newDataUserInfo: { moneyBalance: user.moneyBalance - grandTotal } });
    await dispatch(ordersThunk.createOrder({ userId: user.id, cartItems: cartSelect })).unwrap();
    await dispatch(cartThunk.removeAllCart(user.id)).unwrap();

    toast.success(t("order.orderPlacedSuccessfully"));
    setIsModalOpen(false);
    navigate("/order-history");
  };

  const handleSetEditting = (editValue) => {
    setisEditting(editValue);
  };

  const handleCancel = () => setisEditting("");

  const vnpayBalance = user.moneyBalance;
  const isInsufficientBalance = grandTotal > vnpayBalance;

  return {
    error,
    isEditting,
    handleSetEditting,
    orders,
    paymentMethod,
    setPaymentMethod,
    isModalOpen,
    setIsModalOpen,
    handlePayClick,
    handleCancel,
    handlePlaceOrder,
    getOrderTotals,
    grandTotal,
    vnpayBalance,
    isInsufficientBalance,
    validateSchema,
    t,
    isLoading,
  };
}
