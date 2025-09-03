import { Button, ConfigProvider, Flex, Spin } from 'antd'
import { Formik } from 'formik'
import { Form, Input } from 'formik-antd'
import { CiLogin } from 'react-icons/ci'
import { BiSolidUserDetail } from 'react-icons/bi'

import NavLinkStyled from '@/components/ui/Navlink.styled'
import {
  initialValues,
  signupSchema,
  useSignup,
} from '@/hooks/authentication/useSignup'

export default function SignUpForm() {
  const { signup, isPendingSignup, handleSubmit } = useSignup()
  return (
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
        },
      }}
    >
      <Spin spinning={isPendingSignup}>
        <Formik
          initialValues={initialValues}
          validationSchema={signupSchema}
          onSubmit={(values, { resetForm }) =>
            handleSubmit(values, { resetForm })
          }
        >
          <Form layout='vertical'>
            <>
              <Form.Item label='Email' name='email'>
                <Input
                  size='large'
                  name='email'
                  placeholder='Enter your email'
                  suffix='@'
                  autoComplete='email'
                />
              </Form.Item>
              <Form.Item label='Name' name='name'>
                <Input
                  size='large'
                  name='name'
                  placeholder='Enter your name'
                  suffix={<BiSolidUserDetail />}
                />
              </Form.Item>
              <Form.Item label='Birthdate' name='birthdate'>
                <Input
                  type='date'
                  size='large'
                  name='birthdate'
                  placeholder='Enter your birthdate'
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
              <Form.Item label='Confirm Password' name='confirmPassword'>
                <Input
                  type='password'
                  size='large'
                  name='confirmPassword'
                  placeholder='Double check your password'
                  suffix='🔒'
                  autoComplete='confirmPassword'
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
                  Sign up
                </Button>
                <NavLinkStyled to='/login'>
                  Already have an account?
                </NavLinkStyled>
              </Flex>
            </>
          </Form>
        </Formik>
      </Spin>
    </ConfigProvider>
  )
}
