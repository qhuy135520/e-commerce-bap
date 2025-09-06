import { IoSearch } from 'react-icons/io5'

import useSearchProducts from '@/hooks/useProduct/useSearchProduct'

import {
  StyleInputSearch,
  StyledAutoComplete,
} from '@/components/ui/Header/Header.styled'

export default function SearchBar({ placeholder }) {
  const { value, options, handleSearch, handleSelect, handleSubmit } =
    useSearchProducts()

  return (
    <StyledAutoComplete
      options={options}
      value={value}
      onChange={handleSearch}
      onSelect={handleSelect}
      style={{ width: '60%' }}
    >
      <StyleInputSearch
        placeholder={placeholder}
        suffix={<IoSearch onClick={handleSubmit} />}
        onPressEnter={handleSubmit}
        allowClear
      />
    </StyledAutoComplete>
  )
}
