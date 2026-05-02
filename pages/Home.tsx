import { useEffect, useState } from 'react'
import { NavLink, useSearchParams } from 'react-router-dom'

import type { Product } from "../interfaces/Product"

import { getProducts } from '../services/API'

import { HomeProductCard } from '../components/cards/HomeProductCard'


export const Home = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);

    const [query] = useSearchParams();
    const search = query.get("search") || "";

    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(search.toLowerCase())
    );

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
        <>
            {(filteredProducts.length == 0)
                ?
                <div className="flex flex-col gap-5 items-center justify-center h-[70vh]">
                    <h2 className="text-4xl font-semibold text-gray-700">
                        No Products Found
                    </h2>

                    <NavLink to='/'>
                        <p className="text-blue-500 hover:text-blue-700 hover:underline">Back to Home</p>
                    </NavLink>
                </div>
                :
                <div className="grid gap-10 p-4 justify-center grid-cols-[repeat(auto-fill,minmax(350px,350px))]">
                    {filteredProducts.map(product => <HomeProductCard product={product} key={product.id} />)}
                </div>
            }
        </>
    )
}