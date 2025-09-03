import { Flex } from 'antd'
import styled, { keyframes } from 'styled-components'

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
`

const StyledFlex = styled(Flex)`
  min-height: 100vh;
`

export const Logo = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  animation: ${pulse} 1s infinite ease-in-out;
`

export default StyledFlex

