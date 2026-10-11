# Glam & Grace — Jewellery & Beauty Store

Pakistan ki professional artificial jewellery aur beauty products ki website.

## 🚀 Live Chalane Ka Tareeqa

### Step 1: Node.js Install Karein
Agar Node.js install nahi hai:
- **https://nodejs.org** se LTS version download karein
- Install karein aur computer restart karein

### Step 2: Project Setup
```bash
cd C:\Users\Administrator\.gemini\antigravity\scratch\markaz-jewellery-store
npm install
```

### Step 3: Dev Server Chalayein
```bash
npm run dev
```
Browser mein **http://localhost:3000** open karein ✅

---

## 📝 Apni Details Kaise Update Karein

### 1. Store Name & WhatsApp Number
📄 `src/data/config.ts` file khol kar:
- `storeName` — Apna store ka naam
- `whatsappNumber` — Apna WhatsApp: `92XXXXXXXXXX`
- `phone` — Display phone number
- `email` — Email address
- `freeDeliveryAbove` — Kitne rupay pe free delivery

### 2. Products Add/Edit Karein (Markaz se)
📄 `src/data/products.ts` file mein:

Markaz se product detail copy karein aur is format mein add karein:
```typescript
{
  id: 13,                          // Unique number
  name: "Product Ka Naam",
  category: "necklace",            // See categories below
  price: 1500,                     // Price Rs. mein
  originalPrice: 2000,             // Optional: pehle wali price (for discount badge)
  images: ["https://..."],         // Product image URL
  description: "Product detail...",
  rating: 4.5,
  reviews: 50,
  inStock: true,
  isNew: true,                     // NEW badge
  isFeatured: true,                // Homepage pe dikhega
  sku: "MKZ-013",                  // Markaz product ID
}
```

**Categories:**
- `necklace` — Necklace Sets
- `earrings` — Earrings
- `bangles` — Bangles & Bracelets
- `rings` — Rings
- `hairpin` — Hair Accessories
- `beauty` — Beauty Products
- `makeup` — Makeup
- `skincare` — Skincare

---

## 🌐 Vercel Pe Free Deploy Karein

1. **GitHub account** banayein aur project upload karein
2. **https://vercel.com** pe account banayein
3. "Import Project" karein GitHub se
4. Deploy click karein — website live! 🎉

---

## 📱 WhatsApp Order Flow

1. Customer products select karta hai → cart mein dalta hai
2. Checkout pe name, phone, address bharta hai
3. "Order Place Karein" click karta hai
4. **WhatsApp automatically khulta hai** complete order details ke sath
5. Aap Markaz app pe foran order place kar sakte hain

---

## 📂 Project Structure

```
src/
├── app/
│   ├── page.tsx          ← Homepage
│   ├── layout.tsx        ← Main layout (Navbar + Footer)
│   ├── globals.css       ← Styles
│   ├── products/
│   │   ├── page.tsx      ← Products listing + filter
│   │   └── [id]/page.tsx ← Product detail
│   ├── cart/page.tsx     ← Cart page
│   └── checkout/page.tsx ← Checkout + WhatsApp order
├── components/
│   ├── Navbar.tsx        ← Navigation bar
│   ├── Footer.tsx        ← Footer
│   └── ProductCard.tsx   ← Product card
├── data/
│   ├── config.ts         ← ⭐ YAHAN SE SETTINGS CHANGE KAREIN
│   └── products.ts       ← ⭐ YAHAN PRODUCTS ADD KAREIN
└── store/
    └── cartStore.ts      ← Cart state management
```
