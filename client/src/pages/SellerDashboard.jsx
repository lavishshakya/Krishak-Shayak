import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getSellerProducts, deleteProduct } from "../services/marketplaceService";
import authService from "../services/authService";

const SellerDashboard = () => {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("products"); // products, orders, analytics
  const [message, setMessage] = useState({ type: "", text: "" });
  
  useEffect(() => {
    // Get the current user
    const currentUser = authService.getCurrentUser();
    
    console.log('SellerDashboard - current user:', currentUser);
    
    if (!currentUser) {
      console.warn('No user found in SellerDashboard');
    } else if (currentUser.userType !== 'seller') {
      console.warn('Non-seller user in SellerDashboard:', currentUser.userType);
    }
    
    setUser(currentUser);
  }, []);
  
  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      try {
        const productsData = await getSellerProducts();
        setProducts(productsData);
      } catch (error) {
        console.error("Failed to load products:", error);
        setMessage({ 
          type: "error", 
          text: "Failed to load your products. Please try again." 
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadProducts();
  }, []);
  
  const handleDeleteProduct = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(productId);
        setProducts(products.filter(product => product.id !== productId));
        setMessage({ 
          type: "success", 
          text: "Product deleted successfully!" 
        });
      } catch (error) {
        console.error("Failed to delete product:", error);
        setMessage({ 
          type: "error", 
          text: "Failed to delete product. Please try again." 
        });
      }
      
      // Clear message after 3 seconds
      setTimeout(() => {
        setMessage({ type: "", text: "" });
      }, 3000);
    }
  };
  
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2
    }).format(amount);
  };
  
  if (isLoading) {
    return (
      <div>
        <Navbar />
        <div className="container mx-auto px-4 py-16 flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Seller Dashboard</h1>
        
        {message.text && (
          <div className={`p-4 mb-6 rounded-md ${message.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
            {message.text}
          </div>
        )}
        
        {/* Dashboard Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab("products")}
              className={`py-3 px-6 border-b-2 font-medium text-sm ${
                activeTab === "products"
                  ? "border-green-500 text-green-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Products
            </button>
            <button
              onClick={() => setActiveTab("orders")}
              className={`py-3 px-6 border-b-2 font-medium text-sm ${
                activeTab === "orders"
                  ? "border-green-500 text-green-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Orders
            </button>
            <button
              onClick={() => setActiveTab("analytics")}
              className={`py-3 px-6 border-b-2 font-medium text-sm ${
                activeTab === "analytics"
                  ? "border-green-500 text-green-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Analytics
            </button>
          </nav>
        </div>
        
        {/* Products Tab */}
        {activeTab === "products" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Your Products</h2>
              <Link
                to="/marketplace/seller/add-product"
                className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add New Product
              </Link>
            </div>
            
            {products.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                <h3 className="text-xl font-medium text-gray-700 mb-2">No products yet</h3>
                <p className="text-gray-500 mb-6">You haven't added any products to sell on the marketplace.</p>
                <Link
                  to="/marketplace/seller/add-product"
                  className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Your First Product
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 bg-white shadow-md rounded-lg overflow-hidden">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {products.map((product) => (
                      <tr key={product.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-12 h-12 flex-shrink-0">
                              <img
                                src={product.image || `https://via.placeholder.com/100?text=${product.name}`}
                                alt={product.name}
                                className="w-full h-full object-cover rounded-md"
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{product.name}</div>
                              <div className="text-sm text-gray-500">ID: {product.id}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{formatCurrency(product.price)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{product.stock} units</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            product.stock > 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                          }`}>
                            {product.stock > 0 ? "In Stock" : "Out of Stock"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Link
                            to={`/marketplace/seller/edit-product/${product.id}`}
                            className="text-green-600 hover:text-green-900 mr-4"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDeleteProduct(product.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
        
        {/* Orders Tab */}
        {activeTab === "orders" && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Orders from Customers</h2>
            <p className="text-gray-500">Here you'll see all orders for your products.</p>
            
            {/* Implement orders table similar to the products table */}
            <div className="mt-8 text-center text-gray-500">Coming soon...</div>
          </div>
        )}
        
        {/* Analytics Tab */}
        {activeTab === "analytics" && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Sales Analytics</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="text-sm text-gray-500 mb-1">Total Sales</div>
                <div className="text-2xl font-bold text-gray-800">{formatCurrency(24590)}</div>
                <div className="text-xs text-green-600 mt-2 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  12.5% increase
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="text-sm text-gray-500 mb-1">Total Orders</div>
                <div className="text-2xl font-bold text-gray-800">28</div>
                <div className="text-xs text-green-600 mt-2 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  8.3% increase
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="text-sm text-gray-500 mb-1">Products Sold</div>
                <div className="text-2xl font-bold text-gray-800">156 units</div>
                <div className="text-xs text-green-600 mt-2 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  15.2% increase
                </div>
              </div>
            </div>
            
            <p className="text-gray-500 text-center">More detailed analytics coming soon...</p>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default SellerDashboard;