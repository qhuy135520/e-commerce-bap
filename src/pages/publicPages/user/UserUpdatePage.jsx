import React from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { Button, ConfigProvider, Flex, Spin } from 'antd'
import { Input, DatePicker, Form } from 'formik-antd'
import dayjs from 'dayjs'
import { useUpdateUser } from '@/hooks/authentication/useUpdateUser'
import { useUser } from '@/hooks/authentication/useUser'
import LoadingComponent from '@/components/common/Loading.component'
import NavLinkStyled from '@/components/ui/Navlink.styled'
import Heading from '@/components/ui/Heading'
import DividerComponent from '@/components/ui/Divider.component'
import { useNavigate } from 'react-router-dom'

const UpdateUserSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  name: Yup.string().required('Full name is required'),
  birthdate: Yup.date().required('Birthdate is required'),
  password: Yup.string(),
})

export default function UserUpdatePage() {
  const { user } = useUser()
  const { updateUser, isUpdating } = useUpdateUser()
  const navigate = useNavigate()

  if (!user) return <Spin />

  return (
    <>
      <Heading as='h1'>Update User</Heading>
      <DividerComponent title='Update User' />
      <ConfigProvider
        theme={{
          token: {},
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
            <Form.Item label='Email' name='email'>
              <Input
                type='email'
                size='large'
                name='email'
                placeholder='Enter new email'
                disabled={true}
              />
            </Form.Item>

            <Form.Item name='name' label='Full Name'>
              <Input
                name='name'
                placeholder='Enter full name'
                disabled={isUpdating}
              />
            </Form.Item>
            <Form.Item name='birthdate' label='Birthdate'>
              <DatePicker
                name='birthdate'
                format='YYYY-MM-DD'
                disabled={isUpdating}
                style={{ width: '100%' }}
                placeholder='Enter new birthdate'
              />
            </Form.Item>
            <Form.Item name='password' label='New Password'>
              <Input.Password
                name='password'
                placeholder='Enter new password'
                disabled={isUpdating}
              />
            </Form.Item>

            <Flex justify='flex-end' align='center' gap={12}>
              <Button type='default' shape='round' size={'large'}>
                <NavLinkStyled to='/'>Back</NavLinkStyled>
              </Button>
              <Button
                type='primary'
                htmlType='submit'
                shape='round'
                size={'large'}
                onClick={() => navigate('/')}
              >
                {isUpdating ? 'Updating...' : 'Update'}
              </Button>
            </Flex>
          </Form>
        </Formik>
      </ConfigProvider>
    </>
  )
}
