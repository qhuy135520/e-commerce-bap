import { Spin } from 'antd'
import ErrorComponent from './Error.component'
import StyledFlex from '@/components/common/Loading.styled'

function LoadingComponent({ children, isLoading, error = null }) {
  if (isLoading) {
    return (
      <StyledFlex align='center' justify='center'>
        <Spin />
      </StyledFlex>
    )
  }

  if (error) {
    return <ErrorComponent message={error.message} />
  }

  return children
}
export default LoadingComponent
