'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { STORE_CONFIG } from '@/data/config'

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, clearCart, getTotalPrice } = useCartStore()
  const totalPrice = getTotalPrice()
  const deliveryCharges = totalPrice >= STORE_CONFIG.freeDeliveryAbove ? 0 : STORE_CONFIG.deliveryCharges
  const grandTotal = totalPrice + deliveryCharges

  if (items.length === 0) {
    return (
      <div className="min-h-[75vh] flex flex-col items-center justify-center text-center px-4 bg-gray-50 py-16">
        <div className="w-24 h-24 rounded-full bg-primary-100 flex items-center justify-center text-4xl mb-6 shadow-inner animate-pulse">
          🛒
        </div>
        <h1 className="text-3xl font-extrabold text-gray-900 mb-3">Your Shopping Cart is Empty</h1>
        <p className="text-gray-500 mb-8 max-w-md text-base leading-relaxed">
          Looks like you haven't added anything to your cart yet. Explore our stunning artificial jewellery and beauty collections today!
        </p>
        <Link href="/products" className="btn-primary inline-flex items-center gap-2 shadow-lg hover:shadow-primary-300 hover:scale-105 transition-all text-base py-3.5 px-8">
          <ShoppingBag className="w-5 h-5" />
          Start Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Shopping Cart ({items.length} {items.length === 1 ? 'item' : 'items'})
            </h1>
            <p className="text-sm text-gray-500">Review your chosen items before checkout</p>
          </div>
          <button
            onClick={clearCart}
            className="text-sm text-red-500 hover:text-red-700 flex items-center gap-1.5 transition-colors self-start sm:self-auto font-medium"
          >
            <Trash2 className="w-4 h-4" />
            Clear Cart
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Cart Items List */}
          <div className="flex-1 space-y-4">
            {items.map(({ product, quantity }) => (
              <div key={product.id} className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-gray-100 flex flex-col sm:flex-row items-start sm:items-center gap-4 transition-all hover:shadow-md">
                {/* Image */}
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 shrink-0 rounded-xl overflow-hidden bg-gray-50 border border-gray-100">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 80px, 96px"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/products/${product.id}`}
                    className="font-bold text-gray-800 hover:text-primary-600 transition-colors text-sm sm:text-base leading-snug line-clamp-2 mb-1 block"
                  >
                    {product.name}
                  </Link>
                  <p className="text-xs text-primary-600 font-semibold mb-2 uppercase tracking-wide">{product.category}</p>
                  <div className="text-lg font-extrabold text-gray-900">
                    {STORE_CONFIG.currency} {product.price.toLocaleString()}
                  </div>
                </div>

                {/* Quantity + Remove Controls */}
                <div className="flex items-center sm:flex-col items-end justify-between w-full sm:w-auto gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                  <button
                    onClick={() => removeFromCart(product.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors p-1"
                    aria-label="Remove item"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <div className="flex items-center border border-gray-200 rounded-full overflow-hidden bg-gray-50">
                    <button
                      onClick={() => updateQuantity(product.id, quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-gray-200 text-gray-600 transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-8 text-center font-bold text-sm">{quantity}</span>
                    <button
                      onClick={() => updateQuantity(product.id, quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-gray-200 text-gray-600 transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="text-sm font-bold text-primary-600">
                    {STORE_CONFIG.currency} {(product.price * quantity).toLocaleString()}
                  </div>
                </div>
              </div>
            ))}

            {/* Continue Shopping Link */}
            <div className="pt-2">
              <Link href="/products" className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold transition-colors">
                ← Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order Summary Card */}
          <div className="lg:w-88 shrink-0">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-5">Order Summary</h2>
              
              <div className="space-y-3 text-sm mb-5">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal ({items.length} items)</span>
                  <span className="font-semibold text-gray-800">{STORE_CONFIG.currency} {totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Fee</span>
                  {deliveryCharges === 0 ? (
                    <span className="text-green-600 font-bold">FREE 🎉</span>
                  ) : (
                    <span className="font-semibold text-gray-800">{STORE_CONFIG.currency} {deliveryCharges}</span>
                  )}
                </div>
                {deliveryCharges > 0 && (
                  <div className="text-xs text-gray-600 bg-gold-50 border border-gold-200 rounded-xl p-3 leading-relaxed">
                    💡 Add <strong>{STORE_CONFIG.currency} {(STORE_CONFIG.freeDeliveryAbove - totalPrice).toLocaleString()}</strong> more to get <strong>Free Nationwide Delivery</strong>!
                  </div>
                )}
              </div>

              <div className="border-t border-gray-100 pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-gray-900 text-base">Grand Total</span>
                  <span className="text-2xl font-extrabold text-primary-600">
                    {STORE_CONFIG.currency} {grandTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              <Link href="/checkout" className="btn-primary w-full flex items-center justify-center gap-2 mb-3 py-3.5 shadow-md hover:shadow-lg">
                Proceed to Checkout <ArrowRight className="w-4 h-4" />
              </Link>
              
              <p className="text-xs text-gray-500 text-center mb-4 font-medium">
                Cash on Delivery (COD) Available Nationwide 💵
              </p>

              {/* Direct WhatsApp Order Option */}
              <div className="border-t border-gray-100 pt-4">
                <p className="text-xs text-gray-500 text-center mb-3">Or place your order directly via WhatsApp</p>
                <a
                  href={`https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                    `Assalam o Alaikum! 👋\n\nI would like to place an order from Noore Beauty & Jewels:\n\n${items
                      .map(({ product, quantity }) =>
                        `📦 ${product.name}\n   Qty: ${quantity} × Rs. ${product.price} = Rs. ${product.price * quantity}`
                      )
                      .join('\n\n')}\n\n💰 Total: Rs. ${grandTotal.toLocaleString()}\n🚚 Payment: Cash on Delivery\n\nPlease confirm my order! 🙏`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-full transition-all text-sm shadow hover:shadow-md"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  Order via WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
