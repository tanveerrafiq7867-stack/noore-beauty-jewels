'use client'

import { useState, useMemo, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Search, SlidersHorizontal, X, ChevronDown } from 'lucide-react'
import ProductCard from '@/components/ProductCard'
import { PRODUCTS, Product } from '@/data/products'
import { fetchProducts } from '@/lib/products'
import { CATEGORIES } from '@/data/config'
import { LuxuryCategoryIcon, CATEGORY_THEMES } from '@/components/CategoryIcons'

function ProductsContent() {
  const searchParams = useSearchParams()
  const initialCategory = searchParams.get('category') || 'all'
  const initialFilter = searchParams.get('filter') || ''
  const initialSearch = searchParams.get('search') || ''

  const [allProducts, setAllProducts] = useState<Product[]>(PRODUCTS)
  const [selectedCategory, setSelectedCategory] = useState(initialCategory)
  const [searchQuery, setSearchQuery] = useState(initialSearch)
  const [sortBy, setSortBy] = useState('featured')
  const [showNewOnly, setShowNewOnly] = useState(initialFilter === 'new')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000])
  const [showFilters, setShowFilters] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 4

  useEffect(() => {
    fetchProducts().then(data => {
      if (data && data.length > 0) {
        setAllProducts(data)
      }
    })
  }, [])

  const maxPrice = Math.max(...allProducts.map(p => p.price))

  const filteredProducts = useMemo(() => {
    let products = [...allProducts]

    // Category filter
    if (selectedCategory !== 'all') {
      products = products.filter(p => p.category === selectedCategory)
    }

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      products = products.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        (p.tags && p.tags.some(tag => tag.includes(q)))
      )
    }

    // New only filter
    if (showNewOnly) {
      products = products.filter(p => p.isNew)
    }

    // Price range filter
    products = products.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1])

    // Sort
    switch (sortBy) {
      case 'price-low':
        products.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        products.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        products.sort((a, b) => b.rating - a.rating)
        break
      case 'newest':
        products.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
        break
      default:
        products.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0))
    }

    return products
  }, [selectedCategory, searchQuery, sortBy, showNewOnly, priceRange])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-100 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-1">All Products</h1>
          <p className="text-gray-500">
            {filteredProducts.length} products available
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search + Controls bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search jewellery and beauty products..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="form-input pl-10"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="form-input pr-10 appearance-none cursor-pointer min-w-[180px]"
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>

          {/* Filter toggle mobile */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="sm:hidden flex items-center gap-2 btn-outline"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
          </button>
        </div>

        <div className="flex gap-6">
          {/* Sidebar Filters */}
          <aside className={`${showFilters ? 'block' : 'hidden'} sm:block w-full sm:w-64 shrink-0 space-y-6`}>
            {/* Categories */}
            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <h3 className="font-serif font-bold text-gray-900 mb-4 flex items-center gap-2">
                Collections &amp; Categories
              </h3>
              <div className="space-y-1.5">
                {CATEGORIES.map(cat => {
                  const theme = CATEGORY_THEMES[cat.id] || CATEGORY_THEMES.all
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all text-left ${
                        selectedCategory === cat.id
                          ? 'bg-amber-100/70 text-gray-900 font-bold shadow-xs ring-1 ring-amber-300'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <span className={`w-7 h-7 rounded-full bg-gradient-to-tr ${theme.gradient} flex items-center justify-center shrink-0 text-white shadow-xs`}>
                        <LuxuryCategoryIcon categoryId={cat.id} className="w-4 h-4 text-white" />
                      </span>
                      <span className="truncate">{cat.name}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Price Range */}
            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <h3 className="font-serif font-bold text-gray-900 mb-4">Price Range (PKR)</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Rs. {priceRange[0].toLocaleString()}</span>
                  <span>Rs. {priceRange[1].toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={maxPrice}
                  step={100}
                  value={priceRange[1]}
                  onChange={e => setPriceRange([priceRange[0], Number(e.target.value)])}
                  className="w-full accent-purple-600"
                />
              </div>
            </div>

            {/* Other Filters */}
            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <h3 className="font-bold text-gray-800 mb-4">🔍 More Filters</h3>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showNewOnly}
                  onChange={e => setShowNewOnly(e.target.checked)}
                  className="w-4 h-4 accent-purple-600 rounded"
                />
                <span className="text-sm text-gray-700">New Arrivals Only</span>
              </label>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">No Products Found</h3>
                <p className="text-gray-500 mb-6">Try clearing your search query or selecting a different category</p>
                <button
                  onClick={() => {
                    setSearchQuery('')
                    setSelectedCategory('all')
                    setShowNewOnly(false)
                  }}
                  className="btn-primary"
                >
                  View All Products
                </button>
              </div>
            ) : (
              <div>
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-10">
                  {filteredProducts
                    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                    .map(product => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                {/* 1, 2, 3, 4, 5 Pages Working Pagination */}
                <div className="flex flex-wrap items-center justify-center gap-2 pt-6 border-t border-gray-100">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  >
                    ←
                  </button>
                  {[1, 2, 3, 4, 5].map(pageNum => (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-10 h-10 rounded-full font-bold text-sm transition-all duration-200 ${
                        currentPage === pageNum
                          ? 'bg-primary-600 text-white shadow-md scale-105'
                          : 'bg-white border border-gray-200 text-gray-700 hover:bg-primary-50 hover:text-primary-600'
                      }`}
                    >
                      {pageNum}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(5, prev + 1))}
                    disabled={currentPage === 5}
                    className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  >
                    →
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    }>
      <ProductsContent />
    </Suspense>
  )
}
