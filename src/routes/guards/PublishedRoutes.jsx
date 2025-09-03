import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

import { useUser } from '../../hooks/authentication/useUser'

import LoadingComponent from '../../components/common/Loading.component'

export default function PublishedRoutes({ children }) {
  const navigate = useNavigate()

  const { user, isPending } = useUser()

  useEffect(
    function () {
      if (user) {
        user.role === 'admin' ? navigate('/dashboard-admin') : navigate('/')
      }
    },
    [user, navigate]
  )
  if (!user)
    return <LoadingComponent isLoading={isPending}>{children}</LoadingComponent>
}
