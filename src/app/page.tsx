import HomePageClient from '@/components/HomePageClient'
import { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://www.noorebeautyjewel.store',
  },
}

export default function Page() {
  return <HomePageClient />
}
