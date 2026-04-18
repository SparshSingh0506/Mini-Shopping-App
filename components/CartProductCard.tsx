//import { useCartContext } from '../contexts/CartContext';
import {formattedPriceDisplay} from '../utils/formatPrice'

export const CartProductCard = () => {

  return (
    <div className="flex gap-6 border-b pb-4 mb-4 min-h-60">
      {/* IMAGE */}
      <img
        src="https://via.placeholder.com/150"
        alt="product"
        className="w-full md:w-50 h-50 object-cover rounded hover:cursor-pointer"
      />

      {/* DETAILS */}
      <div className="flex flex-col justify-between flex-1">
        <div>
          <h3 className="text-lg font-medium hover:cursor-pointer hover:underline">
            PRODUCT NAME
          </h3>

          <p className="text-green-600 text-sm">
            In Stock
          </p>

          <p className="text-gray-500 text-sm">
            Eligible for FREE Shipping
          </p>
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-4 mt-3">
          <div className="flex items-center justify-between mt-4">
            {/* LEFT SIDE */}
            <div className="flex items-center border rounded-md shadow-sm">

              <button className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition">
                −
              </button>

              <span className="px-4 text-sm font-semibold">
                1
              </span>

              <button className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition">
                +
              </button>
            </div>
          </div>

          <button className="text-blue-600 text-sm hover:text-red-600 hover:underline hover:cursor-pointer">
            Delete
          </button>

          <button className="text-blue-600 text-sm hover:to-blue-800 hover:underline hover:cursor-pointer">
            Save for later
          </button>
        </div>
      </div>

      {/* PRICE */}
      <div className="text-2xl font-semibold">
        ₹999
      </div>
    </div>
  );
}