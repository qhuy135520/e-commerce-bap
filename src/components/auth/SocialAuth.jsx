import { Flex } from 'antd'
import { Button } from 'antd'
import { GoogleOutlined } from '@ant-design/icons'
import { FaFacebook } from 'react-icons/fa'
import DividerComponent from '../ui/Divider.component'
import { useLogin } from '../../hooks/authentication/useLogin'

export default function SocialAuth({ type }) {
  const { loginWithGoogle } = useLogin()

  return (
    <>
      <Flex vertical gap={15}>
        <Button
          type='primary'
          danger
          size='large'
          icon={<GoogleOutlined />}
          onClick={() => loginWithGoogle()}
        >
          {type} with Google
        </Button>
        <Button type='primary' size='large' icon={<FaFacebook />}>
          {type} with Facebook
        </Button>
      </Flex>
      <DividerComponent title='Or sign in with email' />
    </>
  )
}
