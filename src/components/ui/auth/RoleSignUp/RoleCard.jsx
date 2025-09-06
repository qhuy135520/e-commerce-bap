import React from "react";
import { Card, ConfigProvider } from "antd";
import { useNavigate } from "react-router-dom";

import { RoleCardStyled as RCS } from "@/components";

import { RoleCardStyled } from "@/components/ui/auth";

const RoleCard = ({ role }) => {
  const navigate = useNavigate();

  function handleChooseRole(role) {
    navigate(`/signup?role=${role.key}`);
  }

  return (
    <RCS.CardContainer hoverable $bordercolor={role.color}>
      <ConfigProvider
        theme={{
          token: {
            colorBgContainer: "var(--color-grey-50)",
          },
          components: {
            Card: {
              actionsBg: "var(--color-grey-50)",
            },
          },
        }}
      >
        <Card>
          <RCS.FlexCard align="start" gap={16}>
            <RCS.IconWrapper $color={role.color}>{role.icon}</RCS.IconWrapper>

            <RCS.SpaceRole direction="vertical" size={1}>
              <RCS.TitleRole level={4}>{role.title}</RCS.TitleRole>

              <RCS.TextDescription>{role.description}</RCS.TextDescription>

              <RCS.DividerRole />

              <RCS.SpaceRole direction="vertical" size={1}>
                {role.features.map((feature, index) => (
                  <RCS.FeatureItem key={index}>
                    <RCS.Dot $color={role.color} />
                    {feature}
                  </RCS.FeatureItem>
                ))}
              </RCS.SpaceRole>

              <RCS.ButtonRole
                onClick={() => handleChooseRole(role)}
                type="primary"
                size="large"
                $color={role.color}
                block
              >
                {role.buttonText}
              </RCS.ButtonRole>
            </RCS.SpaceRole>
          </RCS.FlexCard>
        </Card>
      </ConfigProvider>
    </RCS.CardContainer>
  );
};

export default RoleCard;
