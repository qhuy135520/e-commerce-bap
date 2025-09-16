import { Outlet } from "react-router-dom";
import styled from "styled-components";

import { Footer, Sidebar } from "@/components";
import AdminHeader from "@/components/ui/header/AdminHeader";

export default function DashboardLayout() {
  return (
    <>
      <StyledAppLayout>
        <AdminHeader />
        <Sidebar />
        <Main>
          <Container>
            <Outlet />
          </Container>
        </Main>
      </StyledAppLayout>
      <Footer />
    </>
  );
}

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 30rem 1fr;
  grid-template-rows: auto 1fr;
  min-height: 100vh;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;
const Main = styled.main`
  min-height: 100vh;
  background-color: var(--color-grey-50);
  padding: 1rem 2rem 6.4rem;
  grid-column: 2/-1;
  display: grid;
  grid-template-rows: auto 1fr;
  gap: 2rem;

  @media (max-width: 992px) {
    padding: 2rem;
    padding-top: 3rem;
    grid-column: 1;
  }
`;
const Container = styled.div`
  width: 100%;
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
