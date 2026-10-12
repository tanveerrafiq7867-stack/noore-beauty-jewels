
-- 1. Create Products Table
CREATE TABLE IF NOT EXISTS public.products (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  price NUMERIC NOT NULL,
  original_price NUMERIC,
  images TEXT[] NOT NULL DEFAULT '{}',
  description TEXT NOT NULL,
  rating NUMERIC DEFAULT 4.8,
  reviews INTEGER DEFAULT 50,
  in_stock BOOLEAN DEFAULT true,
  is_new BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  sku TEXT,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- 3. Policy: Public can view all products
DROP POLICY IF EXISTS "Public can view products" ON public.products;
CREATE POLICY "Public can view products" ON public.products
  FOR SELECT USING (true);

-- 4. Policy: Allow insert/update/delete for authenticated or anon with key
DROP POLICY IF EXISTS "Allow anon modify products" ON public.products;
CREATE POLICY "Allow anon modify products" ON public.products
  FOR ALL USING (true) WITH CHECK (true);

-- 5. Storage Bucket for product images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Public Access Product Images" ON storage.objects;
CREATE POLICY "Public Access Product Images" ON storage.objects
  FOR SELECT USING (bucket_id = 'product-images');

DROP POLICY IF EXISTS "Allow Upload Product Images" ON storage.objects;
CREATE POLICY "Allow Upload Product Images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'product-images');

DROP POLICY IF EXISTS "Allow Delete Product Images" ON storage.objects;
CREATE POLICY "Allow Delete Product Images" ON storage.objects
  FOR DELETE USING (bucket_id = 'product-images');

-- 6. Insert initial 20 products
INSERT INTO public.products (id, name, category, price, original_price, images, description, rating, reviews, in_stock, is_new, is_featured, sku, tags)
VALUES
(1, 'Kundan Bridal Necklace Set', 'necklace', 2500, 3500, ARRAY['https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=500&fit=crop', 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=500&h=500&fit=crop'], 'Khoobsurat Kundan design bridal necklace set. Isme necklace, earrings aur maang tikka shaamil hain. Shadi ya mehndi ke liye perfect choice. Gold plated with premium quality stones.', 4.8, 124, true, false, true, 'MKZ-001', ARRAY['bridal', 'kundan', 'necklace', 'gold']),
(2, 'Pearl Drop Earrings', 'earrings', 650, 900, ARRAY['https://images.unsplash.com/photo-1535556116002-6281ff3e9f36?w=500&h=500&fit=crop'], 'Elegant pearl drop earrings jo har outfit ke sath match karte hain. Office se party tak, ye earrings har jagah suit karti hain. Lightweight design.', 4.5, 89, true, true, false, 'MKZ-002', ARRAY['pearl', 'earrings', 'elegant']),
(3, 'Gold Plated Choker Set', 'necklace', 1200, NULL, ARRAY['https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=500&h=500&fit=crop'], 'Trendy gold plated choker necklace set. Pakistani traditional events ke sath sath modern looks ke liye bhi perfect. Includes matching earrings.', 4.6, 67, true, true, true, 'MKZ-003', ARRAY['choker', 'gold', 'trendy']),
(4, 'Antique Bangles Set (6 Pieces)', 'bangles', 850, 1100, ARRAY['https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500&h=500&fit=crop'], 'Khoobsurat antique design bangles ka set. 6 pieces ka complete set. Eid, shadi aur har special occasion ke liye perfect. Available in multiple sizes.', 4.7, 203, true, false, true, 'MKZ-004', ARRAY['bangles', 'antique', 'set']),
(5, 'Crystal Stone Finger Ring', 'rings', 350, NULL, ARRAY['https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500&h=500&fit=crop'], 'Beautiful crystal stone adjustable ring. One size fits all. Perfect gift for loved ones. Available in multiple colors - pink, blue, green, clear.', 4.3, 45, true, true, false, 'MKZ-005', ARRAY['ring', 'crystal', 'adjustable']),
(6, 'Floral Hair Pins Set', 'hairpin', 450, 600, ARRAY['https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&h=500&fit=crop'], 'Cute floral design hair pins. Set of 8 pieces in different colors. Perfect for casual as well as formal hairstyles. Lightweight and comfortable.', 4.4, 78, true, false, false, 'MKZ-006', ARRAY['hair', 'pins', 'floral']),
(7, 'Rose Gold Lipstick Collection', 'makeup', 750, 1000, ARRAY['https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=500&h=500&fit=crop'], 'Premium quality long-lasting lipstick in beautiful rose gold shades. Moisturizing formula jo lips ko soft rakhti hai. 12-hour wear guarantee. Set of 3 shades.', 4.6, 156, true, false, true, 'MKZ-007', ARRAY['lipstick', 'makeup', 'rose gold']),
(8, 'Glow Skin Serum', 'skincare', 1500, 2000, ARRAY['https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&h=500&fit=crop'], 'Vitamin C enriched face serum for glowing skin. Dermatologically tested. Dark spots, dullness aur uneven skin tone ke liye best solution. 30ml bottle.', 4.8, 234, true, true, true, 'MKZ-008', ARRAY['serum', 'skincare', 'glow', 'vitamin c']),
(9, 'Eye Shadow Palette (16 Colors)', 'makeup', 1200, NULL, ARRAY['https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=500&h=500&fit=crop'], 'Professional eye shadow palette with 16 gorgeous colors. Shimmer aur matte shades dono included. Long-lasting formula. Perfect for bridal and everyday makeup.', 4.5, 167, true, false, true, 'MKZ-009', ARRAY['eyeshadow', 'palette', 'makeup', 'professional']),
(10, 'Whitening Face Wash', 'skincare', 550, 700, ARRAY['https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500&h=500&fit=crop'], 'Gentle whitening face wash with natural extracts. Oily, dry aur combination skin ke liye suitable. Parabens free formula. 150ml. Roz subha sham use karein.', 4.3, 289, true, false, false, 'MKZ-010', ARRAY['facewash', 'skincare', 'whitening']),
(11, 'Complete Bridal Jewellery Set', 'necklace', 4500, 6000, ARRAY['https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&h=500&fit=crop'], 'Complete bridal jewellery set. Necklace, earrings, maang tikka, nath, haath phool aur payal sab included. Shadi ki raat ko princess jesi feel dilaye. Gold & maroon color.', 4.9, 98, true, false, true, 'MKZ-011', ARRAY['bridal', 'complete set', 'shadi', 'necklace']),
(12, 'Moisturizing Body Lotion', 'beauty', 680, NULL, ARRAY['https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&h=500&fit=crop'], 'Deep moisturizing body lotion with shea butter aur vitamin E. Dry skin ke liye perfect. Light fragrance jo din bhar fresh rakhti hai. 400ml pump bottle.', 4.4, 112, true, true, false, 'MKZ-012', ARRAY['lotion', 'moisturizer', 'body care']),
(13, 'Zircon Crystal Pendant with Chain', 'necklace', 950, 1400, ARRAY['https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&h=500&fit=crop'], 'Dainty zircon crystal pendant with a sleek gold-tone chain. Everyday wear aur party dono ke liye best choice.', 4.7, 84, true, true, true, 'MKZ-013', ARRAY['pendant', 'crystal', 'zircon', 'necklace']),
(14, 'Traditional Jhumka Earrings (Golden)', 'earrings', 750, 1100, ARRAY['https://images.unsplash.com/photo-1630019852942-f89202989a59?w=500&h=500&fit=crop'], 'Classic Desi jhumkay with intricate detailing and pearl hangings. Perfect for Mehndi, Mayun, and weddings.', 4.9, 142, true, false, true, 'MKZ-014', ARRAY['jhumka', 'earrings', 'traditional', 'desi']),
(15, 'Matte Velvet Liquid Lipstick Set', 'makeup', 1150, 1600, ARRAY['https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=500&h=500&fit=crop'], 'Pack of 4 smudge-proof matte liquid lipsticks in trending nude and red shades. Lightweight and non-drying formula.', 4.6, 93, true, true, true, 'MKZ-015', ARRAY['lipstick', 'liquid matte', 'makeup', 'velvet']),
(16, 'Gold-Plated Adjustable Kada Bracelet', 'bangles', 890, 1250, ARRAY['https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500&h=500&fit=crop'], 'High quality polished gold kada bracelet. Adjustable size jo har wrist pe comfortable fit hota hai.', 4.5, 67, true, false, true, 'MKZ-016', ARRAY['kada', 'bracelet', 'bangles', 'gold']),
(17, 'Hyaluronic Acid Face Hydration Serum', 'skincare', 1350, 1800, ARRAY['https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=500&h=500&fit=crop'], 'Deep hydration formula with pure hyaluronic acid. Skin ko plump, fresh aur youthful glow deti hai.', 4.8, 178, true, true, true, 'MKZ-017', ARRAY['serum', 'skincare', 'hydration', 'hyaluronic']),
(18, 'Royal Solitaire Diamond-Look Ring', 'rings', 490, 750, ARRAY['https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500&h=500&fit=crop'], 'Sparkling American diamond solitaire ring with silver rhodium plating. Adjustable size band.', 4.4, 58, true, true, true, 'MKZ-018', ARRAY['ring', 'solitaire', 'diamond', 'silver']),
(19, 'Korean BB Cream with SPF 30', 'makeup', 850, 1100, ARRAY['https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&h=500&fit=crop'], 'All-in-one daily coverage BB cream with sun protection. Natural look without heavy foundation feel.', 4.7, 115, true, false, true, 'MKZ-019', ARRAY['bb cream', 'makeup', 'spf', 'foundation']),
(20, 'Luxury Velvet Hair Band with Pearls', 'hairpin', 390, 550, ARRAY['https://images.unsplash.com/photo-1535556116002-6281ff3e9f36?w=500&h=500&fit=crop'], 'Trendy padded velvet headband with hand-embellished faux pearls. Chic accessory for hair styling.', 4.5, 41, true, true, true, 'MKZ-020', ARRAY['headband', 'velvet', 'pearl', 'hair'])
ON CONFLICT (id) DO NOTHING;
SELECT setval('public.products_id_seq', (SELECT MAX(id) FROM public.products));
