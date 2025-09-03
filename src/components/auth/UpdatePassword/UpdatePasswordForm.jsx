import { Button, ConfigProvider, Spin } from 'antd'
import { Formik } from 'formik'
import { Form, Input } from 'formik-antd'
import { CiLogin } from 'react-icons/ci'

import useUpdatePassword, {
  initialValues,
  updatePasswordSchema,
} from '@/hooks/authentication/useUpdatePassword'

export default function UpdatePasswordForm() {
  const { handleSubmit, isUpdating } = useUpdatePassword()
  return (
    <Spin spinning={isUpdating}>
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
          validationSchema={updatePasswordSchema}
          onSubmit={(values, { resetForm }) =>
            handleSubmit(values, { resetForm })
          }
        >
          <Form layout='vertical'>
            <Form.Item label='New password' name='password'>
              <Input
                type='password'
                name='password'
                autoComplete='password'
                suffix='🔐'
              />
            </Form.Item>
            <Form.Item label='Confirn new password' name='confirmPassword'>
              <Input
                type='password'
                name='confirmPassword'
                autoComplete='confirmPassword'
                suffix='🔐'
              />
            </Form.Item>
            <Button
              type='primary'
              htmlType='submit'
              shape='round'
              icon={<CiLogin />}
              size={'large'}
            >
              Confirm
            </Button>
          </Form>
        </Formik>
      </ConfigProvider>
    </Spin>
  )
}
