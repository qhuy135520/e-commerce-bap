import React from 'react'
import ProductsSlider from '@/components/ui/products/ProductsSlider'
import ProductsList from '@/components/ui/products/ProductsList'
import ProductsRandom from '@/components/ui/products/ProductsRandom'

export default function HomePage() {
  return (
    <>
      <ProductsSlider />
      <ProductsList />
      <ProductsRandom />
    </>
  )
}
