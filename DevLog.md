# Note
- I plan on documenting what I learnt, the challenges I faced and the decisions I took to address them.
- Since I am still my early journey, I started it late and could not list down all my past decisions for making this project, but I will do it from now.


# Past decisions not documented
### Bug: No page would load unless routed on home where the actual api is called
- Earlier, my program called the client api on the home page inside a `react useEffect() hook`, however, this raised some issues:

  **Problem:** 
    - The api would only be called on the home page. 
    - If a user started from another page, they would recieve nothing until they first routed to home page.

  **Fix:** 
    - I segregated the main api service in two different functions, one for the main client call & the other to handle queries like `getAllProducts`, `getProductById` etc.
    - Each query function always calls the api client first, which caches all the product items in a single variable on the first call, and then returns the cached products for every next call.
    - For now, the variable caching approach is not the best and I plan to implement it better through context api in the future.


# 18-May-2026
- **Problem:** Earlier I had designed components - `PriceDisplay.tsx`, and `DiscountOverlay.tsx` with hard coded css values, which caused issues in reusing them in the products page.
- **Yet to Fix:** I will make a few elements of styling independent from the component, only keeping the core function, and implementing them according to my preference at different instances.