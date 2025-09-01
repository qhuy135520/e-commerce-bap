import { Formik } from 'formik'
import { Form, Input } from 'formik-antd'

import { loginSchema } from '@/hooks/authentication/useLogin'
import { Button, ConfigProvider, Flex, Spin } from 'antd'
import { CiLogin } from 'react-icons/ci'

import NavLinkStyled from '../ui/NavlinkStyled'
import { useLogin } from '../../hooks/authentication/useLogin'
import { initialValues } from '../../hooks/authentication/useLogin'

export default function LoginForm() {
  const { handleSubmit, isPending } = useLogin()
  return (
    <ConfigProvider
      theme={{
        token: {},
        components: {
          Form: {
            labelFontSize: '1.8rem',
            labelColor: 'var(--color-grey-600)',
          },
          Input: {
            colorTextPlaceholder: 'var(--color-grey-400)',
            colorBgContainer: 'var(--color-grey-100)',
          },
        },
      }}
    >
      <Spin spinning={isPending}>
        <Formik
          initialValues={initialValues}
          validationSchema={loginSchema}
          onSubmit={(values, { resetForm }) =>
            handleSubmit(values, { resetForm })
          }
        >
          <Form layout='vertical'>
            {({ resetForm }) => (
              <>
                <Form.Item label='Email' name='email'>
                  <Input
                    size='large'
                    name='email'
                    placeholder='Enter your email'
                    suffix='@'
                  />
                </Form.Item>
                <Form.Item label='Password' name='password'>
                  <Input.Password
                    size='large'
                    name='password'
                    placeholder='Enter your password'
                  />
                </Form.Item>
                <Flex justify='space-between' align='center'>
                  <Button
                    type='primary'
                    htmlType='submit'
                    shape='round'
                    icon={<CiLogin />}
                    size={'large'}
                  >
                    Sign in
                  </Button>
                  <NavLinkStyled to='/signup'>
                    Don't have an account?
                  </NavLinkStyled>
                </Flex>
              </>
            )}
          </Form>
        </Formik>
      </Spin>
    </ConfigProvider>
  )
}
