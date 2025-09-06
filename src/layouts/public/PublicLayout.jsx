import { Outlet } from "react-router-dom";

import { Container, Header, Footer } from "@/components";

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
