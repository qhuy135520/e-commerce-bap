import { Toaster } from "react-hot-toast";
import styled from "styled-components";

const ToastStyled = styled(Toaster)`
  font-size: "16px";
  max-width: "500px";
  padding: "16px 24px";
  background-color: "var(--color-grey-0)";
  color: "var(--color-grey-700)";
`;

export default ToastStyled;
