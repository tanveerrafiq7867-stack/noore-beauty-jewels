'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { ShoppingCart, Star, ArrowLeft, Package, Shield, Truck, ChevronRight, Check } from 'lucide-react'
import { PRODUCTS, Product } from '@/data/products'
import { fetchProductById } from '@/lib/products'
import { STORE_CONFIG } from '@/data/config'
import { useCartStore } from '@/store/cartStore'
import ProductCard from '@/components/ProductCard'

export default function ProductDetailPage() {
  const params = useParams()
  const productId = Number(params.id)
  const [product, setProduct] = useState<Product | undefined>(() => PRODUCTS.find(p => p.id === productId))
  const [loading, setLoading] = useState(!product)
  const addToCart = useCartStore(state => state.addToCart)

  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  useEffect(() => {
    fetchProductById(productId).then(p => {
      if (p) setProduct(p)
      setLoading(false)
    })
  }, [productId])

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <div className="text-6xl mb-4">😔</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Product nahi mila</h2>
        <p className="text-gray-500 mb-6">Ye product exist nahi karta ya remove kar diya gaya hai.</p>
        <Link href="/products" className="btn-primary">
          ← Wapas Products
        </Link>
      </div>
    )
  }

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  const relatedProducts = PRODUCTS
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product)
    }
    setAdded(true)
    setTimeout(() => setAdded(false), 2500)
  }

  const whatsappMessage = encodeURIComponent(
    `Assalam o Alaikum! ≡ƒæï\n\nMujhe ye product order karna hai:\n\n≡ƒôª *${product.name}*\n≡ƒÆ░ Price: Rs. ${product.price}\n≡ƒöû SKU: ${product.sku || 'N/A'}\n≡ƒô¥ Quantity: ${quantity}\n\nPlease mujhe order details batayein. Shukriya! ≡ƒÖÅ`
  )

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-100 py-3 px-4">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-primary-600">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/products" className="hover:text-primary-600">Products</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-800 font-medium truncate max-w-xs">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
          
          {/* Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-50 shadow-sm">
              <Image
                src={product.images[selectedImage] || product.images[0]}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              {product.isNew && (
                <div className="absolute top-4 left-4">
                  <span className="badge-new text-sm px-3 py-1">NEW</span>
                </div>
              )}
              {discount > 0 && (
                <div className="absolute top-4 right-4">
                  <span className="badge-sale text-sm px-3 py-1">-{discount}% OFF</span>
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === idx ? 'border-primary-500 shadow-md' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Image src={img} alt={`Image ${idx + 1}`} fill className="object-cover" sizes="80px" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Category + Name */}
            <div>
              <p className="text-sm font-medium text-primary-500 uppercase tracking-wide mb-2">
                {product.category}
              </p>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight mb-3">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map(s => (
                    <Star
                      key={s}
                      className={`w-4 h-4 ${s <= Math.round(product.rating) ? 'fill-gold-400 text-gold-400' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <span className="text-sm font-semibold text-gray-700">{product.rating}</span>
                <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-gray-900">
                {STORE_CONFIG.currency} {product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-gray-400 line-through">
                    {STORE_CONFIG.currency} {product.originalPrice.toLocaleString()}
                  </span>
                  <span className="bg-red-50 text-red-600 text-sm font-bold px-2 py-0.5 rounded-full">
                    {discount}% SAVE
                  </span>
                </>
              )}
            </div>

            {/* Description */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            {/* SKU */}
            {product.sku && (
              <div className="text-sm text-gray-500">
                SKU / Markaz Product ID: <span className="font-mono font-medium text-gray-700">{product.sku}</span>
              </div>
            )}

            {/* Quantity */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Quantity</h3>
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-gray-200 rounded-full overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors text-lg font-bold"
                  >
                    ΓêÆ
                  </button>
                  <span className="w-12 text-center font-semibold text-gray-800">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors text-lg font-bold"
                  >
                    +
                  </button>
                </div>
                <span className="text-sm text-gray-500">
                  Total: <strong className="text-gray-800">{STORE_CONFIG.currency} {(product.price * quantity).toLocaleString()}</strong>
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              {product.inStock ? (
                <>
                  <button
                    onClick={handleAddToCart}
                    className={`flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-full font-bold transition-all duration-200 ${
                      added
                        ? 'bg-green-500 text-white scale-95'
                        : 'btn-primary'
                    }`}
                  >
                    {added ? (
                      <><Check className="w-5 h-5" /> Added to Cart!</>
                    ) : (
                      <><ShoppingCart className="w-5 h-5" /> Add to Cart</>
                    )}
                  </button>
                  <a
                    href={`https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-full font-bold bg-green-500 hover:bg-green-600 text-white transition-colors"
                  >
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    Order via WhatsApp
                  </a>
                </>
              ) : (
                <button disabled className="flex-1 py-3.5 rounded-full bg-gray-100 text-gray-400 font-bold cursor-not-allowed">
                  Out of Stock
                </button>
              )}
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 pt-2 border-t border-gray-100">
              {[
                { icon: <Truck className="w-5 h-5 text-primary-600" />, text: 'Fast Delivery' },
                { icon: <Shield className="w-5 h-5 text-primary-600" />, text: '100% Authentic' },
                { icon: <Package className="w-5 h-5 text-primary-600" />, text: 'Safe Packaging' },
              ].map(badge => (
                <div key={badge.text} className="flex flex-col items-center gap-1.5 text-center p-3 rounded-xl bg-gray-50">
                  {badge.icon}
                  <span className="text-xs font-medium text-gray-600">{badge.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
