import { ConfigProvider, Popover } from "antd";

import { LanguageSwitcher } from "@/components";

import { useHeader } from "@/hooks/header/useHeader";

import styled from "styled-components";

export default function AdminHeader() {
  const { t, user } = useHeader();
  const HeaderBg = styled.header`
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 1001;
  `;
  const HeaderTop = styled.div`
    height: 6.4rem;
    display: flex;
    align-items: center;
  `;

  const ContainerTop = styled.div`
    padding: 0 1rem;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-right: 2rem;
    gap: 2rem;

    & > * {
      display: flex;
      align-items: center;
      height: 100%;
    }
  `;

  const ListCateMobileWrapper = styled(Popover)`
    display: none;

    @media (max-width: 431px) {
      display: block;

      .ant-popover-inner {
        border-radius: 12px;
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
        padding: 0.5rem;
        background-color: #fff;
        transition: all 0.3s ease;

        .ant-popover-inner-content {
          padding: 0;
        }
      }
    }
  `;

  const Img = styled.img`
    height: 100%;
    cursor: pointer;
    background-color: #333;
    @media (max-width: 431px) {
      display: none;
    }
  `;

  const ButtonHeader = styled.div`
    display: flex;
    gap: 1rem;
    align-items: center;
  `;
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
      <HeaderBg>
        <HeaderTop>
          <ContainerTop>
            <ListCateMobileWrapper />
            <ButtonHeader>
              <strong style={{ marginRight: "2rem" }}>
                {t("toastHello")} {user.name}
              </strong>
              <LanguageSwitcher />
            </ButtonHeader>
          </ContainerTop>
        </HeaderTop>
      </HeaderBg>
    </ConfigProvider>
  );
}
