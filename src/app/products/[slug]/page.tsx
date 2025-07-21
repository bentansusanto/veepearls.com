import MainLayout from '@/components/layout/MainLayout'
import ProductDetailPage from '@/features/ProductDetails/ProductPage'
import React from 'react'

const ProductDetails = () => {
  return (
    <MainLayout>
        <ProductDetailPage/>
        {/* <h1>Product Page</h1> */}
    </MainLayout>
  )
}

export default ProductDetails