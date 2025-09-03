import {
  StyleHeader,
  StyleContainer,
  StyleImg,
  StyleInputSearch,
  StyleButton,
  HeaderTop,
  HeaderBottom,
  StyleCategory,
  StyleMenu,
  StyleListCateMobileWrapper,
  StyleContentPopover,
} from './Header.styled.jsx'
import logo from '../../../assets/logo.png'
import { Button, ConfigProvider, Menu, Popover } from 'antd'
import { IoSearch } from 'react-icons/io5'
import { MdMenu } from 'react-icons/md'
import {
  FaUser,
  FaShoppingCart,
  FaLaptop,
  FaTabletAlt,
  FaHeadphones,
} from 'react-icons/fa'
import { IoMdPhonePortrait } from 'react-icons/io'
import { SlScreenDesktop } from 'react-icons/sl'
import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useUser } from '@/hooks/authentication/useUser.js'
import { useLogout } from '@/hooks/authentication/useLogout.js'

const items = [
  {
    label: <NavLink to='/phone'>Điện thoại</NavLink>,
    key: 'phone',
    icon: <IoMdPhonePortrait />,
  },
  {
    label: <NavLink to='/laptop'>Laptop</NavLink>,
    key: 'laptop',
    icon: <FaLaptop />,
  },
  {
    label: <NavLink to='/tablet'>Máy tính bảng</NavLink>,
    key: 'tablet',
    icon: <FaTabletAlt />,
  },
  {
    label: <NavLink to='/accessory'>Phụ kiện</NavLink>,
    key: 'accessory',
    icon: <FaHeadphones />,
  },
  {
    label: <NavLink to='/screen'>Màn hình</NavLink>,
    key: 'screen',
    icon: <SlScreenDesktop />,
  },
]

export default function Header() {
  const navigate = useNavigate()
  const { user } = useUser()
  const { logout } = useLogout()
  const [current, setCurrent] = useState('')
  const onClick = (e) => {
    setCurrent(e.key)
  }
  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            defaultBg: 'transparent',
            defaultColor: '#fff',
            defaultBorderColor: 'none',
          },
          Popover: {
            titleMinWidth: '3rem',
          },
          Menu: {
            itemColor: 'var(--color-grey-800)',
            itemHoverBg: '#fff',
            activeBarHeight: 0,
            itemHoverColor: 'var(--color-blue-6)',
            itemSelectedColor: 'var(--color-blue-6)',
          },
        },
        token: {
          colorText: 'var(--color-grey-800)',
          colorBgElevated: 'var(--color-grey-100)',
        },
      }}
    >
      <StyleHeader>
        <HeaderTop>
          <StyleContainer>
            <StyleListCateMobileWrapper>
              <Popover
                placement='bottomLeft'
                title='E-BAP'
                color='var(--color-grey-200)'
                content={
                  <StyleMenu
                    items={items}
                    onClick={onClick}
                    selectedKeys={[current]}
                    mode='inline'
                  />
                }
                trigger='click'
              >
                <Button>
                  <MdMenu />
                </Button>
              </Popover>
            </StyleListCateMobileWrapper>
            <StyleImg src={logo} alt='logo-web' onClick={() => navigate('/')} />
            <StyleInputSearch
              placeholder='Tìm kiếm sản phẩm...'
              prefix={<IoSearch />}
            />
            <StyleButton>
              <Popover
                placement='bottomRight'
                title='Giỏ hàng của bạn'
                content='Chưa có sản phẩm nào'
                trigger='hover'
              >
                <Button size='large' type='primary'>
                  <FaShoppingCart />
                </Button>
              </Popover>
              {!!user ? (
                <Popover
                  placement='bottom'
                  title=''
                  content={
                    <StyleContentPopover>
                      <NavLink to='update-user'>Thông tin cá nhân</NavLink>
                      <hr />
                      <NavLink onClick={() => logout()}>Đăng xuất</NavLink>
                    </StyleContentPopover>
                  }
                  trigger='hover'
                >
                  <Button size='large'>
                    <FaUser />
                  </Button>
                </Popover>
              ) : (
                <Button size='large' onClick={() => navigate('/login')}>
                  <FaUser />
                </Button>
              )}
            </StyleButton>
          </StyleContainer>
        </HeaderTop>

        <HeaderBottom>
          <StyleContainer>
            <StyleCategory>
              <StyleMenu
                onClick={onClick}
                selectedKeys={[current]}
                mode='horizontal'
                items={items}
              />
            </StyleCategory>
          </StyleContainer>
        </HeaderBottom>
      </StyleHeader>
    </ConfigProvider>
  )
}
