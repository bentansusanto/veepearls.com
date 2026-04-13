'use client'
import { heading, body } from '@/components/ui/font-family'
import { useGetJewelTypesQuery, useGetProductsQuery } from '@/store/services/product.service'
import { useParams, useRouter } from 'next/navigation'
import ListProductJewelType from './ListProductType'

const JewelleryTypePage = () => {
  const params = useParams()
  const router = useRouter()
  const type = params?.type
  const { data: products, isLoading } = useGetProductsQuery()
  const listProduct = (products || [])?.filter((product: any) => product.jeweltype?.type === type)
  const { data: jeweltype } = useGetJewelTypesQuery()
  const typeData = jeweltype?.find((item: any) => item.type === type)
  const categoryName = typeData?.name_type || String(type || '').replace(/-/g, ' ')

  return (
    <div className="mt-5 mb-20">
      <h1
        className={`${heading.className} text-lg font-semibold
        capitalize md:hidden px-5 block`}
      >
        {categoryName}
      </h1>

      {isLoading ? (
        /* Loading skeleton */
        <div className="grid grid-cols-2 gap-x-3 gap-y-10 px-3 mt-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex flex-col gap-3">
              <div className="aspect-square w-full rounded-sm bg-gray-100 animate-pulse" />
              <div className="space-y-1.5">
                <div className="h-3 w-3/4 bg-gray-100 rounded animate-pulse" />
                <div className="h-2.5 w-1/2 bg-gray-100 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      ) : listProduct.length === 0 ? (
        /* Premium empty state */
        <div className="flex flex-col items-center justify-center px-8 py-20 text-center">
          {/* Decorative pearl/gem icon */}
          <div className="relative mb-8">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center shadow-inner">
              <svg
                width="48" height="48" viewBox="0 0 24 24"
                fill="none" stroke="currentColor"
                strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"
                className="text-gray-300"
              >
                {/* Diamond gem icon */}
                <path d="M6 3h12l4 6-10 13L2 9z" />
                <path d="M11 3L8 9l4 13 4-13-3-6" />
                <path d="M2 9h20" />
              </svg>
            </div>
            {/* Decorative dots */}
            <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-gray-200" />
            <span className="absolute bottom-2 left-0 w-1.5 h-1.5 rounded-full bg-gray-200" />
          </div>

          {/* Text */}
          <h2 className={`${heading.className} text-xl font-semibold text-gray-800 capitalize mb-2`}>
            No {categoryName} Found
          </h2>
          <p className={`${body.className} text-sm text-gray-400 max-w-[240px] leading-relaxed mb-8`}>
            We don&apos;t have any {categoryName.toLowerCase()} pieces available right now. Explore our other collections.
          </p>

          {/* CTA */}
          <button
            onClick={() => router.back()}
            className={`${body.className} text-sm border border-gray-800 text-gray-800 px-6 py-2.5 rounded-sm hover:bg-gray-800 hover:text-white transition-colors duration-200`}
          >
            Browse All Collections
          </button>
        </div>
      ) : (
        <ListProductJewelType products={listProduct} />
      )}
    </div>
  )
}

export default JewelleryTypePage
