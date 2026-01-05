# E-Commerce SaaS Application

A full-stack e-commerce platform built with React, Node.js, Express, MongoDB, and Docker. Features user authentication, product catalog, shopping cart, payment processing with Stripe, and admin panel.

## 🚀 Features

### Core Features

- **User Authentication**: Register, login, profile management
- **Product Catalog**: Browse products with search, filtering, and pagination
- **Shopping Cart**: Add, update, remove items with persistent storage
- **Checkout & Payments**: Secure payment processing with Stripe
- **Order Management**: Track orders, order history, status updates
- **Admin Panel**: Manage products, orders, users, and analytics

### Technical Features

- **Docker Containerization**: Full-stack deployment with docker-compose
- **JWT Authentication**: Secure token-based authentication
- **MongoDB Database**: NoSQL database with Mongoose ODM
- **RESTful API**: Well-structured API endpoints
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Security**: Helmet, CORS, rate limiting, input validation

## 🏗️ Architecture

```
├── client/          # React frontend
├── server/          # Node.js/Express backend
├── docker-compose.yml
└── README.md
```

### Services

- **Frontend**: React app with routing and state management
- **Backend**: Express.js API with authentication and business logic
- **Database**: MongoDB for data persistence
- **Reverse Proxy**: Nginx (for production deployment)

## 🛠️ Tech Stack

### Frontend

- React 18
- React Router DOM
- Axios for API calls
- Tailwind CSS
- React Toastify
- Stripe Elements

### Backend

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing
- Stripe for payments
- Multer for file uploads

### DevOps

- Docker & Docker Compose
- MongoDB
- Nginx (production)

## 🚀 Getting Started

### Prerequisites

- Docker and Docker Compose
- Node.js 18+ (for local development)
- MongoDB (handled by Docker)

### Quick Demo Start (Recommended)

1. **Start with Docker (includes demo data)**

   ```bash
   cd saas
   docker-compose up --build
   ```

2. **Access the demo application**
   - Frontend: <http://localhost:3000>
   - **Demo Accounts:**
     - Admin: `admin@demo.com` / `admin123`
     - User: `john@demo.com` / `admin123`
     - User: `jane@demo.com` / `admin123`

3. **Explore the demo features**
   - Browse 6 pre-loaded products
   - Test shopping cart functionality
   - View sample orders and user profiles
   - Access admin panel for full management

### Full Development Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd saas
   ```

2. **Environment Setup**

   ```bash
   # Copy environment files
   cp server/.env.example server/.env
   ```

3. **Configure Environment Variables**

   ```bash
   # server/.env
   MONGO_URI=mongodb://admin:password123@mongodb:27017/ecommerce?authSource=admin
   JWT_SECRET=your_super_secret_jwt_key_here
   STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
   FRONTEND_URL=http://localhost:3000
   PORT=5000
   NODE_ENV=development
   ```

4. **Start with Docker**

   ```bash
   # Build and start all services with demo data
   docker-compose up --build

   # Or run in background
   docker-compose up -d --build
   ```

5. **Access the Application**
   - Frontend: <http://localhost:3000>
   - Backend API: <http://localhost:5000>
   - MongoDB: localhost:27017

### Local Development Setup (Without Docker)

If you prefer to run the services directly on your machine:

1. **Prerequisites**
   - Node.js 18+
   - MongoDB running locally on port 27017

2. **Backend Setup**

   ```bash
   cd server
   npm install
   cp .env.example .env
   # Update MONGO_URI in .env if needed (default: mongodb://localhost:27017/ecommerce)
   npm run dev
   ```

3. **Frontend Setup**

   ```bash
   cd client
   npm install
   npm start
   ```

4. **Seeding the Database**
   I have added a custom seeding script to easily populate your local database:

   ```bash
   cd server
   node seed.js
   ```

### 📦 Demo Data & Accounts

The seeding script provides a complete starting environment:

- **Demo Accounts:**
  - Admin: `admin@demo.com` / `admin123`
  - User: `john@demo.com` / `admin123`
  - User: `jane@demo.com` / `admin123`

- **Products (10+ items):**
  - **Electronics**: Wireless Headphones, Smart Watch, Ultra-Wide Monitor
  - **Gaming**: Mechanical Keyboard
  - **Home Office**: Ergonomic Office Chair
  - **Kitchen**: Professional Chef Knife
  - ... and more!

## 📁 Project Structure

### Backend Structure

```
server/
├── models/          # MongoDB schemas
│   ├── User.js
│   ├── Product.js
│   ├── Order.js
│   └── Cart.js
├── routes/          # API routes
│   ├── auth.js
│   ├── products.js
│   ├── cart.js
│   ├── orders.js
│   └── admin.js
├── middleware/      # Custom middleware
│   └── auth.js
├── uploads/         # Product images
├── server.js        # Main server file
├── package.json
└── Dockerfile
```

### Frontend Structure

```
client/
├── public/
├── src/
│   ├── components/  # Reusable components
│   ├── pages/       # Page components
│   ├── context/     # React context
│   ├── App.js
│   ├── index.js
│   └── index.css
├── package.json
└── Dockerfile
```

## 🔧 API Endpoints

### Authentication

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update profile

### Products

- `GET /api/products` - List products (with filtering/search)
- `GET /api/products/:id` - Get product details
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Cart

- `GET /api/cart` - Get user's cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:itemId` - Update cart item
- `DELETE /api/cart/:itemId` - Remove item from cart
- `DELETE /api/cart` - Clear cart

