import { useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { productsSelector } from "@/stores/rootSelector";
import { productsThunk } from "@/stores/rootThunk";
import { PAGE_SIZE } from "@/constants";

export default function useSearchProducts() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const page = parseInt(searchParams.get("page") || 1, 10);
  const { t } = useTranslation("product");

  const allProducts = useSelector(productsSelector.selectProducts); // lấy danh sách gốc
  const status = useSelector(productsSelector.selectStatus);

  const [value, setValue] = useState(query);

  // fetch products khi status = idle
  useEffect(() => {
    if (status === "idle") {
      dispatch(productsThunk.fetchAllProducts());
    }
  }, [status, dispatch]);

  // đồng bộ value với query trên URL
  useEffect(() => {
    setValue(query);
  }, [query]);

  const pageSize = PAGE_SIZE.PRODUCT_LIST;

  // lọc theo query
  const filteredProducts = useMemo(() => {
    if (!query) return allProducts;
    return allProducts.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()));
  }, [allProducts, query]);

  // phân trang
  const paginatedProducts = useMemo(() => {
    return filteredProducts?.slice((page - 1) * pageSize, page * pageSize);
  }, [filteredProducts, page, pageSize]);

  const handlePageChange = (newPage) => {
    navigate(`/search?query=${encodeURIComponent(query)}&page=${newPage}`);
  };
  const handleNavigate = (id) => {
    navigate(`/product/${id}`);
  };

  // autocomplete
  const options = useMemo(() => {
    if (!value) return [];
    return allProducts
      .filter((p) => p.name.toLowerCase().includes(value.toLowerCase()))
      .slice(0, 8)
      .map((p, idx) => ({
        value: p.name,
        label: p.name,
        key: p.id || `${p.name}-${idx}`,
      }));
  }, [value, allProducts]);

  const handleSearch = (val) => setValue(val);
  const handleSelect = (val) => {
    navigate(`/search?query=${encodeURIComponent(val)}`);
  };
  const handleSubmit = () => {
    if (!value.trim()) return;
    navigate(`/search?query=${encodeURIComponent(value)}`);
  };

  return {
    products: paginatedProducts,
    totalProducts: filteredProducts?.length,
    status,
    query,
    page,
    pageSize,
    handleNavigate,
    value,
    setValue,
    options,
    handleSearch,
    handleSelect,
    handleSubmit,
    handlePageChange,
    t,
  };
}
