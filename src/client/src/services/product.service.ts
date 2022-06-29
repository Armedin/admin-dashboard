import { CreateProduct, Product, UpdateProduct } from '@/interfaces/product';
import {
  CreateProductCategory,
  ProductCategory,
} from '@/interfaces/product-category';
import apiAxios from '@/lib/api';

const createProduct = (data: CreateProduct) => {
  return apiAxios.post('/products', data);
};

const getAllProducts = () => {
  return apiAxios.get<Product[], any>('/products');
};

const getProductById = (id: string) => {
  return apiAxios.get<Product, any>(`/products/${id}`);
};

const updateProductById = (id: string, data: UpdateProduct) => {
  return apiAxios.put<Product, any>(`/products/${id}`, data);
};

const getAllCategories = () => {
  return apiAxios.get<ProductCategory[], any>('/product-categories');
};

const createCategory = (data: CreateProductCategory) => {
  return apiAxios.post<ProductCategory, any>('/product-categories', data);
};

export const productService = {
  createProduct,
  getAllProducts,
  getProductById,
  getAllCategories,
  updateProductById,
  createCategory,
};
