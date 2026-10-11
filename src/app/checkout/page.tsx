import CheckoutPage from '@/components/CheckoutClient'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Checkout',
  robots: {
    index: false,
    follow: false,
  },
}

export default function Page() {
  return <CheckoutPage />
}
