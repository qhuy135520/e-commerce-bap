import { Outlet } from "react-router-dom";

import { Container, Footer, Header } from "@/components";

export default function PrivateLayout() {
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
