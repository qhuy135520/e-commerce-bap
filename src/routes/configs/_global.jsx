import React from 'react'
import { Route } from 'react-router-dom'

import AuthLayout from '@/layouts/common/AuthLayout'
import PublishedRoutes from '@/routes/guards/PublishedRoutes'
import { ROUTER_PATH } from '@/constants'

const LoginPage = React.lazy(() =>
  import('@/pages/publicPages').then((module) => ({
    default: module.LoginPage,
  }))
)

const RoleSignUpPage = React.lazy(() =>
  import('@/pages/publicPages').then((module) => ({
    default: module.RoleSignUpPage,
  }))
)

const SignUpPage = React.lazy(() =>
  import('@/pages/publicPages').then((module) => ({
    default: module.SignUpPage,
  }))
)

const ForgotPasswordPage = React.lazy(() =>
  import('@/pages/publicPages').then((module) => ({
    default: module.ForgotPasswordPage,
  }))
)

const NotFoundPage = React.lazy(() =>
  import('@/pages/NotFound').then((module) => ({
    default: module.default,
  }))
)

const GlobalRoutes = (
  <>
    <Route
      element={
        <PublishedRoutes>
          <AuthLayout />
        </PublishedRoutes>
      }
    >
      <Route path={ROUTER_PATH.LOGIN.PATH} element={<LoginPage />} />
      <Route path={ROUTER_PATH.SIGN_UP.PATH} element={<SignUpPage />} />

      <Route
        path={ROUTER_PATH.FORGOT_PASSWORD.PATH}
        element={<ForgotPasswordPage />}
      />
      <Route
        path={ROUTER_PATH.ROLE_SIGN_UP.PATH}
        element={<RoleSignUpPage />}
      />
    </Route>
    <Route path='*' element={<NotFoundPage />} />
  </>
)
export default GlobalRoutes

