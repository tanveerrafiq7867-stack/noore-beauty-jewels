'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'
import { CATEGORIES } from '@/data/config'
import { 
  PlusCircle, 
  Package, 
  Trash2, 
  Edit3, 
  Eye, 
  Upload, 
  CheckCircle, 
  AlertCircle, 
  RefreshCw, 
  Lock, 
  LogOut, 
  ExternalLink,
  Search,
  Sparkles,
  ShoppingBag,
  Phone,
  Copy,
  Check
} from 'lucide-react'

const DEFAULT_PIN = 'noore786'

interface ProductItem {
  id: number
  name: string
  category: string
  price: number
  original_price?: number | null
  images: string[]
  description: string
  rating?: number
  reviews?: number
  in_stock: boolean
  is_new?: boolean
  is_featured?: boolean
  sku?: string
  tags?: string[]
}

interface AdminOrder {
  orderNumber: string
  customer: {
    name: string
    phone: string
    address: string
    city: string
    notes?: string
  }
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
  status?: string
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [pinInput, setPinInput] = useState('')
  const [pinError, setPinError] = useState(false)

  // Active tab: 'orders' | 'list' | 'add'
  const [activeTab, setActiveTab] = useState<'orders' | 'list' | 'add'>('orders')
  const [products, setProducts] = useState<ProductItem[]>([])
  const [orders, setOrders] = useState<AdminOrder[]>([])
  const [copiedOrderId, setCopiedOrderId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  // Form State
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    category: 'necklace',
    price: '',
    original_price: '',
    images: [''],
    description: '',
    sku: '',
    tags: '',
    in_stock: true,
    is_new: false,
    is_featured: true,
  })
  const [uploadingImage, setUploadingImage] = useState(false)

  useEffect(() => {
    const savedAuth = localStorage.getItem('noore_admin_auth')
    if (savedAuth === 'true') {
      setIsAuthenticated(true)
    }
  }, [])

  useEffect(() => {
    if (isAuthenticated) {
      loadProducts()
      loadOrders()
    }
  }, [isAuthenticated])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (pinInput.trim() === DEFAULT_PIN) {
      setIsAuthenticated(true)
      localStorage.setItem('noore_admin_auth', 'true')
      setPinError(false)
    } else {
      setPinError(true)
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('noore_admin_auth')
  }

  const loadProducts = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('id', { ascending: false })

      if (error) throw error
      if (data) {
        setProducts(data.map(d => ({
          ...d,
          images: Array.isArray(d.images) ? d.images : [d.images],
        })))
      }
    } catch (err: any) {
      console.error('Error loading products:', err)
      showNotification('error', 'Database se products load nahi ho sakay: ' + (err.message || ''))
    } finally {
      setLoading(false)
    }
  }

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message })
    setTimeout(() => setNotification(null), 4000)
  }

  const loadOrders = () => {
    try {
      const saved = JSON.parse(localStorage.getItem('noore_store_orders') || '[]')
      setOrders(saved)
    } catch {
      setOrders([])
    }
  }

  const handleUpdateOrderStatus = (orderNumber: string, newStatus: string) => {
    try {
      const updated = orders.map(ord => ord.orderNumber === orderNumber ? { ...ord, status: newStatus } : ord)
      setOrders(updated)
      localStorage.setItem('noore_store_orders', JSON.stringify(updated))
      showNotification('success', `Order #${orderNumber} status updated to ${newStatus}`)
    } catch (e: any) {
      showNotification('error', 'Status update failed: ' + e.message)
    }
  }

  const handleDeleteOrder = (orderNumber: string) => {
    if (!confirm(`Are you sure you want to delete order #${orderNumber}?`)) return
    try {
      const updated = orders.filter(ord => ord.orderNumber !== orderNumber)
      setOrders(updated)
      localStorage.setItem('noore_store_orders', JSON.stringify(updated))
      showNotification('success', `Order #${orderNumber} removed`)
    } catch (e: any) {
      showNotification('error', 'Delete failed: ' + e.message)
    }
  }

  const handleCopyForMarkaz = (ord: AdminOrder) => {
    const text = 
      `Customer: ${ord.customer.name}\n` +
      `Phone: ${ord.customer.phone}\n` +
      `City: ${ord.customer.city}\n` +
      `Address: ${ord.customer.address}\n\n` +
      `Ordered Items:\n` +
      ord.items.map(it => `• ${it.name} (Qty: ${it.quantity}) - SKU: ${it.sku || 'N/A'}`).join('\n') +
      `\n\nTotal COD: Rs. ${ord.grandTotal.toLocaleString()}`

    navigator.clipboard.writeText(text)
    setCopiedOrderId(ord.orderNumber)
    showNotification('success', `Order #${ord.orderNumber} details copied for Markaz!`)
    setTimeout(() => setCopiedOrderId(null), 3000)
  }

  const handleWhatsAppCustomer = (ord: AdminOrder) => {
    let cleanPhone = ord.customer.phone.replace(/[^0-9]/g, '')
    if (cleanPhone.startsWith('0')) cleanPhone = '92' + cleanPhone.slice(1)
    const msg = encodeURIComponent(
      `Assalam-o-Alaikum ${ord.customer.name}! 👋\n\n` +
      `Noore Beauty & Jewels se aapka order *#${ord.orderNumber}* receive hua hai:\n\n` +
      ord.items.map(it => `• ${it.name} (Qty: ${it.quantity}) - Rs. ${(it.price * it.quantity).toLocaleString()}`).join('\n') +
      `\n\nTotal: Rs. ${ord.grandTotal.toLocaleString()} (Cash on Delivery)\n` +
      `Delivery Address: ${ord.customer.address}, ${ord.customer.city}\n\n` +
      `Kya aapka order confirm hai taake hum parcel dispatch kar dein? Please YES likh kar reply karein. Shukriya! ✨`
    )
    window.open(`https://wa.me/${cleanPhone}?text=${msg}`, '_blank')
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setUploadingImage(true)
    try {
      const file = files[0]
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
      const filePath = `products/${fileName}`

      const { data, error } = await supabase.storage
        .from('product-images')
        .upload(filePath, file, { cacheControl: '3600', upsert: true })

      if (error) throw error

      const { data: urlData } = supabase.storage
        .from('product-images')
        .getPublicUrl(filePath)

      if (urlData?.publicUrl) {
        setFormData(prev => ({
          ...prev,
          images: [urlData.publicUrl, ...prev.images.filter(img => img.trim() !== '')],
        }))
        showNotification('success', 'Image upload ho gayi!')
      }
    } catch (err: any) {
      console.error('Upload error:', err)
      showNotification('error', 'Image upload mein masla: ' + (err.message || 'Bucket check karein'))
    } finally {
      setUploadingImage(false)
    }
  }

  const handleAddImageUrl = () => {
    setFormData(prev => ({ ...prev, images: [...prev.images, ''] }))
  }

  const handleImageChange = (index: number, val: string) => {
    const updated = [...formData.images]
    updated[index] = val
    setFormData(prev => ({ ...prev, images: updated }))
  }

  const handleRemoveImage = (index: number) => {
    const updated = formData.images.filter((_, i) => i !== index)
    setFormData(prev => ({ ...prev, images: updated.length ? updated : [''] }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name.trim() || !formData.price) {
      showNotification('error', 'Product name aur price zaroori hain!')
      return
    }

    const cleanedImages = formData.images.filter(img => img.trim() !== '')
    if (cleanedImages.length === 0) {
      showNotification('error', 'Kam az kam ek image URL ya photo upload karein!')
      return
    }

    setSaving(true)
    try {
      const payload: any = {
        name: formData.name.trim(),
        category: formData.category,
        price: Number(formData.price),
        original_price: formData.original_price ? Number(formData.original_price) : null,
        images: cleanedImages,
        description: formData.description.trim() || `${formData.name} - High quality product.`,
        sku: formData.sku.trim() || null,
        tags: formData.tags ? formData.tags.split(',').map(t => t.trim().toLowerCase()) : [],
        in_stock: formData.in_stock,
        is_new: formData.is_new,
        is_featured: formData.is_featured,
      }

      if (editingId) {
        // Update existing
        const { error } = await supabase
          .from('products')
          .update(payload)
          .eq('id', editingId)

        if (error) throw error
        showNotification('success', 'Product kamyabi se update ho gaya!')
      } else {
        // Insert new
        const { error } = await supabase
          .from('products')
          .insert([payload])

        if (error) throw error
        showNotification('success', 'Naya Product live website par add ho gaya!')
      }

      resetForm()
      setActiveTab('list')
      loadProducts()
    } catch (err: any) {
      console.error('Save error:', err)
      showNotification('error', 'Product save nahi ho saka: ' + (err.message || ''))
    } finally {
      setSaving(false)
    }
  }

  const handleEdit = (prod: ProductItem) => {
    setEditingId(prod.id)
    setFormData({
      name: prod.name,
      category: prod.category,
      price: prod.price.toString(),
      original_price: prod.original_price ? prod.original_price.toString() : '',
      images: prod.images && prod.images.length ? prod.images : [''],
      description: prod.description || '',
      sku: prod.sku || '',
      tags: prod.tags ? prod.tags.join(', ') : '',
      in_stock: prod.in_stock,
      is_new: Boolean(prod.is_new),
      is_featured: Boolean(prod.is_featured),
    })
    setActiveTab('add')
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Kiya aap waqai is product ko delete karna chahte hain?')) return

    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id)

      if (error) throw error
      showNotification('success', 'Product delete ho gaya!')
      loadProducts()
    } catch (err: any) {
      showNotification('error', 'Delete nahi ho saka: ' + (err.message || ''))
    }
  }

  const handleToggleStock = async (prod: ProductItem) => {
    try {
      const updatedStock = !prod.in_stock
      const { error } = await supabase
        .from('products')
        .update({ in_stock: updatedStock })
        .eq('id', prod.id)

      if (error) throw error
      setProducts(prev => prev.map(p => p.id === prod.id ? { ...p, in_stock: updatedStock } : p))
      showNotification('success', `Product status: ${updatedStock ? 'In Stock' : 'Out of Stock'}`)
    } catch (err: any) {
      showNotification('error', 'Status update nahi ho saka')
    }
  }

  const resetForm = () => {
    setEditingId(null)
    setFormData({
      name: '',
      category: 'necklace',
      price: '',
      original_price: '',
      images: [''],
      description: '',
      sku: '',
      tags: '',
      in_stock: true,
      is_new: false,
      is_featured: true,
    })
  }

  // Filtered products list
  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (p.sku && p.sku.toLowerCase().includes(searchQuery.toLowerCase())) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border border-gray-100 text-center">
          <div className="w-16 h-16 rounded-2xl bg-primary-50 text-primary-600 flex items-center justify-center mx-auto mb-5 shadow-inner">
            <Lock className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Noore Admin Panel</h1>
          <p className="text-gray-500 text-sm mb-6">Apna secret PIN code daal kar login karein</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                placeholder="Enter Admin PIN"
                value={pinInput}
                onChange={e => {
                  setPinInput(e.target.value)
                  setPinError(false)
                }}
                className={`w-full px-4 py-3 text-center text-lg tracking-widest rounded-xl border ${
                  pinError ? 'border-red-500 bg-red-50' : 'border-gray-200'
                } focus:outline-none focus:ring-2 focus:ring-primary-500`}
                autoFocus
              />
              {pinError && (
                <p className="text-red-500 text-xs mt-2 font-medium">Ghalat PIN code! Dobara koshish karein.</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg hover:shadow-primary-500/30"
            >
              Sign In to Dashboard
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
            <span>Noore Beauty &amp; Jewels</span>
            <Link href="/" className="text-primary-600 hover:underline flex items-center gap-1">
              Store Par Wapas <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navbar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary-600 text-white font-serif font-bold text-lg flex items-center justify-center shadow-md">
              NB
            </div>
            <div>
              <h1 className="font-bold text-gray-900 text-base leading-tight">Noore Admin Dashboard</h1>
              <p className="text-[11px] text-green-600 font-semibold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                Connected to Supabase
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-primary-600 bg-gray-100 hover:bg-primary-50 px-3.5 py-2 rounded-lg transition-colors"
            >
              <Eye className="w-3.5 h-3.5" /> View Live Store
            </Link>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1 text-xs font-semibold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-2 rounded-lg transition-colors"
              title="Logout"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Notification Toast */}
      {notification && (
        <div className={`fixed top-20 right-6 z-50 flex items-center gap-2.5 px-5 py-3.5 rounded-2xl shadow-xl text-sm font-semibold transition-all animate-bounce ${
          notification.type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
        }`}>
          {notification.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
          <span>{notification.message}</span>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-8">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => {
                setActiveTab('orders')
                loadOrders()
              }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${
                activeTab === 'orders'
                  ? 'bg-primary-600 text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              Customer Orders ({orders.length})
            </button>
            <button
              onClick={() => {
                setActiveTab('list')
                resetForm()
              }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${
                activeTab === 'list'
                  ? 'bg-primary-600 text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <Package className="w-4 h-4" />
              Products List ({products.length})
            </button>
            <button
              onClick={() => {
                setActiveTab('add')
                if (!editingId) resetForm()
              }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${
                activeTab === 'add'
                  ? 'bg-primary-600 text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <PlusCircle className="w-4 h-4" />
              {editingId ? 'Edit Product' : '➕ Add New Product'}
            </button>
          </div>

          <button
            onClick={() => {
              loadProducts()
              loadOrders()
            }}
            disabled={loading}
            className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-900 font-semibold p-2 rounded-lg hover:bg-gray-100 transition-colors"
            title="Refresh database and orders"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>

        {/* ================= TAB 0: ORDERS MANAGEMENT ================= */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-primary-600" /> Customer Orders Management
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  Website se aane walay orders yahan live show hotay hain. 1-Click se customer ko WhatsApp karein ya Markaz ke liye copy karein.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-primary-800 bg-primary-50 border border-primary-200 px-3 py-1.5 rounded-xl">
                  Total Orders: {orders.length}
                </span>
              </div>
            </div>

            {orders.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 p-8">
                <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-gray-800 mb-1">Abhi tak koi order nahi aaya</h3>
                <p className="text-xs text-gray-500 max-w-md mx-auto">
                  Jab koi customer website se order confirm karega, to uska complete address, phone number aur items yahan 1-click details ke sath nazar aayenge!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {orders.map((ord) => (
                  <div
                    key={ord.orderNumber}
                    className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-gray-100 hover:border-primary-200 transition-all"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-4 mb-4">
                      <div>
                        <div className="flex items-center gap-2.5">
                          <span className="font-mono font-bold text-base text-primary-700 bg-primary-50 px-2.5 py-0.5 rounded-lg border border-primary-200">
                            #{ord.orderNumber}
                          </span>
                          <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                            ord.status === 'Delivered'
                              ? 'bg-green-100 text-green-700'
                              : ord.status === 'Dispatched'
                              ? 'bg-blue-100 text-blue-700'
                              : ord.status === 'Confirmed'
                              ? 'bg-amber-100 text-amber-700'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {ord.status || 'Pending'}
                          </span>
                        </div>
                        <p className="text-[11px] text-gray-400 mt-1">
                          {new Date(ord.date).toLocaleString('en-PK', { timeZone: 'Asia/Karachi' })}
                        </p>
                      </div>

                      {/* Quick Action Buttons */}
                      <div className="flex flex-wrap items-center gap-2">
                        {/* WhatsApp Customer */}
                        <button
                          onClick={() => handleWhatsAppCustomer(ord)}
                          className="inline-flex items-center gap-1.5 bg-green-500 hover:bg-green-600 text-white font-bold text-xs px-3.5 py-2 rounded-xl shadow-sm hover:scale-105 transition-all"
                          title="Open WhatsApp with prefilled confirmation message"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          WhatsApp Customer
                        </button>

                        {/* Copy for Markaz */}
                        <button
                          onClick={() => handleCopyForMarkaz(ord)}
                          className="inline-flex items-center gap-1.5 bg-gray-900 hover:bg-black text-white font-bold text-xs px-3.5 py-2 rounded-xl shadow-sm hover:scale-105 transition-all"
                          title="Copy details formatted for Markaz App"
                        >
                          {copiedOrderId === ord.orderNumber ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-green-400" />
                              Copied!
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              Copy for Markaz
                            </>
                          )}
                        </button>

                        {/* Status Selector */}
                        <select
                          value={ord.status || 'Pending'}
                          onChange={(e) => handleUpdateOrderStatus(ord.orderNumber, e.target.value)}
                          className="text-xs font-semibold bg-gray-50 border border-gray-200 rounded-xl px-2.5 py-2 text-gray-700 focus:ring-1 focus:ring-primary-500"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Dispatched">Dispatched</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>

                        {/* Delete */}
                        <button
                          onClick={() => handleDeleteOrder(ord.orderNumber)}
                          className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                          title="Delete Order"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Order Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                      {/* Customer Info */}
                      <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                        <h4 className="font-bold text-gray-800 mb-2 uppercase tracking-wider text-[11px] text-gray-500">
                          👤 Customer & Delivery Address
                        </h4>
                        <div className="space-y-1 text-gray-700">
                          <p><strong>Name:</strong> {ord.customer.name}</p>
                          <p><strong>Phone:</strong> {ord.customer.phone}</p>
                          <p><strong>City:</strong> {ord.customer.city}</p>
                          <p><strong>Address:</strong> {ord.customer.address}</p>
                          {ord.customer.notes && (
                            <p className="text-amber-700 mt-1"><strong>Note:</strong> {ord.customer.notes}</p>
                          )}
                        </div>
                      </div>

                      {/* Items & Payment */}
                      <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 flex flex-col justify-between">
                        <div>
                          <h4 className="font-bold text-gray-800 mb-2 uppercase tracking-wider text-[11px] text-gray-500">
                            📦 Ordered Items
                          </h4>
                          <div className="space-y-1.5 max-h-32 overflow-y-auto pr-1">
                            {ord.items.map((it, i) => (
                              <div key={i} className="flex justify-between items-center text-gray-700">
                                <span className="truncate">
                                  • {it.name} <span className="text-gray-400 font-semibold">×{it.quantity}</span>
                                </span>
                                <span className="font-bold shrink-0 ml-2">
                                  Rs. {(it.price * it.quantity).toLocaleString()}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="border-t border-gray-200 pt-2.5 mt-2 flex justify-between items-center font-bold text-gray-900 text-sm">
                          <span>Total Amount (COD):</span>
                          <span className="text-primary-800 font-mono text-base">
                            Rs. {ord.grandTotal.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 1: ADD / EDIT PRODUCT FORM ================= */}
        {activeTab === 'add' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 max-w-4xl mx-auto">
            <div className="mb-6 pb-4 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {editingId ? 'Edit Product Details' : 'Markaz App Se Naya Product List Karein'}
                </h2>
                <p className="text-sm text-gray-500">
                  Yeh form fill karein, product foran aapki live website par publish ho jayega.
                </p>
              </div>
              {editingId && (
                <button
                  type="button"
                  onClick={() => {
                    resetForm()
                    setActiveTab('list')
                  }}
                  className="text-xs text-gray-500 hover:text-gray-800 underline"
                >
                  Cancel Edit
                </button>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Product Name */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Product Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kundan Bridal Necklace Set (3-Piece)"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="form-input text-base"
                />
              </div>

              {/* Category & Markaz SKU */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                    className="form-input text-sm bg-white"
                  >
                    {CATEGORIES.filter(c => c.id !== 'all').map(cat => (
                      <option key={cat.id} value={cat.id}>
                        {cat.icon} {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Markaz Code / SKU (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. MKZ-592 ya Markaz product code"
                    value={formData.sku}
                    onChange={e => setFormData({ ...formData, sku: e.target.value })}
                    className="form-input text-sm"
                  />
                  <p className="text-[11px] text-gray-400 mt-1">Order aane par Markaz app mein dhoondna aasan rahega.</p>
                </div>
              </div>

              {/* Pricing (Selling vs Original) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50 p-5 rounded-2xl border border-gray-100">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Selling Price (Rs.) *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 font-bold text-sm">Rs.</span>
                    <input
                      type="number"
                      required
                      min="1"
                      placeholder="1850"
                      value={formData.price}
                      onChange={e => setFormData({ ...formData, price: e.target.value })}
                      className="form-input pl-12 text-base font-semibold"
                    />
                  </div>
                  <p className="text-[11px] text-gray-500 mt-1">Customer yeh price pay karega (Aapka profit shaamil karke).</p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Original Price / Cut Price (Rs., Optional)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 font-bold text-sm">Rs.</span>
                    <input
                      type="number"
                      min="1"
                      placeholder="2500"
                      value={formData.original_price}
                      onChange={e => setFormData({ ...formData, original_price: e.target.value })}
                      className="form-input pl-12 text-base"
                    />
                  </div>
                  <p className="text-[11px] text-gray-500 mt-1">Website par discount badge (-30% OFF) dikhane ke liye.</p>
                </div>
              </div>

              {/* Images Section: Direct Upload + URLs */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Product Pictures *
                  </label>
                  <div className="relative">
                    <label className="cursor-pointer inline-flex items-center gap-1.5 text-xs font-bold text-primary-600 bg-primary-50 hover:bg-primary-100 px-3 py-1.5 rounded-lg transition-colors">
                      <Upload className="w-3.5 h-3.5" />
                      {uploadingImage ? 'Uploading...' : '📁 Mobile/PC se Upload karein'}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        disabled={uploadingImage}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                <div className="space-y-2">
                  {formData.images.map((img, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="relative w-12 h-12 rounded-xl bg-gray-100 border border-gray-200 overflow-hidden shrink-0">
                        {img.trim() ? (
                          <img src={img} alt="Preview" className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-gray-300 flex items-center justify-center h-full text-xs">No img</span>
                        )}
                      </div>
                      <input
                        type="url"
                        placeholder="Image URL paste karein ya upar se photo upload karein"
                        value={img}
                        onChange={e => handleImageChange(idx, e.target.value)}
                        className="form-input text-xs flex-1"
                      />
                      {formData.images.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(idx)}
                          className="p-2 text-red-500 hover:text-red-700 rounded-lg hover:bg-red-50 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={handleAddImageUrl}
                  className="text-xs font-semibold text-primary-600 hover:underline flex items-center gap-1"
                >
                  <PlusCircle className="w-3.5 h-3.5" /> Mazeed doosri photo ka link add karein
                </button>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Product Description *
                </label>
                <textarea
                  rows={4}
                  placeholder="Markaz app se description copy karke yahan paste kar dein..."
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  className="form-input text-sm"
                />
              </div>

              {/* Badges / Checkboxes */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                <label className="flex items-center gap-2.5 cursor-pointer text-sm font-semibold text-gray-700">
                  <input
                    type="checkbox"
                    checked={formData.in_stock}
                    onChange={e => setFormData({ ...formData, in_stock: e.target.checked })}
                    className="w-4 h-4 text-primary-600 rounded"
                  />
                  <span>In Stock (Available)</span>
                </label>

                <label className="flex items-center gap-2.5 cursor-pointer text-sm font-semibold text-gray-700">
                  <input
                    type="checkbox"
                    checked={formData.is_new}
                    onChange={e => setFormData({ ...formData, is_new: e.target.checked })}
                    className="w-4 h-4 text-primary-600 rounded"
                  />
                  <span>NEW Badge</span>
                </label>

                <label className="flex items-center gap-2.5 cursor-pointer text-sm font-semibold text-gray-700">
                  <input
                    type="checkbox"
                    checked={formData.is_featured}
                    onChange={e => setFormData({ ...formData, is_featured: e.target.checked })}
                    className="w-4 h-4 text-primary-600 rounded"
                  />
                  <span>Homepage Featured</span>
                </label>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Search Tags (Comma separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g. kundan, bridal, gold, necklace, shadi"
                  value={formData.tags}
                  onChange={e => setFormData({ ...formData, tags: e.target.value })}
                  className="form-input text-sm"
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => {
                    resetForm()
                    setActiveTab('list')
                  }}
                  className="px-6 py-3 rounded-xl border border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="btn-primary flex items-center gap-2 px-8 py-3 text-base shadow-lg shadow-primary-500/20 disabled:opacity-50"
                >
                  {saving ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      Saving to Website...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      {editingId ? 'Update Product' : 'Publish Product to Live Website'}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ================= TAB 2: PRODUCTS LIST & MANAGEMENT ================= */}
        {activeTab === 'list' && (
          <div className="space-y-6">
            {/* Search and Quick Filters */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-96">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products by name, category or SKU..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="form-input pl-10 text-sm"
                />
              </div>

              <div className="text-xs text-gray-500 font-medium">
                Showing <strong className="text-gray-900">{filteredProducts.length}</strong> of {products.length} products
              </div>
            </div>

            {/* Products Table / Cards */}
            {loading ? (
              <div className="text-center py-20 bg-white rounded-3xl border border-gray-100">
                <div className="w-10 h-10 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-500 font-medium text-sm">Database se products load ho rahe hain...</p>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 p-8">
                <div className="w-16 h-16 rounded-2xl bg-gray-100 text-gray-400 flex items-center justify-center mx-auto mb-4 text-2xl">
                  📦
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-1">Koi product nahi mila</h3>
                <p className="text-sm text-gray-500 mb-6">Aap Supabase mein initial seed query run karein ya naya product add karein.</p>
                <button
                  onClick={() => setActiveTab('add')}
                  className="btn-primary inline-flex items-center gap-2 text-sm"
                >
                  <PlusCircle className="w-4 h-4" /> Pehla Product Add Karein
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50/80 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wider">
                      <tr>
                        <th className="py-4 px-6">Product</th>
                        <th className="py-4 px-4">Category</th>
                        <th className="py-4 px-4">Price</th>
                        <th className="py-4 px-4">Markaz SKU</th>
                        <th className="py-4 px-4">Status</th>
                        <th className="py-4 px-6 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {filteredProducts.map(prod => (
                        <tr key={prod.id} className="hover:bg-gray-50/60 transition-colors">
                          {/* Image & Title */}
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-3">
                              <div className="relative w-12 h-12 rounded-xl bg-gray-100 border border-gray-100 overflow-hidden shrink-0">
                                {prod.images && prod.images[0] ? (
                                  <img src={prod.images[0]} alt={prod.name} className="w-full h-full object-cover" />
                                ) : (
                                  <span className="text-gray-300 text-xs flex items-center justify-center h-full">No img</span>
                                )}
                              </div>
                              <div className="min-w-0">
                                <p className="font-bold text-gray-900 truncate max-w-xs">{prod.name}</p>
                                <div className="flex items-center gap-2 mt-0.5">
                                  {prod.is_new && (
                                    <span className="text-[10px] bg-emerald-100 text-emerald-700 font-bold px-1.5 py-0.5 rounded">NEW</span>
                                  )}
                                  {prod.is_featured && (
                                    <span className="text-[10px] bg-primary-100 text-primary-700 font-bold px-1.5 py-0.5 rounded">Featured</span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* Category */}
                          <td className="py-4 px-4">
                            <span className="inline-block bg-gray-100 text-gray-700 text-xs font-semibold px-2.5 py-1 rounded-lg capitalize">
                              {prod.category}
                            </span>
                          </td>

                          {/* Price */}
                          <td className="py-4 px-4 font-bold text-gray-900">
                            Rs. {prod.price.toLocaleString()}
                            {prod.original_price && (
                              <span className="block text-xs text-gray-400 line-through font-normal">
                                Rs. {prod.original_price.toLocaleString()}
                              </span>
                            )}
                          </td>

                          {/* SKU */}
                          <td className="py-4 px-4 text-xs font-mono text-gray-600">
                            {prod.sku || '—'}
                          </td>

                          {/* In Stock Toggle */}
                          <td className="py-4 px-4">
                            <button
                              onClick={() => handleToggleStock(prod)}
                              className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full transition-all ${
                                prod.in_stock
                                  ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                  : 'bg-red-100 text-red-700 hover:bg-red-200'
                              }`}
                              title="Click to toggle stock"
                            >
                              <span className={`w-2 h-2 rounded-full ${prod.in_stock ? 'bg-green-500' : 'bg-red-500'}`}></span>
                              {prod.in_stock ? 'In Stock' : 'Out of Stock'}
                            </button>
                          </td>

                          {/* Actions */}
                          <td className="py-4 px-6 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <Link
                                href={`/products/${prod.id}`}
                                target="_blank"
                                className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                                title="View on store"
                              >
                                <Eye className="w-4 h-4" />
                              </Link>
                              <button
                                onClick={() => handleEdit(prod)}
                                className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                                title="Edit product"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDelete(prod.id)}
                                className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                                title="Delete product"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
