import type { Product } from '../../interfaces/Product'

import { useCartContext } from '../../contexts/CartContext';

import { QuantityBox } from '../ui/QuantityBox';
import { MIN_DISCOUNT_FOR_RENDER, PriceDisplay } from '../ui/PriceDisplay';


export const HomeProductCard = ({ product }: { product: Product }) => {
  const { id, title, description, price, discountPercentage, rating, stock, reviews, thumbnail } = product;
  const { items, addToCart, clearItemFromCart } = useCartContext();

  const itemInCart = items.find(item => id === item.id);

  return (
    <div className="bg-white rounded-xl shadow-md p-5 w-90 min-h-130
      flex flex-col transition-all duration-300 ease-out 
      hover:cursor-pointer hover:shadow-xl hover:scale-[1.01]"
    >

      {/* Image Section */}
      <div className="relative">
        <img
          src={thumbnail}
          alt="product"
          className="w-full h-55 object-contain"
        />

        {/* Discount Overlay */}

        {
          discountPercentage > MIN_DISCOUNT_FOR_RENDER &&
            
            <span className="absolute top-0.5 left-0.5 bg-green-600 
          text-white text-xs px-2 py-1 rounded shadow opacity-85"
            >
              {`${Math.round(discountPercentage)}% Off!`}
            </span>
        }
      </div>

      {/* Divider */}
      <div className="border-t my-3"></div>

      {/* Content */}
      <div className="flex flex-col grow">

        {/* Title */}
        <h2 className="text-2xl font-bold line-clamp-2">
          {title}
        </h2>

        {/* Description */}
        <p className="text-sm text-gray-600 mt-2 line-clamp-3">
          {description}
        </p>

      </div>

      {/* Price Stock Review*/}
      <div className="flex items-center gap-2 mt-1">

        <div className="flex flex-col">
          <PriceDisplay price={price} discountPercentage={discountPercentage} />

          {
            (stock > 0)
              ?
              <span className="text-xs text-green-600">{`In Stock (${stock})`}</span>
              :
              <span className="text-xs text-red-600">Out of Stock</span>
          }
        </div>

        {/* Rating & total reviews */}
        <div className="flex ml-auto gap-1">
          <span className=" text-black text-m font-semibold">{`⭐ ${rating.toFixed(1)}`}</span>
          <span className="text-gray-600 text-m">{`(${reviews.length})`}</span>
        </div>

      </div>

      {/* Cart Handling */}
      <div className="mt-1 flex justify-center">
        {
          (!itemInCart)
            ?
            <button
              onClick={() => addToCart(product)}
              className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg 
              transition-all duration-200 hover:bg-blue-700 hover:scale-103 hover:cursor-pointer"
            >
              Add to Cart
            </button>
            :
            <div className="flex gap-3 w-fit items-center">

              {/* Quantity Box */}
              <QuantityBox product={product} itemInCart={itemInCart} />

              {/* Remove Button */}
              <button
                onClick={() => clearItemFromCart(id)}
                className="px-4 py-2 rounded-lg 
               bg-red-500 text-white font-medium 
                transition-all duration-200 hover:cursor-pointer
               hover:bg-red-600 hover:scale-105 active:scale-95"
              >
                Remove
              </button>

            </div>
        }
      </div>

    </div>
  );
}