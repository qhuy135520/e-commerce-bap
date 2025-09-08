import React from "react";
import { Route } from "react-router-dom";

import { ROLE_ADMIN, ROLE_CUSTOMER, ROLE_VENDOR, ROUTER_PATH } from "@/constants";

import ProtectedRoute from "@/routes/guards/ProtectedRoutes";
import AuthLayout from "@/layouts/global/AuthLayout";
import PrivateLayout from "@/layouts/private/PrivateLayout";
import { ProtectedRoleRoutes } from "@/routes/guards/ProtectedRoleRoutes";

const UpdatePasswordPage = React.lazy(() =>
  import("@/pages/privatePages").then((module) => ({
    default: module.UpdatePasswordPage,
  }))
);
const UpdateUserPage = React.lazy(() =>
  import("@/pages/privatePages").then((module) => ({
    default: module.UpdateUserPage,
  }))
);

const CartPage = React.lazy(() =>
  import("@/pages/privatePages").then((module) => ({
    default: module.CartPage,
  }))
);
const OrderDetail = React.lazy(() =>
  import("@/pages/privatePages").then((module) => ({
    default: module.OrderDetail,
  }))
);

const OrderHistoryPage = React.lazy(() =>
  import("@/pages/privatePages").then((module) => ({
    default: module.OrderHistoryPage,
  }))
);

const VendorDashboardPage = React.lazy(() =>
  import("@/pages/privatePages").then((module) => ({
    default: module.VendorDashboardPage,
  }))
);

const AdminDashboardPage = React.lazy(() =>
  import("@/pages/privatePages").then((module) => ({
    default: module.AdminDashboardPage,
  }))
);

const PrivateRoutes = (
  <>
    <Route
      element={
        <ProtectedRoute>
          <AuthLayout />
        </ProtectedRoute>
      }
    >
      <Route path={ROUTER_PATH.UPDATE_PASSWORD.PATH} element={<UpdatePasswordPage />} />
      <Route path={ROUTER_PATH.UPDATE_USER.PATH} element={<UpdateUserPage />} />
    </Route>
    <Route
      element={
        <ProtectedRoute>
          <PrivateLayout />
        </ProtectedRoute>
      }
    >
      <Route path={ROUTER_PATH.CART.PATH} element={<CartPage />} />
      <Route path={ROUTER_PATH.ORDER_DETAIL.PATH} element={<OrderDetail />} />
      <Route path={ROUTER_PATH.ORDER_HISTORY.PATH} element={<OrderHistoryPage />} />
      <Route element={<ProtectedRoleRoutes allowedRoles={[ROLE_VENDOR]} />}>
        <Route path={ROUTER_PATH.VENDOR_DASHBOARD.PATH} element={<VendorDashboardPage />} />
      </Route>
      <Route element={<ProtectedRoleRoutes allowedRoles={[ROLE_ADMIN]} />}>
        <Route path={ROUTER_PATH.ADMIN_DASHBOARD.PATH} element={<AdminDashboardPage />} />
      </Route>
    </Route>
  </>
);

export default PrivateRoutes;
