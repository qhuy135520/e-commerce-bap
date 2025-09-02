import { updatePassword as updatePasswordApi } from '@/services/apiAuth'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

export const initialValues = { password: '', confirmPassword: '' }

export const updatePasswordSchema = Yup.object({
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
})

export default function useUpdatePassword() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const { mutate: updatePassword, isPending: isUpdating } = useMutation({
    mutationFn: updatePasswordApi,
    onSuccess: ({ user }) => {
      toast.success('User account updated successfully')
      queryClient.setQueryData(['user'], user)
      queryClient.invalidateQueries({
        queryKey: ['user'],
      })
      navigate('/')
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  function handleSubmit(values, { resetForm }) {
    const { password } = values
    updatePassword(password)
    resetForm()
  }

  return { updatePassword, isUpdating, handleSubmit }
}
