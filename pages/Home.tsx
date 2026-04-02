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

    if (loading) return <h1 className="flex h-screen justify-center text-4xl mt-100">Loading...</h1>;
    if (error) return <h2 className="flex h-screen justify-center text-4xl mt-100">{error}</h2>;

    return (
        <div className="grid gap-6 p-4 grid-cols-[repeat(auto-fit,minmax(350px,1fr))]">
            {products.map(product => <ProductCard product={product} key={product.id}/>)}
        </div>
    )
}