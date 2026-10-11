'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Star, Shield, Truck, RotateCcw, Headphones, ChevronRight, ChevronLeft, Instagram, Facebook } from 'lucide-react'
import ProductCard from '@/components/ProductCard'
import { PRODUCTS } from '@/data/products'
import { CATEGORIES, STORE_CONFIG } from '@/data/config'

export default function HomePage() {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 4
  const totalPages = 5 // Exactly 5 working pages as requested

  // Get products for current page (4 products per page)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedProducts = PRODUCTS.slice(startIndex, startIndex + itemsPerPage)

  const newProducts = PRODUCTS.filter(p => p.isNew).slice(0, 4)

  const handlePageChange = (pageNum: number) => {
    setCurrentPage(pageNum)
    const el = document.getElementById('products-section')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div>
      {/* ===== HERO SECTION ===== */}
      <section className="hero-gradient py-16 md:py-24 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          {/* Text */}
          <div className="flex-1 text-center lg:text-left animate-fade-in-up">
            <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 text-sm font-semibold px-4 py-2 rounded-full mb-6 shadow-sm animate-pulse-glow">
              ✨ Pakistan's Premium Jewellery & Beauty Store
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
              Exquisite{' '}
              <span className="text-gradient">Artificial Jewellery</span>
              {' '}&{' '}
              <span className="text-gradient">Beauty Products</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Discover elegant bridal sets, trendy accessories, and premium skincare cosmetics. Delivered to your doorstep across Pakistan with Cash on Delivery!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/products" className="btn-primary flex items-center justify-center gap-2 shadow-lg hover:shadow-primary-300/50 hover:scale-105 transition-all">
                All Products <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={`https://wa.me/${STORE_CONFIG.whatsappNumber}?text=Assalam%20o%20Alaikum!%20I%20would%20like%20to%20place%20an%20order%20from%20Noore%20Beauty%20%26%20Jewels.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-full transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Order via WhatsApp
              </a>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-6 mt-10 justify-center lg:justify-start">
              {[
                { icon: '⭐', text: '4.8 Rating' },
                { icon: '📦', text: '5000+ Orders' },
                { icon: '🔒', text: '100% Authentic' },
                { icon: '🚚', text: 'Fast Delivery' },
              ].map(badge => (
                <div key={badge.text} className="flex items-center gap-1.5 text-sm text-gray-600 font-medium">
                  <span className="text-lg">{badge.icon}</span>
                  {badge.text}
                </div>
              ))}
            </div>
          </div>

          {/* Hero Image Grid with Animations */}
          <div className="flex-1 grid grid-cols-2 gap-3 max-w-md lg:max-w-none">
            <div className="space-y-3 animate-float">
              <div className="h-52 rounded-2xl overflow-hidden shadow-lg animated-card">
                <Image
                  src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=300&fit=crop"
                  alt="Jewellery"
                  width={400}
                  height={300}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                  priority
                />
              </div>
              <div className="h-36 rounded-2xl overflow-hidden shadow-lg animated-card">
                <Image
                  src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=200&fit=crop"
                  alt="Beauty Makeup"
                  width={400}
                  height={200}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                  priority
                />
              </div>
            </div>
            <div className="space-y-3 pt-6 animate-float-delayed">
              <div className="h-36 rounded-2xl overflow-hidden shadow-lg animated-card">
                <Image
                  src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=200&fit=crop"
                  alt="Bangles"
                  width={400}
                  height={200}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                  priority
                />
              </div>
              <div className="h-52 rounded-2xl overflow-hidden shadow-lg animated-card">
                <Image
                  src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=300&fit=crop"
                  alt="Skincare Serum"
                  width={400}
                  height={300}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURES STRIP ===== */}
      <section className="bg-primary-700 text-white py-8 px-4 shadow-inner">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: <Truck className="w-6 h-6" />, title: 'Fast Delivery', desc: 'Pakistan-wide shipping' },
            { icon: <Shield className="w-6 h-6" />, title: '100% Authentic', desc: 'Quality guaranteed' },
            { icon: <RotateCcw className="w-6 h-6" />, title: '7-Day Returns', desc: 'Easy exchange policy' },
            { icon: <Headphones className="w-6 h-6" />, title: '24/7 Support', desc: 'WhatsApp support' },
          ].map(feature => (
            <div key={feature.title} className="flex items-center gap-3 group hover:translate-x-1 transition-transform">
              <div className="text-gold-300 shrink-0 group-hover:scale-110 transition-transform">{feature.icon}</div>
              <div>
                <div className="font-semibold text-sm">{feature.title}</div>
                <div className="text-primary-200 text-xs">{feature.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== CATEGORIES ===== */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="section-title">Shop by Category</h2>
            <p className="section-subtitle">Explore our curated collections of jewellery and beauty essentials</p>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {CATEGORIES.filter(c => c.id !== 'all').map(cat => (
              <Link
                key={cat.id}
                href={`/products?category=${cat.id}`}
                className="flex flex-col items-center gap-2 p-4 bg-white rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300 group border border-transparent hover:border-primary-200"
              >
                <span className="text-3xl group-hover:scale-125 transition-transform duration-300">
                  {cat.icon}
                </span>
                <span className="text-xs font-semibold text-gray-700 text-center leading-tight group-hover:text-primary-600 transition-colors">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURED PRODUCTS WITH 1, 2, 3, 4, 5 WORKING PAGINATION ===== */}
      <section id="products-section" className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="section-title mb-1">Featured Products</h2>
              <p className="text-gray-500">Showing page {currentPage} of {totalPages}</p>
            </div>
            <Link
              href="/products"
              className="flex items-center gap-1.5 text-primary-600 hover:text-primary-700 font-bold transition-all hover:translate-x-1"
            >
              All Products <ChevronRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
            {paginatedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* 1, 2, 3, 4, 5 Pages Working Pagination */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4 border-t border-gray-100">
            <span className="text-sm text-gray-500 mr-2">Pages:</span>
            <div className="flex items-center gap-2">
              {/* Previous Button */}
              <button
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                aria-label="Previous Page"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* Working Page Numbers: 1, 2, 3, 4, 5 */}
              {[1, 2, 3, 4, 5].map(pageNum => (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`w-10 h-10 rounded-full font-bold text-sm transition-all duration-200 ${
                    currentPage === pageNum
                      ? 'bg-primary-600 text-white shadow-md scale-110'
                      : 'bg-white border border-gray-200 text-gray-700 hover:bg-primary-50 hover:border-primary-300 hover:text-primary-600'
                  }`}
                >
                  {pageNum}
                </button>
              ))}

              {/* Next Button */}
              <button
                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                aria-label="Next Page"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ===== NEW ARRIVALS ===== */}
      {newProducts.length > 0 && (
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="section-title mb-1">New Arrivals 🆕</h2>
                <p className="text-gray-500">Fresh jewellery and beauty arrivals</p>
              </div>
              <Link
                href="/products?filter=new"
                className="flex items-center gap-1.5 text-primary-600 font-bold hover:text-primary-700 hover:translate-x-1 transition-all"
              >
                All Products <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {newProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-title">What Our Customers Say</h2>
            <p className="section-subtitle">Real feedback from satisfied customers across Pakistan</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Fatima Zahra",
                city: "Lahore",
                review: "Absolutely amazing quality! I ordered the bridal jewellery set for my wedding and everyone praised it. The packaging was beautiful and secure. Will definitely shop again! ❤️",
                rating: 5,
                avatar: "FZ",
              },
              {
                name: "Ayesha Siddiqui",
                city: "Karachi",
                review: "The glow skin serum has transformed my daily skincare routine. Visible glow within just two weeks. 100% genuine products at very reasonable prices.",
                rating: 5,
                avatar: "AS",
              },
              {
                name: "Sana Malik",
                city: "Bahawalpur",
                review: "Super fast delivery right here in Bahawalpur! The jewellery set looks even more stunning in person than the pictures. Cash on Delivery gives complete peace of mind. Highly recommended!",
                rating: 5,
                avatar: "SM",
              },
            ].map(review => (
              <div key={review.name} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 animated-card">
                <div className="flex mb-3">
                  {[1, 2, 3, 4, 5].map(s => (
                    <Star key={s} className={`w-4 h-4 ${s <= review.rating ? 'fill-gold-400 text-gold-400' : 'text-gray-200'}`} />
                  ))}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-4">"{review.review}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-700 font-bold flex items-center justify-center text-sm">
                    {review.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-gray-900">{review.name}</div>
                    <div className="text-xs text-gray-500">{review.city}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ANY QUERY CONTACT SECTION (ENGLISH + 3 SOCIAL CONTACTS) ===== */}
      <section className="py-14 px-4 bg-gradient-to-b from-primary-50 to-white border-t border-primary-100">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
            Any Query?
          </h2>
          <p className="text-gray-600 text-base md:text-lg mb-8 max-w-xl mx-auto">
            Please contact WhatsApp or Instagram and Facebook
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            {/* WhatsApp Contact Button */}
            <a
              href={`https://wa.me/${STORE_CONFIG.whatsappNumber}?text=Assalam%20o%20Alaikum!%20I%20have%20a%20query%20about%20your%20products.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-green-500 hover:bg-green-600 text-white font-bold py-3.5 px-6 rounded-full text-base transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105 active:scale-95"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp Contact
            </a>

            {/* Instagram Contact Button */}
            <a
              href={STORE_CONFIG.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:opacity-95 text-white font-bold py-3.5 px-6 rounded-full text-base transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105 active:scale-95"
            >
              <Instagram className="w-5 h-5" />
              Instagram Contact
            </a>

            {/* Facebook Contact Button */}
            <a
              href={STORE_CONFIG.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-6 rounded-full text-base transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105 active:scale-95"
            >
              <Facebook className="w-5 h-5" />
              Facebook Contact
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
