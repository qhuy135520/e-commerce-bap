import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

import { login as loginApi, signInWithGoogle } from '../../services/apiAuth'

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

  const { mutate: login, isPending: isPendingLogin } = useMutation({
    mutationFn: ({ email, password }) => loginApi(email, password),
    onSuccess: (user) => {
      queryClient.setQueryData(['user'], user)
      toast.success('Login success')
      if (user.role === 'admin') {
        navigate('/dashboard-admin')
      } else {
        navigate('/')
      }
    },
    onError: () => {
      toast.error('Provided email or password are incorrect')
    },
  })

  const { mutate: loginWithGoogle, isPending: isPendingLoginWithGoogle } =
    useMutation({
      mutationFn: () => signInWithGoogle(),
      onSuccess: async () => {},
      onError: () => {
        toast.error('Provided email or password are incorrect')
      },
    })

  async function handleSubmit(values, { resetForm }) {
    const { email, password } = values
    if (!email || !password) return
    await login({ email, password })
    resetForm()
  }
  return {
    isPendingLogin,
    handleSubmit,
    loginWithGoogle,
    isPendingLoginWithGoogle,
  }
}
