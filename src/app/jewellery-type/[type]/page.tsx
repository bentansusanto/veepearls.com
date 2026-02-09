import MainLayout from '@/components/layout/MainLayout'
import dynamic from 'next/dynamic'

const JewelleryTypePage = dynamic(() => import('@/features/JewelleryType/JewelleryTypePage'))

export const dynamicParams = false

export async function generateStaticParams() {
  console.log('Generating static params for jeweltypes (HARDCODED)')
  // Mock for build verification
  return [{ type: 'necklaces' }, { type: 'rings' }]
}

export default function JewelleryType() {
  return (
    <MainLayout>
      <JewelleryTypePage />
    </MainLayout>
  )
}
