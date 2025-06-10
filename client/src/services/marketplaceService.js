// Mock API for now - this would connect to your actual backend in production

let mockProducts = [
  {
    id: "1",
    name: "Fresh Organic Tomatoes",
    description: "Farm fresh organic tomatoes grown without pesticides. Perfect for salads and cooking.",
    price: 40,
    stock: 50,
    category: "vegetables",
    seller: "Krishna Farms",
    imageUrl: "https://images.unsplash.com/photo-1561136594-7f68413baa99?w=800&auto=format&fit=crop",
    unitType: "kg",
    rating: 4.8,
    reviews: 24
  },
  {
    id: "2",
    name: "Basmati Rice Premium Quality",
    description: "Premium quality Basmati rice with aromatic flavor. Ideal for biryani and pulao.",
    price: 120,
    stock: 100,
    category: "grains",
    seller: "Sharma Agro Products",
    imageUrl: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&auto=format&fit=crop",
    unitType: "kg",
    rating: 4.6,
    reviews: 52
  },
  {
    id: "3",
    name: "Organic Farm Fresh Milk",
    description: "100% organic cow milk from grass-fed cows. No hormones or antibiotics.",
    price: 60,
    stock: 20,
    category: "dairy",
    seller: "Green Valley Dairy",
    imageUrl: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=800&auto=format&fit=crop",
    unitType: "liter",
    rating: 4.9,
    reviews: 38
  },
  {
    id: "4",
    name: "Garden Hoe Tool",
    description: "Durable garden hoe with wooden handle. Essential tool for any farmer.",
    price: 350,
    stock: 15,
    category: "tools",
    seller: "Farmer Tools Co.",
    imageUrl: "https://images.unsplash.com/photo-1617576683096-00fc8eecb3af?w=800&auto=format&fit=crop",
    unitType: "piece",
    rating: 4.5,
    reviews: 17
  },
  {
    id: "5",
    name: "Organic Wheat Flour",
    description: "Stone-ground organic wheat flour. Perfect for baking bread and chapatis.",
    price: 80,
    stock: 40,
    category: "grains",
    seller: "Nature's Best Grains",
    imageUrl: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&auto=format&fit=crop",
    unitType: "kg",
    rating: 4.7,
    reviews: 29
  },
  {
    id: "6",
    name: "Bio-Organic Fertilizer",
    description: "Chemical-free organic fertilizer that improves soil health and crop yield.",
    price: 450,
    stock: 30,
    category: "fertilizers",
    seller: "Green Earth Products",
    imageUrl: "https://images.unsplash.com/photo-1589928379052-78c80d5d7d9d?w=800&auto=format&fit=crop",
    unitType: "kg",
    rating: 4.8,
    reviews: 42
  }
];

// Mock cart data
let mockCart = [
  {
    productId: "1",
    name: "Fresh Organic Tomatoes",
    price: 40,
    quantity: 2,
    image: "https://images.unsplash.com/photo-1561136594-7f68413baa99?w=800&auto=format&fit=crop",
    seller: "Krishna Farms"
  },
  {
    productId: "2",
    name: "Basmati Rice Premium Quality",
    price: 120,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&auto=format&fit=crop",
    seller: "Sharma Agro Products"
  }
];

// Mock orders data
const mockOrders = [
  {
    id: "order1",
    date: "2025-05-01T10:30:00",
    subtotal: 680.00,
    total: 720.00,
    status: "delivered",
    items: [
      { id: "1", name: "Fresh Organic Tomatoes", quantity: 3, price: 40, image: "https://images.unsplash.com/photo-1561136594-7f68413baa99?w=800&auto=format&fit=crop" },
      { id: "2", name: "Basmati Rice Premium Quality", quantity: 5, price: 120, image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&auto=format&fit=crop" }
    ],
    shipping: {
      name: "Rajesh Kumar",
      address: "123 Village Road",
      city: "Jaipur",
      state: "Rajasthan",
      pincode: "302001",
      phone: "9876543210",
      cost: 40
    },
    paymentMethod: "Cash on Delivery",
    paymentStatus: "Paid"
  },
  {
    id: "order2",
    date: "2025-04-15T14:20:00",
    subtotal: 450.00,
    total: 450.00,
    status: "processing",
    items: [
      { id: "6", name: "Bio-Organic Fertilizer", quantity: 1, price: 450, image: "https://images.unsplash.com/photo-1589928379052-78c80d5d7d9d?w=800&auto=format&fit=crop" }
    ],
    shipping: {
      name: "Rajesh Kumar",
      address: "123 Village Road",
      city: "Jaipur",
      state: "Rajasthan",
      pincode: "302001",
      phone: "9876543210",
      cost: 0
    },
    paymentMethod: "UPI",
    paymentStatus: "Paid"
  }
];

// Product related API functions
export const getAllProducts = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  return [...mockProducts];
};

export const getProductById = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const product = mockProducts.find(p => p.id === id);
  if (!product) throw new Error("Product not found");
  return {...product};
};

export const getProductsByCategory = async (category) => {
  await new Promise(resolve => setTimeout(resolve, 800));
  return mockProducts.filter(p => p.category === category);
};

