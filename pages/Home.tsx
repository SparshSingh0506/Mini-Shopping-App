import { useEffect, useState } from 'react'
import { NavLink, useSearchParams } from 'react-router-dom'

import type { Product } from "../interfaces/Product"

import { getAllProducts } from '../services/productQueries'

import { HomeProductCard } from '../components/cards/HomeProductCard'


export const Home = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [error, setError] = useState<string>("");

    const [query] = useSearchParams();
    const search = query.get("search") || "";

    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(search.toLowerCase())
    );

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const fetchedProducts: Product[] = await getAllProducts();
                setProducts(fetchedProducts);
            } 
            
            catch (err) {
                console.log(err);
                setError("Failed to load products");
            } 
        }

        fetchProducts();
    }, []);

    if (products.length === 0) return <h1 className="flex h-screen justify-center text-4xl mt-100">Loading...</h1>;
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