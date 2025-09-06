import React from 'react'
import { Route } from 'react-router-dom'

import ProtectedRoute from '@/routes/guards/ProtectedRoutes'
import AuthLayout from '@/layouts/global/AuthLayout'
import { ROUTER_PATH } from '@/constants'

const UpdatePasswordPage = React.lazy(() =>
  import('@/pages/privatePages').then((module) => ({
    default: module.UpdatePasswordPage,
  }))
)
const UpdateUserPage = React.lazy(() =>
  import('@/pages/privatePages').then((module) => ({
    default: module.UpdateUserPage,
  }))
)

const PrivateRoutes = (
  <Route
    element={
      <ProtectedRoute>
        <AuthLayout />
      </ProtectedRoute>
    }
  >
    <Route
      path={ROUTER_PATH.UPDATE_PASSWORD.PATH}
      element={<UpdatePasswordPage />}
    />
    <Route path={ROUTER_PATH.UPDATE_USER.PATH} element={<UpdateUserPage />} />
  </Route>
)

export default PrivateRoutes