export const searchProducts = async (query) => {
  await new Promise(resolve => setTimeout(resolve, 800));
  const lowercaseQuery = query.toLowerCase();
  return mockProducts.filter(p => 
    p.name.toLowerCase().includes(lowercaseQuery) || 
    p.description.toLowerCase().includes(lowercaseQuery) ||
    p.category.toLowerCase().includes(lowercaseQuery)
  );
};

/**
 * Fetch product by ID
 */
export const fetchProductById = async (id) => {
  // Simulate API call delay
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const product = mockProducts.find(product => product.id === id);
      if (product) {
        resolve(product);
      } else {
        reject(new Error("Product not found"));
      }
    }, 800);
  });
};

// Cart related functions
export const getCartItems = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return [...mockCart];
};

export const addToCart = async (productId, quantity = 1) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const product = mockProducts.find(p => p.id === productId);
  if (!product) throw new Error("Product not found");
  
  const cartItem = mockCart.find(item => item.productId === productId);
  if (cartItem) {
    // If item already in cart, update the quantity
    cartItem.quantity += quantity;
  } else {
    // Otherwise, add new item to cart
    mockCart.push({
      productId,
      quantity,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl
    });
  }
  
  return [...mockCart];
};

/**
 * Update cart item quantity
 */
export const updateCartItemQuantity = async (productId, quantity) => {
  // Simulate API call delay
  return new Promise((resolve) => {
    setTimeout(() => {
      mockCart = mockCart.map(item => 
        item.productId === productId 
          ? {...item, quantity} 
          : item
      );
      resolve(true);
    }, 500);
  });
};

/**
 * Remove item from cart
 */
export const removeFromCart = async (productId) => {
  // Simulate API call delay
  return new Promise((resolve) => {
    setTimeout(() => {
      mockCart = mockCart.filter(item => item.productId !== productId);
      resolve(true);
    }, 500);
  });
};

/**
 * Clear cart
 */
export const clearCart = async () => {
  // Simulate API call delay
  return new Promise((resolve) => {
    setTimeout(() => {
      mockCart = [];
      resolve(true);
    }, 500);
  });
};

/**
 * Place order
 */
export const placeOrder = async (orderData) => {
  // Simulate API call delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        orderId: "order" + Math.floor(Math.random() * 10000)
      });
    }, 1500);
  });
};

/**
 * Get order by ID
 */
export const getOrderById = async (orderId) => {
  // Simulate API call delay
  return new Promise((resolve) => {
    setTimeout(() => {
      const order = mockOrders.find(order => order.id === orderId);
      resolve(order || null);
    }, 800);
  });
};

// Add these lines to export the categories
export const categories = [
  "All", 
  "vegetables", 
  "fruits", 
  "grains", 
  "dairy", 
  "tools", 
  "seeds", 
  "fertilizers"
];

// Add the fetchProducts function
export const fetchProducts = async (filters) => {
  // Simulate API call delay
  return new Promise((resolve) => {
    setTimeout(() => {
      let filteredProducts = [...mockProducts];
      
      // Apply category filter
      if (filters.category && filters.category !== "All") {
        filteredProducts = filteredProducts.filter(
          product => product.category === filters.category.toLowerCase()
        );
      }
      
      // Apply price filter
      filteredProducts = filteredProducts.filter(
        product => product.price >= filters.minPrice && product.price <= filters.maxPrice
      );
      
      // Apply search filter
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        filteredProducts = filteredProducts.filter(
          product => 
            product.name.toLowerCase().includes(searchTerm) || 
            product.description.toLowerCase().includes(searchTerm)
        );
      }
      
      // Apply sorting
      switch (filters.sort) {
        case 'price-low-high':
          filteredProducts.sort((a, b) => a.price - b.price);
          break;
        case 'price-high-low':
          filteredProducts.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          filteredProducts.sort((a, b) => b.rating - a.rating);
          break;
        // newest first is default
        default:
          // Assuming products with higher IDs are newer
          filteredProducts.sort((a, b) => b.id - a.id);
      }
      
      resolve(filteredProducts);
    }, 500);
  });
};

// getCartItems is already defined above

// Placeholder service functions for seller dashboard
export const getSellerProducts = async (sellerId) => {
  // Simulating API call with mock data
  console.log("Getting products for seller:", sellerId);
  
  // Return mock data
  return [
    {
      id: 1,
      name: "Organic Tomatoes",
      price: 40,
      quantity: 100,
      unit: "kg",
      image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      orders: 5,
      createdAt: "2023-06-01"
    },
    {
      id: 2,
      name: "Fresh Potatoes",
      price: 25,
      quantity: 150,
      unit: "kg",
      image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      orders: 12,
      createdAt: "2023-06-03"
    }
  ];
};

export const deleteProduct = async (productId) => {
  // Simulating API call to delete product
  console.log("Deleting product:", productId);
  return { success: true, message: "Product deleted successfully" };
};

// Add this function to your existing marketplaceService.js
export const addProduct = async (productData) => {
  try {
    const token = localStorage.getItem('token');
    
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(productData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to add product');
    }

    return await response.json();
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
};