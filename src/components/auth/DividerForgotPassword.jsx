import { Button, ConfigProvider, Flex } from 'antd'

import DividerComponent from '../ui/DividerComponent'

export default function DividerForgotPassword() {
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
        <Button color='primary' variant='outlined' size='large'>
          Reset password
        </Button>
      </Flex>
    </ConfigProvider>
  )
}
