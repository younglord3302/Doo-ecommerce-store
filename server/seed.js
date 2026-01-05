const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('./models/User');
const Product = require('./models/Product');
const Order = require('./models/Order');
const Cart = require('./models/Cart');

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/ecommerce');
        console.log('Connected to MongoDB');

        // Clear existing data
        await User.deleteMany({});
        await Product.deleteMany({});
        await Order.deleteMany({});
        await Cart.deleteMany({});

        console.log('Cleared existing data');

        // Create Admin User - Use raw password, Schema's .pre('save') handles hashing
        const admin = await User.create({
            name: "Admin User",
            email: "admin@demo.com",
            password: "admin123", // schema hashes this
            role: "admin",
            avatar: "",
            isActive: true
        });

        const john = await User.create({
            name: "John Doe",
            email: "john@demo.com",
            password: "admin123", // schema hashes this
            role: "user",
            avatar: "",
            isActive: true
        });

        const jane = await User.create({
            name: "Jane Smith",
            email: "jane@demo.com",
            password: "admin123", // schema hashes this
            role: "user",
            avatar: "",
            isActive: true
        });

        console.log('Created users');

        // Create Products
        const products = await Product.insertMany([
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
                createdBy: admin._id
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
                createdBy: admin._id
            },
            {
                name: "Mechanical Gaming Keyboard",
                description: "RGB backlit mechanical keyboard with tactile switches for precision gaming and long-lasting durability.",
                price: 129.99,
                originalPrice: 159.99,
                category: "Gaming",
                brand: "GameMaster",
                images: [{ url: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=500", alt: "Mechanical Gaming Keyboard" }],
                inventory: { quantity: 50, sku: "GM-MK-003" },
                variants: [{ name: "Switch Type", values: ["Blue", "Red", "Brown"] }],
                attributes: { "Layout": "Full size", "Connectivity": "Wired USB", "Backlight": "RGB" },
                seo: { metaTitle: "Pro Mechanical Gaming Keyboard - GameMaster", slug: "gaming-keyboard" },
                isActive: true,
                isFeatured: false,
                createdBy: admin._id
            },
            {
                name: "Ergonomic Office Chair",
                description: "High-back mesh ergonomic chair with lumbar support and adjustable armrests for maximum comfort during long work hours.",
                price: 249.00,
                originalPrice: 299.00,
                category: "Home Office",
                brand: "ComfortWork",
                images: [{ url: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=500", alt: "Ergonomic Office Chair" }],
                inventory: { quantity: 12, sku: "CW-OC-004" },
                variants: [{ name: "Color", values: ["Black", "Grey"] }],
                attributes: { "Material": "Breathable Mesh", "Gas Lift": "Class 4", "Weight Capacity": "150kg" },
                seo: { metaTitle: "Ergonomic Mesh Office Chair - ComfortWork", slug: "office-chair" },
                isActive: true,
                isFeatured: true,
                createdBy: admin._id
            },
            {
                name: "Ultra-Wide Gaming Monitor",
                description: "34-inch curved ultra-wide gaming monitor with 144Hz refresh rate and 1ms response time.",
                price: 499.99,
                originalPrice: 599.99,
                category: "Electronics",
                brand: "ViewMaster",
                images: [{ url: "https://images.unsplash.com/photo-1527443224154-c4a3942d3fff?w=500", alt: "Ultra-Wide Gaming Monitor" }],
                inventory: { quantity: 8, sku: "VM-UGM-005" },
                variants: [],
                attributes: { "Resolution": "3440 x 1440", "Panel": "IPS", "Sync": "FreeSync Premium" },
                seo: { metaTitle: "34-inch Curved Ultra-Wide Monitor - ViewMaster", slug: "gaming-monitor" },
                isActive: true,
                isFeatured: true,
                createdBy: admin._id
            },
            {
                name: "Professional Chef Knife",
                description: "Hand-forged high-carbon stainless steel chef knife, 8 inches, balanced for precision cutting.",
                price: 89.00,
                originalPrice: 110.00,
                category: "Kitchen",
                brand: "SharpEdge",
                images: [{ url: "https://images.unsplash.com/photo-1593618998160-e34014e67546?w=500", alt: "Professional Chef Knife" }],
                inventory: { quantity: 100, sku: "SE-CK-006" },
                variants: [],
                attributes: { "Blade length": "8 inch", "Blade material": "High-carbon stainless steel" },
                seo: { metaTitle: "8-inch Pro Chef Knife - SharpEdge", slug: "chef-knife" },
                isActive: true,
                isFeatured: false,
                createdBy: admin._id
            }
        ]);

        console.log('Created products');

        // Sample Order
        await Order.create({
            user: john._id,
            orderNumber: "ORD-DEMO-001",
            items: [
                {
                    product: products[0]._id,
                    name: products[0].name,
                    price: products[0].price,
                    quantity: 1,
                    image: products[0].images[0].url,
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
                }
            ]
        });

        console.log('Created sample order');
        console.log('Seed completed successfully!');
        process.exit(0);
    } catch (err) {
        console.error('Error seeding data:', err);
        process.exit(1);
    }
};

seedData();
