import React from "react";
import { Route } from "react-router-dom";

import { ROUTER_PATH } from "@/constants";

import ProtectedRoute from "@/routes/guards/ProtectedRoutes";
import AuthLayout from "@/layouts/global/AuthLayout";
import PrivateLayout from "@/layouts/private/PrivateLayout";

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
    </Route>
  </>
);

export default PrivateRoutes;
