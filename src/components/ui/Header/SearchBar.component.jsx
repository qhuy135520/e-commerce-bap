import { Input, AutoComplete } from 'antd'
import { IoSearch } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchTerm } from '@/slices/productSlice'
import { useNavigate } from 'react-router-dom'
import { useState, useMemo } from 'react'
import { StyleInputSearch } from '@/components/ui/Header/Header.styled'

export default function SearchBar({ placeholder }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { products } = useSelector((state) => state.products)
  const [value, setValue] = useState('')

  // tạo gợi ý theo tên sản phẩm
  const options = useMemo(() => {
    if (!value) return []
    return products
      .filter((p) => p.name.toLowerCase().includes(value.toLowerCase()))
      .slice(0, 8)
      .map((p, idx) => ({
        value: p.name,
        label: p.name,
        key: p.id || `${p.name}-${idx}`,
      }))
  }, [value, products])

  const handleSearch = (value) => {
    setValue(value)
  }

  const handleSelect = (value) => {
    dispatch(setSearchTerm(value))
    navigate(`/search?query=${encodeURIComponent(value)}`)
  }

  const handlePressEnterOrClick = () => {
    dispatch(setSearchTerm(value))
    navigate(`/search?query=${encodeURIComponent(value)}`)
  }

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
        suffix={<IoSearch onClick={handlePressEnterOrClick} />}
        onPressEnter={handlePressEnterOrClick}
        allowClear
      />
    </AutoComplete>
  )
}
