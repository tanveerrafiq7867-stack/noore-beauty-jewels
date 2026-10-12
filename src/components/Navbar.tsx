'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ShoppingCart, Menu, X, Search, Sparkles, ArrowRight } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { STORE_CONFIG } from '@/data/config'
import { PRODUCTS } from '@/data/products'

export default function Navbar() {
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const searchInputRef = useRef<HTMLInputElement>(null)
  const searchContainerRef = useRef<HTMLDivElement>(null)

  const totalItems = useCartStore(state => state.getTotalItems())

  // Focus input when search opens
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [searchOpen])

  // Close search when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setSearchOpen(false)
      }
    }
    if (searchOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [searchOpen])

  // Live matching products
  const matchingProducts = query.trim()
    ? PRODUCTS.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        (p.tags && p.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase())))
      ).slice(0, 5)
    : []

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/products?search=${encodeURIComponent(query.trim())}`)
      setSearchOpen(false)
      setQuery('')
    }
  }

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'All Products' },
    { href: '/products?category=necklace', label: 'Jewellery' },
    { href: '/products?category=beauty', label: 'Beauty & Skincare' },
    { href: '#contact', label: 'Contact' },
  ]

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100">
      {/* Announcement Top Bar */}
      <div className="bg-gradient-to-r from-purple-900 via-primary-800 to-amber-700 text-white text-center text-xs py-2 px-4 font-medium tracking-wide">
        ✨ Free Nationwide Delivery on Orders Above Rs. {STORE_CONFIG.freeDeliveryAbove.toLocaleString()} &nbsp;|&nbsp; 
        <a href={`tel:${STORE_CONFIG.phone}`} className="underline hover:text-amber-200 transition-colors ml-1">
          📞 {STORE_CONFIG.phone}
        </a>
      </div>

      {/* Main Navbar */}
      <nav className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo / Brand Heading (Simple, Graceful & Luxury Minimalist) */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 group shrink min-w-0">
            {/* Monogram Badge (Ready for custom logo image later) */}
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-900 group-hover:bg-primary-900 text-white flex items-center justify-center font-serif font-bold text-xs sm:text-base tracking-wider shadow-sm transition-all duration-200 group-hover:scale-105 shrink-0">
              NB
            </div>

            {/* Graceful Brand Title */}
            <div className="flex flex-col min-w-0">
              <span className="font-serif text-[17px] sm:text-2xl lg:text-[27px] font-semibold text-gray-900 tracking-tight leading-none group-hover:text-primary-700 transition-colors whitespace-nowrap">
                Noore <span className="font-normal italic text-gray-700">Beauty &amp; Jewels</span>
              </span>
              <span className="text-[8.5px] sm:text-[10px] lg:text-[11px] font-medium uppercase tracking-wider sm:tracking-[0.2em] text-gray-400 mt-0.5 sm:mt-1 whitespace-nowrap">
                Jewellery &amp; Beauty Products
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map(link => (
              <Link key={link.href} href={link.href} className="nav-link text-sm font-semibold tracking-wide">
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-1 sm:gap-2.5 shrink-0">
            {/* Functional Search Toggle Button */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className={`p-2 sm:p-2.5 rounded-full transition-all duration-200 ${
                searchOpen
                  ? 'bg-primary-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-primary-50 hover:text-primary-600'
              }`}
              aria-label="Search products"
              title="Search products"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Shopping Cart Button */}
            <Link
              href="/cart"
              className="relative p-2 sm:p-2.5 rounded-full bg-gray-100 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
              aria-label="Shopping Cart"
            >
              <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 text-primary-600" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-[10px] sm:text-xs w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center font-bold shadow animate-bounce">
                  {totalItems > 9 ? '9+' : totalItems}
                </span>
              )}
            </Link>

            {/* Mobile Menu Toggle Button */}
            <button
              className="lg:hidden p-2 sm:p-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Live Search Bar Dropdown Overlay */}
        {searchOpen && (
          <div ref={searchContainerRef} className="py-4 border-t border-gray-100 animate-fade-in-up">
            <form onSubmit={handleSearchSubmit} className="relative">
              <div className="flex items-center bg-gray-50 border-2 border-primary-400 rounded-2xl overflow-hidden shadow-lg focus-within:ring-2 focus-within:ring-primary-300 transition-all">
                <Search className="w-5 h-5 text-primary-500 ml-4 shrink-0" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Search necklaces, earrings, bangles, rings, serums, makeup..."
                  className="w-full bg-transparent px-4 py-3.5 text-sm sm:text-base text-gray-800 placeholder-gray-400 focus:outline-none"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery('')}
                    className="p-2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
                <button
                  type="submit"
                  className="bg-primary-600 hover:bg-primary-700 text-white font-bold px-6 py-3.5 text-sm shrink-0 transition-colors"
                >
                  Search
                </button>
              </div>

              {/* Live Instant Search Suggestions */}
              {query.trim() && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50">
                  {matchingProducts.length > 0 ? (
                    <div>
                      <div className="p-3 bg-gray-50 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wider">
                        Found {matchingProducts.length} matching products
                      </div>
                      <div className="divide-y divide-gray-100 max-h-80 overflow-y-auto">
                        {matchingProducts.map(p => (
                          <Link
                            key={p.id}
                            href={`/products/${p.id}`}
                            onClick={() => {
                              setSearchOpen(false)
                              setQuery('')
                            }}
                            className="flex items-center gap-3 p-3 hover:bg-primary-50/60 transition-colors group"
                          >
                            <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                              <Image src={p.images[0]} alt={p.name} fill className="object-cover" sizes="48px" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-bold text-gray-800 group-hover:text-primary-600 truncate transition-colors">
                                {p.name}
                              </p>
                              <p className="text-xs text-primary-500 font-semibold uppercase">{p.category}</p>
                            </div>
                            <span className="text-sm font-bold text-gray-900 shrink-0">
                              Rs. {p.price.toLocaleString()}
                            </span>
                          </Link>
                        ))}
                      </div>
                      <div className="p-3 bg-gray-50 text-center border-t border-gray-100">
                        <button
                          type="submit"
                          className="text-xs font-bold text-primary-600 hover:text-primary-700 inline-flex items-center gap-1"
                        >
                          View all results for "{query}" <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="p-6 text-center text-sm text-gray-500">
                      No products found matching "<strong>{query}</strong>". Try searching for "necklace", "earrings", or "serum".
                    </div>
                  )}
                </div>
              )}
            </form>
          </div>
        )}

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 py-4 space-y-1 animate-fade-in-up">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-4 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-700 rounded-xl transition-colors font-semibold text-sm"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  )
}
