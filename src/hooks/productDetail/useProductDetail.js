import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectError, selectProductById, selectStatus } from "@/stores/products/products.selectors";
import { getProduct } from "@/stores/products/products.thunks";

export function useProductDetail(id) {
  const dispatch = useDispatch();
  const productDetail = useSelector((state) => selectProductById(state));
  const error = useSelector((state) => selectError(state));
  const status = useSelector(selectStatus);
  const [quantity, setQuantity] = useState(1);
  const isLoadingProduct = status === "loading" || status === "idle";
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
  };

  useEffect(() => {
    if (id) {
      dispatch(getProduct(id));
    }
  }, [id, dispatch]);

  function handleIncrease() {
    setQuantity(Math.min(10, quantity + 1));
  }

  function handleDecrease() {
    setQuantity(Math.max(1, quantity - 1));
  }

  return {
    productDetail,
    settings,
    quantity,
    setQuantity,
    handleIncrease,
    handleDecrease,
    isLoadingProduct,
    error,
  };
}
