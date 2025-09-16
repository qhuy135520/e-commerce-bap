import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import { ordersThunk, productsThunk, userThunk } from "@/stores/rootThunk";
import { ordersSelector, productsSelector, userSelector } from "@/stores/rootSelector";

export const useAdminDashboard = () => {
  const { t } = useTranslation(["admin"]);
  const dispatch = useDispatch();
  const users = useSelector(userSelector.usersSelector);
  const products = useSelector(productsSelector.selectAllProducts);
  const orders = useSelector(ordersSelector.selectAllOrdersAdmin);

  const [pieUser, setPieUser] = useState([
    { name: t("chartInfo.userBlocked"), value: 0 },
    { name: t("chartInfo.userActive"), value: 0 },
  ]);
  const [pieProduct, setPieProduct] = useState([
    { name: t("chartInfo.productPending"), value: 0 },
    { name: t("chartInfo.productApproved"), value: 0 },
  ]);
  const [pieOrder, setPieOrder] = useState([
    { name: t("chartInfo.orderShipped"), value: 0 },
    { name: t("chartInfo.orderPending"), value: 0 },
    { name: t("chartInfo.orderCompleted"), value: 0 },
    { name: t("chartInfo.orderCancelled"), value: 0 },
  ]);
  const [lineData, setLineData] = useState([]);

  useEffect(() => {
    dispatch(userThunk.fetchUsers());
    dispatch(productsThunk.getAllProducts());
    dispatch(ordersThunk.fetchAllOrdersAdmin());
  }, [dispatch]);

  useEffect(() => {
    if (users.length > 0) {
      const active = users.filter((u) => u.role === "customer" && u.status === "active").length;
      const inactive = users.filter((u) => u.role === "customer" && u.status === "inactive").length;
      setPieUser([
        { name: t("chartInfo.userBlocked"), value: inactive },
        { name: t("chartInfo.userActive"), value: active },
      ]);
    }
  }, [users, t]);

  useEffect(() => {
    if (products.length > 0) {
      const trueCount = products.filter((p) => p.status === true).length;
      const falseCount = products.filter((p) => p.status === false).length;
      setPieProduct([
        { name: t("chartInfo.productPending"), value: falseCount },
        { name: t("chartInfo.productApproved"), value: trueCount },
      ]);
    }
  }, [products, t]);

  useEffect(() => {
    if (orders.length > 0) {
      const shipped = orders.filter((o) => o.status === "shipped").length;
      const pending = orders.filter((o) => o.status === "pending").length;
      const completed = orders.filter((o) => o.status === "completed").length;
      const cancelled = orders.filter((o) => o.status === "cancelled").length;

      setPieOrder([
        { name: t("chartInfo.orderShipped"), value: shipped },
        { name: t("chartInfo.orderPending"), value: pending },
        { name: t("chartInfo.orderCompleted"), value: completed },
        { name: t("chartInfo.orderCancelled"), value: cancelled },
      ]);

      const monthlyData = orders.reduce((acc, order) => {
        const date = new Date(order.created_at || Date.now());
        const month = `${t("chartInfo.month")} ${date.getMonth() + 1}`;
        if (!acc[month]) {
          acc[month] = { name: month, orderTotal: 0, adminCommission: 0 };
        }
        acc[month].orderTotal += order.total_amount;
        acc[month].adminCommission += order.total_amount * 0.15;
        return acc;
      }, {});

      const lineDataArray = Object.values(monthlyData).sort((a, b) => {
        const monthA = parseInt(a.name.split(" ")[1]);
        const monthB = parseInt(b.name.split(" ")[1]);
        return monthA - monthB;
      });

      setLineData(lineDataArray);
    }
  }, [orders, t]);

  return { pieUser, pieProduct, pieOrder, lineData };
};
