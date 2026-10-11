// ============================================================
// PRODUCTS DATA - Markaz se copy karke yahan products add karein
// ============================================================
// Har product mein ye fields hain:
// id: unique number
// name: product ka naam
// category: category id (config.ts mein defined)
// price: selling price (Rs. mein)
// originalPrice: original price (optional, sale dikhane ke liye)
// images: product ki images (array - pehli image main card pe dikhegi)
// description: product ki description
// rating: 1-5 (stars)
// reviews: kitne reviews hain
// inStock: true/false
// isNew: true/false (NEW badge)
// isFeatured: true/false
// markazProductUrl: Markaz pe product ka link (optional)
// sku: Stock Keeping Unit / Markaz product ID
// ============================================================

export interface Product {
  id: number
  name: string
  category: string
  price: number
  originalPrice?: number
  images: string[]
  description: string
  rating: number
  reviews: number
  inStock: boolean
  isNew?: boolean
  isFeatured?: boolean
  markazProductUrl?: string
  sku?: string
  tags?: string[]
}

export const PRODUCTS: Product[] = [
  // ==================== JEWELLERY ====================
  {
    id: 1,
    name: "Kundan Bridal Necklace Set",
    category: "necklace",
    price: 2500,
    originalPrice: 3500,
    images: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=500&h=500&fit=crop",
    ],
    description: "Khoobsurat Kundan design bridal necklace set. Isme necklace, earrings aur maang tikka shaamil hain. Shadi ya mehndi ke liye perfect choice. Gold plated with premium quality stones.",
    rating: 4.8,
    reviews: 124,
    inStock: true,
    isNew: false,
    isFeatured: true,
    sku: "MKZ-001",
    tags: ["bridal", "kundan", "necklace", "gold"],
  },
  {
    id: 2,
    name: "Pearl Drop Earrings",
    category: "earrings",
    price: 650,
    originalPrice: 900,
    images: [
      "https://images.unsplash.com/photo-1535556116002-6281ff3e9f36?w=500&h=500&fit=crop",
    ],
    description: "Elegant pearl drop earrings jo har outfit ke sath match karte hain. Office se party tak, ye earrings har jagah suit karti hain. Lightweight design.",
    rating: 4.5,
    reviews: 89,
    inStock: true,
    isNew: true,
    isFeatured: false,
    sku: "MKZ-002",
    tags: ["pearl", "earrings", "elegant"],
  },
  {
    id: 3,
    name: "Gold Plated Choker Set",
    category: "necklace",
    price: 1200,
    images: [
      "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=500&h=500&fit=crop",
    ],
    description: "Trendy gold plated choker necklace set. Pakistani traditional events ke sath sath modern looks ke liye bhi perfect. Includes matching earrings.",
    rating: 4.6,
    reviews: 67,
    inStock: true,
    isNew: true,
    isFeatured: true,
    sku: "MKZ-003",
    tags: ["choker", "gold", "trendy"],
  },
  {
    id: 4,
    name: "Antique Bangles Set (6 Pieces)",
    category: "bangles",
    price: 850,
    originalPrice: 1100,
    images: [
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500&h=500&fit=crop",
    ],
    description: "Khoobsurat antique design bangles ka set. 6 pieces ka complete set. Eid, shadi aur har special occasion ke liye perfect. Available in multiple sizes.",
    rating: 4.7,
    reviews: 203,
    inStock: true,
    isNew: false,
    isFeatured: true,
    sku: "MKZ-004",
    tags: ["bangles", "antique", "set"],
  },
  {
    id: 5,
    name: "Crystal Stone Finger Ring",
    category: "rings",
    price: 350,
    images: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500&h=500&fit=crop",
    ],
    description: "Beautiful crystal stone adjustable ring. One size fits all. Perfect gift for loved ones. Available in multiple colors - pink, blue, green, clear.",
    rating: 4.3,
    reviews: 45,
    inStock: true,
    isNew: true,
    isFeatured: false,
    sku: "MKZ-005",
    tags: ["ring", "crystal", "adjustable"],
  },
  {
    id: 6,
    name: "Floral Hair Pins Set",
    category: "hairpin",
    price: 450,
    originalPrice: 600,
    images: [
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&h=500&fit=crop",
    ],
    description: "Cute floral design hair pins. Set of 8 pieces in different colors. Perfect for casual as well as formal hairstyles. Lightweight and comfortable.",
    rating: 4.4,
    reviews: 78,
    inStock: true,
    isNew: false,
    isFeatured: false,
    sku: "MKZ-006",
    tags: ["hair", "pins", "floral"],
  },

  // ==================== BEAUTY PRODUCTS ====================
  {
    id: 7,
    name: "Rose Gold Lipstick Collection",
    category: "makeup",
    price: 750,
    originalPrice: 1000,
    images: [
      "https://images.unsplash.com/photo-1586495777744-4e6232bf2453?w=500&h=500&fit=crop",
    ],
    description: "Premium quality long-lasting lipstick in beautiful rose gold shades. Moisturizing formula jo lips ko soft rakhti hai. 12-hour wear guarantee. Set of 3 shades.",
    rating: 4.6,
    reviews: 156,
    inStock: true,
    isNew: false,
    isFeatured: true,
    sku: "MKZ-007",
    tags: ["lipstick", "makeup", "rose gold"],
  },
  {
    id: 8,
    name: "Glow Skin Serum",
    category: "skincare",
    price: 1500,
    originalPrice: 2000,
    images: [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&h=500&fit=crop",
    ],
    description: "Vitamin C enriched face serum for glowing skin. Dermatologically tested. Dark spots, dullness aur uneven skin tone ke liye best solution. 30ml bottle.",
    rating: 4.8,
    reviews: 234,
    inStock: true,
    isNew: true,
    isFeatured: true,
    sku: "MKZ-008",
    tags: ["serum", "skincare", "glow", "vitamin c"],
  },
  {
    id: 9,
    name: "Eye Shadow Palette (16 Colors)",
    category: "makeup",
    price: 1200,
    images: [
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=500&h=500&fit=crop",
    ],
    description: "Professional eye shadow palette with 16 gorgeous colors. Shimmer aur matte shades dono included. Long-lasting formula. Perfect for bridal and everyday makeup.",
    rating: 4.5,
    reviews: 167,
    inStock: true,
    isNew: false,
    isFeatured: true,
    sku: "MKZ-009",
    tags: ["eyeshadow", "palette", "makeup", "professional"],
  },
  {
    id: 10,
    name: "Whitening Face Wash",
    category: "skincare",
    price: 550,
    originalPrice: 700,
    images: [
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500&h=500&fit=crop",
    ],
    description: "Gentle whitening face wash with natural extracts. Oily, dry aur combination skin ke liye suitable. Parabens free formula. 150ml. Roz subha sham use karein.",
    rating: 4.3,
    reviews: 289,
    inStock: true,
    isNew: false,
    isFeatured: false,
    sku: "MKZ-010",
    tags: ["facewash", "skincare", "whitening"],
  },
  {
    id: 11,
    name: "Complete Bridal Jewellery Set",
    category: "necklace",
    price: 4500,
    originalPrice: 6000,
    images: [
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&h=500&fit=crop",
    ],
    description: "Complete bridal jewellery set. Necklace, earrings, maang tikka, nath, haath phool aur payal sab included. Shadi ki raat ko princess jesi feel dilaye. Gold & maroon color.",
    rating: 4.9,
    reviews: 98,
    inStock: true,
    isNew: false,
    isFeatured: true,
    sku: "MKZ-011",
    tags: ["bridal", "complete set", "shadi", "necklace"],
  },
  {
    id: 12,
    name: "Moisturizing Body Lotion",
    category: "beauty",
    price: 680,
    images: [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&h=500&fit=crop",
    ],
    description: "Deep moisturizing body lotion with shea butter aur vitamin E. Dry skin ke liye perfect. Light fragrance jo din bhar fresh rakhti hai. 400ml pump bottle.",
    rating: 4.4,
    reviews: 112,
    inStock: true,
    isNew: true,
    isFeatured: false,
    sku: "MKZ-012",
    tags: ["lotion", "moisturizer", "body care"],
  },
  {
    id: 13,
    name: "Zircon Crystal Pendant with Chain",
    category: "necklace",
    price: 950,
    originalPrice: 1400,
    images: [
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&h=500&fit=crop",
    ],
    description: "Dainty zircon crystal pendant with a sleek gold-tone chain. Everyday wear aur party dono ke liye best choice.",
    rating: 4.7,
    reviews: 84,
    inStock: true,
    isNew: true,
    isFeatured: true,
    sku: "MKZ-013",
    tags: ["pendant", "crystal", "zircon", "necklace"],
  },
  {
    id: 14,
    name: "Traditional Jhumka Earrings (Golden)",
    category: "earrings",
    price: 750,
    originalPrice: 1100,
    images: [
      "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=500&h=500&fit=crop",
    ],
    description: "Classic Desi jhumkay with intricate detailing and pearl hangings. Perfect for Mehndi, Mayun, and weddings.",
    rating: 4.9,
    reviews: 142,
    inStock: true,
    isNew: false,
    isFeatured: true,
    sku: "MKZ-014",
    tags: ["jhumka", "earrings", "traditional", "desi"],
  },
  {
    id: 15,
    name: "Matte Velvet Liquid Lipstick Set",
    category: "makeup",
    price: 1150,
    originalPrice: 1600,
    images: [
      "https://images.unsplash.com/photo-1586495777744-4e6232bf2453?w=500&h=500&fit=crop",
    ],
    description: "Pack of 4 smudge-proof matte liquid lipsticks in trending nude and red shades. Lightweight and non-drying formula.",
    rating: 4.6,
    reviews: 93,
    inStock: true,
    isNew: true,
    isFeatured: true,
    sku: "MKZ-015",
    tags: ["lipstick", "liquid matte", "makeup", "velvet"],
  },
  {
    id: 16,
    name: "Gold-Plated Adjustable Kada Bracelet",
    category: "bangles",
    price: 890,
    originalPrice: 1250,
    images: [
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500&h=500&fit=crop",
    ],
    description: "High quality polished gold kada bracelet. Adjustable size jo har wrist pe comfortable fit hota hai.",
    rating: 4.5,
    reviews: 67,
    inStock: true,
    isNew: false,
    isFeatured: true,
    sku: "MKZ-016",
    tags: ["kada", "bracelet", "bangles", "gold"],
  },
  {
    id: 17,
    name: "Hyaluronic Acid Face Hydration Serum",
    category: "skincare",
    price: 1350,
    originalPrice: 1800,
    images: [
      "https://images.unsplash.com/photo-1608248597359-009d1e39eb1b?w=500&h=500&fit=crop",
    ],
    description: "Deep hydration formula with pure hyaluronic acid. Skin ko plump, fresh aur youthful glow deti hai.",
    rating: 4.8,
    reviews: 178,
    inStock: true,
    isNew: true,
    isFeatured: true,
    sku: "MKZ-017",
    tags: ["serum", "skincare", "hydration", "hyaluronic"],
  },
  {
    id: 18,
    name: "Royal Solitaire Diamond-Look Ring",
    category: "rings",
    price: 490,
    originalPrice: 750,
    images: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500&h=500&fit=crop",
    ],
    description: "Sparkling American diamond solitaire ring with silver rhodium plating. Adjustable size band.",
    rating: 4.4,
    reviews: 58,
    inStock: true,
    isNew: true,
    isFeatured: true,
    sku: "MKZ-018",
    tags: ["ring", "solitaire", "diamond", "silver"],
  },
  {
    id: 19,
    name: "Korean BB Cream with SPF 30",
    category: "makeup",
    price: 850,
    originalPrice: 1100,
    images: [
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&h=500&fit=crop",
    ],
    description: "All-in-one daily coverage BB cream with sun protection. Natural look without heavy foundation feel.",
    rating: 4.7,
    reviews: 115,
    inStock: true,
    isNew: false,
    isFeatured: true,
    sku: "MKZ-019",
    tags: ["bb cream", "makeup", "spf", "foundation"],
  },
  {
    id: 20,
    name: "Luxury Velvet Hair Band with Pearls",
    category: "hairpin",
    price: 390,
    originalPrice: 550,
    images: [
      "https://images.unsplash.com/photo-1535556116002-6281ff3e9f36?w=500&h=500&fit=crop",
    ],
    description: "Trendy padded velvet headband with hand-embellished faux pearls. Chic accessory for hair styling.",
    rating: 4.5,
    reviews: 41,
    inStock: true,
    isNew: true,
    isFeatured: true,
    sku: "MKZ-020",
    tags: ["headband", "velvet", "pearl", "hair"],
  },
]
