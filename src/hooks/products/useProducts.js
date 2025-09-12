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

  const products = vendorId ? productsVendor : allProducts;

  const fetchDataProducts = useCallback(() => {
    if (vendorId) {
      dispatch(productsThunk.fetchProductsByVendor(vendorId));
    } else {
      dispatch(productsThunk.fetchAllProducts());
    }
  }, [dispatch, vendorId]);

  const [searchParams, setSearchParams] = useSearchParams();

  const page = parseInt(searchParams.get("page") || 1, 10);
  const sort = searchParams.get("sort") || "";
  const brand = searchParams.get("brand") || "";
  const category = searchParams.get("category") || "";
  const priceMin = parseInt(searchParams.get("priceMin") || 0, 10);
  const priceMax = parseInt(searchParams.get("priceMax") || 0, 10);
  const stock = searchParams.get("stock") || "";
  const bestSeller = searchParams.get("bestSeller") === "true";
  const bestSellerProducts = useMemo(() => {
    if (!Array.isArray(products)) return [];
    return products.filter((p) => p.total_sold >= 1);
  }, [products]);

  const handleFilterChange = (filterObj) => {
    setSearchParams({
      page: 1,
      sort,
      brand,
      category,
      priceMin,
      priceMax,
      stock,
      bestSeller,
      ...filterObj,
    });
  };

  const handleSortChange = (value) => handleFilterChange({ sort: value });
  const handlePageChange = (page) => setSearchParams({ ...Object.fromEntries([...searchParams]), page });

  const pageSize = PAGE_SIZE.PRODUCT_LIST;

  const filteredProducts = useMemo(() => {
    if (!Array.isArray(products)) return [];

    return products.filter((p) => {
      if (brand && p.brandId !== brand) return false;
      if (category && p.categoryId !== category) return false;
      if (priceMin && p.price < priceMin) return false;
      if (priceMax && p.price > priceMax) return false;
      if (stock === "low" && p.stock >= 5) return false;
      if (bestSeller && p.total_sold < 10) return false;
      return true;
    });
  }, [products, brand, category, priceMin, priceMax, stock, bestSeller]);

  const paginatedProducts = useMemo(() => {
    let sorted = [...filteredProducts];
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
  }, [filteredProducts, sort, page, pageSize]);

  const handleNavigate = (id) => navigate(`/product/${id}`);

  const brandList = useMemo(
    () => [...new Map(products.map((p) => [p.brandId, { id: p.brandId, name: p.brandName }])).values()],
    [products]
  );

  const categoryList = useMemo(
    () => [...new Map(products.map((p) => [p.categoryId, { id: p.categoryId, name: p.categoryName }])).values()],
    [products]
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
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
    bestSellerProducts,
  };
}
