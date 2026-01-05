// MongoDB initialization script for demo data
// This script runs when MongoDB container starts

// Switch to the ecommerce database
db = db.getSiblingDB('ecommerce');

// Create collections and insert demo data

// Users collection
db.users.insertMany([
  {
    name: "Admin User",
    email: "admin@demo.com",
    password: "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LezfxTT.D0/DJmXGK", // password: admin123
    role: "admin",
    avatar: "",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "John Doe",
    email: "john@demo.com",
    password: "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LezfxTT.D0/DJmXGK", // password: admin123
    role: "user",
    avatar: "",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Jane Smith",
    email: "jane@demo.com",
    password: "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LezfxTT.D0/DJmXGK", // password: admin123
    role: "user",
    avatar: "",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);

// Products collection
db.products.insertMany([
  {
    name: "Wireless Bluetooth Headphones",
    description: "High-quality wireless headphones with noise cancellation, 30-hour battery life, and premium sound quality. Perfect for music lovers and professionals.",
    price: 199.99,
    originalPrice: 249.99,
    category: "Electronics",
    brand: "AudioTech",
    images: [
      {
        url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
        alt: "Wireless Bluetooth Headphones"
      }
    ],
    inventory: {
      quantity: 25,
      sku: "ATH-WBH-001"
    },
    variants: [
      {
        name: "Color",
        values: ["Black", "White", "Blue"]
      }
    ],
    attributes: {
      "Battery Life": "30 hours",
      "Connectivity": "Bluetooth 5.0",
      "Weight": "250g"
    },
    seo: {
      metaTitle: "Premium Wireless Bluetooth Headphones - AudioTech",
      metaDescription: "Experience superior sound with our wireless Bluetooth headphones featuring noise cancellation and 30-hour battery life.",
      slug: "wireless-bluetooth-headphones"
    },
    isActive: true,
    isFeatured: true,
    tags: ["wireless", "bluetooth", "headphones", "audio"],
    ratings: {
      average: 4.5,
      count: 128
    },
    createdBy: db.users.findOne({email: "admin@demo.com"})._id,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Smart Fitness Watch",
    description: "Advanced fitness tracking watch with heart rate monitoring, GPS, sleep tracking, and 7-day battery life. Water-resistant up to 50 meters.",
    price: 299.99,
    originalPrice: null,
    category: "Electronics",
    brand: "FitTech",
    images: [
      {
        url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
        alt: "Smart Fitness Watch"
      }
    ],
    inventory: {
      quantity: 15,
      sku: "FT-SFW-002"
    },
    variants: [
      {
        name: "Size",
        values: ["Small", "Medium", "Large"]
      }
    ],
    attributes: {
      "Display": "1.4 inch AMOLED",
      "Battery": "7 days",
      "Water Resistance": "50 meters",
      "Sensors": "Heart Rate, GPS, Accelerometer"
    },
    seo: {
      metaTitle: "Smart Fitness Watch with GPS - FitTech",
      metaDescription: "Track your fitness goals with our advanced smart watch featuring heart rate monitoring and GPS tracking.",
      slug: "smart-fitness-watch"
    },
    isActive: true,
    isFeatured: true,
    tags: ["fitness", "smartwatch", "gps", "health"],
    ratings: {
      average: 4.7,
      count: 89
    },
    createdBy: db.users.findOne({email: "admin@demo.com"})._id,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Organic Cotton T-Shirt",
    description: "Comfortable and sustainable organic cotton t-shirt. Soft, breathable, and eco-friendly. Available in multiple colors and sizes.",
    price: 29.99,
    originalPrice: 39.99,
    category: "Clothing",
    brand: "EcoWear",
    images: [
      {
        url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
        alt: "Organic Cotton T-Shirt"
      }
    ],
    inventory: {
      quantity: 50,
      sku: "EW-OCT-003"
    },
    variants: [
      {
        name: "Size",
        values: ["S", "M", "L", "XL", "XXL"]
      },
      {
        name: "Color",
        values: ["White", "Black", "Gray", "Navy"]
      }
    ],
    attributes: {
      "Material": "100% Organic Cotton",
      "Fit": "Regular",
      "Care": "Machine wash cold"
    },
    seo: {
      metaTitle: "Organic Cotton T-Shirt - EcoWear",
      metaDescription: "Comfortable and sustainable organic cotton t-shirt. Soft, breathable, and eco-friendly fashion.",
      slug: "organic-cotton-t-shirt"
    },
    isActive: true,
    isFeatured: false,
    tags: ["organic", "cotton", "t-shirt", "sustainable"],
    ratings: {
      average: 4.3,
      count: 67
    },
    createdBy: db.users.findOne({email: "admin@demo.com"})._id,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Ceramic Coffee Mug Set",
    description: "Beautiful set of 4 ceramic coffee mugs with unique designs. Perfect for your morning coffee or as a thoughtful gift.",
    price: 49.99,
    originalPrice: null,
    category: "Home & Kitchen",
    brand: "HomeStyle",
    images: [
      {
        url: "https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=500",
        alt: "Ceramic Coffee Mug Set"
      }
    ],
    inventory: {
      quantity: 30,
      sku: "HS-CCM-004"
    },
    variants: [
      {
        name: "Design",
        values: ["Floral", "Geometric", "Minimalist"]
      }
    ],
    attributes: {
      "Material": "Ceramic",
      "Capacity": "12 oz each",
      "Set Size": "4 mugs",
      "Microwave Safe": "Yes"
    },
    seo: {
      metaTitle: "Ceramic Coffee Mug Set - HomeStyle",
      metaDescription: "Beautiful ceramic coffee mug set with unique designs. Perfect for coffee lovers and home decor.",
      slug: "ceramic-coffee-mug-set"
    },
    isActive: true,
    isFeatured: true,
    tags: ["coffee", "mugs", "ceramic", "kitchen"],
    ratings: {
      average: 4.6,
      count: 45
    },
    createdBy: db.users.findOne({email: "admin@demo.com"})._id,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Wireless Charging Pad",
    description: "Fast wireless charging pad compatible with all Qi-enabled devices. LED indicator and overcharge protection.",
    price: 39.99,
    originalPrice: 49.99,
    category: "Electronics",
    brand: "ChargeTech",
    images: [
      {
        url: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500",
        alt: "Wireless Charging Pad"
      }
    ],
    inventory: {
      quantity: 40,
      sku: "CT-WCP-005"
    },
    variants: [],
    attributes: {
      "Compatibility": "Qi-enabled devices",
      "Charging Speed": "10W fast charging",
      "LED Indicator": "Yes",
      "Protection": "Overcharge, short-circuit"
    },
    seo: {
      metaTitle: "Wireless Charging Pad - ChargeTech",
      metaDescription: "Fast wireless charging pad compatible with all Qi-enabled devices. LED indicator and safety features.",
      slug: "wireless-charging-pad"
    },
    isActive: true,
    isFeatured: false,
    tags: ["wireless", "charging", "electronics", "phone"],
    ratings: {
      average: 4.4,
      count: 92
    },
    createdBy: db.users.findOne({email: "admin@demo.com"})._id,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Bestselling Mystery Novel",
    description: "Gripping mystery novel by bestselling author. A page-turner that will keep you guessing until the very end.",
    price: 16.99,
    originalPrice: 19.99,
    category: "Books",
    brand: "Literary Press",
    images: [
      {
        url: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500",
        alt: "Bestselling Mystery Novel"
      }
    ],
    inventory: {
      quantity: 20,
      sku: "LP-MN-006"
    },
    variants: [
      {
        name: "Format",
        values: ["Paperback", "Hardcover", "E-book"]
      }
    ],
    attributes: {
      "Pages": "384",
      "Genre": "Mystery",
      "Language": "English",
      "ISBN": "978-1234567890"
    },
    seo: {
      metaTitle: "Bestselling Mystery Novel - Literary Press",
      metaDescription: "Gripping mystery novel by bestselling author. A page-turner that will keep you guessing.",
      slug: "bestselling-mystery-novel"
    },
    isActive: true,
    isFeatured: true,
    tags: ["mystery", "novel", "bestseller", "book"],
    ratings: {
      average: 4.8,
      count: 156
    },
    createdBy: db.users.findOne({email: "admin@demo.com"})._id,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);

// Sample order for demo
const johnUser = db.users.findOne({email: "john@demo.com"});
const headphonesProduct = db.products.findOne({name: "Wireless Bluetooth Headphones"});

db.orders.insertOne({
  user: johnUser._id,
  orderNumber: "ORD-DEMO-001",
  items: [
    {
      product: headphonesProduct._id,
      name: headphonesProduct.name,
      price: headphonesProduct.price,
      quantity: 1,
      image: headphonesProduct.images[0].url,
      variant: {}
    }
  ],
  shippingAddress: {
    firstName: "John",
    lastName: "Doe",
    email: "john@demo.com",
    phone: "+1234567890",
    address: {
      street: "123 Main St",
      city: "Anytown",
      state: "CA",
      zipCode: "12345",
      country: "US"
    }
  },
  billingAddress: {
    firstName: "John",
    lastName: "Doe",
    email: "john@demo.com",
    phone: "+1234567890",
    address: {
      street: "123 Main St",
      city: "Anytown",
      state: "CA",
      zipCode: "12345",
      country: "US"
    }
  },
  payment: {
    method: "stripe",
    status: "paid",
    amount: 199.99,
    currency: "usd"
  },
  shipping: {
    method: "standard",
    cost: 0,
    status: "shipped"
  },
  status: "delivered",
  subtotal: 199.99,
  tax: 16.00,
  total: 215.99,
  statusHistory: [
    {
      status: "pending",
      timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      note: "Order placed"
    },
    {
      status: "confirmed",
      timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
      note: "Payment confirmed"
    },
    {
      status: "shipped",
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      note: "Order shipped"
    },
    {
      status: "delivered",
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      note: "Order delivered"
    }
  ],
  createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
  updatedAt: new Date()
});

// Sample cart for Jane
const janeUser = db.users.findOne({email: "jane@demo.com"});
const watchProduct = db.products.findOne({name: "Smart Fitness Watch"});
const mugProduct = db.products.findOne({name: "Ceramic Coffee Mug Set"});

db.carts.insertOne({
  user: janeUser._id,
  items: [
    {
      product: watchProduct._id,
      quantity: 1,
      variant: { size: "Medium" },
      addedAt: new Date()
    },
    {
      product: mugProduct._id,
      quantity: 2,
      variant: { design: "Floral" },
      addedAt: new Date()
    }
  ],
  expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  createdAt: new Date(),
  updatedAt: new Date()
});

print("Demo data initialization completed!");
print("Created users: admin@demo.com, john@demo.com, jane@demo.com");
print("Created products: 6 sample products across different categories");
print("Created sample order and cart for testing");
print("All passwords: admin123");
