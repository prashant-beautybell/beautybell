export type Category = "face" | "eyes" | "lips" | "skincare";

export interface ProductShade {
  id: string;
  name: string;
  hex: string;
}

export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: Category;
  price: number;
  description: string;
  shortDescription: string;
  ingredients: string[];
  benefits: string[];
  howToUse: string;
  images: string[];
  shades: ProductShade[];
  rating: number;
  reviewCount: number;
  reviews: ProductReview[];
  isNew?: boolean;
  isBestseller?: boolean;
}

export interface CartItem {
  productId: string;
  shadeId: string;
  quantity: number;
}
