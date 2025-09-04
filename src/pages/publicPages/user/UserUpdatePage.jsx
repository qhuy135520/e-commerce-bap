import React from 'react'
import { Formik } from 'formik'
import { Button, ConfigProvider, Flex, Spin } from 'antd'
import { Input, DatePicker, Form } from 'formik-antd'
import { useUpdateUser } from '@/hooks/authentication/useUpdateUser'
import NavLinkStyled from '@/components/ui/Navlink.styled'
import Heading from '@/components/ui/Heading'
import DividerComponent from '@/components/ui/Divider.component'
import { useNavigate } from 'react-router-dom'
import { BiSolidUserDetail } from 'react-icons/bi'

export default function UserUpdatePage() {
  const {
    updateUser,
    isUpdating,
    UpdateUserSchema,
    t,
    handleSubmit,
    initialValues,
    user,
  } = useUpdateUser()
  const navigate = useNavigate()

  if (!user) return <Spin />

  return (
    <>
      <Heading as='h1'>{t('updateUser.title')}</Heading>
      <DividerComponent title={t('updateUser.title')} />
      <ConfigProvider
        theme={{
          components: {
            Form: {
              labelFontSize: '1.8rem',
              labelColor: 'var(--color-grey-600)',
            },
            Input: {
              colorTextPlaceholder: 'var(--color-grey-400)',
              colorBgContainer: 'var(--color-grey-100)',
              colorText: 'var(--color-grey-800)',
            },
            DatePicker: {
              colorTextPlaceholder: 'var(--color-grey-400)',
              colorBgContainer: 'var(--color-grey-100)',
              colorText: 'var(--color-grey-800)',
              colorTextHeading: 'var(--color-grey-800)',
              colorBgElevated: 'var(--color-grey-100)',
            },
          },
        }}
      >
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={UpdateUserSchema}
          onSubmit={(values) => {
            handleSubmit(values)
          }}
        >
          <Form layout='vertical' autoCapitalize='off'>
            <Form.Item label={t('updateUser.form.emailLabel')} name='email'>
              <Input
                type='email'
                size='large'
                name='email'
                placeholder={t('updateUser.form.emailPlaceholder')}
                readOnly
                suffix='@'
              />
            </Form.Item>

            <Form.Item name='name' label={t('updateUser.form.nameLabel')}>
              <Input
                name='name'
                placeholder={t('updateUser.form.namePlaceholder')}
                disabled={isUpdating}
                suffix={<BiSolidUserDetail />}
              />
            </Form.Item>

            <Form.Item
              name='birthdate'
              label={t('updateUser.form.birthdateLabel')}
            >
              <DatePicker
                name='birthdate'
                format='YYYY-MM-DD'
                disabled={isUpdating}
                style={{ width: '100%' }}
                placeholder={t('updateUser.form.birthdatePlaceholder')}
              />
            </Form.Item>

            <Form.Item
              name='password'
              label={t('updateUser.form.passwordLabel')}
            >
              <Input.Password
                name='password'
                placeholder={t('updateUser.form.passwordPlaceholder')}
                disabled={isUpdating}
                suffix='🔒'
              />
            </Form.Item>

            <Flex justify='flex-end' align='center' gap={12}>
              <Button type='default' shape='round' size='large'>
                <NavLinkStyled to='/'>
                  {t('updateUser.form.back')}
                </NavLinkStyled>
              </Button>
              <Button
                type='primary'
                htmlType='submit'
                shape='round'
                size='large'
                onClick={() => navigate('/')}
              >
                {isUpdating ? 'Updating...' : t('updateUser.form.update')}
              </Button>
            </Flex>
          </Form>
        </Formik>
      </ConfigProvider>
    </>
  )
}
