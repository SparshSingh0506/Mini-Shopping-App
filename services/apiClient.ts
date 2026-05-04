import type { Product } from "../interfaces/Product"

let cachedProducts: Product[] | null = null; // should probably make it a context in future

const URL = "https://dummyjson.com/products";

export const loadProducts = async (): Promise<Product[]> => {
    if (cachedProducts) return cachedProducts;

    const response = await fetch(URL);

    if (!response.ok) throw new Error("Failed to get products");

    const fetchedProducts: {products: Product[]} = await response.json();

    cachedProducts = fetchedProducts.products;

    return cachedProducts;
}


