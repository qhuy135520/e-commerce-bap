import React from "react";
import { useTranslation } from "react-i18next";
import { ConfigProvider, Select } from "antd";
import styled from "styled-components";

import ENFlag from "@/assets/images/en.svg";
import VIFlag from "@/assets/images/vi.svg";
import JAFlag from "@/assets/images/ja.svg";

const { Option } = Select;

const SelectStyled = styled(Select)`
  width: 92px;
`;

const OptionContent = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;

  img {
    width: 18px;
    height: 18px;
  }
`;

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Select: {
            optionSelectedBg: "var(--color-grey-200)",
            selectorBg: "var(--color-grey-100)",
          },
        },
        token: {
          colorText: "var(--color-grey-800)",
        },
      }}
    >
      <SelectStyled value={i18n.language} onChange={changeLanguage}>
        <Option value="en">
          <OptionContent>
            <span>EN</span>
            <img src={ENFlag} alt="EN" />
          </OptionContent>
        </Option>
        <Option value="vi">
          <OptionContent style={{ display: "flex", gap: "11px" }}>
            <span>VI</span>
            <img src={VIFlag} alt="VI" />
          </OptionContent>
        </Option>
        <Option value="ja">
          <OptionContent>
            <span>JA</span>
            <img src={JAFlag} alt="JA" />
          </OptionContent>
        </Option>
      </SelectStyled>
    </ConfigProvider>
  );
}
