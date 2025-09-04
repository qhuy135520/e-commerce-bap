import React, { useRef } from 'react'
import { Pagination } from 'antd'
import { ProductGrid } from './Products/List.styled'

const PaginatedGrid = ({
  items,
  renderItem,
  pageSize,
  currentPage,
  totalCount,
  onPageChange,
  gridStyle,
}) => {
  const productGridRef = useRef(null)

  const handlePageChange = (page) => {
    onPageChange(page)
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
      <ProductGrid ref={productGridRef} style={gridStyle}>
        {items.map((item, index) => renderItem(item, index))}
      </ProductGrid>

      {totalCount > pageSize && (
        <Pagination
          align='center'
          current={currentPage}
          pageSize={pageSize}
          total={totalCount}
          onChange={handlePageChange}
          style={{ marginTop: '20px', textAlign: 'center' }}
        />
      )}
    </>
  )
}

export default PaginatedGrid
