export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image_url: string;
  stock: number | null;
  has_variants: boolean;
}

export interface ProductVariants {
  id: string;
  product_id: string;
  size: string;
  stock: number;
}
