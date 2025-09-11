import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { ordersSelector } from "@/stores/rootSelector";
import { cartThunk, ordersThunk } from "@/stores/rootThunk";
import { useUser } from "@/hooks/authentication/useUser";

export default function useOrderHistory() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useUser();
  const orders = useSelector(ordersSelector.selectOrders);
  const status = useSelector(ordersSelector.selectOrderStatus);
  const error = useSelector(ordersSelector.selectOrderError);

  useEffect(() => {
    if (status === "idle" && user) {
      dispatch(ordersThunk.fetchAllOrder(user.id));
    }
  }, [status, user, dispatch]);

  const isLoading = status === "idle" || status === "loading" || !user;

  async function handleClickBuyAgain(order) {
    const products = await order.productsbyvendor.reduce((acc, item) => {
      item.products.forEach((element) => {
        acc.push(element);
      });
      return acc;
    }, []);

    Promise.all(
      products.map((product) => {
        dispatch(cartThunk.addToCart({ userId: user.id, productId: product.productId, quantity: product.quantity }));
      })
    );

    navigate("/cart");
  }

  return { orders, error, status, isLoading, handleClickBuyAgain };
}
