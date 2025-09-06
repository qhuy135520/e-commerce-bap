import { Outlet } from 'react-router-dom'

import Container from '../../components/ui/Container'
import Header from '../../components/ui/header/Header'
import Footer from '../../components/ui/footer/Footer'

export default function PublicLayout() {
  return (
    <>
      <Header />
      <Container>
        <Outlet />
      </Container>
      <Footer />
    </>
  )
}
