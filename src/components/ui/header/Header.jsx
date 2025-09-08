import { useMemo } from "react";
import { NavLink } from "react-router-dom";
import { Button, ConfigProvider, Popover } from "antd";
import { FaUser, FaShoppingCart, FaHeadphones, FaLaptop, FaTabletAlt } from "react-icons/fa";
import { MdMenu } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { IoMdPhonePortrait } from "react-icons/io";
import { SlScreenDesktop } from "react-icons/sl";

import { HeaderStyled, LanguageSwitcher } from "@/components";

import { useHeader } from "@/hooks/header/useHeader";

import logo from "@/assets/images/logo.png";
import SearchBar from "@/components/ui/Header/SearchBar";

export default function Header() {
  const { navigate, t, user, logout, current, onClick, handleNavigateToHome, handleNavigateToCart } = useHeader();

  const items = useMemo(
    () => [
      {
        label: <NavLink to="/phone">{t("header.phone")}</NavLink>,
        key: "phone",
        icon: <IoMdPhonePortrait />,
      },
      {
        label: <NavLink to="/laptop">{t("header.laptop")}</NavLink>,
        key: "laptop",
        icon: <FaLaptop />,
      },
      {
        label: <NavLink to="/tablet">{t("header.tablet")}</NavLink>,
        key: "tablet",
        icon: <FaTabletAlt />,
      },
      {
        label: <NavLink to="/accessory">{t("header.accessory")}</NavLink>,
        key: "accessory",
        icon: <FaHeadphones />,
      },
      {
        label: <NavLink to="/screen">{t("header.screen")}</NavLink>,
        key: "screen",
        icon: <SlScreenDesktop />,
      },
    ],
    [t]
  );
  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            defaultBg: "transparent",
            defaultColor: "#fff",
            defaultBorderColor: "none",
          },
          Popover: {
            titleMinWidth: "3rem",
          },
          Menu: {
            itemColor: "var(--color-grey-800)",
            itemHoverBg: "#fff",
            activeBarHeight: 0,
            itemHoverColor: "var(--color-blue-6)",
            itemSelectedColor: "var(--color-blue-6)",
          },
          Input: {
            activeBg: "var(--color-grey-100)",
            hoverBg: "var(--color-grey-200)",
          },
        },
        token: {
          colorText: "var(--color-grey-800)",
          colorBgElevated: "var(--color-grey-100)",
          colorIcon: "white",
        },
      }}
    >
      <HeaderStyled.HeaderBg>
        <HeaderStyled.HeaderTop>
          <HeaderStyled.ContainerTop>
            <HeaderStyled.ListCateMobileWrapper>
              <Popover
                placement="bottomLeft"
                title="E-BAP"
                color="var(--color-grey-200)"
                content={
                  <HeaderStyled.MenuHeader items={items} onClick={onClick} selectedKeys={[current]} mode="inline" />
                }
                trigger="click"
              >
                <Button>
                  <MdMenu />
                </Button>
              </Popover>
            </HeaderStyled.ListCateMobileWrapper>
            <HeaderStyled.Img src={logo} alt="logo-web" onClick={handleNavigateToHome} />
            <SearchBar placeholder={t("header.searchPlaceholder")} />
            <HeaderStyled.ButtonHeader>
              <Popover
                placement="bottomRight"
                title={t("header.cartTitle")}
                content={t("header.cartEmpty")}
                trigger={user?.role === "customer" ? "hover" : "none"}
              >
                <Button size="large" type="primary" onClick={handleNavigateToCart}>
                  <FaShoppingCart />
                </Button>
              </Popover>
              {!!user ? (
                <>
                  <Popover
                    placement="bottom"
                    title=""
                    content={
                      <HeaderStyled.ContentPopover>
                        <NavLink to="update-user">{t("header.profile")}</NavLink>
                        <NavLink to={`order-history/${user.id}`}>{t("header.order")}</NavLink>
                        <NavLink to="deposit">0 VNĐ</NavLink>
                        <hr />
                        <NavLink onClick={() => logout()}>{t("header.logout")}</NavLink>
                      </HeaderStyled.ContentPopover>
                    }
                    trigger="hover"
                  >
                    <Button size="large">
                      <FaUser />
                    </Button>
                  </Popover>
                </>
              ) : (
                <Button size="large" onClick={() => navigate("/login")}>
                  <FaUser />
                </Button>
              )}
              <LanguageSwitcher />
            </HeaderStyled.ButtonHeader>
          </HeaderStyled.ContainerTop>
        </HeaderStyled.HeaderTop>

        <HeaderStyled.HeaderBottom>
          <HeaderStyled.ContainerBot>
            <HeaderStyled.MenuHeader onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
          </HeaderStyled.ContainerBot>
        </HeaderStyled.HeaderBottom>
      </HeaderStyled.HeaderBg>
    </ConfigProvider>
  );
}
