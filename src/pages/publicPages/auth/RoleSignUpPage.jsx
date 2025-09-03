import React from 'react'
import { Typography } from 'antd'
import RoleCard from '@/components/auth/RoleSignUp/RoleCard'

import {
  ContainerRolePage,
  TitleWrapper,
  SubTitle,
} from '@/components/auth/RoleSignUp/RoleSignUp.styled'

import { UserOutlined, ShopOutlined } from '@ant-design/icons'
import { SpaceRole } from '@/components/auth/RoleSignUp/RoleCard.styled'
import FormStyled from '@/components/auth/Form.styled'

const { Title } = Typography

const RoleSignUpPage = () => {
  const roles = [
    {
      key: 'customer',
      title: 'Customer',
      description: 'Sign up to shop and experience the service',
      icon: (
        <UserOutlined
          style={{ fontSize: '32px', color: 'var(--color-brand-500)' }}
        />
      ),
      features: [
        'Shop a wide range of products',
        'Track your orders easily',
        'Get special offers',
        '24/7 support',
      ],
      buttonText: 'Become a Customer',
      color: 'var(--color-brand-500)',
    },
    {
      key: 'vendor',
      title: 'Vendor',
      description: 'Sign up to sell products and manage your store',
      icon: (
        <ShopOutlined
          style={{ fontSize: '32px', color: 'var(--color-green-700)' }}
        />
      ),
      features: [
        'Easy Product Management',
        'Revenue Tracking',
        'Reach Potential Customers',
        'Powerful Marketing Tools',
      ],
      buttonText: 'Become a Supplier',
      color: 'var(--color-green-700)',
    },
  ]

  return (
    <ContainerRolePage>
      <TitleWrapper>
        <Title level={2}>Choose Your Role</Title>
        <SubTitle>Choose the right role to start your journey</SubTitle>
      </TitleWrapper>

      <SpaceRole direction='vertical' size='large'>
        {roles.map((role) => (
          <RoleCard key={role.key} role={role} />
        ))}
      </SpaceRole>
    </ContainerRolePage>
  )
}

export default RoleSignUpPage
