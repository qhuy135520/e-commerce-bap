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

export default function EmptyCommon({ link, description }) {
  return (
    <Container>
      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={<Description>{description}</Description>} />
      <NavLink to={link}>
        <CreateButton type="primary">Tạo đơn hàng mới</CreateButton>
      </NavLink>
    </Container>
  );
}