### Orders

- `POST /api/orders` - Create order from cart
- `GET /api/orders` - Get user's orders
- `GET /api/orders/:id` - Get order details
- `POST /api/orders/create-payment-intent` - Create Stripe payment intent

### Admin

- `GET /api/admin/dashboard` - Dashboard stats
- `GET /api/admin/users` - List all users
- `PUT /api/admin/users/:id` - Update user role/status
- `GET /api/admin/analytics/orders` - Order analytics

## 🔒 Security Features

- **JWT Authentication**: Secure token-based auth
- **Password Hashing**: bcrypt with 12 salt rounds
- **Rate Limiting**: Express rate limiter
- **CORS**: Configured for frontend origin
- **Helmet**: Security headers
- **Input Validation**: express-validator
- **File Upload Security**: Multer with file type validation

## 💳 Payment Integration

Integrated with Stripe for secure payment processing:

- Payment Intents API
- Webhook support (can be extended)
- Secure client-side payment collection

## 📊 Admin Features

- Dashboard with key metrics
- User management
- Product management
- Order management and status updates
- Analytics and reporting

## 🚀 Deployment

### Production Docker Setup

```bash
# Build for production
docker-compose -f docker-compose.prod.yml up --build
```

### Vercel Deployment (Frontend)

The frontend is ready for Vercel:
1. Push your code to GitHub.
2. Link your repository in the Vercel Dashboard.
3. Configure the following **Environment Variables**:
   - `REACT_APP_API_URL`: Your deployed backend URL (e.g., `https://api.myapp.com/api`)
   - `REACT_APP_STRIPE_PUBLISHABLE_KEY`: Your Stripe publishable key.
4. Set the **Root Directory** to `client`.
5. Vercel will automatically detect the build settings (Build Command: `npm run build`, Output Directory: `build`).

### Environment Variables for Production

- Set strong JWT secrets
- Configure production MongoDB URI
- Set up Stripe live keys
- Configure domain URLs

## 🧪 Testing

```bash
# Backend tests
cd server
npm test

# Frontend tests
cd client
npm test
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make changes and test
4. Submit a pull request

## 📝 License

This project is licensed under the ISC License.

## 📞 Support

For support, please create an issue in the repository or contact the development team.

---

**Note**: This is a comprehensive e-commerce SaaS foundation that can be extended with additional features like multi-tenancy, subscription management, advanced analytics, and more.
