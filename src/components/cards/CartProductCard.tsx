import type { CartItem } from '../../contexts/CartContext';
import { useCartContext } from '../../contexts/CartContext';

import { QuantityBox } from '../ui/QuantityBox';
import { PriceDisplay } from '../ui/PriceDisplay';
import { DiscountOverlay } from '../ui/DiscountOverlay';
import { AvailabilityStatus } from '../ui/AvailabilityStatus';
import { NavLink } from 'react-router-dom';

export const CartProductCard = ({ item }: { item: CartItem }) => {

  const { id, thumbnail, title, brand, availabilityStatus, description, shippingInformation, price, discountPercentage } = item;
  const { clearItemFromCart } = useCartContext();

  return (
    <div className="flex gap-6 border-b pb-4 mb-4 min-h-60">
      <div className="relative">
        {/* IMAGE */}
        <img
          src={thumbnail}
          alt="product"
          className="w-full md:w-50 h-50 object-cover 
          rounded hover:cursor-pointer"
        />

        {/* Discount Overlay */}
        <DiscountOverlay discountPercentage={discountPercentage} />
      </div>

      {/* DETAILS */}
      <div className="flex flex-col justify-between flex-1">
        <div>
          <div className="flex flex-col">
            <NavLink to={`/products/${id}`}>
              <h3 className="text-3xl font-medium 
              hover:cursor-pointer hover:underline">
                {title}
              </h3>
            </NavLink>

            {brand &&
              <div className="flex text-xs">
                <p className=" text-gray-700 mr-1">sold by: </p>
                <p className="text-black font-semibold">{brand}</p>
              </div>
            }
          </div>

          <div className="flex gap-3 items-center text-xs">
            <AvailabilityStatus availabilityStatus={availabilityStatus} />

            <p>|</p>

            <p className="text-gray-600">
              {shippingInformation}
            </p>
          </div>

          <p className="text-black mt-1">
            {description}
          </p>
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-4 mt-3">
          <QuantityBox product={item} itemInCart={item} />

          <button className="text-blue-600 text-sm hover:text-red-600 
          hover:underline hover:cursor-pointer"
            onClick={() => clearItemFromCart(id)}>
            Delete
          </button>

          <button className="text-blue-600 text-sm hover:to-blue-800 
          hover:underline hover:cursor-pointer">
            Save for later
          </button>
        </div>
      </div>

      {/* PRICE */}
      <div className="flex flex-col">
        <div className="text-2xl font-semibold">
          <PriceDisplay price={price} discountPercentage={discountPercentage} />
        </div>

        <p className="text-gray-800 self-end">per item</p>
      </div>
    </div>
  );
}