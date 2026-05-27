import { useState, useEffect } from "react";

import { useParams } from "react-router-dom"

import type { Product } from "../interfaces/Product";

import { getProductById } from '../services/productQueries'

import { useCartContext } from "../contexts/CartContext";

import { PriceDisplay } from "../components/ui/PriceDisplay";
import { MIN_DISCOUNT_FOR_RENDER } from '../components/ui/PriceDisplay'
import { QuantityBox } from "../components/ui/QuantityBox";
import { CommentBox } from "../components/cards/CommentBox";


export const Products = () => {
  const { id } = useParams(); // read from the url /products/:id

  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);

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

  // set initial product image
  const [productImage, setProductImage] = useState<string | null>(null);

  useEffect(() => {
    if (product?.images?.length) setProductImage(product.images[0])
  }, [product]);


  if (!product) return <h1 className="flex h-screen justify-center text-4xl mt-100">Loading...</h1>; // this handles final return where product exists, so no .? for every property
  if (error) return <h2 className="flex h-screen justify-center text-4xl mt-100">{error}</h2>;

  const { images, thumbnail, title, tags, price, discountPercentage, rating, reviews, description, brand, dimensions, weight, warrantyInformation } = product;

  const { items, addToCart, clearItemFromCart } = useCartContext();

  const numericId = Number(id);
  const itemInCart = items.find(item => numericId === item.id);

  return (
    <div className="min-h-screen p-1 flex justify-center">
      <div className=" flex flex-col w-full max-w-8xl bg-white rounded-2xl shadow-lg">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 p-6">

          {/* Left Side - Product Images */}
          <div className="flex flex-col gap-4">
            <div className="bg-gray-200 rounded-2xl overflow-hidden h-125 flex items-center justify-center">
              <img
                src={productImage ?? thumbnail ?? ""}
                alt="product"
                className="h-full object-cover"
              />
            </div>

            <div className="flex gap-3">
              {images.map((image, i) => (
                <div className="w-24 h-24 bg-gray-200 rounded-xl overflow-hidden border 
                  hover:border-orange-500 cursor-pointer"
                  key={i}
                  onClick={() => setProductImage(image)}
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
          <div className="flex flex-col gap-4">

            <div>
              {/* Title*/}
              <h1 className="text-5xl font-bold text-gray-800">
                {title}
              </h1>

              {brand && <p className="mt-2"><span className="font-semibold">Sold by:</span> {brand}</p>}

              {/* Tags*/}
              <div className="mt-2 flex gap-1">
                {tags?.map((tag, i) => (
                  <span className="bg-blue-100 text-blue-700 px-2 rounded-lg p-0.5" key={i}>
                    {tag.charAt(0).toUpperCase() + tag?.slice(1)}
                  </span>
                ))}
              </div>

              {/* Price */}
              <div className="flex items-center gap-4">
                <div className="text-2xl">
                  <PriceDisplay price={price} discountPercentage={discountPercentage} />
                </div>

                <span className="text-green-600 font-bold text-xl">
                  {discountPercentage > MIN_DISCOUNT_FOR_RENDER && <span>{Math.round(discountPercentage)}% OFF</span>}
                </span>
              </div>

              {/* Ratings */}
              <div className="flex items-center gap-3 mt-2">
                <div className="bg-green-600 text-white px-3 py-1 rounded-lg text-sm font-semibold">
                  {rating.toFixed(1)} ★
                </div>

                <span className="text-gray-600">
                  {reviews?.length ?? 0} Reviews
                </span>
              </div>
            </div>

            <hr />

            {/* Description */}
            <div>
              {description}
            </div>

            <hr />

            {/* About */}
            <div>
              <h3 className="text-2xl underline font-semibold mb-3">
                Details
              </h3>

              <div className="grid grid-cols-2 gap-3">
                <ul className="list-disc list-inside pl-5">
                  {brand && <li><span className="font-semibold">Brand:</span> {brand}</li>}
                  {dimensions && <li> <span className="font-semibold">Dimensions:</span>
                    <ul className="list-[square] list-inside pl-5">
                      <li><span className="font-semibold">Width:</span> {dimensions.width}</li>
                      <li><span className="font-semibold">Height:</span> {dimensions.height}</li>
                      <li><span className="font-semibold">depth:</span> {dimensions.depth}</li>
                    </ul>
                  </li>}

                  {weight && <li><span className="font-semibold">Weight:</span> {weight}</li>}

                  {warrantyInformation && <li><span className="font-semibold">Warranty Information:</span> <span>{warrantyInformation}</span></li>}
                </ul>
              </div>
            </div>

            <hr />

            {/* Buttons */}
            <div className="flex gap-4">
              {
                (!itemInCart)
                  ?
                  <button
                    onClick={() => addToCart(product)}
                    className="w-full bg-blue-600 text-white py-4 rounded-lg 
                    transition-all duration-200 hover:bg-blue-700 hover:scale-103 hover:cursor-pointer"
                  >
                    Add to Cart
                  </button>
                  :
                  <div className="flex gap-3 w-full justify-center items-center">

                    {/* Quantity Box */}
                    <QuantityBox product={product} itemInCart={itemInCart} />

                    {/* Remove Button */}
                    <button
                      onClick={() => clearItemFromCart(numericId)}
                      className="px-4 py-2 rounded-lg bg-red-500 text-white font-medium 
                      transition-all duration-200 hover:cursor-pointer hover:bg-red-600 hover:scale-105 active:scale-95"
                    >
                      Remove
                    </button>

                  </div>
              }
            </div>
          </div>

        </div>

        <hr className="border mx-6" />

        <div className="px-6 py-4">
          <h2 className="text-2xl font-semibold mb-3 underline">
            Customer Reviews
          </h2>

          {/* Comment boxes */}
          <div className="flex flex-col gap-2 px-100">
            {reviews.map((review, i) => <CommentBox key={i} review={review} />)}
          </div>
        </div>
      </div>
    </div>
  );
}
