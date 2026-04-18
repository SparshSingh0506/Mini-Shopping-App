export const formattedPriceDisplay = (amount: number): string => {
  const formattedPrice = new Intl.NumberFormat('en-US', { // standard practice for currency - auto punctuationl, symbol and round for amount
    style: 'currency',
    currency: 'USD',
  })
    .format(amount);

  return formattedPrice;
}