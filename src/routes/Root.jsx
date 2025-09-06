import { Routes } from "react-router-dom";
import { Suspense } from "react";

import PrivateRoutes from "@/routes/configs/_private";
import GlobalRoutes from "@/routes/configs/_public";
import PublicRoutes from "@/routes/configs/_global";

import { Loading } from "@/components";

const RootRouter = () => {
  return (
    <Suspense fallback={<Loading isLoading={true} />}>
      <Routes>
        {PrivateRoutes}
        {GlobalRoutes}
        {PublicRoutes}
      </Routes>
    </Suspense>
  );
};

export default RootRouter;
