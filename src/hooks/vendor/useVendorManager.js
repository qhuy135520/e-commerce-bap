import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useUser } from "@/hooks/authentication/useUser";

import { ordersSelector, productsSelector } from "@/stores/rootSelector";
import { ordersThunk, productsThunk } from "@/stores/rootThunk";

export default function useVendorManager() {
  const { user } = useUser();
  const dispatch = useDispatch();

  const products = useSelector(productsSelector.selectFilteredProductsVendor);
  const orders = useSelector(ordersSelector.selectOrderVendor);

  const productEmptyStock = products.filter((p) => p.stock === 0);

  const [piePayment, setPiePayment] = useState([
    { name: "Chưa thanh toán", value: 0 },
    { name: "Đã thanh toán", value: 0 },
  ]);

  const [pieOrder, setPieOrder] = useState([
    { name: "Chưa xử lý", value: 0 },
    { name: "Đang vận chuyển", value: 0 },
    { name: "Hoàn thành", value: 0 },
    { name: "Hủy đơn", value: 0 },
    { name: "Đã thanh toán", value: 0 },
  ]);

  useEffect(() => {
    if (user?.id) {
      dispatch(productsThunk.fetchProductsByVendor(user.id));
      dispatch(ordersThunk.getOrderVendor(user.id));
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (orders.length > 0) {
      const paidValue = orders.filter((o) => o.status === "paid").reduce((sum, o) => sum + (o.totalorder || 0), 0);

      const unpaidValue = orders.filter((o) => o.status !== "paid").reduce((sum, o) => sum + (o.totalorder || 0), 0);

      setPiePayment([
        { name: "Chưa thanh toán", value: unpaidValue },
        { name: "Đã thanh toán", value: paidValue },
      ]);
    }
  }, [orders]);

  useEffect(() => {
    if (orders.length > 0) {
      const pending = orders.filter((o) => o.status === "pending").length;
      const shipped = orders.filter((o) => o.status === "shipped").length;
      const completed = orders.filter((o) => o.status === "completed").length;
      const canceled = orders.filter((o) => o.status === "canceled").length;
      const paid = orders.filter((o) => o.status === "paid").length;

      setPieOrder([
        { name: "Chưa xử lý", value: pending },
        { name: "Đang vận chuyển", value: shipped },
        { name: "Hoàn thành", value: completed },
        { name: "Hủy đơn", value: canceled },
        { name: "Đã thanh toán", value: paid },
      ]);
    }
  }, [orders]);

  const productSalestData = useMemo(() => {
    const productMap = {};

    orders.forEach((order) => {
      order.products.forEach((p) => {
        if (!productMap[p.productName]) {
          productMap[p.productName] = 0;
        }
        productMap[p.productName] += p.quantity;
      });
    });

    return Object.entries(productMap)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);
  }, [orders]);

  const lineOrderData = useMemo(() => {
    const map = {};

    orders.forEach((o) => {
      const date = new Date(o.createdat);
      const key = date.toISOString().split("T")[0];

      if (!map[key]) {
        map[key] = { name: key, orders: 0, revenue: 0 };
      }
      map[key].orders += 1;
      map[key].revenue += o.totalorder;
    });

    return Object.values(map)
      .sort((a, b) => new Date(a.name) - new Date(b.name))
      .slice(-10);
  }, [orders]);

  return {
    products,
    productEmptyStock,
    piePayment,
    pieOrder,
    productSalestData,
    lineOrderData,
  };
}
