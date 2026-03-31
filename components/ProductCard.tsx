import { Product } from '../interfaces/Product'

interface productCardProps {
    product: Product
}

export const ProductCard = () => {
    return (
            <div className="bg-white rounded-xl shadow-md p-4 w-64 hover:shadow-lg transition">

      {/* Image */}
      <img
        src="https://via.placeholder.com/150"
        alt="product"
        className="w-full h-40 object-contain mb-3"
      />

      {/* Title */}
      <h2 className="text-sm font-semibold line-clamp-2">
        Sample Product Title Goes Here
      </h2>

      {/* Rating */}
      <p className="text-yellow-500 text-sm mt-1">
        ⭐ 4.5
      </p>

      {/* Price */}
      <div className="flex items-center gap-2 mt-1">
        <span className="text-lg font-bold">
          $99.99
        </span>
        <span className="text-green-600 text-sm">
          20% OFF
        </span>
      </div>

      {/* Availability */}
      <p className="text-sm text-green-600 mt-1">
        In Stock
      </p>

      {/* Button */}
      <button className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
        Add to Cart
      </button>

    </div>
    );
}