import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

import { useUser } from '../../hooks/authentication/useUser'

import LoadingComponent from '../../components/common/LoadingComponent'

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate()

  const { isPending, isAuthenticated } = useUser()

  useEffect(
    function () {
      if (!isAuthenticated && !isPending) navigate('/login')
    },
    [isAuthenticated, isPending, navigate]
  )

  if (isAuthenticated)
    return <LoadingComponent isLoading={isPending}>{children}</LoadingComponent>
}
