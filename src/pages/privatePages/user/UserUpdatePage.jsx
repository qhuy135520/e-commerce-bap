import React from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { Button, ConfigProvider, Flex, Spin } from 'antd'
import { Input, DatePicker, Form } from 'formik-antd'
import dayjs from 'dayjs'
import { useUpdateUser } from '@/hooks/authentication/useUpdateUser'
import { useUser } from '@/hooks/authentication/useUser'
import NavLinkStyled from '@/components/ui/Navlink.styled'
import Heading from '@/components/ui/Heading'
import DividerComponent from '@/components/ui/Divider.component'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function UserUpdatePage() {
  const { user } = useUser()
  console.log('user', user)
  const { updateUser, isUpdating } = useUpdateUser()
  const navigate = useNavigate()
  const { t } = useTranslation(['auth'])

  const UpdateUserSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    name: Yup.string().required('Full name is required'),
    birthdate: Yup.date().required('Birthdate is required'),
    password: Yup.string(),
  })

  if (!user) return <Spin />

  return (
    <>
      <Heading as='h1'>{t('updateUser.title')}</Heading>
      <DividerComponent title={t('updateUser.socialTitle')} />
      <ConfigProvider
        theme={{
          token: {
            colorText: 'var(--color-grey-600)',
            colorTextPlaceholder: 'var(--color-grey-100)',
          },
          components: {
            Form: {
              labelFontSize: '1.8rem',
              labelColor: 'var(--color-grey-600)',
              controlHeight: 40,
            },
            Input: {
              colorTextPlaceholder: 'var(--color-grey-400)',
              colorBgContainer: 'var(--color-grey-100)',
            },
            DatePicker: {
              colorTextPlaceholder: 'var(--color-grey-400)',
              colorBgContainer: 'var(--color-grey-100)',
            },
          },
        }}
      >
        <Formik
          enableReinitialize
          initialValues={{
            email: user.email || '',
            name: user.name || '',
            birthdate: user.birthdate ? dayjs(user.birthdate) : null,
            password: '',
          }}
          validationSchema={UpdateUserSchema}
          onSubmit={(values) => {
            updateUser({
              password: values.password,
              newDataUserInfo: {
                name: values.name,
                birthdate:
                  values.birthdate && dayjs(values.birthdate).isValid()
                    ? dayjs(values.birthdate).format('YYYY-MM-DD')
                    : null,
              },
            })
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
              />
            </Form.Item>

            <Form.Item name='name' label={t('updateUser.form.fullName')}>
              <Input
                name='name'
                placeholder={t('updateUser.form.fullNamePlaceholder')}
                disabled={isUpdating}
              />
            </Form.Item>
            <Form.Item name='birthdate' label={t('updateUser.form.birthdate')}>
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
              label={t('updateUser.form.newPasswordLabel')}
            >
              <Input.Password
                name='password'
                placeholder={t('updateUser.form.passwordPlaceholder')}
                disabled={isUpdating}
              />
            </Form.Item>
          </Form>
        </Formik>
      </ConfigProvider>
      <Flex justify='flex-end' align='center' gap={12}>
        <Button type='default' shape='round' size='large'>
          <NavLinkStyled to='/'>{t('updateUser.form.back')}</NavLinkStyled>
        </Button>
        <Button
          type='primary'
          htmlType='submit'
          shape='round'
          size='large'
          disabled={isUpdating}
          onClick={() => navigate('/')}
        >
          {isUpdating ? '...' : t('updateUser.form.submit')}
        </Button>
      </Flex>
    </>
  )
}
