import React from 'react'
import { useTranslation } from 'react-i18next'
import { ConfigProvider, Select } from 'antd'
import styled from 'styled-components'

const { Option } = Select

const StyleSelect = styled(Select)``

export default function LanguageSwitcher() {
  const { i18n } = useTranslation()

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng)
  }

  return (
    <ConfigProvider
      theme={{
        components: {
          Select: {
            optionSelectedBg: 'var(--color-grey-200)',
            selectorBg: 'var(--color-grey-100)',
          },
        },
        token: {
          colorText: 'var(--color-grey-800)',
        },
      }}
    >
      <StyleSelect
        value={i18n.language}
        onChange={changeLanguage}
        style={{ width: 92 }}
      >
        <Option value='en'>
          ENG <span className='fi fi-sh'></span>
        </Option>
        <Option value='vi'>
          VIE <span className='fi fi-vn'></span>
        </Option>
      </StyleSelect>
    </ConfigProvider>
  )
}
