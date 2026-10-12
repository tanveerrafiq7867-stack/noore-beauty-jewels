import React from 'react'

interface LuxuryCategoryIconProps {
  categoryId: string
  className?: string
}

export function LuxuryCategoryIcon({ categoryId, className = "w-7 h-7" }: LuxuryCategoryIconProps) {
  switch (categoryId) {
    case 'necklace':
      // Haute Joaillerie Collier / Necklace with pendant
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 6c1.5 5.5 5 11 8 11s6.5-5.5 8-11" />
          <path d="M7 5.5c1 3.5 3 6.5 5 6.5s4-3 5-6.5" strokeDasharray="1.5 1.5" strokeWidth="1.2" />
          <polygon points="12,17 10,20.5 12,23 14,20.5" fill="currentColor" stroke="none" />
          <circle cx="12" cy="17" r="1" fill="currentColor" />
        </svg>
      )

    case 'earrings':
      // Chandelier / Luxury Drop Earrings
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="7.5" cy="4.5" r="1.5" />
          <circle cx="16.5" cy="4.5" r="1.5" />
          <path d="M7.5 6v3l-2.5 5 2.5 4 2.5-4-2.5-5" />
          <path d="M16.5 6v3l-2.5 5 2.5 4 2.5-4-2.5-5" />
          <circle cx="7.5" cy="12" r="0.8" fill="currentColor" />
          <circle cx="16.5" cy="12" r="0.8" fill="currentColor" />
        </svg>
      )

    case 'bangles':
      // Royal Bangles & Bracelet with studded gems
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="12" cy="12" rx="9" ry="7.5" />
          <ellipse cx="12" cy="12" rx="6.5" ry="5.5" strokeDasharray="2 2" strokeWidth="1.2" />
          <circle cx="12" cy="4.5" r="1.3" fill="currentColor" />
          <circle cx="12" cy="19.5" r="1.3" fill="currentColor" />
          <circle cx="3" cy="12" r="1.3" fill="currentColor" />
          <circle cx="21" cy="12" r="1.3" fill="currentColor" />
        </svg>
      )

    case 'rings':
      // Solitaire Diamond Ring
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="14" rx="7" ry="7" />
          {/* Diamond gem on crown */}
          <polygon points="12,2 16,5 14,8 10,8 8,5" fill="none" strokeWidth="1.4" />
          <line x1="10" y1="5" x2="14" y2="5" strokeWidth="1.2" />
          <line x1="12" y1="2" x2="12" y2="8" strokeWidth="1.2" />
        </svg>
      )

    case 'hairpin':
      // Bridal Maatha Patti / Hair Ornament
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 4c3 3 5 8 6 16" />
          <path d="M8 3c3 3 5 8 6 16" />
          <circle cx="6" cy="4" r="2.5" />
          <polygon points="6,2.5 7,4 6,5.5 5,4" fill="currentColor" />
          <circle cx="14" cy="9" r="1" fill="currentColor" />
          <circle cx="17" cy="13" r="1" fill="currentColor" />
        </svg>
      )

    case 'beauty':
      // Luxury Perfume / Elixir Bottle
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <rect x="6.5" y="9.5" width="11" height="11.5" rx="3" />
          <path d="M10 9.5V5.5h4v4" />
          <circle cx="12" cy="3.5" r="1.5" fill="currentColor" stroke="none" />
          <line x1="10" y1="15" x2="14" y2="15" strokeWidth="1.3" />
        </svg>
      )

    case 'makeup':
      // Satin Lipstick / Luxury Cosmetic
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <rect x="8" y="11" width="8" height="10" rx="1.5" />
          <path d="M9.5 11V6.5l5-3v7.5" strokeWidth="1.5" />
          <line x1="8" y1="14" x2="16" y2="14" strokeWidth="1.2" />
        </svg>
      )

    case 'skincare':
      // Botanical Dropper / Elixir Serum
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2.5a6 6 0 0 0-6 6.5c0 4.5 6 12 6 12s6-7.5 6-12a6 6 0 0 0-6-6.5z" />
          <circle cx="12" cy="9" r="2.5" strokeDasharray="1.5 1.5" />
          <circle cx="12" cy="9" r="1" fill="currentColor" />
        </svg>
      )

    default:
      // Brilliant Star / Diamond Crown
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.2 8.3 22 9.3 17 14.1 18.2 21 12 17.7 5.8 21 7 14.1 2 9.3 8.8 8.3 12 2" />
        </svg>
      )
  }
}
