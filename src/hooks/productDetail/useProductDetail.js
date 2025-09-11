import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { productsSelector } from "@/stores/rootSelector";
import { productsThunk } from "@/stores/rootThunk";
import { useUser } from "@/hooks/authentication/useUser";

export function useProductDetail(id) {
  const dispatch = useDispatch();
  const { user } = useUser();
  const productDetail = useSelector((state) => productsSelector.selectProductById(state));
  const error = useSelector((state) => productsSelector.selectError(state));
  const status = useSelector(productsSelector.selectStatus);

  const [quantity, setQuantity] = useState(1);
  const avgRating = productDetail.reviews.length
    ? parseFloat(
        (productDetail.reviews.reduce((sum, r) => sum + r.rating, 0) / productDetail.reviews.length).toFixed(1)
      )
    : 0;
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
      dispatch(productsThunk.getProduct(id));
    }
  }, [id, dispatch]);

  function handleIncrease() {
    setQuantity(() => quantity + 1);
  }

  function handleDecrease() {
    setQuantity(() => quantity - 1);
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
    avgRating,
  };
}
