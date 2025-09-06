import { Flex, Spin } from 'antd'
import styled from 'styled-components'

import Error from '@/components/common'

const FlexStyled = styled(Flex)`
  min-height: 100vh;
`

function LoadingComponent({ children, isLoading, error = null }) {
  if (isLoading) {
    return (
      <FlexStyled align='center' justify='center'>
        <Spin />
      </FlexStyled>
    )
  }

  if (error) {
    return <Error message={error.message} />
  }

  return children
}
export default LoadingComponent
