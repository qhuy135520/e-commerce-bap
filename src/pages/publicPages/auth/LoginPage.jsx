import DividerForgotPassword from '../../../components/auth/DividerForgotPassword'
import LoginForm from '../../../components/auth/Login/LoginForm'
import SocialAuth from '../../../components/auth/SocialAuth'
import DividerComponent from '../../../components/ui/Divider.component'
import Heading from '../../../components/ui/Heading'

export default function LoginPage() {
  return (
    <>
      <Heading as='h1'>Sign In</Heading>
      <DividerComponent title='Sign in Social' />
      <SocialAuth type='Sign in' />
      <LoginForm />
      <DividerForgotPassword />
    </>
  )
}
