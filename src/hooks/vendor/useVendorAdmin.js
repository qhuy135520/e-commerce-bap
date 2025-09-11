import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllVendor } from "@/stores/vendor/vendor.thunks";
import { selectVendorError, selectVendorStatus } from "@/stores/vendor/vendor.selectors";
import { updateVendor } from "@/stores/vendor/vendor.thunks";

export function useVendorAdmin(itemsPerPage = 10) {
  const [vendors, setVendors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const vendorData = useSelector((state) => state.vendor.data);
  const status = useSelector(selectVendorStatus);
  const error = useSelector(selectVendorError);

  useEffect(() => {
    dispatch(fetchAllVendor());
  }, [dispatch]);

  useEffect(() => {
    if (vendorData) {
      setVendors(vendorData.filter((v) => v.name.trim().toLowerCase().includes(searchTerm.toLowerCase().trim())));
    }
  }, [vendorData, searchTerm]);

  const handleStatusToggle = async (userId, currentStatus) => {
    const newStatus = currentStatus === "active" ? "unactive" : "active";
    try {
      await dispatch(updateVendor({ userId, newStatus })).unwrap();
    } catch (err) {
      throw err;
    }
  };

  const handlePageChange = (page) => setCurrentPage(page);
  const handleSearch = (value) => setSearchTerm(value);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentVendors = vendors.slice(indexOfFirstItem, indexOfLastItem);
  const totalItems = vendors.length;

  return {
    vendors: currentVendors,
    totalItems,
    currentPage,
    itemsPerPage,
    searchTerm,
    status,
    error,
    handlePageChange,
    handleSearch,
    handleStatusToggle,
  };
}
