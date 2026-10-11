import ProductDetailPage from '@/components/ProductDetailClient'
import { PRODUCTS } from '@/data/products'
import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const product = PRODUCTS.find(p => p.id === Number(params.id))
  if (!product) return {}

  const canonicalUrl = `https://www.noorebeautyjewel.store/products/${product.id}`

  return {
    title: product.name,
    description: product.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: product.name,
      description: product.description,
      url: canonicalUrl,
      images: product.images,
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: product.description,
      images: product.images,
    },
  }
}

export default function Page() {
  return <ProductDetailPage />
}
