import { useNavigate, useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import DividerForgotPassword from '@/components/ui/auth/DividerForgotPassword'
import SocialAuth from '@/components/ui/auth/SocialAuth'
import Heading from '@/components/ui/Heading.styled'
import DividerComponent from '@/components/ui/DividerTitle'
import LoadingComponent from '@/components/common/Loading'
import SignUpForm from '@/components/ui/auth/signUp/SignUpForm'
import { useSignup } from '@/hooks/authentication/useSignup'

export default function SignUpPage() {
  const { t, navigate, isChecking, setIsChecking, role } = useSignup()

  useEffect(() => {
    if (!role) {
      navigate('/role-signup')
    } else {
      setIsChecking(false)
    }
  }, [role, navigate, setIsChecking])

  return (
    <LoadingComponent isLoading={isChecking}>
      <Heading as='h1'>
        {t('signup.title', { ns: 'auth' })} (
        {t(`roles.${role}`, { ns: 'common' })})
      </Heading>
      <DividerComponent title={t('signup.socialTitle')} />
      <SocialAuth type={t('signup.title')} />
      <SignUpForm />
      <DividerForgotPassword />
    </LoadingComponent>
  )
}
