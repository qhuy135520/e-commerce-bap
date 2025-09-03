import { useMutation } from '@tanstack/react-query'
import { useNavigate, useSearchParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import * as Yup from 'yup'

import { signup as signupApi } from '@/services/apiAuth'
import { USER_DEFAULT_BALANCE } from '@/constants'

export const initialValues = {
  email: '',
  name: '',
  birthdate: '',
  password: '',
  confirmPassword: '',
}

// Yup schema
export const signupSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  name: Yup.string()
    .min(2, 'Name is too short')
    .max(50, 'Name is too long')
    .required('Name is required'),
  birthdate: Yup.date()
    .max(new Date(), 'Birthdate cannot be in the future')
    .required('Birthdate is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
})

export function useSignup() {
  const [searchParams, setSearchParams] = useSearchParams()

  const navigate = useNavigate()
  const { mutate: signup, isPending: isPendingSignup } = useMutation({
    mutationFn: ({ email, password, newUserInfo }) =>
      signupApi(email, password, newUserInfo),
    onSuccess: (user) => {
      toast.success(
        "Account successfully created! Please verify the new account from the user's email address."
      )
      navigate('/login')
    },
  })

  const handleSubmit = async (values, { resetForm }) => {
    const role = searchParams.get('role')
    debugger

    const { email, password } = values
    const newUserInfo = {
      name: values.name,
      birthdate: values.birthdate,
      role,
      moneyBalance: USER_DEFAULT_BALANCE,
    }

    await signup({ email, password, newUserInfo })
    resetForm()
  }

  return { isPendingSignup, handleSubmit }
}
