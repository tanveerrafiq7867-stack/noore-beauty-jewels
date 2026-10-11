import ProductsPage from '@/components/ProductsClient'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'All Products - Jewellery & Beauty Collection',
  description: 'Browse all artificial jewellery and beauty products at Noore Beauty & Jewels. Cash on Delivery nationwide.',
  alternates: {
    canonical: 'https://www.noorebeautyjewel.store/products',
  },
}

export default function Page() {
  return <ProductsPage />
}
