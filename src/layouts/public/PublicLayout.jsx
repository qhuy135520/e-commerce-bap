import { Outlet } from 'react-router-dom';

import Container from '../../components/UI/Container';
import Header from '../../components/UI/Header/Header.Component';
import Footer from '../../components/UI/Footer/Footer.Component';

export default function PublicLayout() {
  return (
    <>
      <Header />
      <Container>
        <Outlet />
      </Container>
      <Footer />
    </>
  );
}
