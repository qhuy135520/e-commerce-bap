import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

import { signup as signupApi } from '../../services/apiAuth'

export function useSignup() {
  const navigate = useNavigate()
  const { mutate: signup, isPending } = useMutation({
    mutationFn: signupApi,
    onSuccess: (user) => {
      toast.success(
        "Account successfully created! Please verify the new account from the user's email address."
      )
      navigate('/login')
    },
  })
  return { signup, isPending }
}
