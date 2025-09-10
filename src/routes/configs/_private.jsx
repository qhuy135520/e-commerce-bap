import React from "react";
import { Navigate, Route } from "react-router-dom";

import { ROLE_ADMIN, ROLE_CUSTOMER, ROLE_VENDOR, ROUTER_PATH } from "@/constants";

import ProtectedRoute from "@/routes/guards/ProtectedRoutes";
import AuthLayout from "@/layouts/global/AuthLayout";
import PrivateLayout from "@/layouts/private/PrivateLayout";
import DashboardLayout from "@/layouts/private/DashboardLayout";
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
const OrderDetailPage = React.lazy(() =>
  import("@/pages/privatePages").then((module) => ({
    default: module.OrderDetailPage,
  }))
);

const OrderHistoryPage = React.lazy(() =>
  import("@/pages/privatePages").then((module) => ({
    default: module.OrderHistoryPage,
  }))
);

const VendorManagerProductPage = React.lazy(() =>
  import("@/pages/privatePages").then((module) => ({
    default: module.VendorManagerProductPage,
  }))
);

const VendorManagerOrderPage = React.lazy(() =>
  import("@/pages/privatePages").then((module) => ({
    default: module.VendorManagerOrderPage,
  }))
);

const VendorManagerTransactionPage = React.lazy(() =>
  import("@/pages/privatePages").then((module) => ({
    default: module.VendorManagerTransactionPage,
  }))
);

const AdminPaymentHistoryPage = React.lazy(() =>
  import("@/pages/privatePages").then((module) => ({
    default: module.AdminPaymentHistoryPage,
  }))
);

const DepositPage = React.lazy(() =>
  import("@/pages/privatePages").then((module) => ({
    default: module.DepositPage,
  }))
);

const DepositResultPage = React.lazy(() =>
  import("@/pages/privatePages").then((module) => ({
    default: module.DepositResultPage,
  }))
);
const AdminManagerUserPage = React.lazy(() =>
  import("@/pages/privatePages/admin/AdminManagerUserPage").then((module) => ({
    default: module.default,
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
      <Route element={<ProtectedRoleRoutes allowedRoles={[ROLE_CUSTOMER]} />}>
        <Route path={ROUTER_PATH.CART.PATH} element={<CartPage />} />
        <Route path={ROUTER_PATH.ORDER_DETAIL.PATH} element={<OrderDetailPage />} />
        <Route path={ROUTER_PATH.ORDER_HISTORY.PATH} element={<OrderHistoryPage />} />
        <Route path={ROUTER_PATH.DEPOSIT.PATH} element={<DepositPage />} />
        <Route path={ROUTER_PATH.DEPOSIT_RESULT_PAGE.PATH} element={<DepositResultPage />} />
      </Route>
    </Route>
    <Route
      element={
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      }
    >
      <Route element={<ProtectedRoleRoutes allowedRoles={[ROLE_VENDOR]} />}>
        <Route path={ROUTER_PATH.VENDOR_DASHBOARD.PATH}>
          <Route index element={<Navigate to={ROUTER_PATH.VENDOR_MANAGER_PRODUCT.PATH} replace />} />
          <Route path={ROUTER_PATH.VENDOR_MANAGER_PRODUCT.PATH} element={<VendorManagerProductPage />} />
          <Route path={ROUTER_PATH.VENDOR_MANAGER_ORDER.PATH} element={<VendorManagerOrderPage />} />
          <Route path={ROUTER_PATH.VENDOR_MANAGER_TRANSACTION.PATH} element={<VendorManagerTransactionPage />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoleRoutes allowedRoles={[ROLE_ADMIN]} />}>
        <Route path={ROUTER_PATH.ADMIN_MANAGER_USER.PATH} element={<AdminManagerUserPage />} />
        <Route path={ROUTER_PATH.ADMIN_DASHBOARD.PATH}>
          <Route index element={<Navigate to={ROUTER_PATH.ADMIN_PAYMENT_HISTORY.PATH} replace />} />
          <Route path={ROUTER_PATH.ADMIN_PAYMENT_HISTORY.PATH} element={<AdminPaymentHistoryPage />} />
        </Route>
      </Route>
    </Route>
  </>
);

export default PrivateRoutes;
