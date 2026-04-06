import type { Product } from '../interfaces/Product'

import { useCartContext } from '../contexts/CartContext'

const MIN_DISCOUNT_FOR_RENDER = 5;

interface productCardProps {
  product: Product
}

export const ProductCard = ({ product }: productCardProps) => {
  const { items, addToCart, removeFromCart } = useCartContext();
  const itemInCart = items.find(item => product.id === item.id);

  return (
    <div className="bg-white rounded-xl shadow-md p-5 w-90 min-h-130
      flex flex-col transition-all duration-300 ease-out 
      hover:cursor-pointer hover:shadow-xl hover:-translate-y-2 hover:scale-[1.01]"
    >

      {/* Image Section */}
      <div className="relative">
        <img
          src={product.images[0]}
          alt="product"
          className="w-full h-55 object-contain"
        />

        {/* Discount Overlay */}

        {
          product.discountPercentage > MIN_DISCOUNT_FOR_RENDER
            ?
            <span className="absolute top-0.5 left-0.5 bg-green-600 
          text-white text-xs px-2 py-1 rounded shadow opacity-85"
            >
              {`${Math.round(product.discountPercentage)}% Off!`}
            </span>
            :
            null
        }

      </div>

      {/* Divider */}
      <div className="border-t my-3"></div>

      {/* Content */}
      <div className="flex flex-col grow">

        {/* Title */}
        <h2 className="text-2xl font-bold line-clamp-2">
          {product.title}
        </h2>

        {/* Description */}
        <p className="text-sm text-gray-600 mt-2 line-clamp-3">
          {product.description}
        </p>

      </div>

      <div className="flex items-center gap-2 mt-1">
        {/* Price */}
        <div className="flex flex-col">
          <span className="text-2xl font-bold">{`$${product.price}`}</span>
          {product.stock > 0 ? <span className="text-xs text-green-600">{`In Stock (${product.stock})`}</span> : <span className="text-xs text-red-600">Out of Stock</span>}
        </div>

        {/* Rating & total reviews */}
        <div className="flex ml-auto gap-1">
          <span className=" text-black text-m font-semibold">{`⭐⭐⭐⭐⭐ ${product.rating.toFixed(1)}`}</span>
          <span className="text-gray-600 text-m">{`(${product.reviews.length})`}</span>
        </div>
      </div>

      {/* Cart Handling */}
      <div className="mt-1 flex justify-center">
        {
          (!itemInCart)
            ?
            <button
              onClick={() => addToCart(product)}
              className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 hover:cursor-pointer"
            >
              Add to Cart
            </button>
            :
            <div className="flex gap-3 w-fit items-center">
              {/* Quantity Box */}
              <div className="flex items-center border-2 border-gray-800 rounded-lg overflow-hidden bg-gray-50">

                {/* Minus */}
                <button
                  onClick={() => removeFromCart(product.id)}
                  className="px-3 py-1 text-lg font-bold 
                 bg-red-200 hover:bg-red-400 
                  active:scale-95 active:rounded-sm transition"
                >
                  -
                </button>

                {/* Quantity */}
                <span className="px-4 py-1 border-x bg-yellow-100 font-medium">
                  {itemInCart.quantity}
                </span>

                {/* Plus */}
                <button
                  onClick={() => addToCart(product)}
                  className="px-3 py-1 text-lg font-bold 
                 bg-green-200 hover:bg-green-400 
                  active:scale-95 active:rounded-sm transition"
                >
                  +
                </button>

              </div>

              {/* Remove Button */}
              <button
                onClick={() => removeFromCart(product.id)}
                className="px-4 py-2 rounded-lg 
               bg-red-500 text-white font-medium 
                transition-all duration-200 
               hover:bg-red-600 active:scale-95"
              >
                Remove
              </button>
            </div>
        }
      </div>

    </div>
  );
}