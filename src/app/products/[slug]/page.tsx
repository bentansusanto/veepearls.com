import MainLayout from '@/components/layout/MainLayout'
import dynamic from 'next/dynamic'

const ProductDetailPage = dynamic(() => import('@/features/ProductDetails/ProductPage'))

export const dynamicParams = false

export async function generateStaticParams() {
  console.log('Generating static params for products details')
  const baseUrl =
    process.env.NEXT_PUBLIC_API_URL_DEV ||
    process.env.NEXT_PUBLIC_API_URL ||
    'http://localhost:8081/api/v1'
  try {
    const res = await fetch(`${baseUrl}/products`)
    if (!res.ok) throw new Error(`Fetch failed: ${res.status}`)
    const data = await res.json()
    const items = data.data || []
    return items.map((item: any) => ({
      slug: item.slug,
    }))
  } catch (e) {
    console.error('Error generating static params for products:', e)
    return []
  }
}

export default function ProductDetails() {
  return (
    <MainLayout>
      <ProductDetailPage />
    </MainLayout>
  )
}
