# E-Commerce App Setup Guide

## ✅ Complete Checklist

Your e-commerce application is **100% COMPLETE** and ready to run!

### ✓ Backend Components
- [x] MongoDB Models (User, Product, Order)
- [x] Express Server & Middleware
- [x] Authentication System (JWT + bcrypt)
- [x] Product Management APIs
- [x] Order Management APIs
- [x] Error Handling
- [x] Rate Limiting
- [x] Database Seeding Script
- [x] Environment Configuration

### ✓ Frontend Components
- [x] React Components (10 components)
- [x] Context API (Auth & Cart)
- [x] API Integration Layer
- [x] 8 Pages (Home, Products, Cart, Checkout, Profile, Admin, etc.)
- [x] Admin Dashboard & Management Pages
- [x] Responsive CSS Styling
- [x] Form Validation
- [x] Error Handling
- [x] Toast Notifications

## 🚀 Quick Start (5 Minutes)

### Option 1: Automatic Startup (Windows)
```bash
start.bat
```
This will automatically install dependencies and start both servers.

### Option 2: Automatic Startup (Mac/Linux)
```bash
chmod +x start.sh
./start.sh
```

### Option 3: Manual Startup

**Terminal 1 - Start Backend:**
```bash
cd backend
npm install  # First time only
npm run dev
```

**Terminal 2 - Start Frontend:**
```bash
cd frontend
npm install  # First time only
npm run dev
```

## 📝 Detailed Setup Instructions

### Step 1: Verify Prerequisites
```bash
# Check Node.js is installed
node --version  # Should be v14 or higher
npm --version   # Should be v6 or higher
```

### Step 2: Install Backend Dependencies
```bash
cd backend
npm install
```

### Step 3: Install Frontend Dependencies
```bash
cd frontend
npm install
```

### Step 4: Seed Database (Optional)
Create sample products and test users:
```bash
cd backend
npm run seed
```

This creates:
- **Admin User**: admin@test.com / password123
- **Regular User**: user@test.com / password123
- **10 Sample Products** in different categories

### Step 5: Start Backend Server
```bash
cd backend
npm run dev
```
Expected output:
```
MongoDB Connected Successfully!
Server running on port 5000
```

### Step 6: Start Frontend Dev Server
```bash
cd frontend
npm run dev
```
Expected output:
```
VITE v4.4.0  ready in 123 ms

➜  Local:   http://localhost:3000/
```

## 🌐 Access the Application

Once both servers are running:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api
- **Health Check**: http://localhost:5000/api/health

## 🧪 Testing the Application

### 1. Home Page
- Products should load
- Search and filter should work
- Pagination should function

### 2. Product Page
- Click on any product to see details
- Add to cart functionality
- Stock checking

### 3. Authentication
- Register a new account
- Login with credentials
- Logout functionality

### 4. Shopping Cart
- Add items to cart
- Update quantities
- Remove items
- Cart persists on refresh

### 5. Checkout
- Add shipping address
- Create order
- Order appears in profile

### 6. Admin Features (Login as admin@test.com)
- View admin dashboard
- Manage products (create, edit, delete)
- Manage orders (update status, payment)

## 📊 Database Structure

### Users Collection
```json
{
  "_id": "ObjectId",
  "name": "String",
  "email": "String (unique)",
  "password": "String (hashed)",
  "role": "String (user/admin)",
  "createdAt": "Date"
}
```

### Products Collection
```json
{
  "_id": "ObjectId",
  "name": "String",
  "description": "String",
  "price": "Number",
  "category": "String",
  "image": "String (URL)",
  "stock": "Number",
  "rating": "Number (0-5)",
  "numReviews": "Number",
  "createdAt": "Date"
}
```

### Orders Collection
```json
{
  "_id": "ObjectId",
  "userId": "ObjectId (ref: User)",
  "products": [
    {
      "productId": "ObjectId (ref: Product)",
      "quantity": "Number",
      "price": "Number"
    }
  ],
  "totalAmount": "Number",
  "status": "String (pending/processing/shipped/delivered)",
  "shippingAddress": {
    "street": "String",
    "city": "String",
    "state": "String",
    "pincode": "String"
  },
  "paymentStatus": "String (pending/paid)",
  "createdAt": "Date"
}
```

## 🔍 Key Features Overview

### 1. User Authentication
- Secure registration and login
- JWT token-based authentication
- Password hashing with bcrypt
- Protected routes

### 2. Product Management
- Browse all products
- Search by name/description
- Filter by category
- Filter by price range
- Pagination support

