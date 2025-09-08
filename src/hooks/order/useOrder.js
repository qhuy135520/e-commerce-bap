import i18n from "@/configs/i18n/i18n";
import { useState, useMemo } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";

import { PHONE_REGEX } from "@/constants/regex";

export default function useOrder() {
  const [isEditing, setIsEditing] = useState(false);
  const { t } = useTranslation("order");

  const [address, setAddress] = useState({
    name: "Le Thuan",
    phone: "086879798",
    detail: "Phố đèn đỏ Trần Duy Hưng, Cầu Giấy, Hà Nội",
  });

  const orders = [
    {
      shop: { name: "OPPO - Official Store" },
      products: [
        {
          id: 1,
          name: "Oppo A57 (4GB/64GB) - Hàng Chính Hãng",
          price: 310000,
          quantity: 1,
          image: "https://maytinhdongbodell.vn/img/p/laptop-hp-elitebook-840-g2-cau-hinh-3-p838.jpg",
        },
        {
          id: 2,
          name: "Oppo A37 (4GB/64GB) - Hàng Chính Hãng",
          price: 350000,
          quantity: 2,
          image: "https://maytinhdongbodell.vn/img/p/laptop-hp-elitebook-840-g2-cau-hinh-3-p838.jpg",
        },
      ],
      shippingFee: 45000,
      shippingMethod: "Nhanh",
    },
    {
      shop: { name: "Hoang Ha Mobile" },
      products: [
        {
          id: 3,
          name: "Laptop gaming Dell G15 5511 i5 11400H/8GB/512GB/RTX3050 4GB/W11",
          price: 32000,
          quantity: 3,
          image: "https://maytinhdongbodell.vn/img/p/laptop-hp-elitebook-840-g2-cau-hinh-3-p838.jpg",
        },
      ],
      shippingFee: 30000,
      shippingMethod: "Hỏa tốc",
    },
  ];
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
    setAddress(values);
    setIsEditing(false);
    toast.success(t("order.toast.success"));
  };

  return {
    isEditing,
    setIsEditing,
    address,
    setAddress,
    orders,
    getOrderTotals,
    grandTotal,
    validateSchema,
    t,
    handleSubmitAddress,
  };
}
