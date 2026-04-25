import { getFormattedPriceDisplay } from '../../utils/formatPrice'

import type { CartItem } from '../../contexts/CartContext';

import { QuantityBox } from '../ui/QuantityBox';
import { PriceDisplay } from '../ui/PriceDisplay';

export const CartProductCard = ({ item }: { item: CartItem }) => {

  const { thumbnail, title, stock, description, shippingInformation, price, discountPercentage } = item;

  return (
    <div className="flex gap-6 border-b pb-4 mb-4 min-h-60">
      {/* IMAGE */}
      <img
        src={thumbnail}
        alt="product"
        className="w-full md:w-50 h-50 object-cover rounded hover:cursor-pointer"
      />

      {/* DETAILS */}
      <div className="flex flex-col justify-between flex-1">
        <div>
          <h3 className="text-3xl font-medium hover:cursor-pointer hover:underline">
            {title}
          </h3>

          {
            stock > 0
              ? <div className="flex gap-3 items-center">
                <p className="text-green-600 text-sm">
                  In Stock
                </p>

                <p>|</p>

                <p className="text-gray-600 text-sm">
                  {shippingInformation}
                </p>
              </div>
              :
              <p className="text-red-600 text-sm">
                Out of Stock
              </p>
          }

          <p className="text-black text-m mt-1">
            {description}
          </p>
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-4 mt-3">
          <QuantityBox product={item} itemInCart={item} />

          <button className="text-blue-600 text-sm hover:text-red-600 hover:underline hover:cursor-pointer">
            Delete
          </button>

          <button className="text-blue-600 text-sm hover:to-blue-800 hover:underline hover:cursor-pointer">
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