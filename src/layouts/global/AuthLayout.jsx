import { Outlet } from 'react-router-dom'
import { Col, Flex } from 'antd'

import Container from '@/components/ui/Container'
import AuthLayoutStyled from './AuthLayout.styled'
import AuthSideImage from '@/components/ui/auth/AuthSideImage'
import Header from '@/components/ui/header/Header'
import Footer from '@/components/ui/footer/Footer'
import styled from 'styled-components'

const FormStyled = styled.div`
  padding: 2rem 5rem;
`

export default function AuthLayout() {
  return (
    <>
      <Header />
      <Container>
        <AuthLayoutStyled>
          <Flex justify='center' align='center'>
            <Col md={12} xs={0}>
              <AuthSideImage />
            </Col>
            <Col md={12} xs={20}>
              <FormStyled>
                <Outlet />
              </FormStyled>
            </Col>
          </Flex>
        </AuthLayoutStyled>
      </Container>
      <Footer />
    </>
  )
}
