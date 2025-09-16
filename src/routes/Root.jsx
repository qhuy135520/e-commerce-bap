import { Routes } from "react-router-dom";
import { Suspense } from "react";

import PrivateRoutes from "@/routes/configs/_private";
import GlobalRoutes from "@/routes/configs/_global";
import PublicRoutes from "@/routes/configs/_public";

import { Spin } from "antd";
import { ScrollToTop } from "@/components";

const RootRouter = () => {
  return (
    <Suspense fallback={<Spin fullscreen />}>
      <ScrollToTop />
      <Routes>
        {PrivateRoutes}
        {GlobalRoutes}
        {PublicRoutes}
      </Routes>
    </Suspense>
  );
};

export default RootRouter;
