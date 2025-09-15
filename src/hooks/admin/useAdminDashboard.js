import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "@/stores/user/users.thunks";
import { usersSelector } from "@/stores/user/users.selector";
import { getAllProducts } from "@/stores/products/products.thunks";
import { selectAllProducts } from "@/stores/products/products.selectors";
import { fetchAllOrdersAdmin } from "@/stores/order/orders.thunks";
import { selectAllOrdersAdmin } from "@/stores/order/orders.selector";

export const useAdminDashboard = () => {
  const dispatch = useDispatch();
  const users = useSelector(usersSelector);
  const products = useSelector(selectAllProducts);
  const orders = useSelector(selectAllOrdersAdmin);

  const [pieUser, setPieUser] = useState([
    { name: "Bị khóa", value: 0 },
    { name: "Đang hoạt động", value: 0 },
  ]);
  const [pieProduct, setPieProduct] = useState([
    { name: "Chờ duyệt", value: 0 },
    { name: "Đã duyệt", value: 0 },
  ]);
  const [pieOrder, setPieOrder] = useState([
    { name: "Đang vận chuyển", value: 0 },
    { name: "Đang xử lý", value: 0 },
    { name: "Hoàn thành", value: 0 },
    { name: "Hủy đơn", value: 0 },
  ]);
  const [lineData, setLineData] = useState([]);

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(getAllProducts());
    dispatch(fetchAllOrdersAdmin());
  }, [dispatch]);

  useEffect(() => {
    if (users.length > 0) {
      const active = users.filter((u) => u.role === "customer" && u.status === "active").length;
      const inactive = users.filter((u) => u.role === "customer" && u.status === "inactive").length;
      setPieUser([
        { name: "Bị khóa", value: inactive },
        { name: "Đang hoạt động", value: active },
      ]);
    }
  }, [users]);

  useEffect(() => {
    if (products.length > 0) {
      const trueCount = products.filter((p) => p.status === true).length;
      const falseCount = products.filter((p) => p.status === false).length;
      setPieProduct([
        { name: "Chờ duyệt", value: falseCount },
        { name: "Đã duyệt", value: trueCount },
      ]);
    }
  }, [products]);

  useEffect(() => {
    if (orders.length > 0) {
      const shipped = orders.filter((o) => o.status === "shipped").length;
      const pending = orders.filter((o) => o.status === "pending").length;
      const completed = orders.filter((o) => o.status === "completed").length;
      const cancelled = orders.filter((o) => o.status === "canceled").length;
      const paid = orders.filter((o) => o.status === "paid").length;
      setPieOrder([
        { name: "Đang vận chuyển", value: shipped },
        { name: "Đang xử lý", value: pending },
        { name: "Hoàn thành", value: completed },
        { name: "Hủy đơn", value: cancelled },
        { name: "Đã thanh toán cho vendor", value: paid },
      ]);

      const monthlyData = orders.reduce((acc, order) => {
        const date = new Date(order.created_at || Date.now());
        const month = `Th ${date.getMonth() + 1}`;
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
  }, [orders]);

  return { pieUser, pieProduct, pieOrder, lineData };
};
