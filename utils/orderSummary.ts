import { useCartContext } from '../contexts/CartContext';

export const getSubTotal = () => {
  const { items } = useCartContext();

  const finalPrice = items.reduce((acc, item) => {
    const { price, discountPercentage, quantity } = item;

    const totalPrice = price * quantity;
    const discountedPrice = totalPrice - (totalPrice * discountPercentage / 100);

    return discountedPrice + acc;
  }, 0);

  return finalPrice;
}


