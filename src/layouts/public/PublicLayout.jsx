import { Outlet } from 'react-router-dom'

import Container from '../../components/ui/Container'
import Header from '../../components/ui/Header/Header.Component'
import Footer from '../../components/ui/Footer/Footer.Component'

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
