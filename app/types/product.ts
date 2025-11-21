export interface ProductInsert {
  name: string;
  price: number;
  description: string;
  category: string;
  image_url: string;
  stock: number | null;
  has_variants: boolean;
}

export interface Product extends ProductInsert {
  id: string;
  created_at?: string | undefined;
  product_variants?: ProductVariants[];
}

export interface ProductVariantInsert {
  product_id: string;
  size: string;
  stock: number;
}

export interface ProductVariants extends ProductVariantInsert {
  id: string;
  created_at?: string;
}
