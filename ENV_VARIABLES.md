# Quick Reference: Environment Variables

This document provides a quick reference for all environment variables needed for deployment.

## Backend Environment Variables (Render)

Copy these to your Render service environment settings:

```bash
# Database - MongoDB Atlas
MONGO_URI=mongodb+srv://shankhadeepmondal7_db_user:AolsNh4mM5q7rQ2e@cluster0.m9halmj.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0

# JWT Secret - Generate a strong random string
JWT_SECRET=your_super_secret_jwt_key_here_change_this_in_production

# Stripe - Get from https://dashboard.stripe.com/apikeys
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here

# CORS - Your frontend URL(s)
FRONTEND_URL=https://doo-ecommerce-store.vercel.app,http://localhost:3000

# Server Configuration
PORT=5000
NODE_ENV=production
```

## Frontend Environment Variables (Vercel)

Set these in your Vercel project settings:

```bash
# Backend API URL - Update after Railway deployment
REACT_APP_API_URL=https://your-railway-app.up.railway.app/api

# Stripe Publishable Key - Get from https://dashboard.stripe.com/apikeys
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
```

## Security Notes

> **⚠️ IMPORTANT**: Before going to production:
> 
> 1. **Generate a strong JWT_SECRET**: Use a random string generator (at least 32 characters)
> 2. **Use Stripe Live Keys**: Replace test keys with live keys from Stripe dashboard
> 3. **Update MongoDB Password**: Consider rotating the database password
> 4. **Restrict MongoDB Access**: Configure IP whitelist in MongoDB Atlas (optional but recommended)

## MongoDB Atlas Configuration

Ensure your MongoDB Atlas cluster allows connections from Railway:

1. Go to MongoDB Atlas → Network Access
2. Add IP Address: `0.0.0.0/0` (allows all IPs - suitable for Railway)
3. Or use Railway's specific IP ranges if you prefer stricter security

## Stripe Configuration

1. Get your API keys from [Stripe Dashboard](https://dashboard.stripe.com/apikeys)
2. Use **test keys** for development (starts with `sk_test_` and `pk_test_`)
3. Use **live keys** for production (starts with `sk_live_` and `pk_live_`)

---

**Ready to deploy?** Follow the [RENDER_DEPLOYMENT.md](./RENDER_DEPLOYMENT.md) guide.
