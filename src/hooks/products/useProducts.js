import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { productsThunk } from "@/stores/rootThunk";
import { productsSelector } from "@/stores/rootSelector";
import { PAGE_SIZE } from "@/constants";

export default function useProducts() {
  const { t } = useTranslation(["product"]);
  const { vendorId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const productsVendor = useSelector(productsSelector.selectProductsVendor);
  const allProducts = useSelector(productsSelector.selectProducts);
  const status = useSelector(productsSelector.selectStatus);
  const isLoading = ["loading", "idle"].includes(status);
  const error = useSelector(productsSelector.selectError);

  const products = vendorId ? productsVendor : allProducts;

  const fetchDataProducts = useCallback(() => {
    if (vendorId) {
      dispatch(productsThunk.fetchProductsByVendor(vendorId));
    } else {
      dispatch(productsThunk.fetchAllProducts());
    }
  }, [dispatch, vendorId]);

  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get("sort") || "";
  const page = parseInt(searchParams.get("page") || 1, 10);

  const handleSortChange = (value) => {
    setSearchParams({ sort: value, page: 1 });
  };

  const handlePageChange = (page) => {
    setSearchParams({ sort, page });
  };

  const pageSize = PAGE_SIZE.PRODUCT_LIST;

  const paginatedProducts = useMemo(() => {
    if (!Array.isArray(products)) return [];
    let sorted = [...products];
    switch (sort) {
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "sales-asc":
        sorted.sort((a, b) => a.total_sold - b.total_sold);
        break;
      case "sales-desc":
        sorted.sort((a, b) => b.total_sold - a.total_sold);
        break;
      default:
        break;
    }
    return sorted.slice((page - 1) * pageSize, page * pageSize);
  }, [products, sort, page, pageSize]);

  const randomProducts = useMemo(
    () => (Array.isArray(allProducts) ? [...allProducts].sort(() => Math.random() - 0.5).slice(0, 5) : []),
    [allProducts]
  );

  const topProducts = useMemo(
    () => (Array.isArray(allProducts) ? [...allProducts].sort((a, b) => b.total_sold - a.total_sold).slice(0, 12) : []),
    [allProducts]
  );

  const handleNavigate = (id) => {
    navigate(`/product/${id}`);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows: true,
  };

  return {
    isLoading,
    fetchDataProducts,
    vendorId,
    allProducts,
    productsVendor,
    products,
    status,
    error,
    sort,
    page,
    pageSize,
    handleSortChange,
    handlePageChange,
    paginatedProducts,
    randomProducts,
    handleNavigate,
    topProducts,
    settings,
    t,
  };
}
