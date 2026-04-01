import { useEffect, useState } from 'react'

import { ProductCard } from '../components/ProductCard'
import { getProducts } from '../services/API'

import type { Product } from "../interfaces/Product"

export const Home = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        
        const fetchProdcuts = async () => {
            try {
                const fetchedProducts: Product[] = await getProducts();
                setProducts(fetchedProducts);
            } catch (err) {
                console.log(err);
                setError("Failed to fetch products");
            } finally {
                setLoading(false);
            }
        }

        fetchProdcuts();
    }, []);

    return (
        <div className="">
            {products.map(product => <ProductCard product={product} />)}
        </div>
    )
}