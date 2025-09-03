import { Formik } from 'formik'
import { Form, Input } from 'formik-antd'
import React from 'react'
import FormStyled from '@/components/auth/Form.styled'
import { Button, ConfigProvider } from 'antd'

import {
  forgotPasswordSchema,
  initialValues,
} from '@/hooks/authentication/useForgotPassword'

export default function ForgotPasswordForm({ handleSubmit }) {
  return (
    <FormStyled>
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
        <Formik
          initialValues={initialValues}
          validationSchema={forgotPasswordSchema}
          onSubmit={(values, { resetForm }) => {
            handleSubmit(values, { resetForm })
          }}
        >
          <Form layout='vertical'>
            <Form.Item label='Email' name='email'>
              <Input
                type='email'
                name='email'
                placeholder='Enter your Email to Reset your password'
                suffix='@'
              />
            </Form.Item>

            <Button type='primary' htmlType='submit'>
              Recovery
            </Button>
          </Form>
        </Formik>
      </ConfigProvider>
    </FormStyled>
  )
}
