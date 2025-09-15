import React from "react";
import { Route } from "react-router-dom";

import { ROUTER_PATH } from "@/constants";

import PublicLayout from "@/layouts/public/PublicLayout";
import SearchMapLayout from "@/layouts/public/SearchMapLayout";

const HomePage = React.lazy(() =>
  import("@/pages/globalPages").then((module) => ({
    default: module.HomePage,
  }))
);

const AboutPage = React.lazy(() =>
  import("@/pages/globalPages").then((module) => ({
    default: module.AboutPage,
  }))
);

const ProductDetailPage = React.lazy(() =>
  import("@/pages/globalPages").then((module) => ({
    default: module.ProductDetailPage,
  }))
);

const ProductVendorPage = React.lazy(() =>
  import("@/pages/publicPages/").then((module) => ({
    default: module.ProductVendorPage,
  }))
);

const SearchResultPage = React.lazy(() =>
  import("@/pages/globalPages").then((module) => ({
    default: module.SearchResultPage,
  }))
);

const SearchMapVendorPage = React.lazy(() =>
  import("@/pages/globalPages").then((module) => ({
    default: module.SearchMapVendorPage,
  }))
);

const NotFoundPage = React.lazy(() =>
  import("@/pages/NotFound").then((module) => ({
    default: module.default,
  }))
);

const GlobalRoutes = (
  <>
    <Route element={<PublicLayout />}>
      <Route path={ROUTER_PATH.HOME_PAGE.PATH} element={<HomePage />} />
      <Route path={ROUTER_PATH.ABOUT.PATH} element={<AboutPage />} />
      <Route path={ROUTER_PATH.PRODUCT_DETAIL.PATH} element={<ProductDetailPage />} />
      <Route path={ROUTER_PATH.PRODUCT_VENDOR_PAGE.PATH} element={<ProductVendorPage />} />
      <Route path={ROUTER_PATH.SEARCH.PATH} element={<SearchResultPage />} />
    </Route>
    <Route element={<SearchMapLayout />}>
      <Route path={ROUTER_PATH.SEARCH_MAP_VENDOR.PATH} element={<SearchMapVendorPage />} />
    </Route>
    <Route path="*" element={<NotFoundPage />} />
  </>
);

export default GlobalRoutes;
