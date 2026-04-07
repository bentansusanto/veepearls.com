'use client'
import { heading } from '@/components/ui/font-family'
import { useGetJewelTypesQuery, useGetProductsQuery } from '@/store/services/product.service'
import { useParams } from 'next/navigation'
import ListProductJewelType from './ListProductType'

const JewelleryTypePage = () => {
  const params = useParams()
  const type = params?.type
  const { data: products } = useGetProductsQuery()
  const listProduct = (products || [])?.filter((product: any) => product.jeweltype?.type === type)
  const { data: jeweltype } = useGetJewelTypesQuery()
  const typeData = jeweltype?.find((item: any) => item.type === type)
  return (
    <div className="mt-5 mb-20">
      <h1
        className={`${heading.className} text-lg font-semibold
        capitalize md:hidden px-5 block`}
      >
        {typeData?.name_type || `Category: ${type}`}
      </h1>
      {listProduct.length === 0 ? (
        <div className="px-5 py-20 text-center text-gray-500">
          No products found in category "{type}"
          <br/>
          (DEBUG: products count = {products?.length || 0})
        </div>
      ) : (
        <ListProductJewelType products={listProduct} />
      )}
    </div>
  )
}

export default JewelleryTypePage
