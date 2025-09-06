import { useState } from "react";
import { useSelector } from "react-redux";

import { selectProductById, selectStatus } from "@/stores/products/products.selectors";

export function useProductDetail(id) {
  const productDetail = useSelector((state) => selectProductById(state, id));
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
  };
}

