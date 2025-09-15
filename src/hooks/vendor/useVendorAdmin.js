import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { fetchAllVendor, updateVendor } from "@/stores/vendor/vendor.thunks";
import { selectVendor, selectVendorStatus } from "@/stores/vendor/vendor.selectors";
import { sendEmail } from "@/services/apiEmail";

export function useVendorAdmin(itemsPerPage = 10) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const dispatch = useDispatch();
  const vendorData = useSelector(selectVendor);
  const status = useSelector(selectVendorStatus);

  useEffect(() => {
    dispatch(fetchAllVendor());
  }, [dispatch]);

  const filteredVendors = useMemo(() => {
    if (!vendorData) return [];
    let result = vendorData;

    if (searchTerm) {
      result = result.filter((v) => v.vendorName.trim().toLowerCase().includes(searchTerm.toLowerCase().trim()));
    }

    if (statusFilter !== "all") {
      result = result.filter((v) => v.status === statusFilter);
    }

    return result;
  }, [vendorData, searchTerm, statusFilter]);

  const totalItems = filteredVendors.length;

  const currentVendors = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return filteredVendors.slice(indexOfFirstItem, indexOfLastItem);
  }, [filteredVendors, currentPage, itemsPerPage]);

  const handleStatusToggle = async (vendorId, currentStatus) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    const vendor = vendorData.find((v) => v.vendorId === vendorId);

    if (!vendor) {
      toast.error(`Không tìm thấy vendor với ID ${vendorId}`);
      return;
    }

    const vendorName = vendor.vendorName;
    const vendorEmail = vendor.email;
    try {
      await dispatch(updateVendor({ vendorId, newStatus })).unwrap();

      if (newStatus === "active" && vendorEmail) {
        await sendEmail(
          {
            user_name: vendorName,
            email: vendorEmail,
            status: newStatus,
          },
          import.meta.env.VITE_TEMPLATE_VENDER_ID
        );
        toast.success(`Đã gửi email xác nhận cho ${vendorName}`);
      }

      toast.success(`Vendor ${vendorName} đã được cập nhật trạng thái thành ${newStatus}`);
    } catch (err) {
      const errorMsg = err?.message || err?.error || (typeof err === "string" ? err : JSON.stringify(err));

      toast.error(`Không thể cập nhật trạng thái vendor ${vendorName}: ${errorMsg}`);
    }
  };

  const handlePageChange = (page) => setCurrentPage(page);
  const handleSearch = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };
  const handleStatusFilter = (value) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  return {
    vendors: currentVendors,
    totalItems,
    currentPage,
    itemsPerPage,
    searchTerm,
    status,
    handlePageChange,
    handleSearch,
    handleStatusToggle,
    statusFilter,
    handleStatusFilter,
  };
}
