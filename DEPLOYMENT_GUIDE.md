# 🚀 Deployment Guide

Your e-commerce application is ready to deploy! Choose your preferred deployment method below.

---

## 📋 Pre-Deployment Checklist

- [ ] All code committed to git
- [ ] `.env` file created with production values
- [ ] MongoDB Atlas account set up (or alternative database)
- [ ] JWT_SECRET set to a strong random value
- [ ] Tested locally with `npm start` (backend) and `npm run build` (frontend)

---

## � Deployment Option 1: Heroku

### Prerequisites
- [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) installed
- Heroku account

### Steps (Backend)

1. **Login to Heroku:**
```bash
heroku login
```

2. **Create Heroku app:**
```bash
cd backend
heroku create your-app-name
```

3. **Set environment variables:**
```bash
heroku config:set MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
heroku config:set JWT_SECRET=your_secret_key
heroku config:set NODE_ENV=production
```

4. **Deploy:**
```bash
git push heroku main
```

5. **View logs:**
```bash
heroku logs --tail
```

### Steps (Frontend with Vercel - Recommended)

1. **Push to GitHub**
2. **Connect repo to [Vercel](https://vercel.com/)**
3. **Set environment variable:**
   - `VITE_API_URL` = your Heroku backend URL
4. **Deploy automatically**

---

## ⚡ Deployment Option 2: Vercel (Frontend) + Railway (Backend)

### Frontend on Vercel

1. **Push code to GitHub**
2. **Go to [vercel.com](https://vercel.com) and import project**
3. **Set build settings:**
   - Build Command: `npm --prefix frontend run build`
   - Output Directory: `frontend/dist`
4. **Set environment variable:**
   - `VITE_API_URL` = `https://your-railway-backend-url/api`
5. **Deploy**

### Backend on Railway

1. **Connect Railway to GitHub**
2. **Create new project and connect your repo**
3. **Add MongoDB plugin (Railway provides MongoDB)**
4. **Set environment variables:**
   - `MONGO_URI` (auto-set by Railway MongoDB)
   - `JWT_SECRET` = your secret
   - `NODE_ENV` = `production`
5. **Deploy automatically**

---

## ☁️ Deployment Option 3: AWS EC2 with Ubuntu

### Prerequisites
- AWS EC2 instance (Ubuntu 20.04+)
- Security group allows ports 80, 443, 5000

### Steps

1. **SSH into instance:**
```bash
ssh -i your-key.pem ubuntu@your-ec2-ip
```

2. **Install Node.js and MongoDB:**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo apt-get install -y mongodb-org
```

3. **Clone repository:**
```bash
git clone https://github.com/yourusername/repo.git
cd ecommerce-app
```

4. **Setup backend:**
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with production values
```

5. **Setup frontend:**
```bash
cd ../frontend
npm install
npm run build
```

6. **Install Nginx:**
```bash
sudo apt-get install -y nginx
```

7. **Configure Nginx:**
```bash
sudo cp nginx.conf /etc/nginx/sites-available/default
sudo systemctl restart nginx
```

8. **Use PM2 for backend process management:**
```bash
sudo npm install -g pm2
cd ../backend
pm2 start server.js --name "ecommerce-api"
pm2 startup
pm2 save
```

9. **Setup SSL with Let's Encrypt:**
```bash
sudo apt-get install -y certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
```

---

## 📊 Environment Variables Guide

### Backend (.env)
```env
# Database
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/dbname

# Security
JWT_SECRET=very_long_random_secret_key_min_32_chars

# Server
PORT=5000
NODE_ENV=production
```

### Frontend (.env or .env.production)
```env
VITE_API_URL=https://api.yourdomain.com
```

---

## 🔒 Security Checklist

- [ ] `JWT_SECRET` is strong (min 32 characters, random)
- [ ] MongoDB authentication enabled
- [ ] HTTPS/SSL certificate configured
- [ ] CORS only allows your domain
- [ ] Environment variables not committed to git
- [ ] Rate limiting enabled on API
- [ ] Input validation on all endpoints
- [ ] Database backups configured

---

## 🐛 Troubleshooting

### Backend won't start
```bash
# Check Node version
node --version

# Check port is free
lsof -i :5000

# Check environment variables
echo $MONGO_URI
```

### Frontend can't connect to API
- Verify `VITE_API_URL` is correct
- Check CORS settings in backend
- Ensure backend is running
- Check network tab in browser DevTools

### Database connection fails
- Verify MongoDB Atlas IP whitelist includes your server IP
- Test connection string: `mongosh "your-connection-string"`
- Check username/password are correct

---

## 📞 Support

For deployment issues:
1. Check server logs: `heroku logs --tail`
2. Verify all environment variables are set
3. Ensure all services are running
4. Check firewall/security group rules
5. Review database connection strings

Good luck with your deployment! 🎉
