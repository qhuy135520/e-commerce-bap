import { useMutation } from '@tanstack/react-query'
import { useMemo, useState } from 'react'
import * as Yup from 'yup'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import { resetPassword as resetPasswordApi } from '@/services/apiAuth'

export const initialValues = { email: '' }

export default function useForgotPassword() {
  const [emailRecovery, setEmailRecovery] = useState('')
  const { t } = useTranslation(['auth'])

  const forgotPasswordSchema = useMemo(
    () =>
      Yup.object().shape({
        email: Yup.string()
          .email(t('forgotPassword.validation.emailInvalid'))
          .required(t('forgotPassword.validation.emailRequired')),
      }),
    [t]
  )

  const { mutate: resetPassword, isPending: isResetting } = useMutation({
    mutationFn: resetPasswordApi,
    onSuccess: () => {
      toast.success(t('forgotPassword.toast.success'))
    },
    onError: () => {
      toast.error(t('forgotPassword.toast.error'))
    },
  })

  async function handleSubmit(values, { resetForm }) {
    const { email } = values
    setEmailRecovery(email)
    resetPassword(email)
    resetForm()
  }

  return { handleSubmit, emailRecovery, isResetting, t, forgotPasswordSchema }
}
