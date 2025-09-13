import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import emailjs from "@emailjs/browser";

import { fetchAllVendor, updateVendor } from "@/stores/vendor/vendor.thunks";
import { selectVendorStatus } from "@/stores/vendor/vendor.selectors";
import supabase from "@/services/supabase";

export function useVendorAdmin(itemsPerPage = 10) {
  const [vendors, setVendors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const dispatch = useDispatch();
  const vendorData = useSelector((state) => state.vendor.data);
  const status = useSelector(selectVendorStatus);

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
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    const vendor = vendors.find((v) => v.id === userId);
    const vendorName = vendor ? vendor.name : userId;

    const { data: vendorData, error: fetchError } = await supabase
      .from("userInfo")
      .select("email")
      .eq("id", userId)
      .single();

    if (fetchError) {
      toast.error(`Không thể lấy email vendor ${vendorName}: ${fetchError.message}`, {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    setVendors((prevVendors) =>
      prevVendors.map((vendor) => (vendor.id === userId ? { ...vendor, status: newStatus } : vendor))
    );

    try {
      await dispatch(updateVendor({ userId, newStatus })).unwrap();

      const templateId =
        newStatus === "active" ? import.meta.env.VITE_TEMPLATE_APPROVE_ID : import.meta.env.VITE_TEMPLATE_REJECT_ID;
      const formData = {
        to_email: vendorData.email,
        vendor_name: vendorName,
        status: newStatus === "active" ? "Đã duyệt" : "Chưa duyệt",
      };

      await emailjs.send(import.meta.env.VITE_SERVICE_ID, templateId, formData, import.meta.env.VITE_PUBLIC_KEY);

      toast.success(`Vendor ${vendorName} đã được cập nhật trạng thái thành ${newStatus} và email đã được gửi`, {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (err) {
      setVendors((prevVendors) =>
        prevVendors.map((vendor) => (vendor.id === userId ? { ...vendor, status: currentStatus } : vendor))
      );
      toast.error(`Không thể cập nhật trạng thái vendor ${vendorName} hoặc gửi email: ${err.message || err}`, {
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
    handlePageChange,
    handleSearch,
    handleStatusToggle,
    statusFilter,
    handleStatusFilter,
  };
}
