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
  const [toggleView, setToggleView] = useState("monthly");

  const [pieUser, setPieUser] = useState([
    { name: t("chartInfo.userBlocked"), value: 0 },
    { name: t("chartInfo.userActive"), value: 0 },
  ]);
  const [pieProduct, setPieProduct] = useState([
    { name: t("chartInfo.productPending"), value: 0 },
    { name: t("chartInfo.productApproved"), value: 0 },
  ]);
  const [pieOrder, setPieOrder] = useState([
    { name: t("chartInfo.orderPending"), value: 0 },
    { name: t("chartInfo.orderShipped"), value: 0 },
    { name: t("chartInfo.orderCompleted"), value: 0 },
    { name: t("chartInfo.orderPaid"), value: 0 },
    { name: t("chartInfo.orderCanceled"), value: 0 },
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
      const pending = orders.filter((o) => o.status === "pending").length;
      const shipped = orders.filter((o) => o.status === "shipped").length;
      const completed = orders.filter((o) => o.status === "completed").length;
      const paid = orders.filter((o) => o.status === "paid").length;
      const canceled = orders.filter((o) => o.status === "canceled").length;

      setPieOrder([
        { name: t("chartInfo.orderPending"), value: pending },
        { name: t("chartInfo.orderShipped"), value: shipped },
        { name: t("chartInfo.orderCompleted"), value: completed },
        { name: t("chartInfo.orderPaid"), value: paid },
        { name: t("chartInfo.orderCanceled"), value: canceled },
      ]);

      const today = new Date();
      const defaultHours = Array.from({ length: 24 }, (_, i) => {
        const date = new Date(today.getFullYear(), today.getMonth(), today.getDate(), i);
        return {
          name: `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1).toString().padStart(2, "0")} ${i
            .toString()
            .padStart(2, "0")}:00`,
          orderTotal: 0,
          adminCommission: 0,
        };
      });

      const dataReducer = (acc, order) => {
        const date = new Date(order.created_at + (order.created_at.endsWith("Z") ? "" : "Z"));

        let key;
        if (toggleView === "monthly") {
          key = `${t("chartInfo.month")} ${date.getMonth() + 1}`;
        } else if (toggleView === "daily") {
          key = `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1).toString().padStart(2, "0")}`;
        } else {
          // hourly
          key = `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1)
            .toString()
            .padStart(2, "0")} ${date.getHours().toString().padStart(2, "0")}:00`;
        }
        if (!acc[key]) {
          acc[key] = { name: key, orderTotal: 0, adminCommission: 0 };
        }
        acc[key].orderTotal += order.total_amount;
        acc[key].adminCommission += order.total_amount * 0.15;
        return acc;
      };

      let lineDataArray = Object.values(orders.reduce(dataReducer, {})).sort((a, b) => {
        if (toggleView === "monthly") {
          const monthA = parseInt(a.name.split(" ")[1]);
          const monthB = parseInt(b.name.split(" ")[1]);
          return monthA - monthB;
        } else if (toggleView === "daily") {
          const [dayA, monthA] = a.name.split("/").map(Number);
          const [dayB, monthB] = b.name.split("/").map(Number);
          return monthA === monthB ? dayA - dayB : monthA - monthB;
        } else {
          const [dateA, timeA] = a.name.split(" ");
          const [dayA, monthA] = dateA.split("/").map(Number);
          const hourA = parseInt(timeA.split(":")[0]);
          const [dateB, timeB] = b.name.split(" ");
          const [dayB, monthB] = dateB.split("/").map(Number);
          const hourB = parseInt(timeB.split(":")[0]);
          return monthA === monthB ? (dayA === dayB ? hourA - hourB : dayA - dayB) : monthA - monthB;
        }
      });

      if (toggleView === "hourly") {
        const mergedData = defaultHours.map((defaultHour) => {
          const existingData = lineDataArray.find((data) => data.name === defaultHour.name);
          return existingData || defaultHour;
        });
        lineDataArray = mergedData;
      }

      setLineData(lineDataArray);
    }
  }, [orders, t, toggleView]);

  return { pieUser, pieProduct, pieOrder, lineData, toggleView, setToggleView };
};
