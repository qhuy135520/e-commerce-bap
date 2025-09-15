import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { productsSelector } from "@/stores/rootSelector";
import { productsThunk } from "@/stores/rootThunk";
import { useUser } from "@/hooks/authentication/useUser";
import { useNavigate } from "react-router-dom";
import { vendorThunk } from "@/stores/rootThunk";

export function useProductDetail(id) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useUser();
  const [dataVendor, setDataVendor] = useState({});
  const productDetail = useSelector((state) => productsSelector.selectProductById(state));
  const error = useSelector((state) => productsSelector.selectError(state));
  const status = useSelector(productsSelector.selectStatus);

  function handleNavigate(link) {
    navigate(link);
  }

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

  useEffect(() => {
    async function fetchVendorInfo() {
      const data = await dispatch(vendorThunk.getVendorInfo(productDetail?.vendorId)).unwrap();
      setDataVendor(data);
    }
    fetchVendorInfo();
  }, [productDetail?.vendorId]);

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
    dataVendor,
    setQuantity,
    handleIncrease,
    handleDecrease,
    isLoadingProduct,
    error,
    avgRating,
    handleNavigate,
  };
}
