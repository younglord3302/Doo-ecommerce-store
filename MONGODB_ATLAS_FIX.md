# Fix MongoDB Atlas Connection Issue

## Problem

Your Render deployment is successful, but MongoDB Atlas is blocking the connection because Render's IP address isn't on the whitelist.

**Error**: `Could not connect to any servers in your MongoDB Atlas cluster. One common reason is that you're trying to access the database from an IP that isn't whitelisted.`

## Solution: Whitelist Render IPs in MongoDB Atlas

### Option 1: Allow All IPs (Easiest - Recommended for Development)

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Sign in to your account
3. Select your project (the one with `cluster0.m9halmj.mongodb.net`)
4. Click **"Network Access"** in the left sidebar (under Security)
5. Click **"Add IP Address"** button
6. Click **"Allow Access from Anywhere"**
   - This will add `0.0.0.0/0` to the whitelist
7. Click **"Confirm"**

> **Note**: This allows connections from any IP address. MongoDB Atlas still requires authentication (username/password), so this is reasonably secure for most use cases.

### Option 2: Whitelist Specific Render IPs (More Secure)

If you prefer to whitelist only Render's IP addresses:

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Click **"Network Access"** → **"Add IP Address"**
3. Add these Render IP ranges one by one:

```
35.169.0.0/16
44.195.0.0/16
52.3.0.0/16
54.81.0.0/16
54.156.0.0/16
54.157.0.0/16
54.158.0.0/16
54.159.0.0/16
54.204.0.0/16
54.205.0.0/16
54.208.0.0/16
54.209.0.0/16
54.210.0.0/16
54.211.0.0/16
```

> **Note**: Render uses AWS infrastructure, so these are AWS IP ranges. For the most up-to-date list, check [Render's documentation](https://render.com/docs/static-outbound-ip-addresses).

## Verification

After whitelisting the IPs:

1. Wait 1-2 minutes for MongoDB Atlas to apply the changes
2. Your Render service should automatically reconnect
3. Check Render logs - you should see: `MongoDB connected`
4. Test your API: `https://doo-ecommerce-store.onrender.com/api/health`

## Expected Result

Once the whitelist is updated, you should see in your Render logs:

```
Server running on port 10000
MongoDB connected
```

And your API health check should return:

```json
{
  "status": "OK",
  "timestamp": "2026-01-05T12:45:00.000Z"
}
```

---

**Recommended**: Use Option 1 (Allow Access from Anywhere) for simplicity. MongoDB Atlas authentication still protects your database.
