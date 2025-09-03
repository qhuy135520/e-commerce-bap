import { useTranslation } from 'react-i18next'
import DividerForgotPassword from '../../../components/ui/auth/DividerForgotPassword'
import LoginForm from '../../../components/ui/auth/Login/LoginForm'
import SocialAuth from '../../../components/ui/auth/SocialAuth'
import DividerComponent from '../../../components/ui/Divider.component'
import Heading from '../../../components/ui/Heading'

export default function LoginPage() {
  const { t } = useTranslation(['auth'])
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
