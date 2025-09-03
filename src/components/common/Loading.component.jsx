import { Spin } from 'antd'
import ErrorComponent from './Error.component'
import StyledFlex, { Logo } from '@/components/common/Loading.styled'
import logo from '@/assets/logo.png'

function LoadingComponent({ children, isLoading, error = null }) {
  if (isLoading) {
    return (
      <StyledFlex align='center' justify='center'>
        <Logo src={logo} alt='logo' />{' '}
      </StyledFlex>
    )
  }

  if (error) {
    return <ErrorComponent message={error.message} />
  }

  return children
}
export default LoadingComponent

