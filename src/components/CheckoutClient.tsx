'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { CheckCircle, Package, Truck, ArrowLeft, ShieldCheck } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { STORE_CONFIG } from '@/data/config'

type OrderStatus = 'form' | 'submitted'

interface OrderForm {
  name: string
  phone: string
  address: string
  city: string
  notes: string
}

export default function CheckoutPage() {
  const { items, getTotalPrice, clearCart } = useCartStore()
  const totalPrice = getTotalPrice()
  const deliveryCharges = totalPrice >= STORE_CONFIG.freeDeliveryAbove ? 0 : STORE_CONFIG.deliveryCharges
  const grandTotal = totalPrice + deliveryCharges

  const [status, setStatus] = useState<OrderStatus>('form')
  const [orderNumber, setOrderNumber] = useState('')
  const [form, setForm] = useState<OrderForm>({
    name: '',
    phone: '',
    address: '',
    city: '',
    notes: '',
  })
  const [errors, setErrors] = useState<Partial<OrderForm>>({})

  if (items.length === 0 && status === 'form') {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <div className="text-6xl mb-4">🛒</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-3">Your cart is currently empty</h1>
        <Link href="/products" className="btn-primary">Explore Products</Link>
      </div>
    )
  }

  const validate = () => {
    const newErrors: Partial<OrderForm> = {}
    if (!form.name.trim()) newErrors.name = 'Please enter your full name'
    if (!form.phone.trim() || form.phone.length < 10) newErrors.phone = 'Please enter a valid phone or WhatsApp number'
    if (!form.address.trim()) newErrors.address = 'Please enter your complete delivery address'
    if (!form.city.trim()) newErrors.city = 'Please enter your city'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    // Generate unique order number
    const ordNo = `NBJ-${Date.now().toString().slice(-6)}`
    setOrderNumber(ordNo)

    // Build WhatsApp message
    const message = encodeURIComponent(
      `🛍️ *NEW ORDER - ${ordNo}*\n\n` +
      `👤 *Customer Information:*\n` +
      `Name: ${form.name}\n` +
      `Phone/WhatsApp: ${form.phone}\n` +
      `City: ${form.city}\n` +
      `Address: ${form.address}\n` +
      (form.notes ? `Special Notes: ${form.notes}\n` : '') +
      `\n📦 *Order Items:*\n` +
      items.map(({ product, quantity }) =>
        `• ${product.name}\n  Qty: ${quantity} × Rs.${product.price} = Rs.${product.price * quantity}\n  SKU: ${product.sku || 'N/A'}`
      ).join('\n\n') +
      `\n\n💰 *Payment Summary:*\n` +
      `Subtotal: Rs. ${totalPrice.toLocaleString()}\n` +
      `Delivery: ${deliveryCharges === 0 ? 'FREE' : `Rs. ${deliveryCharges}`}\n` +
      `*Grand Total: Rs. ${grandTotal.toLocaleString()}*\n\n` +
      `💵 Payment Method: Cash on Delivery (COD)\n\n` +
      `Please confirm and dispatch my order! 🙏`
    )

    // Open WhatsApp
    window.open(`https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${message}`, '_blank')

    // Show success
    clearCart()
    setStatus('submitted')
  }

  if (status === 'submitted') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-xl text-center border border-gray-100">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">Order Received! 🎉</h2>
          <p className="text-gray-600 mb-3 text-sm">
            Your Order Tracking Number: <strong className="text-primary-600 font-mono text-base font-bold">#{orderNumber}</strong>
          </p>
          <p className="text-gray-500 text-sm mb-6 leading-relaxed">
            Your order details have been forwarded to our WhatsApp. If WhatsApp did not open automatically, please click below to confirm your order!
          </p>

          <div className="grid grid-cols-2 gap-3 mb-8">
            <div className="bg-gray-50 rounded-2xl p-4 text-center">
              <Package className="w-6 h-6 text-primary-600 mx-auto mb-2" />
              <p className="text-xs font-semibold text-gray-700">Order Processing</p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-4 text-center">
              <Truck className="w-6 h-6 text-gold-500 mx-auto mb-2" />
              <p className="text-xs font-semibold text-gray-700">COD Delivery</p>
            </div>
          </div>

          <div className="space-y-3">
            <a
              href={`https://wa.me/${STORE_CONFIG.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-3.5 rounded-full transition-colors shadow-md"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Confirm on WhatsApp
            </a>
            <Link href="/" className="w-full flex items-center justify-center text-gray-700 hover:text-gray-900 font-semibold py-3 rounded-full border border-gray-200 hover:border-gray-300 transition-colors">
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        {/* Back Link */}
        <Link href="/cart" className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-600 hover:text-primary-600 mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Cart
        </Link>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-8">Checkout & Shipping</h1>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Order Form */}
          <div className="flex-1">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <span>📍</span> Delivery Information
                </h2>

                <div className="space-y-5">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Ayesha Khan"
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      className={`form-input ${errors.name ? 'border-red-400 focus:ring-red-300' : ''}`}
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.name}</p>}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      WhatsApp / Mobile Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. 0320-8500958"
                      value={form.phone}
                      onChange={e => setForm({ ...form, phone: e.target.value })}
                      className={`form-input ${errors.phone ? 'border-red-400 focus:ring-red-300' : ''}`}
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.phone}</p>}
                  </div>

                  {/* City */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      City <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Bahawalpur, Lahore, Karachi..."
                      value={form.city}
                      onChange={e => setForm({ ...form, city: e.target.value })}
                      className={`form-input ${errors.city ? 'border-red-400 focus:ring-red-300' : ''}`}
                    />
                    {errors.city && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.city}</p>}
                  </div>

                  {/* Address */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Complete Street Address <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      rows={3}
                      placeholder="House/Apartment #, Street, Area/Sector..."
                      value={form.address}
                      onChange={e => setForm({ ...form, address: e.target.value })}
                      className={`form-input resize-none ${errors.address ? 'border-red-400 focus:ring-red-300' : ''}`}
                    />
                    {errors.address && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.address}</p>}
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Order Notes (Optional)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Any specific delivery instructions or ring sizes..."
                      value={form.notes}
                      onChange={e => setForm({ ...form, notes: e.target.value })}
                      className="form-input resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <span>💳</span> Payment Method
                </h2>
                <div className="flex items-center gap-4 p-4 bg-green-50/70 border-2 border-green-400 rounded-2xl">
                  <div className="w-7 h-7 rounded-full bg-green-500 flex items-center justify-center shrink-0 shadow-sm">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-base">Cash on Delivery (COD)</div>
                    <div className="text-sm text-gray-600">Pay cash safely upon parcel delivery at your doorstep!</div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn-primary w-full py-4 text-base sm:text-lg font-bold flex items-center justify-center gap-2.5 shadow-xl hover:shadow-2xl hover:scale-101 transition-all"
              >
                <ShieldCheck className="w-5 h-5" />
                Place Order & Confirm via WhatsApp
              </button>
              <p className="text-xs text-gray-500 text-center font-medium">
                After placing the order, WhatsApp will open with your complete invoice details for direct confirmation.
              </p>
            </form>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:w-80 shrink-0">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-24">
              <h2 className="font-bold text-gray-900 mb-4 text-lg">Order Items</h2>
              <div className="space-y-3 mb-5 max-h-72 overflow-y-auto pr-1">
                {items.map(({ product, quantity }) => (
                  <div key={product.id} className="flex items-center gap-3 py-1">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-gray-50 shrink-0 border border-gray-100">
                      <Image src={product.images[0]} alt={product.name} fill className="object-cover" sizes="48px" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-gray-800 truncate">{product.name}</p>
                      <p className="text-xs text-gray-500">Qty: {quantity}</p>
                    </div>
                    <span className="text-xs font-extrabold text-gray-900 shrink-0">
                      Rs. {(product.price * quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-100 pt-4 space-y-2.5 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-gray-800">Rs. {totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Fee</span>
                  <span className={deliveryCharges === 0 ? 'text-green-600 font-bold' : 'font-semibold text-gray-800'}>
                    {deliveryCharges === 0 ? 'FREE' : `Rs. ${deliveryCharges}`}
                  </span>
                </div>
                <div className="flex justify-between font-extrabold text-lg border-t pt-3 text-gray-900">
                  <span>Total Amount</span>
                  <span className="text-primary-600">Rs. {grandTotal.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
