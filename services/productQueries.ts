import type { Product } from '../interfaces/Product'

import { loadProducts } from './apiClient'

export const getAllProducts = async (): Promise<Product[]> => {
  return await loadProducts();
}

export const getProductById = async (id: number): Promise<Product> => {
  const products = await loadProducts();
  const foundProduct = products.find(product => product.id === id);

  if (!foundProduct) throw new Error("No Product Found!");
  return foundProduct;
}