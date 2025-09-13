import React from "react";
import styled from "styled-components";
import { Empty, Button } from "antd";
import { NavLink } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  min-height: 300px;
  background-color: #fafafa;
  border-radius: 8px;
`;

const Description = styled.span`
  font-size: 1.2rem;
  color: #555;
`;

const CreateButton = styled(Button)`
  margin-top: 20px;
`;

export default function EmptyCommon({ link, description, buttonText = "Tạo đơn hàng mới" }) {
  return (
    <Container>
      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={<Description>{description}</Description>} />

      <NavLink to={link}>{buttonText && <CreateButton type="primary">{buttonText}</CreateButton>}</NavLink>
    </Container>
  );
}
