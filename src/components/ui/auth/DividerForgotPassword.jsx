import { Button, ConfigProvider, Flex } from 'antd'
import { useNavigate } from 'react-router-dom'

import DividerComponent from '../Divider.component'
import { useTranslation } from 'react-i18next'

export default function DividerForgotPassword() {
  const { t } = useTranslation(['auth'])
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
      <DividerComponent title={t('forgotPassword.title')} />
      <Flex vertical>
        <Button
          color='primary'
          variant='outlined'
          size='large'
          onClick={() => navigate('/forgot-password')}
        >
          {t('forgotPassword.resetButton')}
        </Button>
      </Flex>
    </ConfigProvider>
  )
}
