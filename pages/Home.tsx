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

    if (loading) return <h2 className="text-center mt-10">Loading...</h2>;
    if (error) return <h2 className="text-center mt-10">{error}</h2>;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 p-4">
            {products.map(product => <ProductCard product={product} key={product.id}/>)}
        </div>
    )
}