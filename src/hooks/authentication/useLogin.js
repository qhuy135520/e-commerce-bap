import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

import { login as loginApi } from '../../services/apiAuth'

export function useLogin() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const { mutate: login, isPending } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueryData(['user'], user.user)
      navigate('/dashboard', { replace: true })
    },
    onError: () => {
      toast.error('Provided email or password are incorrect')
    },
  })

  return { login, isPending }
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession()

  if (!session.session) return null

  const { data, error } = await supabase.auth.getUser()

  if (error) throw new Error(error.message)

  return data?.user
}
