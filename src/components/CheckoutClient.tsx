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

interface SubmittedOrder {
  orderNumber: string
  customer: OrderForm
  items: Array<{
    name: string
    quantity: number
    price: number
    sku?: string
  }>
  subtotal: number
  deliveryCharges: number
  grandTotal: number
  date: string
}

export default function CheckoutPage() {
  const { items, getTotalPrice, clearCart } = useCartStore()
  const totalPrice = getTotalPrice()
  const deliveryCharges = totalPrice >= STORE_CONFIG.freeDeliveryAbove ? 0 : STORE_CONFIG.deliveryCharges
  const grandTotal = totalPrice + deliveryCharges

  const [status, setStatus] = useState<OrderStatus>('form')
  const [orderNumber, setOrderNumber] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submittedOrder, setSubmittedOrder] = useState<SubmittedOrder | null>(null)
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate() || isSubmitting) return

    setIsSubmitting(true)

    // Generate unique order number
    const ordNo = `NBJ-${Date.now().toString().slice(-6)}`
    setOrderNumber(ordNo)

    const orderData: SubmittedOrder = {
      orderNumber: ordNo,
      customer: { ...form },
      items: items.map(({ product, quantity }) => ({
        name: product.name,
        quantity,
        price: product.price,
        sku: product.sku || 'N/A',
      })),
      subtotal: totalPrice,
      deliveryCharges,
      grandTotal,
      date: new Date().toISOString(),
    }

    setSubmittedOrder(orderData)

    // Save order in localStorage so Admin Dashboard can view it
    try {
      const existing = JSON.parse(localStorage.getItem('noore_store_orders') || '[]')
      localStorage.setItem('noore_store_orders', JSON.stringify([orderData, ...existing]))
    } catch (err) {
      console.warn('LocalStorage save error:', err)
    }

    // Send order to API route to notify via email to tanveerrafiq499@gmail.com
    try {
      fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      }).catch(apiErr => console.warn('Order API dispatch warning:', apiErr))
    } catch (err) {
      console.warn('Order dispatch warning:', err)
    }

    // Clear cart and switch to submitted view (Customer stays on the website!)
    clearCart()
    setStatus('submitted')
    setIsSubmitting(false)
  }

  if (status === 'submitted') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
        <div className="max-w-xl w-full bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-gray-100 text-center">
          <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-6 shadow-inner">
            <CheckCircle className="w-10 h-10" />
          </div>

          <span className="inline-block text-xs uppercase tracking-widest font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3.5 py-1 rounded-full mb-3">
            Order Placed Successfully
          </span>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">
            Thank You for Your Order! 🎉
          </h2>

          <p className="text-gray-600 mb-6 text-sm">
            Tracking Number:{' '}
            <strong className="text-primary-700 font-mono text-base font-bold bg-primary-50 px-2.5 py-1 rounded-md border border-primary-200">
              #{orderNumber}
            </strong>
          </p>

          {/* Order Details Summary Card */}
          {submittedOrder && (
            <div className="bg-stone-50 rounded-2xl p-4 sm:p-5 text-left mb-6 border border-stone-200/70 text-xs sm:text-sm">
              <div className="font-bold text-gray-800 border-b border-stone-200 pb-2 mb-3 flex items-center justify-between">
                <span>Order Summary</span>
                <span className="text-emerald-700 font-semibold">Cash on Delivery (COD)</span>
              </div>

              <div className="space-y-1.5 mb-3 text-gray-600">
                <p><strong>Customer:</strong> {submittedOrder.customer.name}</p>
                <p><strong>Phone:</strong> {submittedOrder.customer.phone}</p>
                <p><strong>Delivery Address:</strong> {submittedOrder.customer.address}, {submittedOrder.customer.city}</p>
                {submittedOrder.customer.notes && (
                  <p><strong>Notes:</strong> {submittedOrder.customer.notes}</p>
                )}
              </div>

              <div className="border-t border-stone-200 pt-2.5 space-y-1.5">
                {submittedOrder.items.map((it, idx) => (
                  <div key={idx} className="flex justify-between text-gray-700">
                    <span>• {it.name} <span className="text-gray-400">×{it.quantity}</span></span>
                    <span className="font-semibold">Rs. {(it.price * it.quantity).toLocaleString()}</span>
                  </div>
                ))}
                <div className="flex justify-between font-bold text-gray-900 pt-2 border-t border-stone-200 text-sm">
                  <span>Grand Total:</span>
                  <span className="text-primary-800 font-mono">Rs. {submittedOrder.grandTotal.toLocaleString()}</span>
                </div>
              </div>
            </div>
          )}

          <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-4 mb-6 text-left flex items-start gap-3">
            <span className="text-xl">📞</span>
            <div className="text-xs text-amber-950 leading-relaxed">
              <strong>Order Confirmation Notice:</strong>
              <p className="mt-0.5 text-amber-900/80">
                Hamari customer care team aapke diye gaye phone number par WhatsApp ya Call ke zariye rabta karegi aur parcel dispatch karegi. Delivery time <strong>2 se 4 working days</strong> hai.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/products"
              className="flex-1 btn-primary py-3 rounded-full text-center font-bold text-sm shadow-md"
            >
              Continue Shopping
            </Link>
            <Link
              href="/"
              className="flex-1 py-3 rounded-full text-center font-bold text-sm border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Back to Home
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
                disabled={isSubmitting}
                className="btn-primary w-full py-4 text-base sm:text-lg font-bold flex items-center justify-center gap-2.5 shadow-xl hover:shadow-2xl hover:scale-101 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <ShieldCheck className="w-5 h-5" />
                {isSubmitting ? 'Placing Order...' : 'Confirm & Place Order (Cash on Delivery)'}
              </button>
              <p className="text-xs text-gray-500 text-center font-medium">
                🔒 100% Safe & Secure. Pay Cash on Delivery when your parcel arrives at your doorstep!
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
