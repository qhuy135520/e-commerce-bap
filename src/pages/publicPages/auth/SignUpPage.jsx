import { useNavigate, useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

import DividerForgotPassword from '@/components/auth/DividerForgotPassword'
import SocialAuth from '@/components/auth/SocialAuth'
import Heading from '@/components/ui/Heading'
import DividerComponent from '@/components/ui/Divider.component'
import LoadingComponent from '@/components/common/Loading.component'
import SignUpForm from '@/components/auth/SignUp/SignUpForm'

export default function SignUpPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [isChecking, setIsChecking] = useState(true)
  const role = searchParams.get('role')

  useEffect(() => {
    if (!role) {
      navigate('/role-signup')
    } else {
      setIsChecking(false)
    }
  }, [role, navigate, setIsChecking])

  return (
    <LoadingComponent isLoading={isChecking}>
      <Heading as='h1'>Sign Up ({role})</Heading>
      <DividerComponent title='Sign up Social' />
      <SocialAuth type='Sign up' />
      <SignUpForm />
      <DividerForgotPassword />
    </LoadingComponent>
  )
}
