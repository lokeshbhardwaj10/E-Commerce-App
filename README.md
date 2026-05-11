# MERN Stack E-Commerce Application

A complete full-stack e-commerce application built with **MongoDB**, **Express**, **React**, and **Node.js** (MERN). Features include product management, shopping cart, order management, and admin dashboard.

## 🎯 Features

### Customer Features
- **User Authentication**: Register, login, and logout with JWT tokens
- **Product Browsing**: Search, filter, and paginate through products
- **Shopping Cart**: Add/remove items and manage quantities
- **Checkout**: Shipping address collection and order placement
- **Order Tracking**: View order history with detailed information
- **Product Details**: View full product information with ratings and reviews

### Admin Features
- **Dashboard**: View statistics and recent orders
- **Product Management**: Create, read, update, and delete products
- **Order Management**: View all orders and update their status
- **Payment Status**: Mark orders as paid/pending
- **Order Tracking**: Monitor order fulfillment status

## 🛠️ Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **express-validator** - Input validation
- **CORS** - Cross-origin requests
- **Morgan** - HTTP request logger
- **express-rate-limit** - Rate limiting

### Frontend
- **React** - UI library
- **Vite** - Build tool
- **React Router** - Navigation
- **Axios** - HTTP client
- **React Hot Toast** - Notifications
- **CSS3** - Styling

## 📋 Prerequisites

- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MongoDB** (Atlas or local instance)
- A modern web browser

## 🚀 Quick Start

### 1. Install Dependencies

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd frontend
npm install
```

### 2. Configure Environment Variables

**Backend** (`backend/.env` - already configured):
```env
PORT=5000
MONGO_URI=mongodb+srv://[user]:[password]@[cluster].mongodb.net/?appName=[appName]
JWT_SECRET=your_secret_key
NODE_ENV=development
```

**Frontend** (`frontend/.env` - already configured):
```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Seed the Database (Optional)

```bash
cd backend
npm run seed
```

This will create:
- Admin user: `admin@test.com` / `password123`
- Regular user: `user@test.com` / `password123`
- 10 sample products across different categories

### 4. Start the Application

**Terminal 1 - Backend Server:**
```bash
cd backend
npm run dev
```
Server runs on: `http://localhost:5000`

**Terminal 2 - Frontend Dev Server:**
```bash
cd frontend
npm run dev
```
Frontend runs on: `http://localhost:3000`

## 📁 Project Structure

```
ECOMMERCE APP/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js     # Auth logic
│   │   ├── productController.js  # Product logic
│   │   └── orderController.js    # Order logic
│   ├── middleware/
│   │   ├── authMiddleware.js     # JWT verification
│   │   └── errorMiddleware.js    # Error handling
│   ├── models/
│   │   ├── User.js               # User schema
│   │   ├── Product.js            # Product schema
│   │   └── Order.js              # Order schema
│   ├── routes/
│   │   ├── authRoutes.js         # Auth endpoints
│   │   ├── productRoutes.js      # Product endpoints
│   │   └── orderRoutes.js        # Order endpoints
│   ├── .env                      # Environment variables
│   ├── seed.js                   # Database seeder
│   ├── server.js                 # Express app entry
│   └── package.json              # Dependencies
│
└── frontend/
    ├── src/
    │   ├── api/
    │   │   ├── authApi.js        # Auth API calls
    │   │   ├── productApi.js     # Product API calls
    │   │   ├── orderApi.js       # Order API calls
    │   │   └── axios.js          # Axios instance
    │   ├── components/
    │   │   ├── Navbar.jsx        # Navigation bar
    │   │   ├── ProductCard.jsx   # Product card
    │   │   ├── CartItem.jsx      # Cart item
    │   │   ├── Loader.jsx        # Loading spinner
    │   │   └── ProtectedRoute.jsx # Route protection
    │   ├── context/
    │   │   ├── AuthContext.jsx   # Auth state
    │   │   └── CartContext.jsx   # Cart state
    │   ├── pages/
    │   │   ├── HomePage.jsx      # Home page
    │   │   ├── ProductPage.jsx   # Product details
    │   │   ├── CartPage.jsx      # Shopping cart
    │   │   ├── CheckoutPage.jsx  # Checkout
    │   │   ├── LoginPage.jsx     # Login
    │   │   ├── RegisterPage.jsx  # Register
    │   │   ├── ProfilePage.jsx   # User profile
    │   │   └── admin/
    │   │       ├── AdminDashboard.jsx    # Admin dashboard
    │   │       ├── ManageProducts.jsx    # Product management
    │   │       └── ManageOrders.jsx      # Order management
    │   ├── App.jsx               # Main app component
    │   ├── main.jsx              # React entry
    │   ├── index.css             # Global styles
    │   ├── App.css               # App styles
    │   └── [component].css       # Component styles
    ├── .env                      # Environment variables
    ├── vite.config.js            # Vite config
    ├── index.html                # HTML entry
    └── package.json              # Dependencies
```

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)

