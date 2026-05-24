import { MIN_DISCOUNT_FOR_RENDER } from '../ui/PriceDisplay'

export const DiscountOverlay = ({ discountPercentage }: { discountPercentage: number }) => {
  if (discountPercentage < MIN_DISCOUNT_FOR_RENDER) return null;

  return (
    <span className="absolute top-0.5 left-0.5 bg-green-600 
    text-white text-xs px-2 py-1 rounded shadow opacity-85"
    >
      {`${Math.round(discountPercentage)}% Off!`}
    </span>
  )
}

