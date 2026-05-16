import { useState, useEffect } from "react";

import { useParams } from "react-router-dom"

import type { Product } from "../interfaces/Product";

import { getProductById } from '../services/productQueries'

import { PriceDisplay } from "../components/ui/PriceDisplay";


export const Products = () => {
    const { id } = useParams(); // read from the url /products/:id

    const [product, setProduct] = useState<Product | null>(null);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const fetchProductById = async () => {
            try {
                const fetchedProduct: Product = await getProductById(Number(id));
                setProduct(fetchedProduct);
            }

            catch (err) {
                console.log(err);
                setError("Failed to load product");
            }
        }

        fetchProductById();
    }, []);

    if (!product) return <h1 className="flex h-screen justify-center text-4xl mt-100">Loading...</h1>; // this handles final return where product exists, so no .? for every property
    if (error) return <h2 className="flex h-screen justify-center text-4xl mt-100">{error}</h2>;

    const {images, title, tags, price, discountPercentage} = product;

    return (
        <div className="min-h-screen p-3 flex justify-center">
            <div className="w-full max-w-8xl bg-white rounded-2xl shadow-lg p-6 grid grid-cols-1 lg:grid-cols-2 gap-10">

                {/* Left Side - Product Images */}
                <div className="flex flex-col gap-4">
                    <div className="bg-gray-200 rounded-2xl overflow-hidden h-125 flex items-center justify-center">
                        <img
                            src={images[0]}
                            alt="product"
                            className="h-full object-cover"
                        />
                    </div>

                    <div className="flex gap-3">
                        {images.map((image) => (
                            <div className="w-24 h-24 bg-gray-200 rounded-xl overflow-hidden border 
                                hover:border-orange-500 cursor-pointer"
                            >
                                <img
                                    src={image}
                                    alt="product-image"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Side - Product Info */}
                <div className="flex flex-col gap-5">

                    <div>
                        <h1 className="text-5xl font-bold text-gray-800">
                            {title}
                        </h1>
                        
                        <div className="mt-3 flex gap-1">
                            {tags?.map(tag => (
                                <span className="bg-blue-100 text-blue-700 px-2 rounded-lg p-0.5">
                                    {tag.charAt(0).toUpperCase() + tag?.slice(1)}
                                </span>
                            ))}
                        </div>
                    </div>


                    {/* Price */}
                    <div className="flex items-end gap-4">
                        
                        <div className="">
                            <PriceDisplay price={price} discountPercentage={discountPercentage} />
                        </div>

                        <span className="text-green-600 font-bold text-xl">
                            12% OFF
                        </span>
                    </div>

                    {/* Ratings */}
                    <div className="flex items-center gap-3">
                        <div className="bg-green-600 text-white px-3 py-1 rounded-lg text-sm font-semibold">
                            4.8 ★
                        </div>

                        <span className="text-gray-600">
                            12,430 Ratings & 1,204 Reviews
                        </span>
                    </div>

                    {/* Offers */}
                    <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
                        <h3 className="font-semibold text-lg mb-2">
                            Available Offers
                        </h3>

                        <ul className="space-y-2 text-gray-700">
                            <li>🔥 Bank Offer: 10% Instant Discount</li>
                            <li>🚚 Free Delivery by Tomorrow</li>
                            <li>💳 EMI starting from ₹5,499/month</li>
                        </ul>
                    </div>

                    {/* Features */}
                    <div>
                        <h3 className="text-2xl font-semibold mb-3">
                            Highlights
                        </h3>

                        <div className="grid grid-cols-2 gap-3">
                            {[
                                "256 GB Storage",
                                "48MP Camera",
                                "6.7-inch OLED Display",
                                "A17 Pro Processor",
                                "Titanium Body",
                                "5G Support"
                            ].map((feature) => (
                                <div
                                    key={feature}
                                    className="bg-gray-100 rounded-xl px-4 py-3 text-gray-700 font-medium"
                                >
                                    {feature}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-4 mt-4">
                        <button className="flex-1 bg-yellow-400 hover:bg-yellow-500 transition-all py-4 rounded-xl text-lg font-bold">
                            Add to Cart
                        </button>

                        <button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white transition-all py-4 rounded-xl text-lg font-bold">
                            Buy Now
                        </button>
                    </div>

                    {/* Delivery */}
                    <div className="border-t pt-4 text-gray-600">
                        <p>
                            📍 Deliver to: Dadri, Uttar Pradesh
                        </p>

                        <p className="mt-2">
                            ✅ In Stock
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
