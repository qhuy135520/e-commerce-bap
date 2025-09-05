import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { productsSelector } from '@/stores/rootSelector'
import { productsSlice } from '@/stores/rootReducer'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

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
  const page = parseInt(searchParams.get('page') || '1', 10)
  const pageSize = 10

  const handleSortChange = (value) => {
    setSearchParams({ sort: value, page: '1' })
  }

  const handlePageChange = (page) => {
    setSearchParams({ sort, page })
  }

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
  function handleSort() {
    if (sort === 'price-asc') dispatch(productsSlice.sortByPrice('asc'))
    if (sort === 'price-desc') dispatch(productsSlice.sortByPrice('desc'))
    if (sort === 'sales-asc') dispatch(productsSlice.sortBySales('asc'))
    if (sort === 'sales-desc') dispatch(productsSlice.sortBySales('desc'))
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
