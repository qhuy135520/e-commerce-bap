import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import { useDispatch } from "react-redux";
import { Form } from "antd";
import toast from "react-hot-toast";

import { getCurrentUser } from "@/services/apiAuth";
import { deleteUser, updateUser } from "@/stores/user/users.thunks";

export function useUser(users = []) {
  const {
    isPending,
    data: user,
    refetch,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () => getCurrentUser(),
    staleTime: 0,
    refetchOnMount: "always",
  });

  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [isUpdateModal, setIsUpdateModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const [searchInput, setSearchInput] = useState("");
  const [searchText, setSearchText] = useState("");

  const filteredUsers = useMemo(() => {
    if (!searchText) return users;
    return users.filter(
      (user) =>
        user.name?.toLowerCase().includes(searchText.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [users, searchText]);

  const handleSearch = (value) => {
    setSearchText(value.trim());
  };

  // --- XÓA ---
  const handleDeleteConfirm = (user) => {
    setSelectedUser(user);
    setIsDeleteModal(true);
  };

  const handleDelete = async () => {
    if (!selectedUser) return;
    try {
      await dispatch(deleteUser(selectedUser.id)).unwrap();
      toast.success(`Đã xóa user: ${selectedUser.name || selectedUser.id}`);
    } catch {
      toast.error("Xóa thất bại, vui lòng thử lại!");
    } finally {
      setIsDeleteModal(false);
      setSelectedUser(null);
    }
  };

  // --- CẬP NHẬT ---
  const handleUpdateConfirm = (user) => {
    setSelectedUser(user);
    form.setFieldsValue(user);
    setIsUpdateModal(true);
  };

  const handleUpdate = async (values) => {
    try {
      await dispatch(updateUser({ id: selectedUser.userId, updates: values })).unwrap();
      toast.success(`Đã cập nhật user: ${values.name || selectedUser.userId}`);
      setIsUpdateModal(false);
      setSelectedUser(null);
    } catch {
      toast.error("Cập nhật thất bại, vui lòng thử lại!");
    }
  };
  // hooks/authentication/useUser.js

  const initialUserValues = (selectedUser) => ({
    name: selectedUser?.name || "",
    role: selectedUser?.role || "customer",
    status: selectedUser?.status || "active",
    moneyBalance: selectedUser?.moneyBalance || 0,
  });

  const validateUser = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = "Tên người dùng không được để trống";
    }
    if (!values.role) {
      errors.role = "Vui lòng chọn vai trò";
    }
    if (!values.status) {
      errors.status = "Vui lòng chọn trạng thái";
    }
    if (values.moneyBalance < 0) {
      errors.moneyBalance = "Số dư không được âm";
    }
    return errors;
  };

  // Tách onSubmit ra ngoài
  const handleSubmitUpdate =
    (handleUpdate, setIsUpdateModal) =>
    async (values, { setSubmitting }) => {
      try {
        await handleUpdate(values);
        setIsUpdateModal(false);
      } catch (error) {
      } finally {
        setSubmitting(false);
      }
    };

  return {
    isPending,
    user,
    refetch,
    form,
    searchInput,
    setSearchInput,
    handleSearch,
    filteredUsers,
    isDeleteModal,
    setIsDeleteModal,
    isUpdateModal,
    setIsUpdateModal,
    selectedUser,
    handleDeleteConfirm,
    handleDelete,
    handleUpdateConfirm,
    handleUpdate,
    initialUserValues,
    validateUser,
    handleSubmitUpdate,
  };
}
