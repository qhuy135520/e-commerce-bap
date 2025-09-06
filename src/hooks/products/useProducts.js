import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { productsSelector } from '@/stores/rootSelector'
import { productsSlice } from '@/stores/rootReducer'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { PAGE_SIZE } from '@/constants'

export default function useProducts() {
  const { t } = useTranslation('product')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const sortedProducts = useSelector(productsSelector.selectSortedProducts)
  const allProducts = useSelector(productsSelector.selectProducts)
  const status = useSelector(productsSelector.selectStatus)
  const error = useSelector(productsSelector.selectError)

  const [searchParams, setSearchParams] = useSearchParams()
  const sort = searchParams.get('sort') || ''
  const page = parseInt(searchParams.get('page') || 1, 10)

  const handleSortChange = (value) => {
    setSearchParams({ sort: value, page: 1 })
  }

  const handlePageChange = (page) => {
    setSearchParams({ sort, page })
  }

  const pageSize = PAGE_SIZE.PRODUCT_LIST

  const paginatedProducts = sortedProducts.slice(
    (page - 1) * pageSize,
    page * pageSize
  )

  //Random
  const randomProducts = useMemo(() => {
    return Array.isArray(allProducts)
      ? [...allProducts].sort(() => Math.random() - 0.5).slice(0, 5)
      : []
  }, [allProducts])

  //Filter
  const handleSort = () => {
    switch (sort) {
      case 'price-asc':
        dispatch(productsSlice.sortByPrice('asc'))
        break
      case 'price-desc':
        dispatch(productsSlice.sortByPrice('desc'))
        break
      case 'sales-asc':
        dispatch(productsSlice.sortBySales('asc'))
        break
      case 'sales-desc':
        dispatch(productsSlice.sortBySales('desc'))
        break
    }
  }

  const handleNavigate = (id) => {
    navigate(`/product/${id}`)
  }

  //Slider
  const topProducts = Array.isArray(allProducts)
    ? [...allProducts].sort((a, b) => b.total_sold - a.total_sold).slice(0, 12)
    : []

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows: true,
  }

  return {
    sortedProducts,
    allProducts,
    status,
    error,
    sort,
    page,
    pageSize,
    handleSortChange,
    handlePageChange,
    paginatedProducts,
    randomProducts,
    handleSort,
    dispatch,
    handleNavigate,
    topProducts,
    settings,
    t,
  }
}
