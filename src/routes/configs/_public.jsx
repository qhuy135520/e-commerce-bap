import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { ROUTER_PATH } from '../../constants'
import { Spin } from 'antd'
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

export default function PublicRoutes() {
  return (
    <Suspense fallback={<Spin size='large' fullscreen />}>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path={ROUTER_PATH.HOME_PAGE.PATH} element={<HomePage />} />
          <Route path={ROUTER_PATH.ABOUT.PATH} element={<About />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
