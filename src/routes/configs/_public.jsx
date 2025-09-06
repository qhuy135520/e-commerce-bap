import React from 'react'
import { Route } from 'react-router-dom'
import { ROUTER_PATH } from '../../constants'
import PublicLayout from '../../layouts/public/PublicLayout'

const HomePage = React.lazy(() =>
  import('../../pages/publicPages').then((module) => ({
    default: module.HomePage,
  }))
)

const About = React.lazy(() =>
  import('../../pages/publicPages').then((module) => ({
    default: module.About,
  }))
)
const SearchResult = React.lazy(() =>
  import('../../components/ui/Products/SearchResult').then((module) => ({
    default: module.default,
  }))
)

const ProductDetail = React.lazy(() =>
  import('../../pages/publicPages').then((module) => ({
    default: module.ProductDetail,
  }))
)

const PublicRoutes = (
  <Route element={<PublicLayout />}>
    <Route path={ROUTER_PATH.HOME_PAGE.PATH} element={<HomePage />} />
    <Route path={ROUTER_PATH.ABOUT.PATH} element={<About />} />
    <Route path={ROUTER_PATH.SEARCH.PATH} element={<SearchResult />} />
    <Route path={ROUTER_PATH.PRODUCT_DETAIL.PATH} element={<ProductDetail />} />
  </Route>
)

export default PublicRoutes

