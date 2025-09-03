import { Button, ConfigProvider, Flex, Spin } from 'antd'
import { Formik } from 'formik'
import { Form, Input } from 'formik-antd'
import { CiLogin } from 'react-icons/ci'

import { loginSchema } from '@/hooks/authentication/useLogin'
import { initialValues } from '@/hooks/authentication/useLogin'
import { useLogin } from '@/hooks/authentication/useLogin'

import NavLinkStyled from '../../ui/Navlink.styled'

export default function LoginForm() {
  const { handleSubmit, isPendingLogin } = useLogin()
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
      <Spin spinning={isPendingLogin}>
        <Formik
          initialValues={initialValues}
          validationSchema={loginSchema}
          onSubmit={(values, { resetForm }) => {
            handleSubmit(values, { resetForm })
          }}
        >
          <Form layout='vertical' autoCapitalize='off'>
            <>
              <Form.Item label='Email' name='email'>
                <Input
                  type='email'
                  size='large'
                  name='email'
                  placeholder='Enter your email'
                  suffix='@'
                  autoComplete='email'
                />
              </Form.Item>
              <Form.Item label='Password' name='password'>
                <Input
                  type='password'
                  size='large'
                  name='password'
                  placeholder='Enter your password'
                  suffix='🔒'
                  autoComplete='current-password'
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
          </Form>
        </Formik>
      </Spin>
    </ConfigProvider>
  )
}
