import React from 'react'
import ProductsSlider from '@/components/ui/Products/ProductsSlider.component'
import ProductsList from '@/components/ui/Products/ProductsList.component'
import ProductsRandom from '@/components/ui/Products/ProductsRandom.component'

export default function HomePage() {
  return (
    <>
      <ProductsSlider />
      <ProductsList />
      <ProductsRandom />
    </>
  )
}

