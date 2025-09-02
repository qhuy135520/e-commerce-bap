import React, { Suspense } from "react";
import { ROUTER_PATH } from "../../constants";
import { Spin } from "antd";
import PublicLayout from "../../layouts/public/PublicLayout";
import { Route, Routes } from "react-router-dom";

const HomePage = React.lazy(() =>
  import("../../pages/publicPages").then((module) => ({
    default: module.HomePage,
  }))
);

export default function PublicRoutes() {
  return (
    <Suspense fallback={<Spin size="large" fullscreen />}>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path={ROUTER_PATH.HOME_PAGE.PATH} element={<HomePage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
