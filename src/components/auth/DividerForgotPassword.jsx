import { Button, ConfigProvider, Flex } from 'antd'
import { useNavigate } from 'react-router-dom'

import DividerComponent from '../ui/Divider.component'

export default function DividerForgotPassword() {
  const navigate = useNavigate()

  return (
    <ConfigProvider
      theme={{
        token: {
          colorText: 'var(--color-grey-500)',
          fontSize: '1.4rem',
          colorSplit: 'var(--color-grey-400)',
        },
      }}
    >
      <DividerComponent title='Forgot password' />
      <Flex vertical>
        <Button
          color='primary'
          variant='outlined'
          size='large'
          onClick={() => navigate('/forgot-password')}
        >
          Reset password
        </Button>
      </Flex>
    </ConfigProvider>
  )
}
