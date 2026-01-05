# Render Deployment Guide

This guide will help you deploy the E-Commerce SaaS backend to Render.

## Prerequisites

- Render account ([render.com](https://render.com))
- GitHub repository with your code
- MongoDB Atlas database (already configured)
- Stripe account for payments

## Deployment Steps

### 1. Create a New Web Service on Render

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository: `younglord3302/Doo-ecommerce-store`
4. Render will detect your repository

### 2. Configure Build Settings

In the Render service configuration:

- **Name**: `doo-ecommerce-backend` (or your preferred name)
- **Region**: Choose closest to your users (e.g., Oregon, Frankfurt, Singapore)
- **Branch**: `main`
- **Root Directory**: Leave empty (root of repo)
- **Runtime**: `Node`
- **Build Command**: `npm install && npm install --prefix server`
- **Start Command**: `node index.js`
- **Instance Type**: Free (for testing) or Starter (for production)

### 3. Configure Environment Variables

In the **Environment** section, add these variables:

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

> **Note**: Render automatically provides a `PORT` environment variable. The app will use Render's PORT if available, otherwise fallback to 5000.

### 4. Deploy

1. Click **"Create Web Service"**
2. Render will automatically build and deploy your application
3. Monitor the deployment logs in the Render dashboard
4. Once deployed, Render will provide you with a public URL (e.g., `https://doo-ecommerce-backend.onrender.com`)

### 5. Update Frontend Configuration

After deployment, update your frontend to use the Render backend URL:

1. In your Vercel project settings, update the environment variable:
   ```
   REACT_APP_API_URL=https://your-app.onrender.com/api
   ```
2. Redeploy your frontend on Vercel

### 6. Test Your Deployment

1. Visit your Render URL: `https://your-app.onrender.com/api/health`
2. You should see: `{"status":"OK","timestamp":"..."}`
3. Test your frontend at `https://doo-ecommerce-store.vercel.app`

## Important: Free Tier Limitations

> **⚠️ Render Free Tier**: 
> - Services spin down after 15 minutes of inactivity
> - First request after inactivity may take 30-60 seconds (cold start)
> - Consider upgrading to Starter plan ($7/month) for always-on service

## Troubleshooting

### Build Fails

- Check the Render logs for specific error messages
- Ensure build command includes both root and server dependencies
- Verify that `package.json` files are correct

### Connection Issues

- Verify MongoDB URI is correct and accessible from Render
- Check that MongoDB Atlas allows connections from all IPs (0.0.0.0/0)
- Ensure CORS is configured with your frontend URL

### Application Crashes

- Check Render logs for error messages
- Verify all required environment variables are set
- Ensure `NODE_ENV=production` is set
- Check that the start command is correct: `node index.js`

### Cold Starts (Free Tier)

If using the free tier:
- First request after inactivity takes 30-60 seconds
- Consider using a service like [UptimeRobot](https://uptimerobot.com/) to ping your API every 14 minutes
- Or upgrade to Starter plan for always-on service

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

- Use Render's built-in metrics to monitor CPU, memory, and network usage
- Set up alerts for deployment failures
- Monitor application logs for errors
- Check the "Metrics" tab in your Render service

## Custom Domain (Optional)

1. In Render service settings, go to **"Settings"** → **"Custom Domain"**
2. Click **"Add Custom Domain"**
3. Follow the instructions to configure your DNS records

## Auto-Deploy

Render automatically deploys when you push to your `main` branch:
- Push changes to GitHub
- Render detects the changes
- Automatically builds and deploys

---

**Your backend is now deployed on Render and ready to serve your e-commerce application!**
