import { useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { syncWithURL } from '@/slices/productSlice'
import { PAGE_SIZE } from '@/constants'

const useProductListParams = (filteredProducts, filterOption) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const params = new URLSearchParams(location.search)
  const sortParam = params.get('sort') || ''
  const pageParam = Number(params.get('page') || 1)

  useEffect(() => {
    dispatch(syncWithURL({ sort: sortParam }))
  }, [dispatch, sortParam])

  useEffect(() => {
    const newParams = new URLSearchParams()
    if (filterOption) newParams.set('sort', filterOption)
    newParams.set('page', pageParam)
    navigate({ search: newParams.toString() }, { replace: true })
  }, [filterOption, pageParam, navigate])

  const updateParams = useCallback(
    (key, value) => {
      const newParams = new URLSearchParams(location.search)
      if (value) newParams.set(key, value)
      else newParams.delete(key)
      if (key !== 'page') newParams.set('page', '1')
      navigate({ search: newParams.toString() })
    },
    [location.search, navigate]
  )

  const start = (pageParam - 1) * PAGE_SIZE.PRODUCT_LIST
  const end = start + PAGE_SIZE.PRODUCT_LIST
  const items = filteredProducts.slice(start, end)

  return { sortParam, pageParam, items, updateParams }
}

export default useProductListParams
