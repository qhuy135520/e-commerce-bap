import styled from "styled-components";

import SideImage from "@/assets/images/auth/side-image.svg";

const AuthSideImageStyled = styled.img`
  padding: 0 50px;
`;

const AuthSideImageStyled = styled.img`
  padding: 0 50px;
`;

export default function AuthSideImage() {
  return <AuthSideImageStyled src={SideImage} alt="Authentication Side Image..." />;
}
