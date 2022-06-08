import { CreateProduct } from '@/interfaces/product';
import apiAxios from '@/lib/api';

const createProduct = (data: CreateProduct) => {
  return apiAxios.post('/products', data);
};

export const productService = {
  createProduct,
};
