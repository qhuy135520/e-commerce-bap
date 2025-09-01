import { Outlet } from 'react-router-dom'
import { Col, Flex } from 'antd'

import Container from '../../components/ui/Container'
import AuthLayoutStyled from './AuthLayout.styled'
import AuthSideImage from '../../components/auth/AuthSideImage'

export default function AuthLayout() {
  return (
    <Container>
      <AuthLayoutStyled>
        <Flex justify='center' align='center'>
          <Col md={12} xs={0}>
            <AuthSideImage />
          </Col>
          <Col md={12} xs={20}>
            <Outlet />
          </Col>
        </Flex>
      </AuthLayoutStyled>
    </Container>
  )
}
