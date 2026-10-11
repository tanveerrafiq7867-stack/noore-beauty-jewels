'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart, Star, Eye } from 'lucide-react'
import { Product } from '@/data/products'
import { useCartStore } from '@/store/cartStore'
import { STORE_CONFIG } from '@/data/config'
import { useState } from 'react'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const addToCart = useCartStore(state => state.addToCart)
  const [added, setAdded] = useState(false)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <div className="product-card group">
      {/* Image Container */}
      <Link href={`/products/${product.id}`} className="block relative overflow-hidden">
        <div className="relative h-60 bg-gray-50">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="product-card-img object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {product.isNew && <span className="badge-new">NEW</span>}
          {discount > 0 && <span className="badge-sale">-{discount}%</span>}
          {product.isFeatured && !product.isNew && !discount && (
            <span className="badge-featured">⭐ Featured</span>
          )}
        </div>

        {/* Quick View overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white text-gray-800 text-sm font-medium py-2 px-4 rounded-full flex items-center gap-1 shadow-lg">
            <Eye className="w-4 h-4" />
            View Details
          </div>
        </div>
      </Link>

      {/* Content */}
      <div className="p-4">
        {/* Category */}
        <p className="text-xs text-primary-500 font-medium uppercase tracking-wide mb-1">
          {product.category}
        </p>

        {/* Name */}
        <Link href={`/products/${product.id}`}>
          <h3 className="font-semibold text-gray-800 text-sm leading-snug mb-2 hover:text-primary-600 transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <div className="flex">
            {[1, 2, 3, 4, 5].map(star => (
              <Star
                key={star}
                className={`w-3.5 h-3.5 ${
                  star <= Math.round(product.rating)
                    ? 'fill-gold-400 text-gold-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500">({product.reviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl font-bold text-gray-900">
            {STORE_CONFIG.currency} {product.price.toLocaleString()}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">
              {STORE_CONFIG.currency} {product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        {product.inStock ? (
          <button
            onClick={handleAddToCart}
            className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-full font-semibold text-sm transition-all duration-200 ${
              added
                ? 'bg-green-500 text-white scale-95 shadow-md'
                : 'btn-primary'
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            {added ? '✓ Added to Cart!' : 'Add to Cart'}
          </button>
        ) : (
          <button disabled className="w-full py-2.5 px-4 rounded-full bg-gray-100 text-gray-400 text-sm font-medium cursor-not-allowed">
            Out of Stock
          </button>
        )}
      </div>
    </div>
  )
}
