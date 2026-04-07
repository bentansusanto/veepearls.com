import MainLayout from '@/components/layout/MainLayout'
import dynamic from 'next/dynamic'

const JewelleryTypePage = dynamic(() => import('@/features/JewelleryType/JewelleryTypePage'))

export const dynamicParams = true

export default function JewelleryType() {
  return (
    <MainLayout>
      <JewelleryTypePage />
    </MainLayout>
  )
}
