import CartPage from '@/components/CartClient'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Shopping Cart',
  description: 'View items in your shopping cart at Noore Beauty & Jewels.',
  alternates: {
    canonical: 'https://www.noorebeautyjewel.store/cart',
  },
}

export default function Page() {
  return <CartPage />
}
