import { Button, ConfigProvider, Popover } from 'antd'
import { NavLink } from 'react-router-dom'
import { useMemo } from 'react'
import { FaUser, FaShoppingCart } from 'react-icons/fa'
import { MdMenu } from 'react-icons/md'
import { IoSearch } from 'react-icons/io5'
import { FaHeadphones, FaLaptop, FaTabletAlt } from 'react-icons/fa'
import { IoMdPhonePortrait } from 'react-icons/io'
import { SlScreenDesktop } from 'react-icons/sl'

import { HeaderStyled } from '@/components/ui/header'
import LanguageSwitcher from '@/components/ui/header/LanguageSwitcher.jsx'

import { useHeader } from '@/hooks/header/useHeader.js'

import logo from '@/assets/images/logo.png'

export default function Header() {
  const { navigate, t, user, logout, current, onClick } = useHeader()

  const items = useMemo(
    () => [
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
    ],
    [t]
  )
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
      <HeaderStyled.HeaderBg>
        <HeaderStyled.HeaderTop>
          <HeaderStyled.ContainerTop>
            <HeaderStyled.ListCateMobileWrapper>
              <Popover
                placement='bottomLeft'
                title='E-BAP'
                color='var(--color-grey-200)'
                content={
                  <HeaderStyled.MenuHeader
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
            </HeaderStyled.ListCateMobileWrapper>
            <HeaderStyled.Img
              src={logo}
              alt='logo-web'
              onClick={() => navigate('/')}
            />
            <HeaderStyled.InputSearch
              placeholder={t('header.searchPlaceholder')}
              prefix={<IoSearch />}
            />
            <HeaderStyled.ButtonHeader>
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
                      <HeaderStyled.ContentPopover>
                        <NavLink to='update-user'>
                          {t('header.profile')}
                        </NavLink>
                        <NavLink to='deposit'>0 VNĐ</NavLink>
                        <hr />
                        <NavLink onClick={() => logout()}>
                          {t('header.logout')}
                        </NavLink>
                      </HeaderStyled.ContentPopover>
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
            </HeaderStyled.ButtonHeader>
          </HeaderStyled.ContainerTop>
        </HeaderStyled.HeaderTop>

        <HeaderBottom>
          <HeaderStyled.ContainerBot>
            <StyleMenu
              onClick={onClick}
              selectedKeys={[current]}
              mode='horizontal'
              items={items}
            />
          </HeaderStyled.ContainerBot>
        </HeaderBottom>
      </HeaderStyled.HeaderBg>
    </ConfigProvider>
  )
}
