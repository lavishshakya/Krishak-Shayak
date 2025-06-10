import { useState } from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className={`w-full h-full object-cover transition-transform duration-300 ${isHovered ? 'scale-110' : 'scale-100'}`}
        />
        {product.discount > 0 && (
          <div className="absolute top-0 left-0 bg-red-500 text-white px-2 py-1 text-xs font-semibold">
            {product.discount}% OFF
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-gray-800">
            <Link to={`/product/${product.id}`} className="hover:text-green-600">{product.name}</Link>
          </h3>
          <div className="flex items-center text-yellow-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-xs ml-1 text-gray-600">{product.rating}</span>
          </div>
        </div>
        
        <p className="text-sm text-gray-500 mb-3">{product.seller}</p>
        
        <div className="flex items-end justify-between">
          <div>
            <p className="text-lg font-bold text-green-700">
              ₹{product.price}
              {product.discount > 0 && (
                <span className="text-xs text-gray-400 line-through ml-2">
                  ₹{Math.round(product.price * 100 / (100 - product.discount))}
                </span>
              )}
            </p>
            <p className="text-xs text-gray-500">{product.unit}</p>
          </div>
          
          <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md text-sm">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;