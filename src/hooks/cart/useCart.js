import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";

import { useUser } from "@/hooks/authentication/useUser";
import { cartSlice } from "@/stores/rootReducer";
import { cartSelector } from "@/stores/rootSelector";
import { cartThunk } from "@/stores/rootThunk";

export default function useCart() {
  const dispatch = useDispatch();
  const { user } = useUser();

  const { t } = useTranslation(["cart"]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const status = useSelector(cartSelector.selectCartStatus);
  const cart = useSelector(cartSelector.selectCartItems);
  const error = useSelector(cartSelector.selectCartError);

  const isLoading = status === "idle" || status === "loading";

  const cartTableData = cart.map((item) => ({
    key: item.id,
    product: item.productName,
    unitPrice: item.productPrice,
    quantity: item.quantity,
    totalPrice: item.productPrice * item.quantity,
    vendorId: item.vendorId,
    vendorName: item.vendorName,
  }));

  const cartTableWithVendors = useMemo(() => {
    return cartTableData.reduce((acc, item) => {
      const lastVendorKey = `vendor-${item.vendorId}`;

      if (!acc.some((row) => row.key === lastVendorKey)) {
        acc.push({ key: lastVendorKey, isVendorRow: true, vendorName: item.vendorName });
      }

      acc.push(item);
      return acc;
    }, []);
  }, [cartTableData]);

  const initialValues = cartTableWithVendors.reduce((result, item) => {
    if (!item.isVendorRow) {
      result[item.key] = item.quantity;
    }
    return result;
  }, {});

  useEffect(
    function () {
      if (status === "idle") {
        dispatch(cartThunk.fetchCart(user?.id));
      }
    },
    [status]
  );

  const selectedItems = cartTableWithVendors.filter((item) => !item.isVendorRow && selectedRowKeys.includes(item.key));
  const totalQuantity = selectedItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = selectedItems.reduce((sum, item) => sum + item.totalPrice, 0);

  function handleDeleteCartItem(cartId) {
    dispatch(cartThunk.removeFromCart({ cartId, userId: user.id }));
  }

  function handleResetCart() {
    if (cart.length) {
      dispatch(cartSlice.clearCart());
    }
  }

  async function handleSubmit({ values, type }) {
    switch (type) {
      case "updateQuantity":
        const allItems = Object.entries(values).map(([cartId, quantity]) => ({
          cartId,
          quantity,
        }));

        dispatch(cartThunk.updateQuantity({ items: allItems, userId: user.id }));
        break;
      case "buy":
        const selectedBuyItems = Object.entries(values)
          .filter(([cartId]) => selectedRowKeys.includes(cartId))
          .map(([cartId, quantity]) => ({
            cartId,
            quantity,
          }));
        break;
    }
  }

  async function handleAddProductToCart(productId, quantity) {
    await dispatch(cartThunk.addToCart({ userId: user.id, productId, quantity }));
    if (status === "succeeded") {
      toast.success(t("cart.toast.success"));
    }
    if (status === "failed") toast.error(t("cart.toast.error"));
  }

  return {
    dispatch,
    status,
    cart,
    initialValues,
    selectedRowKeys,
    setSelectedRowKeys,
    selectedItems,
    totalQuantity,
    totalPrice,
    isLoading,
    error,
    cartTableData,
    cartTableWithVendors,
    handleAddProductToCart,
    handleDeleteCartItem,
    handleResetCart,
    handleSubmit,
    t,
  };
}
