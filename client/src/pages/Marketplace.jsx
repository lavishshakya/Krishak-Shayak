import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { fetchProducts, categories } from "../services/marketplaceService";

const Marketplace = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 5000 });
  const [sortBy, setSortBy] = useState("newest");
  const [searchTerm, setSearchTerm] = useState("");
  
  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      try {
        const filters = {
          category: selectedCategory,
          minPrice: priceRange.min,
          maxPrice: priceRange.max,
          sort: sortBy,
          search: searchTerm
        };
        const data = await fetchProducts(filters);
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadProducts();
  }, [selectedCategory, priceRange, sortBy, searchTerm]);
  
  const handleSearch = (e) => {
    e.preventDefault();
    // Search is already handled via the useEffect
  };
  
  const handleClearFilters = () => {
    setSelectedCategory("All");
    setPriceRange({ min: 0, max: 5000 });
    setSortBy("newest");
    setSearchTerm("");
  };
  
  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Agricultural Marketplace</h1>
          <Link 
            to="/marketplace/seller" 
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md inline-flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Sell Product
          </Link>
        </div>
        
        {/* Search Bar */}
        <div className="mb-8">
          <form onSubmit={handleSearch} className="flex">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search for seeds, fertilizers, tools..."
                className="w-full px-4 py-3 rounded-l-md border border-gray-300 focus:ring-green-500 focus:border-green-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-0 top-0 text-gray-400 hover:text-gray-600 p-3"
                onClick={() => setSearchTerm("")}
              >
                {searchTerm && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </button>
            </div>
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-6 rounded-r-md flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </form>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters Sidebar */}
          <div className="md:w-1/4">
            <div className="bg-white p-5 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Filters</h2>
                <button
                  onClick={handleClearFilters}
                  className="text-sm text-green-600 hover:text-green-800"
                >
                  Clear All
                </button>
              </div>
              
              {/* Categories */}
              <div className="mb-6">
                <h3 className="font-medium mb-2">Categories</h3>
                <div className="space-y-2">
                  {categories.map(category => (
                    <div key={category} className="flex items-center">
                      <input
                        type="radio"
                        id={category}
                        name="category"
                        checked={selectedCategory === category}
                        onChange={() => setSelectedCategory(category)}
                        className="h-4 w-4 text-green-600 focus:ring-green-500"
                      />
                      <label htmlFor={category} className="ml-2 text-gray-700">
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Price Range */}
              <div className="mb-6">
                <h3 className="font-medium mb-2">Price Range</h3>
                <div className="flex items-center justify-between">
                  <div className="w-5/12">
                    <label className="text-xs text-gray-500">Min</label>
                    <input
                      type="number"
                      min="0"
                      step="100"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange({ ...priceRange, min: parseInt(e.target.value) })}
                      className="w-full border border-gray-300 rounded p-2"
                    />
                  </div>
                  <div className="text-gray-500">-</div>
                  <div className="w-5/12">
                    <label className="text-xs text-gray-500">Max</label>
                    <input
                      type="number"
                      min="0"
                      step="100"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange({ ...priceRange, max: parseInt(e.target.value) })}
                      className="w-full border border-gray-300 rounded p-2"
                    />
                  </div>
                </div>
              </div>
              
              {/* Sort By */}
              <div>
                <h3 className="font-medium mb-2">Sort By</h3>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full border border-gray-300 rounded p-2"
                >
                  <option value="newest">Newest First</option>
                  <option value="price-low-high">Price: Low to High</option>
                  <option value="price-high-low">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* Product Grid */}
          <div className="md:w-3/4">
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
              </div>
            ) : products.length === 0 ? (
              <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h2 className="text-xl font-semibold text-gray-700 mb-2">No products found</h2>
                <p className="text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
                <button
                  onClick={handleClearFilters}
                  className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map(product => (
                  <Link 
                    to={`/marketplace/product/${product.id}`} 
                    key={product.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="relative h-48">
                      <img 
                        src={product.imageUrl} 
                        alt={product.name} 
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-2 right-2 bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                        {product.category}
                      </span>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-800 mb-1 line-clamp-1">{product.name}</h3>
                      <p className="text-gray-500 text-sm mb-2 line-clamp-2">{product.description}</p>
                      <div className="flex items-center mb-2">
                        <div className="text-yellow-400 mr-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </div>
                        <span className="text-xs text-gray-600">{product.rating} ({product.reviews} reviews)</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-lg font-bold text-green-700">
                          ₹{product.price}
                          <span className="text-xs text-gray-500 ml-1">/{product.unitType}</span>
                        </p>
                        <span className="text-xs text-gray-500">{product.stock} available</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Marketplace;