import React from 'react'
import { Card, ConfigProvider, Flex } from 'antd'
import {
  CardContainer,
  IconWrapper,
  FeatureItem,
  Dot,
  TextDescription,
  ButtonRole,
  DividerRole,
  SpaceRole,
  TitleRole,
} from '@/components/ui/auth/RoleSignUp/RoleCard.styled'
import { useNavigate } from 'react-router-dom'

const RoleCard = ({ role }) => {
  const navigate = useNavigate()

  function handleChooseRole(role) {
    navigate(`/signup?role=${role.key}`)
  }

  return (
    <CardContainer hoverable $bordercolor={role.color}>
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
          <Flex align='start' gap={16}>
            <IconWrapper $color={role.color}>{role.icon}</IconWrapper>

            <SpaceRole direction='vertical' size={1}>
              <TitleRole level={4}>{role.title}</TitleRole>

              <TextDescription>{role.description}</TextDescription>

              <DividerRole />

              <SpaceRole direction='vertical' size={1}>
                {role.features.map((feature, index) => (
                  <FeatureItem key={index}>
                    <Dot $color={role.color} />
                    {feature}
                  </FeatureItem>
                ))}
              </SpaceRole>

              <ButtonRole
                onClick={() => handleChooseRole(role)}
                type='primary'
                size='large'
                $color={role.color}
                block
              >
                {role.buttonText}
              </ButtonRole>
            </SpaceRole>
          </Flex>
        </Card>
      </ConfigProvider>
    </CardContainer>
  )
}

export default RoleCard
