# Deployment Guide

## Production Deployment Checklist

### Backend Deployment

#### 1. Environment Variables
Create a `.env` file with production values:

```env
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database_name
CORS_ORIGIN=https://your-frontend-domain.com
```

#### 2. Security Hardening
- ✅ Helmet.js enabled for security headers
- ✅ CORS configured
- ✅ Rate limiting enabled (100 requests per 15 minutes)
- ✅ Input validation on all endpoints
- ✅ MongoDB injection protection via Mongoose

#### 3. Recommended Hosting Platforms
- **Render**: Easy Node.js deployment
- **Railway**: Simple deployment with MongoDB
- **Heroku**: Classic PaaS option
- **DigitalOcean App Platform**: Scalable option
- **AWS EC2**: Full control option

#### 4. Backend Deployment Steps

**For Render/Railway/Heroku:**
1. Connect GitHub repository
2. Set environment variables in dashboard
3. Set build command: `cd backend && npm install`
4. Set start command: `cd backend && npm start`
5. Deploy

**For VPS (DigitalOcean/AWS):**
```bash
# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2
sudo npm install -g pm2

# Clone repository
git clone https://github.com/ae9-in/white-labelling---prod.git
cd white-labelling---prod/backend

# Install dependencies
npm install

# Create .env file
nano .env

# Start with PM2
pm2 start src/server.js --name white-label-backend
pm2 save
pm2 startup
```

### Frontend Deployment

#### 1. Build Configuration
Update `frontend/src/services/api.js` with production API URL:

```javascript
const api = axios.create({
  baseURL: 'https://your-backend-domain.com/api/v1',
  headers: {
    'Content-Type': 'application/json'
  }
});
```

#### 2. Build for Production
```bash
cd frontend
npm install
npm run build
```

This creates an optimized `dist` folder.

#### 3. Recommended Hosting Platforms
- **Vercel**: Best for React apps (recommended)
- **Netlify**: Easy deployment with forms
- **Cloudflare Pages**: Fast global CDN
- **GitHub Pages**: Free static hosting
- **AWS S3 + CloudFront**: Scalable option

#### 4. Frontend Deployment Steps

**For Vercel:**
```bash
npm install -g vercel
cd frontend
vercel --prod
```

**For Netlify:**
```bash
npm install -g netlify-cli
cd frontend
npm run build
netlify deploy --prod --dir=dist
```

**For Static Hosting (S3/GitHub Pages):**
1. Build the project: `npm run build`
2. Upload `dist` folder contents to hosting
3. Configure routing for SPA (redirect all to index.html)

### Database Setup

#### MongoDB Atlas (Recommended)
1. Create cluster at https://cloud.mongodb.com
2. Create database user
3. Whitelist IP addresses (or allow from anywhere for cloud deployments)
4. Get connection string
5. Update `MONGODB_URI` in backend `.env`

#### Connection String Format
```
mongodb+srv://username:password@cluster.mongodb.net/database_name?retryWrites=true&w=majority
```

### Post-Deployment

#### 1. Seed Database
```bash
cd backend
node src/utils/seed-shops.js
```

#### 2. Test Endpoints
```bash
# Health check
curl https://your-backend-domain.com/api/v1/health

# Get shops
curl https://your-backend-domain.com/api/v1/shops
```

#### 3. Monitor Application
- Set up error logging (Sentry, LogRocket)
- Monitor server uptime (UptimeRobot, Pingdom)
- Set up MongoDB monitoring in Atlas

#### 4. Backup Strategy
- MongoDB Atlas automatic backups enabled
- Regular database exports
- Code versioned in Git

### Performance Optimization

#### Backend
- ✅ Database indexes on frequently queried fields
- ✅ Pagination implemented on list endpoints
- ✅ Efficient MongoDB queries with proper population
- ✅ Cron jobs optimized for daily runs

#### Frontend
- ✅ Code splitting with React lazy loading
- ✅ Vite for fast builds and HMR
- ✅ Tailwind CSS purging unused styles
- ✅ Image optimization (if needed)

### SSL/HTTPS
Most hosting platforms provide free SSL certificates:
- Vercel/Netlify: Automatic SSL
- Render/Railway: Automatic SSL
- VPS: Use Let's Encrypt with Certbot

### Environment-Specific Settings

#### Development
```env
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/white-label-admin
CORS_ORIGIN=http://localhost:5173
```

#### Production
```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://...
CORS_ORIGIN=https://your-domain.com
```

### Troubleshooting

#### Backend Issues
- Check environment variables are set correctly
- Verify MongoDB connection string
- Check server logs for errors
- Ensure CORS_ORIGIN matches frontend URL

#### Frontend Issues
- Verify API base URL is correct
- Check browser console for errors
- Ensure all environment variables are set
- Clear browser cache

### Scaling Considerations

#### When to Scale
- More than 1000 shops
- More than 10,000 deliveries per month
- Response times > 500ms

#### Scaling Options
- Upgrade MongoDB Atlas tier
- Add Redis for caching
- Use CDN for frontend assets
- Implement database read replicas
- Add load balancer for multiple backend instances

### Maintenance

#### Regular Tasks
- Monitor error logs weekly
- Review database performance monthly
- Update dependencies quarterly
- Backup database weekly
- Review security patches monthly

#### Updates
```bash
# Update dependencies
cd backend && npm update
cd frontend && npm update

# Test thoroughly
npm test

# Deploy updates
git push origin main
```

---

## Quick Deploy Commands

### Full Stack Deployment

```bash
# Backend (on server)
cd backend
npm install
pm2 start src/server.js --name white-label-backend

# Frontend (local build)
cd frontend
npm install
npm run build
# Upload dist folder to hosting
```

### Update Deployment

```bash
# Pull latest changes
git pull origin main

# Backend
cd backend
npm install
pm2 restart white-label-backend

# Frontend
cd frontend
npm install
npm run build
# Upload dist folder to hosting
```

---

**Need Help?** Contact the development team for deployment assistance.
