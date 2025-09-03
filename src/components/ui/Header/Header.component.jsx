import {
  StyleHeader,
  StyleContainerTop,
  StyleContainerBot,
  StyleImg,
  StyleInputSearch,
  StyleButton,
  HeaderTop,
  HeaderBottom,
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
import LanguageSwitcher from '@/components/ui/LanguageSwitcher.jsx'
import { useTranslation } from 'react-i18next'

export default function Header() {
  const navigate = useNavigate()
  const { t } = useTranslation(['common'])
  const { user } = useUser()
  const { logout } = useLogout()
  const [current, setCurrent] = useState('')

  const items = [
    {
      label: <NavLink to='/phone'>{t('header.phone')}</NavLink>,
      key: 'phone',
      icon: <IoMdPhonePortrait />,
    },
    {
      label: <NavLink to='/laptop'>{t('header.laptop')}</NavLink>,
      key: 'laptop',
      icon: <FaLaptop />,
    },
    {
      label: <NavLink to='/tablet'>{t('header.tablet')}</NavLink>,
      key: 'tablet',
      icon: <FaTabletAlt />,
    },
    {
      label: <NavLink to='/accessory'>{t('header.accessory')}</NavLink>,
      key: 'accessory',
      icon: <FaHeadphones />,
    },
    {
      label: <NavLink to='/screen'>{t('header.screen')}</NavLink>,
      key: 'screen',
      icon: <SlScreenDesktop />,
    },
  ]

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
          Input: {
            activeBg: 'var(--color-grey-100)',
            hoverBg: 'var(--color-grey-200)',
          },
        },
        token: {
          colorText: 'var(--color-grey-800)',
          colorBgElevated: 'var(--color-grey-100)',
          colorIcon: 'white',
        },
      }}
    >
      <StyleHeader>
        <HeaderTop>
          <StyleContainerTop>
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
              placeholder={t('header.searchPlaceholder')}
              prefix={<IoSearch />}
            />
            <StyleButton>
              <Popover
                placement='bottomRight'
                title={t('header.cartTitle')}
                content={t('header.cartEmpty')}
                trigger='hover'
              >
                <Button size='large' type='primary'>
                  <FaShoppingCart />
                </Button>
              </Popover>
              {!!user ? (
                <>
                  <Popover
                    placement='bottom'
                    title=''
                    content={
                      <StyleContentPopover>
                        <NavLink to='update-user'>
                          {t('header.profile')}
                        </NavLink>
                        <NavLink to='deposit'>0 VNĐ</NavLink>
                        <hr />
                        <NavLink onClick={() => logout()}>
                          {t('header.logout')}
                        </NavLink>
                      </StyleContentPopover>
                    }
                    trigger='hover'
                  >
                    <Button size='large'>
                      <FaUser />
                    </Button>
                  </Popover>
                </>
              ) : (
                <Button size='large' onClick={() => navigate('/login')}>
                  <FaUser />
                </Button>
              )}
              <LanguageSwitcher />
            </StyleButton>
          </StyleContainerTop>
        </HeaderTop>

        <HeaderBottom>
          <StyleContainerBot>
            <StyleMenu
              onClick={onClick}
              selectedKeys={[current]}
              mode='horizontal'
              items={items}
            />
          </StyleContainerBot>
        </HeaderBottom>
      </StyleHeader>
    </ConfigProvider>
  )
}
