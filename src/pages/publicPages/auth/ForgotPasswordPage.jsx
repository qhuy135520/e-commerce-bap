import { Spin, Typography } from 'antd'

import ForgotPasswordForm from '@/components/auth/ForgotPassword/ForgotPasswordForm'
import FormStyled from '@/components/auth/Form.styled'
import useForgotPassword from '@/hooks/authentication/useForgotPassword'

const { Title, Text } = Typography

export default function ForgotPasswordPage() {
  const { handleSubmit, emailRecovery, isResetting } = useForgotPassword()

  return (
    <Spin spinning={isResetting}>
      {!emailRecovery ? (
        <ForgotPasswordForm handleSubmit={handleSubmit} />
      ) : (
        <>
          <Title level={4} type='success'>
            Check your email:
            <Text level={5} keyboard>
              {emailRecovery}
            </Text>
            to recovery your password
          </Title>
        </>
      )}
    </Spin>
  )
}
