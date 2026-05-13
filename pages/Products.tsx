import { useState, useEffect } from "react";

import { useParams } from "react-router-dom"

import { getProductById } from '../services/productQueries'

import type { Product } from "../interfaces/Product";


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

  return (
    <div></div>
  );
}
