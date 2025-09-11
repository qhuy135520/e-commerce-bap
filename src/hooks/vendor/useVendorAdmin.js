import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import { fetchAllVendor, updateVendor } from "@/stores/vendor/vendor.thunks";
import { selectVendorError, selectVendorStatus } from "@/stores/vendor/vendor.selectors";

export function useVendorAdmin(itemsPerPage = 10) {
  const [vendors, setVendors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const dispatch = useDispatch();
  const vendorData = useSelector((state) => state.vendor.data);
  const status = useSelector(selectVendorStatus);
  const error = useSelector(selectVendorError);

  useEffect(() => {
    dispatch(fetchAllVendor());
  }, [dispatch]);

  useEffect(() => {
    if (vendorData) {
      let filteredVendors = vendorData;
      if (searchTerm) {
        filteredVendors = filteredVendors.filter((v) =>
          v.name.trim().toLowerCase().includes(searchTerm.toLowerCase().trim())
        );
      }
      if (statusFilter !== "all") {
        filteredVendors = filteredVendors.filter((v) => v.status === statusFilter);
      }
      setVendors(filteredVendors);
      setCurrentPage(1);
    }
  }, [vendorData, searchTerm, statusFilter]);

  const handleStatusToggle = async (userId, currentStatus) => {
    const newStatus = currentStatus === "active" ? "unactive" : "active";
    const vendor = vendors.find((v) => v.id === userId);
    const vendorName = vendor ? vendor.name : userId;
    setVendors((prevVendors) =>
      prevVendors.map((vendor) => (vendor.id === userId ? { ...vendor, status: newStatus } : vendor))
    );
    try {
      await dispatch(updateVendor({ userId, newStatus })).unwrap();
      toast.success(`Vendor ${vendorName} đã được cập nhật trạng thái thành ${newStatus}`, {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (err) {
      setVendors((prevVendors) =>
        prevVendors.map((vendor) => (vendor.id === userId ? { ...vendor, status: currentStatus } : vendor))
      );
      toast.error(`Không thể cập nhật trạng thái vendor ${vendorName}: ${err.message || err}`, {
        position: "top-right",
        autoClose: 3000,
      });
      throw err;
    }
  };

  const handlePageChange = (page) => setCurrentPage(page);
  const handleSearch = (value) => setSearchTerm(value);
  const handleStatusFilter = (value) => setStatusFilter(value);

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
    statusFilter,
    handleStatusFilter,
  };
}
