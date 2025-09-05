import { AutoComplete } from 'antd'
import { IoSearch } from 'react-icons/io5'
import { StyleInputSearch } from '@/components/ui/Header/Header.styled'
import useSearchProducts from '@/hooks/useProduct/useSearchProduct'

export default function SearchBar({ placeholder }) {
  const { value, options, handleSearch, handleSelect, handleSubmit } =
    useSearchProducts()

  return (
    <AutoComplete
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
    </AutoComplete>
  )
}
