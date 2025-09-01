import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

import { login as loginApi } from '../../services/apiAuth'

export const initialValues = { email: '', password: '' }

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please Enter a valid Email!')
    .required('Please enter a Email'),
  password: Yup.string().required('Please enter a password'),
})

export function useLogin() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const { mutate: login, isPending } = useMutation({
    mutationFn: ({ email, password }) => loginApi(email, password),
    onSuccess: (user) => {
      queryClient.setQueryData(['user'], user)
      // navigate('/dashboard', { replace: true })
    },
    onError: () => {
      toast.error('Provided email or password are incorrect')
    },
  })

  function handleSubmit(values, { resetForm }) {
    const { email, password } = values
    if (!email || !password) return

    login({ email, password })
  }

  return { isPending, handleSubmit }
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession()

  if (!session.session) return null

  const { data, error } = await supabase.auth.getUser()

  if (error) throw new Error(error.message)

  return data?.user
}
