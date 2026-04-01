import { Product } from '../interfaces/Product'

interface productCardProps {
  product: Product
}

export const ProductCard = () => {
  return (
    <div className="bg-white rounded-xl shadow-md p-5 w-90 min-h-130 flex flex-col hover:shadow-lg transition">

      {/* Image Section */}
      <div className="relative">
        <img
          src="../src/assets/react.svg"
          alt="product"
          className="w-full h-55 object-contain"
        />

        {/* Discount Overlay */}
        <span className="absolute top-0.5 left-0.5 bg-green-600 text-white text-xs px-2 py-1 rounded shadow opacity-85">
          20% OFF
        </span>

        
      </div>

      {/* Divider */}
      <div className="border-t my-3"></div>

      {/* Content */}
      <div className="flex flex-col grow">

        {/* Title */}
        <h2 className="text-2xl font-bold line-clamp-2">
          Sample Product Title Goes Here
        </h2>

        {/* Description */}
        <p className="text-sm text-gray-600 mt-2 line-clamp-3">
          This is a short product description that explains key features and benefits
          of the product in a concise way.
        </p>

      </div>

      {/* Price */}
      <div className="flex items-center gap-2 mt-1">
        <div className="flex flex-col">

        <span className="text-2xl font-bold">$99.99</span>
        <span className="text-xs text-green-600">In Stock</span>
        </div>

        <div className="flex ml-auto gap-1">
          <span className=" text-black text-m font-semibold">⭐⭐⭐⭐⭐ 4.5</span>
          <span className="text-gray-600 text-m">(400)</span>
        </div> 
      </div>

      {/* Button at bottom */}
      <div className="mt-auto">
        <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
          Add to Cart
        </button>
      </div>
      
    </div>
  );
}