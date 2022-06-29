export interface CreateProduct {
  title: string;
  description: string;
  price: number;
  thumbnail?: string;
  images?: string[];
}

export interface UpdateProduct extends CreateProduct {}

export interface ProductProperty {
  name: string;
  value: string;
}

export type ProductImage = string;

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  images?: ProductImage[];
  thumbnail?: string;
  properties?: ProductProperty[];
}
