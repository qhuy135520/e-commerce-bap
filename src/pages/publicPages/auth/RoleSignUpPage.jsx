import React from 'react'
import { Typography } from 'antd'
import RoleCard from '@/components/ui/auth/RoleSignUp/RoleCard'

import {
  ContainerRolePage,
  TitleWrapper,
  SubTitle,
} from '@/components/ui/auth/RoleSignUp/RoleSignUp.styled'

import { UserOutlined, ShopOutlined } from '@ant-design/icons'
import { SpaceRole } from '@/components/ui/auth/RoleSignUp/RoleCard.styled'
import { useTranslation } from 'react-i18next'

const { Title } = Typography

export default function RoleSignUpPage() {
  const { t } = useTranslation(['auth'])
  const roles = [
    {
      key: 'customer',
      title: t('roleSignUp.roles.customer.title'),
      description: t('roleSignUp.roles.customer.description'),
      features: t('roleSignUp.roles.customer.features', {
        returnObjects: true,
      }),
      buttonText: t('roleSignUp.roles.customer.buttonText'),
      icon: (
        <UserOutlined
          style={{ fontSize: 32, color: 'var(--color-brand-500)' }}
        />
      ),
      color: 'var(--color-brand-500)',
    },
    {
      key: 'vendor',
      title: t('roleSignUp.roles.vendor.title'),
      description: t('roleSignUp.roles.vendor.description'),
      features: t('roleSignUp.roles.vendor.features', { returnObjects: true }),
      buttonText: t('roleSignUp.roles.vendor.buttonText'),
      icon: (
        <ShopOutlined
          style={{ fontSize: 32, color: 'var(--color-green-700)' }}
        />
      ),
      color: 'var(--color-green-700)',
    },
  ]

  return (
    <ContainerRolePage>
      <TitleWrapper>
        <Title level={2}>{t('roleSignUp.title')}</Title>
        <SubTitle>{t('roleSignUp.subtitle')}</SubTitle>
      </TitleWrapper>

      <SpaceRole direction='vertical' size='large'>
        {roles.map((role) => (
          <RoleCard key={role.key} role={role} />
        ))}
      </SpaceRole>
    </ContainerRolePage>
  )
}
