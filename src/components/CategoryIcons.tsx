import React from 'react'

export interface CategoryTheme {
  gradient: string
  shadow: string
  border: string
  hoverBorder: string
  cardBg: string
  textColor: string
  tagColor: string
  accentGold: string
}

export const CATEGORY_THEMES: Record<string, CategoryTheme> = {
  necklace: {
    // Royal Ruby & Gold
    gradient: 'from-amber-500 via-rose-500 to-red-600',
    shadow: 'shadow-rose-500/25',
    border: 'border-amber-200',
    hoverBorder: 'hover:border-rose-400',
    cardBg: 'from-amber-50/60 via-white to-rose-50/40',
    textColor: 'group-hover:text-rose-700',
    tagColor: 'bg-rose-100 text-rose-800',
    accentGold: '#fef08a',
  },
  earrings: {
    // Royal Sapphire & Diamond Blue
    gradient: 'from-blue-600 via-indigo-600 to-sky-400',
    shadow: 'shadow-blue-500/25',
    border: 'border-blue-200',
    hoverBorder: 'hover:border-blue-400',
    cardBg: 'from-blue-50/60 via-white to-sky-50/40',
    textColor: 'group-hover:text-blue-700',
    tagColor: 'bg-blue-100 text-blue-800',
    accentGold: '#93c5fd',
  },
  bangles: {
    // Royal Emerald & 24K Gold
    gradient: 'from-emerald-500 via-teal-600 to-amber-500',
    shadow: 'shadow-emerald-500/25',
    border: 'border-emerald-200',
    hoverBorder: 'hover:border-emerald-400',
    cardBg: 'from-emerald-50/60 via-white to-amber-50/40',
    textColor: 'group-hover:text-emerald-700',
    tagColor: 'bg-emerald-100 text-emerald-800',
    accentGold: '#fef08a',
  },
  rings: {
    // Imperial Amethyst & Violet Sparkle
    gradient: 'from-purple-600 via-fuchsia-600 to-pink-500',
    shadow: 'shadow-purple-500/25',
    border: 'border-purple-200',
    hoverBorder: 'hover:border-purple-400',
    cardBg: 'from-purple-50/60 via-white to-fuchsia-50/40',
    textColor: 'group-hover:text-purple-700',
    tagColor: 'bg-purple-100 text-purple-800',
    accentGold: '#fbcfe8',
  },
  hairpin: {
    // Blossom Rose Floral & Pearl
    gradient: 'from-pink-500 via-rose-500 to-orange-400',
    shadow: 'shadow-pink-500/25',
    border: 'border-pink-200',
    hoverBorder: 'hover:border-pink-400',
    cardBg: 'from-pink-50/60 via-white to-orange-50/40',
    textColor: 'group-hover:text-pink-700',
    tagColor: 'bg-pink-100 text-pink-800',
    accentGold: '#fed7aa',
  },
  beauty: {
    // Sunset Coral & Luxury Crimson
    gradient: 'from-red-500 via-rose-600 to-orange-500',
    shadow: 'shadow-red-500/25',
    border: 'border-rose-200',
    hoverBorder: 'hover:border-rose-400',
    cardBg: 'from-rose-50/60 via-white to-orange-50/40',
    textColor: 'group-hover:text-rose-700',
    tagColor: 'bg-red-100 text-red-800',
    accentGold: '#fed7aa',
  },
  makeup: {
    // Velvet Magenta & Passion Pink
    gradient: 'from-fuchsia-600 via-pink-600 to-rose-600',
    shadow: 'shadow-fuchsia-500/25',
    border: 'border-fuchsia-200',
    hoverBorder: 'hover:border-fuchsia-400',
    cardBg: 'from-fuchsia-50/60 via-white to-pink-50/40',
    textColor: 'group-hover:text-fuchsia-700',
    tagColor: 'bg-fuchsia-100 text-fuchsia-800',
    accentGold: '#fbcfe8',
  },
  skincare: {
    // Lush Botanical Jade & Mint Dew
    gradient: 'from-teal-500 via-emerald-500 to-cyan-500',
    shadow: 'shadow-teal-500/25',
    border: 'border-teal-200',
    hoverBorder: 'hover:border-teal-400',
    cardBg: 'from-teal-50/60 via-white to-emerald-50/40',
    textColor: 'group-hover:text-teal-700',
    tagColor: 'bg-teal-100 text-teal-800',
    accentGold: '#a7f3d0',
  },
  all: {
    // Radiant Royal Rainbow Crown
    gradient: 'from-amber-500 via-purple-600 to-rose-500',
    shadow: 'shadow-purple-500/25',
    border: 'border-purple-200',
    hoverBorder: 'hover:border-purple-400',
    cardBg: 'from-purple-50/60 via-white to-amber-50/40',
    textColor: 'group-hover:text-purple-700',
    tagColor: 'bg-purple-100 text-purple-800',
    accentGold: '#fef08a',
  },
}

