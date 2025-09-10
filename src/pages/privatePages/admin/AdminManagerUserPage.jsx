// pages/admin/AdminManagerUserPage.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { usersSelector, usersLoadingSelector } from "@/stores/user/users.selector";
import AdminManagerUserHeader from "@/components/ui/admin/AdminManagerUserHeader";
import AdminManagerUserTable from "@/components/ui/admin/AdminManagerUserTable";
import { fetchUsers } from "@/stores/user/users.thunks";

export default function AdminManagerUserPage() {
  const dispatch = useDispatch();
  const users = useSelector(usersSelector);
  const isLoading = useSelector(usersLoadingSelector);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <>
      <AdminManagerUserHeader />
      <AdminManagerUserTable users={users} loading={isLoading} />
    </>
  );
}
