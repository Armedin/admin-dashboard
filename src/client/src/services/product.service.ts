import { CreateProduct } from '@/interfaces/product';
import apiAxios from '@/lib/api';

const createProduct = (data: CreateProduct) => {
  return apiAxios.post('/products', data);
};

const getAllProducts = () => {
  return apiAxios.get('/products');
};

export const productService = {
  createProduct,
  getAllProducts,
};
