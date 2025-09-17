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
  const products = useSelector(productsSelector.selectProducts);

  const isLoading = status === "idle" || status === "loading";

  // table data

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
    isDisable: item.productStock === 0,
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

  // fetch cart
  useEffect(() => {
    if (!user) return;

    dispatch(cartThunk.fetchCart(user?.id));
  }, [user, dispatch]);

  const selectedItems = cartTableWithVendors.filter((item) => !item.isVendorRow && selectedRowKeys.includes(item.key));
  const totalQuantity = selectedItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = selectedItems.reduce((sum, item) => sum + item.totalPrice, 0);

  // actions
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
      case "updateQuantity": {
        dispatch(cartThunk.updateQuantity({ items: allItems, userId: user.id }));
        break;
      }

      case "buyFromCart": {
        // chỉ lấy các sản phẩm user chọn trong cart
        const result = allItems
          .filter((item) => selectedRowKeys.includes(item.cartId))
          .map((item) => ({
            id: item.cartId,
            quantity: item.quantity,
            isSelect: true,
          }));

        if (!result.length) return;
        await dispatch(cartThunk.updateQuantityAndSelect({ items: result, userId: user.id }));
        navigate("/order-detail");
        break;
      }

      case "cancelOrder": {
        const cancelItems = allItems.map((item) => ({
          id: item.cartId,
          quantity: item.quantity,
          isSelect: false,
        }));
        await dispatch(cartThunk.updateQuantityAndSelect({ items: cancelItems, userId: user.id }));
        break;
      }

      default:
        break;
    }
  }

  async function handleAddProductToCart(productId, quantity) {
    const product = products.find((p) => p.id === productId);
    const productExistingCart = cart.find((item) => item.productId === productId);

    const totalQuantity = productExistingCart ? quantity + productExistingCart.quantity : quantity;
    if (totalQuantity > product.stock) {
      toast.error(t("This product has insufficient stock."));
      return;
    }

    await dispatch(cartThunk.addToCart({ userId: user.id, productId, quantity }));

    if (status === "succeeded") {
      toast.success(t("cart.toast.success"));
    }
    if (status === "failed") {
      toast.error(t("cart.toast.error"));
    }
  }

  async function handleBuyNow(productId, quantity) {
    // tìm sản phẩm trong giỏ
    let productExistingCart = cart.find((item) => item.productId === productId);

    // nếu chưa có thì thêm vào giỏ
    if (!productExistingCart) {
      await dispatch(cartThunk.addToCart({ userId: user.id, productId, quantity }));
      const updatedCart = await dispatch(cartThunk.fetchCart(user.id)).unwrap();
      productExistingCart = updatedCart.find((item) => item.productId === productId);
    }

    if (!productExistingCart) return;

    // chỉ update đúng sản phẩm này để mua ngay
    const buyItems = [
      {
        id: productExistingCart.id,
        quantity,
        isSelect: true,
      },
    ];

    await dispatch(cartThunk.updateQuantityAndSelect({ items: buyItems, userId: user.id }));
    navigate("/order-detail");
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
    handleBuyNow,
    t,
  };
}
