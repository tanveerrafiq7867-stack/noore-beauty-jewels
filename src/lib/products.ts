import { supabase } from '@/lib/supabase'
import { PRODUCTS, Product } from '@/data/products'

export async function fetchProducts(): Promise<Product[]> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('id', { ascending: false })

    if (error || !data || data.length === 0) {
      console.warn('Supabase fetch failed or empty, using fallback:', error?.message)
      return PRODUCTS
    }

    return data.map((item: any) => ({
      id: Number(item.id),
      name: item.name,
      category: item.category,
      price: Number(item.price),
      originalPrice: item.original_price ? Number(item.original_price) : undefined,
      images: Array.isArray(item.images) ? item.images : [item.images],
      description: item.description,
      rating: Number(item.rating || 4.8),
      reviews: Number(item.reviews || 50),
      inStock: Boolean(item.in_stock),
      isNew: Boolean(item.is_new),
      isFeatured: Boolean(item.is_featured),
      sku: item.sku || undefined,
      tags: Array.isArray(item.tags) ? item.tags : [],
    }))
  } catch (err) {
    console.error('Error fetching products:', err)
    return PRODUCTS
  }
}

export async function fetchProductById(id: number): Promise<Product | undefined> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single()

    if (error || !data) {
      return PRODUCTS.find(p => p.id === id)
    }

    return {
      id: Number(data.id),
      name: data.name,
      category: data.category,
      price: Number(data.price),
      originalPrice: data.original_price ? Number(data.original_price) : undefined,
      images: Array.isArray(data.images) ? data.images : [data.images],
      description: data.description,
      rating: Number(data.rating || 4.8),
      reviews: Number(data.reviews || 50),
      inStock: Boolean(data.in_stock),
      isNew: Boolean(data.is_new),
      isFeatured: Boolean(data.is_featured),
      sku: data.sku || undefined,
      tags: Array.isArray(data.tags) ? data.tags : [],
    }
  } catch (err) {
    return PRODUCTS.find(p => p.id === id)
  }
}