### 3. Shopping Cart
- Add/remove items
- Update quantities
- Persistent storage
- Calculate totals
- Free shipping over ₹500

### 4. Order Management
- Create orders from cart
- Track order status
- View order history
- Shipping address collection

### 5. Admin Panel
- Dashboard with statistics
- Product CRUD operations
- Order management
- Status updates
- Payment tracking

## 🛠️ Environment Variables

### Backend (.env)
```env
PORT=5000
MONGO_URI=mongodb+srv://[user]:[password]@[cluster].mongodb.net/?appName=Cluster2
JWT_SECRET=nf$~8%38y87h8hh8GH&*Y@&YEG*e8ibbc*4
NODE_ENV=development
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

## 🐛 Common Issues & Solutions

### Issue: "Cannot find module" error
**Solution:**
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

### Issue: Port 5000/3000 already in use
**Solution (Windows):**
```bash
# Find and kill process on port 5000
netstat -ano | findstr :5000
taskkill /PID [PID] /F

# Find and kill process on port 3000
netstat -ano | findstr :3000
taskkill /PID [PID] /F
```

**Solution (Mac/Linux):**
```bash
# Kill port 5000
lsof -ti:5000 | xargs kill -9

# Kill port 3000
lsof -ti:3000 | xargs kill -9
```

### Issue: MongoDB connection error
**Solution:**
1. Verify MongoDB URI in backend `.env`
2. Check network access in MongoDB Atlas
3. Ensure credentials are correct

### Issue: CORS errors
**Solution:**
- Ensure backend is running on correct port (5000)
- Check VITE_API_URL in frontend `.env`
- Verify CORS is enabled in backend

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Auth Endpoints

**Register User**
```
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Login User**
```
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Get Current User**
```
GET /auth/me
Authorization: Bearer {token}
```

### Product Endpoints

**Get All Products**
```
GET /products?category=electronics&minPrice=0&maxPrice=50000&search=phone&page=1&limit=10
```

**Get Product by ID**
```
GET /products/{id}
```

**Create Product** (Admin only)
```
POST /products
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Product Name",
  "description": "Description",
  "price": 999,
  "category": "electronics",
  "image": "https://...",
  "stock": 50
}
```

### Order Endpoints

**Create Order**
```
POST /orders
Authorization: Bearer {token}
Content-Type: application/json

{
  "products": [
    {
      "productId": "...",
      "quantity": 2
    }
  ],
  "shippingAddress": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "pincode": "10001"
  }
}
```

**Get My Orders**
```
GET /orders/myorders
Authorization: Bearer {token}
```

**Get All Orders** (Admin only)
```
GET /orders
Authorization: Bearer {token}
```

**Update Order Status** (Admin only)
```
PUT /orders/{id}/status
Authorization: Bearer {token}
Content-Type: application/json

{
  "status": "shipped",
  "paymentStatus": "paid"
}
```

## 📱 Frontend Routes

| Route | Component | Auth | Admin |
|-------|-----------|------|-------|
| / | HomePage | No | No |
| /product/:id | ProductPage | No | No |
| /cart | CartPage | No | No |
| /login | LoginPage | No | No |
| /register | RegisterPage | No | No |
| /checkout | CheckoutPage | Yes | No |
| /profile | ProfilePage | Yes | No |
| /admin | AdminDashboard | Yes | Yes |
| /admin/products | ManageProducts | Yes | Yes |
| /admin/orders | ManageOrders | Yes | Yes |

## 🎨 Customization

### Change Colors/Theme
Edit `frontend/src/index.css` and individual component CSS files.

### Add New Products
1. Go to Admin Dashboard
2. Click "+ Add Product"
3. Fill in product details
4. Submit

### Modify Product Categories
Edit `frontend/src/pages/HomePage.jsx` line 13:
```javascript
const CATEGORIES = ["electronics", "clothing", "food", "books", "your_category"];
```

Also update the select options in ManageProducts.jsx.

## 🚀 Production Deployment

### Backend (Heroku/Railway)
1. Create account on hosting platform
2. Create new app
3. Connect GitHub repository
4. Add environment variables
5. Deploy

### Frontend (Vercel/Netlify)
1. Build project: `npm run build`
2. Deploy `dist` folder
3. Set environment variable: `VITE_API_URL=https://your-backend-url.com/api`

## 📞 Next Steps

1. ✅ Complete the setup
2. ✅ Test all features
3. ✅ Customize colors and branding
4. ✅ Add more products
5. ✅ Deploy to production

## 📄 License

MIT License - Free to use and modify

---

**Congratulations! Your E-Commerce App is Ready to Use! 🎉**
