import styled, { keyframes } from 'styled-components'
import { ShoppingCartOutlined } from '@ant-design/icons'
import { Flex } from 'antd'

const bounce = keyframes`
  0% { transform: scale(1); opacity: 0.8; }
  50% { transform: scale(1.3); opacity: 1; }
  100% { transform: scale(1); opacity: 0.8; }
`
export const StyledFlex = styled(Flex)`
  min-height: 100vh;
`
export const LoaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: var(--color-grey-50);
`

export const CartIcon = styled(ShoppingCartOutlined)`
  font-size: 64px;
  color: #1890ff;
  animation: ${bounce} 1s infinite ease-in-out;
`

export const LogoText = styled.span`
  margin-top: 16px;
  font-size: 24px;
  font-weight: bold;
  color: #1890ff;
  letter-spacing: 2px;
  animation: ${bounce} 1s infinite ease-in-out;
  font-family: 'Pacifico', cursive;
`

