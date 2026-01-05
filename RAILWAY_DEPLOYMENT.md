# Railway Deployment Guide

This guide will help you deploy the E-Commerce SaaS backend to Railway.

## Prerequisites

- Railway account ([railway.app](https://railway.app))
- GitHub repository with your code
- MongoDB Atlas database (already configured)
- Stripe account for payments

## Deployment Steps

### 1. Create a New Project on Railway

1. Go to [Railway Dashboard](https://railway.app/dashboard)
2. Click **"New Project"**
3. Select **"Deploy from GitHub repo"**
4. Authorize Railway to access your GitHub account
5. Select your repository: `younglord3302/Doo-ecommerce-store`

### 2. Configure Environment Variables

In your Railway project settings, add the following environment variables:

```bash
# Database
MONGO_URI=mongodb+srv://shankhadeepmondal7_db_user:AolsNh4mM5q7rQ2e@cluster0.m9halmj.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0

# JWT Secret (generate a strong secret)
JWT_SECRET=your_super_secret_jwt_key_here_change_this_in_production

# Stripe
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here

# CORS - Frontend URL
FRONTEND_URL=https://doo-ecommerce-store.vercel.app,http://localhost:3000

# Server Configuration
PORT=5000
NODE_ENV=production
```

> **Important**: Railway automatically provides a `PORT` environment variable. You can use `$PORT` or set it to `5000`.

### 3. Verify Build Configuration

Railway should automatically detect your Node.js project. The build process will:

1. Run `npm install` (including the `postinstall` script for server dependencies)
2. Start the application using `node index.js` (as defined in `package.json`)

### 4. Deploy

1. Railway will automatically deploy after you push to your main branch
2. Monitor the deployment logs in the Railway dashboard
3. Once deployed, Railway will provide you with a public URL (e.g., `https://your-app.up.railway.app`)

### 5. Update Frontend Configuration

After deployment, update your frontend to use the Railway backend URL:

1. In your Vercel project settings, update the environment variable:
   ```
   REACT_APP_API_URL=https://your-app.up.railway.app/api
   ```
2. Redeploy your frontend on Vercel

### 6. Test Your Deployment

1. Visit your Railway URL: `https://your-app.up.railway.app/api/health`
2. You should see: `{"status":"OK","timestamp":"..."}`
3. Test your frontend at `https://doo-ecommerce-store.vercel.app`

## Troubleshooting

### Build Fails

- Check the Railway logs for specific error messages
- Ensure all dependencies are listed in `package.json`
- Verify that `postinstall` script runs successfully

### Connection Issues

- Verify MongoDB URI is correct and accessible from Railway
- Check that MongoDB Atlas allows connections from all IPs (0.0.0.0/0) or Railway's IP ranges
- Ensure CORS is configured with your frontend URL

### Application Crashes

- Check Railway logs for error messages
- Verify all required environment variables are set
- Ensure `NODE_ENV=production` is set

## Seeding the Database

To populate your MongoDB Atlas database with demo data:

```bash
# Locally, with your .env configured
cd server
node seed.js
```

This will create:
- Demo admin account: `admin@demo.com` / `admin123`
- Demo user accounts
- Sample products

## Monitoring

- Use Railway's built-in metrics to monitor CPU, memory, and network usage
- Set up alerts for deployment failures
- Monitor application logs for errors

## Custom Domain (Optional)

1. In Railway project settings, go to **"Settings"** → **"Domains"**
2. Click **"Add Domain"**
3. Follow the instructions to configure your DNS records

---

**Your backend is now deployed and ready to serve your e-commerce application!**
