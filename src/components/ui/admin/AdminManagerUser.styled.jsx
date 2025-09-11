import { Flex, Input, Select, Space } from "antd";
import styled from "styled-components";

export const FlexHeader = styled(Flex)`
  padding: 20px 0;
`;

export const ButtonPosition = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

export const SearchInput = styled(Input.Search)`
  width: 300px;
`;

// Styled cho Formik form
export const UpdateUserForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

// Styled cho error message
export const ErrorText = styled.div`
  color: red;
  font-size: 12px;
`;

export const SpaceStyled = styled(Space)`
  margin-bottom: 16px;
  justify-content: flex-end;
`;

export const SelectStyled = styled(Select)`
  width: 150px;
`;

export const SelectFormStyled = styled(Select)`
  width: 100%;
`;
