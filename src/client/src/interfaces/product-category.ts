export interface ProductCategory {
  id: string;
  title: string;
  image?: string;
}

export interface CreateProductCategory {
  title: string;
  image?: string;
}
