export interface CreateProduct {
  title: string;
  description: string;
  price: number;
  images?: string[];
}

export interface ProductProperty {
  name: string;
  value: string;
}
