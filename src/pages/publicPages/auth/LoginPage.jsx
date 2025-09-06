import { useTranslation } from 'react-i18next'
import DividerForgotPassword from '../../../components/ui/auth/DividerForgotPassword'
import LoginForm from '../../../components/ui/auth/login/LoginForm'
import SocialAuth from '../../../components/ui/auth/SocialAuth'
import DividerComponent from '../../../components/ui/DividerTitle'
import Heading from '../../../components/ui/Heading.styled'
import { useLogin } from '@/hooks/authentication/useLogin'

export default function LoginPage() {
  const { t } = useLogin()
  return (
    <>
      <Heading as='h1'>{t('login.title')}</Heading>
      <DividerComponent title={t('login.socialTitle')} />
      <SocialAuth type={t('login.title')} />
      <LoginForm />
      <DividerForgotPassword />
    </>
  )
}