export function LuxuryCategoryIcon({ categoryId, className = "w-7 h-7" }: { categoryId: string; className?: string }) {
  switch (categoryId) {
    case 'necklace':
      // Haute Joaillerie Collier / Necklace with sparkling pendant
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 6c1.5 5.5 5 11 8 11s6.5-5.5 8-11" />
          <path d="M7 5.5c1 3.5 3 6.5 5 6.5s4-3 5-6.5" strokeDasharray="1.5 1.5" strokeWidth="1.4" opacity="0.8" />
          <polygon points="12,17 9.5,21 12,23.5 14.5,21" fill="currentColor" stroke="none" />
          <circle cx="12" cy="17" r="1.3" fill="currentColor" />
          <circle cx="7" cy="5.5" r="1" fill="currentColor" />
          <circle cx="17" cy="5.5" r="1" fill="currentColor" />
        </svg>
      )

    case 'earrings':
      // Chandelier / Luxury Drop Jhumkas
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="7" cy="4" r="1.8" fill="currentColor" />
          <circle cx="17" cy="4" r="1.8" fill="currentColor" />
          <path d="M7 6v3l-3 5 3 4 3-4-3-5" fill="currentColor" fillOpacity="0.2" />
          <path d="M17 6v3l-3 5 3 4 3-4-3-5" fill="currentColor" fillOpacity="0.2" />
          <circle cx="7" cy="12" r="1" fill="currentColor" />
          <circle cx="17" cy="12" r="1" fill="currentColor" />
        </svg>
      )

    case 'bangles':
      // Royal Bangles & Bracelet with studded gems
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="12" cy="12" rx="9" ry="7.5" fill="currentColor" fillOpacity="0.15" />
          <ellipse cx="12" cy="12" rx="6.5" ry="5.5" strokeDasharray="2 2" strokeWidth="1.4" opacity="0.85" />
          <circle cx="12" cy="4.5" r="1.6" fill="currentColor" />
          <circle cx="12" cy="19.5" r="1.6" fill="currentColor" />
          <circle cx="3" cy="12" r="1.6" fill="currentColor" />
          <circle cx="21" cy="12" r="1.6" fill="currentColor" />
        </svg>
      )

    case 'rings':
      // Solitaire Diamond Ring
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="14" r="7" fill="currentColor" fillOpacity="0.15" />
          {/* Diamond gem on crown */}
          <polygon points="12,2 16.5,5.5 14,8.5 10,8.5 7.5,5.5" fill="currentColor" strokeWidth="1.5" />
          <line x1="9.5" y1="5.5" x2="14.5" y2="5.5" stroke="white" strokeWidth="1.2" />
          <line x1="12" y1="2" x2="12" y2="8.5" stroke="white" strokeWidth="1.2" />
        </svg>
      )

    case 'hairpin':
      // Bridal Maatha Patti / Floral Hair Ornament
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 4c3 3 5 8 6 16" />
          <path d="M8 3c3 3 5 8 6 16" />
          <circle cx="6" cy="4" r="3" fill="currentColor" />
          <circle cx="6" cy="4" r="1" fill="white" />
          <circle cx="13" cy="8" r="1.3" fill="currentColor" />
          <circle cx="16" cy="12" r="1.3" fill="currentColor" />
          <circle cx="18" cy="17" r="1.3" fill="currentColor" />
        </svg>
      )

    case 'beauty':
      // Luxury Perfume / Elixir Bottle
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="6.5" y="9.5" width="11" height="11.5" rx="3" fill="currentColor" fillOpacity="0.2" />
          <path d="M10 9.5V5.5h4v4" />
          <circle cx="12" cy="3.5" r="1.8" fill="currentColor" />
          <line x1="9" y1="15" x2="15" y2="15" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )

    case 'makeup':
      // Satin Lipstick / Luxury Cosmetic
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="8" y="11" width="8" height="10" rx="2" fill="currentColor" fillOpacity="0.2" />
          <path d="M9.5 11V6.5l5-3v7.5" fill="currentColor" strokeWidth="1.6" />
          <line x1="8" y1="14" x2="16" y2="14" strokeWidth="1.5" />
        </svg>
      )

    case 'skincare':
      // Botanical Dropper / Elixir Serum
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2.5a6 6 0 0 0-6 6.5c0 4.5 6 12 6 12s6-7.5 6-12a6 6 0 0 0-6-6.5z" fill="currentColor" fillOpacity="0.2" />
          <circle cx="12" cy="9" r="2.8" strokeDasharray="1.5 1.5" strokeWidth="1.5" />
          <circle cx="12" cy="9" r="1.3" fill="currentColor" />
        </svg>
      )

    default:
      // Brilliant Star / Crown
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.2 8.3 22 9.3 17 14.1 18.2 21 12 17.7 5.8 21 7 14.1 2 9.3 8.8 8.3 12 2" fill="currentColor" fillOpacity="0.25" />
        </svg>
      )
  }
}
