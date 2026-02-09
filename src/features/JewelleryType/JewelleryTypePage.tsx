'use client'
import { JewelType } from '@/common/Fetching/Product/fetch-jewel'
import { GetAllProducts } from '@/common/Fetching/Product/fetch-product'
import { heading } from '@/components/ui/font-family'
import { useParams } from 'next/navigation'
import ListProductJewelType from './ListProductType'

const JewelleryTypePage = () => {
  const params = useParams()
  const type = params?.type
  const { data: products } = GetAllProducts()
  const listProduct = products?.filter((product: any) => product.jeweltype?.type === type)
  const { data: jeweltype } = JewelType()
  const typeData = jeweltype?.find((item: any) => item.type === type)
  return (
    <div className="mt-5 mb-20">
      <h1
        className={`${heading.className} text-lg font-semibold
        capitalize md:hidden px-5 block`}
      >
        {typeData?.name_type}
      </h1>
      <ListProductJewelType products={listProduct} />
    </div>
  )
}

export default JewelleryTypePage