### Products
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (Admin only)
- `PUT /api/products/:id` - Update product (Admin only)
- `DELETE /api/products/:id` - Delete product (Admin only)

### Orders
- `POST /api/orders` - Create order (Protected)
- `GET /api/orders/myorders` - Get user's orders (Protected)
- `GET /api/orders` - Get all orders (Admin only)
- `PUT /api/orders/:id/status` - Update order status (Admin only)

## 🔐 Authentication

The app uses JWT (JSON Web Tokens) for authentication:
- Tokens are stored in localStorage
- Tokens are sent in the `Authorization` header
- Protected routes check token validity
- Expired tokens redirect to login

## 🛒 Features in Detail

### Shopping Cart
- Add/remove items
- Update quantities
- Persistent storage (localStorage)
- Free shipping over ₹500

### Checkout
- Collect shipping address
- Display order summary
- Create order in database
- Update product stock

### Admin Dashboard
- View total products and orders
- See recent orders
- Manage all products (CRUD)
- Track and update order status

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop browsers
- Tablets
- Mobile devices

## 🧪 Testing

### Test User Accounts

**Admin Account:**
- Email: `admin@test.com`
- Password: `password123`

**Regular User Account:**
- Email: `user@test.com`
- Password: `password123`

### Test Workflow

1. **Register** a new account or use test credentials
2. **Browse** products on home page
3. **Search/Filter** products by category or price
4. **View** product details
5. **Add** items to cart
6. **Checkout** with shipping address
7. **Place** order and view in profile
8. **Admin** can manage products and orders

## 🐛 Troubleshooting

### Database Connection Issues
- Verify MongoDB URI in `.env`
- Ensure network access is allowed in MongoDB Atlas
- Check if database server is running

### Port Already in Use
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

### CORS Errors
- Ensure backend is running on `http://localhost:5000`
- Check `VITE_API_URL` in frontend `.env`
- Verify CORS middleware in `server.js`

### Token Issues
- Clear localStorage and login again
- Ensure JWT_SECRET matches between sessions
- Check token expiration in `authController.js`

## 📝 Available Scripts

### Backend
- `npm run start` - Run production server
- `npm run dev` - Run development server with nodemon
- `npm run seed` - Seed database with sample data

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🚀 Deployment

### Backend Deployment (Heroku/Railway)
1. Create account on hosting platform
2. Connect GitHub repository
3. Add environment variables
4. Deploy

### Frontend Deployment (Vercel/Netlify)
1. Build the project: `npm run build`
2. Deploy `dist` folder
3. Set `VITE_API_URL` to production backend URL

## 📚 Learning Resources

- [Node.js Documentation](https://nodejs.org/docs/)
- [Express.js Guide](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [MongoDB Manual](https://docs.mongodb.com/manual/)
- [JWT Introduction](https://jwt.io/introduction)

## 📄 License

MIT License - Feel free to use this project for learning and development.

## 👨‍💻 Contributing

Contributions are welcome! Please feel free to:
- Report bugs
- Suggest features
- Submit pull requests

## 📞 Support

For issues and questions:
1. Check the troubleshooting section
2. Review API documentation
3. Check browser console for errors
4. Review server logs

---

**Happy Coding! 🎉**
