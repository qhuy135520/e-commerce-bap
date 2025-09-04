import React, { useRef, useState } from 'react'
import { Pagination } from 'antd'
import { ProductGrid } from './Products/List.styled'

const PaginatedGrid = ({
  items,
  renderItem,
  columns = 5,
  pageSize = 20,
  gridStyle,
}) => {
  const [currentPage, setCurrentPage] = useState(1)

  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const paginatedItems = items.slice(startIndex, endIndex)

  const productGridRef = useRef(null)
  const handlePageChange = (page) => {
    setCurrentPage(page)
    if (productGridRef.current) {
      const gridTop =
        productGridRef.current.getBoundingClientRect().top + window.scrollY
      window.scrollTo({
        top: gridTop - 200,
        behavior: 'smooth',
      })
    }
  }

  return (
    <>
      <ProductGrid ref={productGridRef} $columns={columns} style={gridStyle}>
        {paginatedItems.map((item, index) => renderItem(item, index))}
      </ProductGrid>

      <Pagination
        align='center'
        current={currentPage}
        pageSize={pageSize}
        total={items.length}
        onChange={handlePageChange}
        style={{ marginTop: '20px', textAlign: 'center' }}
      />
    </>
  )
}

export default PaginatedGrid
