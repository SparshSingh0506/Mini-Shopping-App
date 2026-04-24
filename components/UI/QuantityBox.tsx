import { useCartContext } from '../../contexts/CartContext';
import type { CartItem } from '../../contexts/CartContext';
import type { Product } from '../../interfaces/Product';

export const QuantityBox = ({ product, itemInCart }: {product: Product, itemInCart: CartItem}) => {
  const { id } = product;
  const { addToCart, removeFromCart } = useCartContext();

  return (

    <div className="flex items-center border-2 border-gray-800 
              rounded-lg overflow-hidden bg-gray-50">

      {/* Minus */}
      <button
        onClick={() => removeFromCart(id)}
        className="px-3 py-1 text-lg font-bold 
                 bg-gray-200 hover:bg-red-300 hover:cursor-pointer
                  active:scale-95 active:rounded-sm transition"
      >
        -
      </button>

      {/* Quantity */}
      <span className="px-4 py-1 border-x bg-white font-medium">
        {itemInCart.quantity}
      </span>

      {/* Plus */}
      <button
        onClick={() => {
          const {quantity, ...product} = itemInCart
          addToCart(product)
        }}
        className="px-3 py-1 text-lg font-bold 
                 bg-gray-200 hover:bg-green-300 hover:cursor-pointer
                  active:scale-95 active:rounded-sm transition"
      >
        +
      </button>

    </div>
  )
}
