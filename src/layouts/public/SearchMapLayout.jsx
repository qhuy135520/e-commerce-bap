import { Outlet } from "react-router-dom";

import { Header, Footer, ContainerSearch } from "@/components";

export default function SearchMapLayout() {
  return (
    <>
      <Header />
      <ContainerSearch>
        <Outlet />
      </ContainerSearch>
      <Footer />
    </>
  );
}
