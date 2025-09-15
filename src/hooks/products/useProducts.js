import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { productsThunk, vendorThunk } from "@/stores/rootThunk";
import { productsSelector } from "@/stores/rootSelector";
import { PAGE_SIZE } from "@/constants";

export default function useProducts() {
  const { t } = useTranslation(["product"]);
  const { vendorId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const productsVendor = useSelector(productsSelector.selectProductsVendor);
  const allProducts = useSelector(productsSelector.selectProducts);
  const status = useSelector(productsSelector.selectStatus);
  const isLoading = ["loading", "idle"].includes(status);

  const products = vendorId ? productsVendor : allProducts;

  const fetchDataProducts = useCallback(() => {
    if (vendorId) {
      dispatch(productsThunk.fetchProductsByVendor(vendorId));
    } else {
      dispatch(productsThunk.fetchAllProducts());
    }
  }, [dispatch, vendorId]);

  const [dataVendor, setDataVendor] = useState({});

  useEffect(() => {
    async function fetchVendorInfo() {
      if (vendorId) {
        const data = await dispatch(vendorThunk.getVendorInfo(vendorId)).unwrap();
        setDataVendor(data);
      }
    }
    fetchVendorInfo();
  }, [vendorId]);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const sort = searchParams.get("sort") || "";
  const brand = searchParams.get("brand") || "";
  const category = searchParams.get("category") || "";
  const priceMin = parseFloat(searchParams.get("priceMin") || "0");
  const priceMax = parseFloat(searchParams.get("priceMax") || "0");
  const stock = searchParams.get("stock") || "";
  const bestSeller = searchParams.get("bestSeller") === "true";
  const minReview = parseFloat(searchParams.get("minReview") || "0");

  const buildParams = (overrides = {}) => {
    const paramsObj = Object.fromEntries([...searchParams]);
    Object.assign(paramsObj, overrides);
    const cleaned = {};
    Object.entries(paramsObj).forEach(([k, v]) => {
      if (v === undefined || v === null) return;
      const str = typeof v === "string" ? v : String(v);
      if (str !== "" && str !== "undefined") cleaned[k] = str;
    });
    return cleaned;
  };

  const handleFilterChange = (filterObj) => {
    const next = buildParams({ page: "1", ...filterObj });
    setSearchParams(next);
  };

  const handleSortChange = (value) => handleFilterChange({ sort: value });
  const handlePageChange = (newPage) => {
    const next = buildParams({ page: String(newPage) });
    setSearchParams(next);
  };

  const pageSize = PAGE_SIZE.PRODUCT_LIST;

  const enrichedProducts = useMemo(() => {
    if (!Array.isArray(products)) return [];
    return products.map((p) => {
      let reviews = p.reviews;
      if (!Array.isArray(reviews) && typeof reviews === "string") {
        try {
          reviews = JSON.parse(reviews);
        } catch (e) {
          reviews = [];
        }
      }
      if (!Array.isArray(reviews)) reviews = [];

      const reviewCount = reviews.length;
      const avgReviewRaw =
        reviewCount > 0 ? reviews.reduce((sum, r) => sum + (Number(r.rating) || 0), 0) / reviewCount : 0;
      const avgReview = Math.round(avgReviewRaw * 10) / 10;

      return {
        ...p,
        reviews,
        reviewCount,
        avgReview,
      };
    });
  }, [products]);

  const bestSellerProducts = useMemo(() => {
    if (!Array.isArray(enrichedProducts)) return [];
    return [...enrichedProducts].sort((a, b) => (b.total_sold || 0) - (a.total_sold || 0)).slice(0, 8);
  }, [enrichedProducts]);

  const filteredProducts = useMemo(() => {
    if (!Array.isArray(enrichedProducts)) return [];

    return enrichedProducts.filter((p) => {
      if (brand && p.brandId !== brand) return false;
      if (category && p.categoryId !== category) return false;
      if (priceMin && p.price < priceMin) return false;
      if (priceMax && priceMax > 0 && p.price > priceMax) return false;
      if (stock === "low" && (p.stock === undefined || p.stock >= 5)) return false;
      if (bestSeller && (p.total_sold === undefined || p.total_sold < 10)) return false;
      if (minReview && (p.avgReview || 0) < minReview) return false;
      return true;
    });
  }, [enrichedProducts, brand, category, priceMin, priceMax, stock, bestSeller, minReview]);

  const paginatedProducts = useMemo(() => {
    const sorted = [...filteredProducts];
    switch (sort) {
      case "price-asc":
        sorted.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case "price-desc":
        sorted.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case "sales-asc":
        sorted.sort((a, b) => (a.total_sold || 0) - (b.total_sold || 0));
        break;
      case "sales-desc":
        sorted.sort((a, b) => (b.total_sold || 0) - (a.total_sold || 0));
        break;
      case "review-desc":
        sorted.sort((a, b) => (b.avgReview || 0) - (a.avgReview || 0));
        break;
      default:
        break;
    }
    return sorted.slice((page - 1) * pageSize, page * pageSize);
  }, [filteredProducts, sort, page, pageSize]);

  const handleNavigate = (id) => navigate(`/product/${id}`);

  const totalProducts = useMemo(() => filteredProducts.length, [filteredProducts]);

  const brandList = useMemo(() => {
    if (!Array.isArray(enrichedProducts)) return [];
    return [...new Map(enrichedProducts.map((p) => [p.brandId, { id: p.brandId, name: p.brandName }])).values()];
  }, [enrichedProducts]);

  const categoryList = useMemo(() => {
    if (!Array.isArray(enrichedProducts)) return [];
    return [
      ...new Map(enrichedProducts.map((p) => [p.categoryId, { id: p.categoryId, name: p.categoryName }])).values(),
    ];
  }, [enrichedProducts]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "ease-in-out",
    pauseOnHover: true,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  const getRandomProducts = (list, count = 5) => {
    if (!Array.isArray(list)) return [];
    const shuffled = [...list].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  };

  const randomProducts = useMemo(() => {
    return getRandomProducts(enrichedProducts, 5);
  }, [enrichedProducts]);

  return {
    isLoading,
    fetchDataProducts,
    paginatedProducts,
    handleSortChange,
    handlePageChange,
    handleFilterChange,
    page,
    pageSize,
    sort,
    brand,
    category,
    priceMin,
    priceMax,
    stock,
    bestSeller,
    brandList,
    categoryList,
    handleNavigate,
    t,
    totalProducts,
    minReview,
    bestSellerProducts,
    settings,
    randomProducts,
    dataVendor,
  };
}
