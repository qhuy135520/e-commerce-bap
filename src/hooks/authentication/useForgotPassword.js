import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import * as Yup from 'yup'
import toast from 'react-hot-toast'

import { resetPassword as resetPasswordApi } from '@/services/apiAuth'

export const initialValues = { email: '' }
export const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please Enter a valid Email!')
    .required('Please enter a Email'),
})
export default function useForgotPassword() {
  const [emailRecovery, setEmailRecovery] = useState('')

  const { mutate: resetPassword, isPending: isResetting } = useMutation({
    mutationFn: resetPasswordApi,
    onSuccess: () => {
      toast.success('Please check your Email to Recovery Password')
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  async function handleSubmit(values, { resetForm }) {
    const { email } = values
    setEmailRecovery(email)
    resetPassword(email)
    resetForm()
  }

  return { handleSubmit, emailRecovery, isResetting }
}
