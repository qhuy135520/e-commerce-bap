import React from 'react'
import { useTranslation } from 'react-i18next'
import { ConfigProvider, Select, Input } from 'antd'
import { useDebounce } from 'use-debounce'
import { ProductTitle, StyledSelect } from './List.styled'

const { Option } = Select

const ProductListHeader = ({ sortParam, searchParam, updateParams }) => {
  const { t } = useTranslation(['product'])
  const [debouncedSearch] = useDebounce(searchParam, 500)

  React.useEffect(() => {
    updateParams('search', debouncedSearch)
  }, [debouncedSearch, updateParams])

  return (
    <ConfigProvider
      theme={{
        components: {
          Select: {
            optionSelectedBg: 'var(--color-grey-200)',
            selectorBg: 'var(--color-grey-100)',
            optionActiveBg: 'var(--color-grey-100)',
          },
        },
        token: {
          colorBgContainer: 'var(--color-grey-100)',
          colorText: 'var(--color-grey-800)',
        },
      }}
    >
      <ProductTitle level={3}>{t('productList.title')}</ProductTitle>
      <div className='flex gap-2 mb-4'>
        <StyledSelect
          placeholder={t('productList.filter.placeholder')}
          value={sortParam || undefined}
          onChange={(val) => updateParams('sort', val)}
        >
          <Option value='sales'>{t('productList.filter.sales')}</Option>
          <Option value='priceDesc'>{t('productList.filter.priceDesc')}</Option>
          <Option value='priceAsc'>{t('productList.filter.priceAsc')}</Option>
        </StyledSelect>
      </div>
    </ConfigProvider>
  )
}

export default React.memo(ProductListHeader)
