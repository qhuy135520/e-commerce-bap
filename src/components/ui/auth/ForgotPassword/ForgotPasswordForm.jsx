import { Formik } from 'formik'
import { Form, Input } from 'formik-antd'
import React from 'react'
import FormStyled from '@/components/ui/auth/Form.styled'
import { Button, ConfigProvider } from 'antd'

import { initialValues } from '@/hooks/authentication/useForgotPassword'

export default function ForgotPasswordForm({
  handleSubmit,
  t,
  forgotPasswordSchema,
}) {
  return (
    <FormStyled>
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
                placeholder={t('forgotPassword.form.placeholder')}
                suffix='@'
              />
            </Form.Item>

            <Button type='primary' htmlType='submit'>
              {t('forgotPassword.form.button')}
            </Button>
          </Form>
        </Formik>
      </ConfigProvider>
    </FormStyled>
  )
}
