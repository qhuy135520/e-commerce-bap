import React from 'react'
import { Card, ConfigProvider } from 'antd'
import { useNavigate } from 'react-router-dom'

import { RoleCardStyled } from '@/components/ui/auth'

const RoleCard = ({ role }) => {
  const navigate = useNavigate()

  function handleChooseRole(role) {
    navigate(`/signup?role=${role.key}`)
  }

  return (
    <RoleCardStyled.CardContainer hoverable $bordercolor={role.color}>
      <ConfigProvider
        theme={{
          token: {
            colorBgContainer: 'var(--color-grey-50)',
          },
          components: {
            Card: {
              actionsBg: 'var(--color-grey-50)',
            },
          },
        }}
      >
        <Card>
          <RoleCardStyled.FlexCard align='start' gap={16}>
            <RoleCardStyled.IconWrapper $color={role.color}>
              {role.icon}
            </RoleCardStyled.IconWrapper>

            <RoleCardStyled.SpaceRole direction='vertical' size={1}>
              <RoleCardStyled.TitleRole level={4}>
                {role.title}
              </RoleCardStyled.TitleRole>

              <RoleCardStyled.TextDescription>
                {role.description}
              </RoleCardStyled.TextDescription>

              <RoleCardStyled.DividerRole />

              <RoleCardStyled.SpaceRole direction='vertical' size={1}>
                {role.features.map((feature, index) => (
                  <RoleCardStyled.FeatureItem key={index}>
                    <Dot $color={role.color} />
                    {feature}
                  </RoleCardStyled.FeatureItem>
                ))}
              </RoleCardStyled.SpaceRole>

              <RoleCardStyled.ButtonRole
                onClick={() => handleChooseRole(role)}
                type='primary'
                size='large'
                $color={role.color}
                block
              >
                {role.buttonText}
              </RoleCardStyled.ButtonRole>
            </RoleCardStyled.SpaceRole>
          </RoleCardStyled.FlexCard>
        </Card>
      </ConfigProvider>
    </RoleCardStyled.CardContainer>
  )
}

export default RoleCard
