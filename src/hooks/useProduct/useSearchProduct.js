import { useState, useMemo, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { productsSelector } from '@/stores/rootSelector'
import { productsThunk } from '@/stores/rootThunk'
import { productsSlice } from '@/stores/rootReducer'

export default function useSearchProducts() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const query = searchParams.get('query') || ''

  const products = useSelector(productsSelector.selectFilteredProducts)
  const status = useSelector(productsSelector.selectStatus)

  // state cho SearchBar
  const [value, setValue] = useState(query)

  // fetch products khi status = idle
  useEffect(() => {
    if (status === 'idle') {
      dispatch(productsThunk.fetchAllProducts())
    }
  }, [status, dispatch])

  // cập nhật searchTerm mỗi khi query đổi
  useEffect(() => {
    dispatch(productsSlice.setSearchTerm(query))
    setValue(query) // đồng bộ value trong input với query
  }, [query, dispatch])

  // tạo gợi ý autocomplete
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

  // xử lý khi gõ
  const handleSearch = (val) => {
    setValue(val)
  }

  // xử lý khi chọn từ gợi ý
  const handleSelect = (val) => {
    dispatch(productsSlice.setSearchTerm(val))
    navigate(`/search?query=${encodeURIComponent(val)}`)
  }

  // xử lý khi nhấn Enter hoặc click icon search
  const handleSubmit = () => {
    if (!value.trim()) return
    dispatch(productsSlice.setSearchTerm(value))
    navigate(`/search?query=${encodeURIComponent(value)}`)
  }

  return {
    // cho SearchResult
    products,
    status,
    query,
    // cho SearchBar
    value,
    setValue,
    options,
    handleSearch,
    handleSelect,
    handleSubmit,
  }
}
