import { CreateProduct } from '@/interfaces/product';
import {
  CreateProductCategory,
  ProductCategory,
} from '@/interfaces/product-category';
import apiAxios from '@/lib/api';

const createProduct = (data: CreateProduct) => {
  return apiAxios.post('/products', data);
};

const getAllProducts = () => {
  return apiAxios.get('/products');
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
  getAllCategories,
  createCategory,
};
