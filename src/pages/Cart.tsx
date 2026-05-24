import { NavLink } from 'react-router-dom';

import { useCartContext } from '../contexts/CartContext'

import { CartProductCard } from '../components/cards/CartProductCard'

import { getSubTotal } from '../utils/orderSummary';
import { getFormattedPriceDisplay } from '../utils/formatPrice';

const DUMMY_TAX_AMOUNT = 1.5;

export const Cart = () => {
  const { items } = useCartContext();
  const subTotal = getSubTotal();

  return (
    <div className="min-h-screen p-4 md:px-40">
      {
        (items.length === 0)
          ?
          // EMPTY CART UI
          <div className="flex flex-col gap-5 items-center justify-center h-[70vh]">
            <h2 className="text-4xl font-semibold text-gray-700">
              🛒 Cart is Empty
            </h2>

            <NavLink to='/'>
              <p className="text-blue-500 hover:text-blue-700 hover:underline">Back to Home</p>
            </NavLink>
          </div>
          :
          // MAIN CART
          <div className="flex flex-col lg:flex-row gap-6">
            {/* LEFT - PRODUCTS */}
            <div className="flex-1 bg-white p-6 rounded-lg shadow-sm">

              <h2 className="text-4xl font-semibold mb-4">
                🛒 Shopping Cart
              </h2>

              <div className="border mb-6" />

              <div className="flex flex-col gap-4">
                {items.map(item => <CartProductCard item={item} />)}
              </div>

            </div>

            {/* RIGHT - SUMMARY */}
            <div className="w-full lg:w-[320px] bg-white p-6 rounded-lg shadow-sm h-fit sticky top-6">
              <h2 className="text-lg font-bold mb-4">
                Order Summary
              </h2>

              <div className="flex justify-between mb-2 text-sm">
                <span className="font-semibold">Subtotal</span>
                <span className="font-semibold">{getFormattedPriceDisplay(subTotal)}</span>
              </div>

              <div className="flex justify-between mb-2 text-sm">
                <span className="font-semibold">Shipping</span>
                <span className="text-green-600">FREE</span>
              </div>

              <div className="flex justify-between mb-4 text-sm">
                <span className="font-semibold">Tax</span>
                <span className="font-semibold">{getFormattedPriceDisplay(DUMMY_TAX_AMOUNT)}</span>
              </div>

              <div className='border my-2' />

              <div className="flex justify-between font-bold text-lg pt-2 mb-4">
                <span>Total</span>
                <span>{getFormattedPriceDisplay(subTotal + DUMMY_TAX_AMOUNT)}</span>
              </div>

              <button className="w-full bg-yellow-400 hover:bg-yellow-500 py-2 rounded-md font-semibold transition hover:cursor-pointer">
                Proceed to Checkout
              </button>
            </div>

          </div>
      }
    </div>
  )
};