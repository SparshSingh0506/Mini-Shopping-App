import { Link } from 'react-router-dom'

import type { Product } from '../../interfaces/Product'

import { useCartContext } from '../../contexts/CartContext'

import { QuantityBox } from '../ui/QuantityBox'
import { PriceDisplay } from '../ui/PriceDisplay'
import { DiscountOverlay } from '../ui/DiscountOverlay'
import { AvailabilityStatus } from '../ui/AvailabilityStatus'

export const HomeProductCard = ({ product }: { product: Product }) => {
  const { id, title, description, price, discountPercentage, rating, availabilityStatus, reviews, thumbnail } = product;
  const { items, addToCart, clearItemFromCart } = useCartContext();

  const itemInCart = items.find(item => id === item.id);

  return (
    <div className="bg-white rounded-xl shadow-md p-5 w-90 min-h-130
    flex flex-col justify-between transition-all duration-300 ease-out 
    hover:cursor-pointer hover:shadow-xl hover:scale-[1.01]"
    >

      <Link to={`/products/${id}`}>
        {/* Image Section */}
        <div className="relative">
          <img
            src={thumbnail}
            alt="product"
            className="w-full h-55 object-contain"
          />

          {/* Discount Overlay */}
          <DiscountOverlay discountPercentage={discountPercentage} />
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

      </Link>
      <div>
        {/* Price Stock Review*/}
        <div className="flex items-center gap-2 mt-1">

          <div className="flex flex-col">
            <div className="text-sm">

            <PriceDisplay price={price} discountPercentage={discountPercentage} />
            </div>

            <AvailabilityStatus availabilityStatus={availabilityStatus} />
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
    </div>
  );
}