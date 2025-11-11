# Deployment Guide - SmartHealthCare

This guide will help you deploy the SmartHealthCare application to production.

## Prerequisites

Before deploying, ensure you have:
- MongoDB Atlas account (or other MongoDB hosting)
- Cloudinary account
- eSewa merchant account (for payment processing)
- Hosting services for:
  - Backend (Node.js hosting like Render, Railway, Heroku)
  - Frontend (Static hosting like Vercel, Netlify)
  - Admin Panel (Static hosting like Vercel, Netlify)

## Step 1: Prepare MongoDB Database

1. Create a MongoDB Atlas cluster (free tier available)
2. Create a database user with read/write permissions
3. Whitelist your application's IP addresses (or use 0.0.0.0/0 for all IPs)
4. Get the connection string

## Step 2: Setup Cloudinary

1. Sign up for Cloudinary (free tier available)
2. Get your credentials:
   - Cloud Name
   - API Key
   - API Secret
3. Configure upload presets if needed

## Step 3: Backend Deployment

### Option A: Deploy to Render (Recommended)

1. Create a Render account
2. Create a new Web Service
3. Connect your GitHub repository
4. Configure:
   - Build Command: `cd Backend && npm install`
   - Start Command: `cd Backend && npm start`
   - Add environment variables:
     ```
     MONGODB_URI=<your-mongodb-uri>
     CLOUDINARY_NAME=<your-cloudinary-name>
     CLOUDINARY_API_KEY=<your-api-key>
     CLOUDINARY_API_SECRET=<your-api-secret>
     ADMIN_EMAIL=<admin-email>
     ADMIN_PASSWORD=<admin-password>
     JWT_SECRET=<random-secret-string>
     PORT=9000
     ```
5. Deploy

### Option B: Deploy to Railway

1. Create a Railway account
2. Create a new project from GitHub repo
3. Select the Backend directory
4. Add environment variables (same as above)
5. Deploy

### Option C: Deploy to Heroku

1. Install Heroku CLI
2. Login to Heroku:
   ```bash
   heroku login
   ```
3. Create a new app:
   ```bash
   heroku create your-app-name
   ```
4. Add buildpack:
   ```bash
   heroku buildpacks:set heroku/nodejs
   ```
5. Set environment variables:
   ```bash
   heroku config:set MONGODB_URI=<your-uri>
   heroku config:set CLOUDINARY_NAME=<your-name>
   # ... (set all other env variables)
   ```
6. Deploy:
   ```bash
   git subtree push --prefix Backend heroku main
   ```

## Step 4: Frontend Deployment

### Deploy to Vercel (Recommended)

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Navigate to Frontend directory:
   ```bash
   cd Frontend
   ```

3. Update `.env`:
   ```env
   VITE_BACKEND_URL=<your-backend-url>
   ```

4. Build the project:
   ```bash
   npm run build
   ```

5. Deploy:
   ```bash
   vercel --prod
   ```

### Deploy to Netlify

1. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

2. Build the project:
   ```bash
   npm run build
   ```

3. Deploy:
   ```bash
   netlify deploy --prod --dir=dist
   ```

4. Add environment variable in Netlify dashboard:
   - Go to Site settings > Environment variables
   - Add `VITE_BACKEND_URL`

## Step 5: Admin Panel Deployment

Follow the same steps as Frontend deployment, but use the Admin directory instead.

### Deploy to Vercel

1. Navigate to Admin directory:
   ```bash
   cd Admin
   ```

2. Update `.env`:
   ```env
   VITE_BACKEND_URL=<your-backend-url>
   ```

3. Deploy:
   ```bash
   vercel --prod
   ```

## Step 6: Configure CORS

Update the backend's CORS configuration to allow requests from your frontend and admin URLs:

In `Backend/server.js`:
```javascript
app.use(cors({
  origin: [
    'https://your-frontend-url.vercel.app',
    'https://your-admin-url.vercel.app',
    'http://localhost:5173', // for local development
    'http://localhost:5174'  // for local development
  ],
  credentials: true
}));
```

## Step 7: Test the Deployment

1. Test user registration and login
2. Test doctor addition (admin)
3. Test appointment booking
4. Test eSewa payment flow
5. Test doctor portal
6. Test all CRUD operations

## Step 8: Setup Custom Domain (Optional)

### For Frontend & Admin (Vercel)
1. Go to project settings
2. Navigate to Domains
3. Add your custom domain
4. Update DNS records as instructed

### For Backend (Render)
1. Go to your web service
2. Click on Settings
3. Add custom domain
4. Update DNS records

## Step 9: Enable HTTPS

- Vercel and Netlify automatically provide SSL certificates
- For Render, SSL is included by default
- For custom domains, ensure SSL certificates are properly configured

## Step 10: Monitor and Maintain

### Set up monitoring:
1. Enable application logging
2. Monitor database usage
3. Set up error tracking (e.g., Sentry)
4. Monitor API response times

### Regular maintenance:
1. Keep dependencies updated
2. Rotate JWT secrets periodically
3. Monitor and optimize database queries
4. Review and update security policies

## Troubleshooting

### Common Issues

1. **CORS errors**
   - Check backend CORS configuration
   - Ensure frontend URLs are whitelisted

2. **Database connection issues**
   - Verify MongoDB connection string
   - Check IP whitelist in MongoDB Atlas
   - Ensure database user has proper permissions

3. **Image upload failures**
   - Verify Cloudinary credentials
   - Check API rate limits
   - Ensure file size limits are appropriate

4. **Payment integration issues**
   - Verify eSewa merchant credentials
   - Check callback URLs
   - Test in sandbox mode first

5. **Environment variables not loading**
   - Verify all env variables are set on hosting platform
   - Restart services after adding env variables
   - Check for typos in variable names

## Security Checklist

- [ ] All environment variables are set and secured
- [ ] JWT secret is strong and unique
- [ ] Admin password is strong
- [ ] HTTPS is enabled on all domains
- [ ] CORS is properly configured
- [ ] Rate limiting is implemented
- [ ] Input validation is in place
- [ ] Dependencies are up to date
- [ ] Database access is restricted
- [ ] API keys are not exposed in frontend code

## Performance Optimization

1. Enable gzip compression on backend
2. Implement caching strategies
3. Optimize images before uploading
4. Use CDN for static assets
5. Implement pagination for large datasets
6. Add database indexes for frequently queried fields

## Backup Strategy

1. Enable automated backups in MongoDB Atlas
2. Regularly backup Cloudinary assets
3. Keep copies of environment variables securely
4. Document all configuration changes

## Rollback Plan

If deployment fails:
1. Revert to previous working version
2. Check error logs
3. Fix issues in development
4. Test thoroughly before redeploying

## Support

For deployment issues:
- Email: prabintiwari964@gmail.com
- Create an issue in the GitHub repository

## Additional Resources

- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Cloudinary Documentation](https://cloudinary.com/documentation)
- [Vercel Documentation](https://vercel.com/docs)
- [Render Documentation](https://render.com/docs)
- [eSewa Integration Guide](https://developer.esewa.com.np/)
