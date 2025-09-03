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
} from './Header.styled.jsx';
import logo from '../../../assets/logo.png';
import { Button, ConfigProvider, Menu, Popover } from 'antd';
import { IoSearch } from 'react-icons/io5';
import { MdMenu } from 'react-icons/md';
import {
  FaUser,
  FaShoppingCart,
  FaLaptop,
  FaTabletAlt,
  FaHeadphones,
} from 'react-icons/fa';
import { IoMdPhonePortrait } from 'react-icons/io';
import { SlScreenDesktop } from 'react-icons/sl';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const items = [
  {
    label: 'Điện thoại',
    key: 'phone',
    icon: <IoMdPhonePortrait />,
  },
  {
    label: 'Laptop',
    key: 'laptop',
    icon: <FaLaptop />,
  },
  {
    label: 'Máy tính bảng',
    key: 'tablet',
    icon: <FaTabletAlt />,
  },
  {
    label: 'Phụ kiện',
    key: 'accessory',
    icon: <FaHeadphones />,
  },
  {
    label: 'Màn hình',
    key: 'screen',
    icon: <SlScreenDesktop />,
  },
];

export default function Header() {
  const [current, setCurrent] = useState('');
  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };
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
                placement="bottomLeft"
                title="E-BAP"
                color="var(--color-grey-200)"
                content={
                  <StyleMenu
                    items={items}
                    onClick={onClick}
                    selectedKeys={[current]}
                    mode="inline"
                  />
                }
                trigger="click"
              >
                <Button>
                  <MdMenu />
                </Button>
              </Popover>
            </StyleListCateMobileWrapper>
            <StyleImg src={logo} alt="logo-web" />
            <StyleInputSearch
              placeholder="Tìm kiếm sản phẩm..."
              prefix={<IoSearch />}
            />
            <StyleButton>
              <Popover
                placement="bottomRight"
                title=""
                content={
                  <StyleContentPopover>
                    <NavLink>Thông tin cá nhân</NavLink>
                    <hr />
                    <NavLink>Đăng xuất</NavLink>
                  </StyleContentPopover>
                }
                trigger="hover"
              >
                <Button size="large">
                  <FaUser />
                </Button>
              </Popover>

              <Popover
                placement="bottomRight"
                title="Giỏ hàng của bạn"
                content="Chưa có sản phẩm nào"
                trigger="hover"
              >
                <Button size="large" type="primary">
                  <FaShoppingCart />
                </Button>
              </Popover>
            </StyleButton>
          </StyleContainer>
        </HeaderTop>

        <HeaderBottom>
          <StyleContainer>
            <StyleCategory>
              <StyleMenu
                onClick={onClick}
                selectedKeys={[current]}
                mode="horizontal"
                items={items}
              />
            </StyleCategory>
          </StyleContainer>
        </HeaderBottom>
      </StyleHeader>
    </ConfigProvider>
  );
}
