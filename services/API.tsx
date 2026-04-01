import type { Product } from "../interfaces/Product"

interface ProductData {
    products: Product[];
}

const URL = "https://dummyjson.com/products";

export const getProducts = async (): Promise<Product[]> => {
    const response = await fetch(URL);

    if (!response.ok) throw new Error("Failed to get products");

    const productData: ProductData  = await response.json();

    return productData.products;
}