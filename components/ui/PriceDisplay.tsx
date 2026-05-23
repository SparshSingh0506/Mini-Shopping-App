import { getFormattedPriceDisplay } from '../../utils/formatPrice'

export const MIN_DISCOUNT_FOR_RENDER = 5;

export const PriceDisplay = ({ price, discountPercentage }: { price: number, discountPercentage: number }) => {
  const hasValidDiscount = discountPercentage > MIN_DISCOUNT_FOR_RENDER;

  const formattedOrignalPrice = getFormattedPriceDisplay(price);

  if (!hasValidDiscount) return <span className="text-[1em] font-bold">{formattedOrignalPrice}</span>;

  const finalPrice = price - (price * discountPercentage / 100);
  const formattedFinalPrice = getFormattedPriceDisplay(finalPrice);

  return (
    <div className="flex flex-1 gap-2 items-baseline">

      <span className="text-gray-600 font-semibold line-through">
        {formattedOrignalPrice}
      </span>

      <span className="text-[2em] font-bold">
        {formattedFinalPrice}
      </span>

    </div>
  )
}

