import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { isWithinInterval, subDays, startOfDay, endOfDay } from "date-fns";

import { ordersSelector } from "@/stores/rootSelector";
import { cartThunk, ordersThunk } from "@/stores/rootThunk";
import { useUser } from "@/hooks/authentication/useUser";
import useCart from "@/hooks/cart/useCart";

const STEP = 5;

export default function useOrderHistory() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useUser();

  const { handleAddProductToCart } = useCart();

  const orders = useSelector(ordersSelector.selectOrders);
  const status = useSelector(ordersSelector.selectOrderStatus);
  const error = useSelector(ordersSelector.selectOrderError);

  const [filterStatus, setFilterStatus] = useState("all");
  const [duration, setDuration] = useState("all");
  const [customRange, setCustomRange] = useState(null);
  const [visibleCount, setVisibleCount] = useState(STEP);

  useEffect(() => {
    if (!user) return;

    dispatch(ordersThunk.fetchAllOrder(user.id));
  }, [user?.id, dispatch]);

  const isLoading = status === "idle" || status === "loading" || !user;

  const filteredOrders = useMemo(() => {
    let result = [...orders];
    const now = new Date();

    if (filterStatus !== "all") {
      result = result.filter((o) => o.orderstatus === filterStatus);
    }

    if (duration !== "all" && !customRange) {
      let fromDate;
      if (duration === "7d") fromDate = subDays(now, 7);
      if (duration === "30d") fromDate = subDays(now, 30);
      if (duration === "6m") fromDate = subDays(now, 180);
      if (duration === "1y") fromDate = subDays(now, 365);

      result = result.filter((o) =>
        isWithinInterval(new Date(o.ordercreatedat), {
          start: fromDate,
          end: now,
        })
      );
    }

    if (customRange) {
      const [start, end] = customRange;
      if (start && end) {
        result = result.filter((o) =>
          isWithinInterval(new Date(o.ordercreatedat), {
            start: startOfDay(start.toDate()),
            end: endOfDay(end.toDate()),
          })
        );
      }
    }

    return result;
  }, [orders, filterStatus, duration, customRange]);

  const visibleOrders = useMemo(() => filteredOrders.slice(0, visibleCount), [filteredOrders, visibleCount]);

  function handleLoadMore() {
    setVisibleCount((prev) => prev + STEP);
  }

  async function handleClickBuyAgain(order) {
    const products = order.productsbyvendor.flatMap((item) => item.products);

    await Promise.all(products.map((product) => handleAddProductToCart(product.productId, product.quantity)));

    navigate("/cart");
  }

  function handleBackToHome() {
    navigate("/");
  }

  return {
    error,
    isLoading,
    visibleOrders,
    canLoadMore: visibleCount < filteredOrders.length,
    handleLoadMore,
    handleClickBuyAgain,
    handleBackToHome,
    filterStatus,
    setFilterStatus,
    duration,
    setDuration,
    customRange,
    setCustomRange,
    orders,
  };
}
