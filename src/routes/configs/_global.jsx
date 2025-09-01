import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

import AuthLayout from '../../layouts/common/AuthLayout'
import { ROUTER_PATH } from '../../constants'
import { Spin } from 'antd'

const LoginPage = React.lazy(() =>
  import('../../pages/publicPages').then((module) => ({
    default: module.LoginPage,
  }))
)

const SignUpPage = React.lazy(() =>
  import('../../pages/publicPages').then((module) => ({
    default: module.SignUpPage,
  }))
)

const ForgotPasswordPage = React.lazy(() =>
  import('../../pages/publicPages').then((module) => ({
    default: module.ForgotPasswordPage,
  }))
)

const NotFoundPage = React.lazy(() =>
  import('../../pages/NotFound').then((module) => ({
    default: module.NotFound,
  }))
)

export default function GlobalRoutes() {
  return (
    <Suspense fallback={<Spin size='large' fullscreen />}>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path={ROUTER_PATH.LOGIN.PATH} element={<LoginPage />} />
          <Route path={ROUTER_PATH.SIGN_UP.PATH} element={<SignUpPage />} />
          <Route
            path={ROUTER_PATH.FORGOT_PASSWORD.PATH}
            element={<ForgotPasswordPage />}
          />
        </Route>
        <Route path={ROUTER_PATH.NOT_FOUND.PATH} element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  )
}
