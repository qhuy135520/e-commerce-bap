import DividerForgotPassword from '../../../components/auth/DividerForgotPassword'
import FormStyled from '../../../components/auth/Form.styled'
import LoginForm from '../../../components/auth/LoginForm'
import SocialAuth from '../../../components/auth/SocialAuth'
import DividerComponent from '../../../components/ui/DividerComponent'
import Heading from '../../../components/ui/Heading'

export default function LoginPage() {
  return (
    <FormStyled>
      <Heading as='h1'>Sign In</Heading>
      <DividerComponent title='Sign in Social' />
      <SocialAuth />
      <LoginForm />
      <DividerForgotPassword />
    </FormStyled>
  )
}
