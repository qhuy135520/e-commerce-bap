import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

import { Footer, Header } from "@/components";

import styled from "styled-components";

const ContainerStyled = styled.div`
  margin: 180px auto 120px;
`;

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <ContainerStyled>
        <Result
          status="404"
          title="404"
          subTitle="Sorry, the page you visited does not exist."
          extra={
            <Button type="primary" onClick={() => navigate("/")}>
              Back Home
            </Button>
          }
        />
      </ContainerStyled>
      <Footer />
    </>
  );
}
