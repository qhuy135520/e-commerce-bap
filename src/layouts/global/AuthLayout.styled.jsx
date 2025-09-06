import { Card, ConfigProvider } from "antd";
import styled from "styled-components";

const AuthLayoutCardStyled = styled(Card)`
  background-color: var(--color-grey-50);
  box-shadow: var(--shadow-md);
`;

export default function AuthLayoutStyled({ children }) {
  return (
    <ConfigProvider
      theme={{
        token: {
          padding: 0,
        },
        components: {
          Card: {
            bodyPadding: 0,
          },
        },
      }}
    >
      <AuthLayoutCardStyled>{children}</AuthLayoutCardStyled>
    </ConfigProvider>
  );
}
