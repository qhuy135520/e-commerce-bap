import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { useUser } from "@/hooks/authentication/useUser";
import { cartSelector, productsSelector } from "@/stores/rootSelector";
import { cartThunk } from "@/stores/rootThunk";

export default function useCart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useUser();

  const { t } = useTranslation(["cart"]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const status = useSelector(cartSelector.selectCartStatus);
  const cart = useSelector(cartSelector.selectCartItems);
  const cartSelect = cart.filter((item) => item.isSelect);

  const error = useSelector(cartSelector.selectCartError);
  const productDetail = useSelector(productsSelector.selectProductById);
  const products = useSelector(productsSelector.selectProducts);

  const isLoading = status === "idle" || status === "loading";

  const cartTableData = cart.map((item) => ({
    key: item.id,
    product: item.productName,
    productImage: item.productImage,
    productStock: item.productStock,
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
      if (status === "idle" && user) {
        dispatch(cartThunk.fetchCart(user?.id));
      }
    },
    [status, user]
  );

  const selectedItems = cartTableWithVendors.filter((item) => !item.isVendorRow && selectedRowKeys.includes(item.key));
  const totalQuantity = selectedItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = selectedItems.reduce((sum, item) => sum + item.totalPrice, 0);

  function handleDeleteCartItem(cartId) {
    dispatch(cartThunk.removeFromCart({ cartId, userId: user.id }));
  }

  function handleResetCart() {
    if (cart.length) {
      dispatch(cartThunk.removeAllCart(user.id));
    }
  }

  async function handleUpdateCartSelect({ values, type }) {
    const allItems = Object.entries(values).map(([cartId, quantity]) => ({
      cartId,
      quantity,
    }));
    switch (type) {
      case "updateQuantity":
        dispatch(cartThunk.updateQuantity({ items: allItems, userId: user.id }));
        break;
      case "buy":
        const result = allItems
          .filter((item) => selectedItems.some((p) => p.key === item.cartId))
          .map((item) => ({
            id: item.cartId,
            quantity: item.quantity,
            isSelect: true,
          }));
        dispatch(cartThunk.updateQuantityAndSelect({ items: result, userId: user.id }));
        navigate("/order-detail");
        break;
      case "cancelOrder":
        const cancelItems = allItems.map((item) => ({
          id: item.cartId,
          quantity: item.quantity,
          isSelect: false,
        }));

        await dispatch(cartThunk.updateQuantityAndSelect({ items: cancelItems, userId: user.id }));
        break;
    }
  }

  async function handleAddProductToCart(productId, quantity) {
    let product = products.find((p) => p.id === productId);
    let productExistingCart = cart.find((item) => item.productId === productId);
    let totalQuantity = productExistingCart ? quantity + productExistingCart.quantity : quantity;
    if (totalQuantity > product.stock) {
      toast.error(t("This product has insufficient stock."));
      return;
    }

    await dispatch(cartThunk.addToCart({ userId: user.id, productId, quantity }));

    if (status === "succeeded") {
      toast.success(t("cart.toast.success"));
    }
    if (status === "failed") toast.error(t("cart.toast.error"));
  }

  function handleBackToHome() {
    navigate("/");
  }

  return {
    dispatch,
    status,
    cart,
    cartSelect,
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
    handleUpdateCartSelect,
    handleBackToHome,
    t,
  };
}
