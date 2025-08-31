import { Flex } from 'antd'
import { Button } from 'antd'
import { GoogleOutlined } from '@ant-design/icons'
import { FaFacebook } from 'react-icons/fa'
import DividerComponent from '../ui/DividerComponent'

export default function SocialAuth() {
  return (
    <>
      <Flex vertical gap={15}>
        <Button type='primary' danger size='large' icon={<GoogleOutlined />}>
          Sign in with Google
        </Button>
        <Button type='primary' size='large' icon={<FaFacebook />}>
          Sign in with Facebook
        </Button>
      </Flex>
      <DividerComponent title='Or sign in with email' />
    </>
  )
}
