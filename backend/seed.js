const mongoose = require("mongoose");
require("dotenv").config();

const User = require("./models/User");
const Product = require("./models/Product");

const sampleProducts = [
  {
    name: "Wireless Headphones",
    description: "High-quality wireless headphones with noise cancellation",
    price: 2999,
    category: "electronics",
    image: "https://via.placeholder.com/300?text=Wireless+Headphones",
    stock: 50,
    rating: 4.5,
    numReviews: 125,
  },
  {
    name: "Smartphone",
    description: "Latest smartphone with advanced features",
    price: 49999,
    category: "electronics",
    image: "https://via.placeholder.com/300?text=Smartphone",
    stock: 30,
    rating: 4.7,
    numReviews: 200,
  },
  {
    name: "Laptop",
    description: "Powerful laptop for work and gaming",
    price: 79999,
    category: "electronics",
    image: "https://via.placeholder.com/300?text=Laptop",
    stock: 20,
    rating: 4.6,
    numReviews: 150,
  },
  {
    name: "Running Shoes",
    description: "Comfortable running shoes for athletes",
    price: 4999,
    category: "clothing",
    image: "https://via.placeholder.com/300?text=Running+Shoes",
    stock: 100,
    rating: 4.3,
    numReviews: 80,
  },
  {
    name: "T-Shirt",
    description: "Premium cotton t-shirt",
    price: 599,
    category: "clothing",
    image: "https://via.placeholder.com/300?text=T-Shirt",
    stock: 200,
    rating: 4.2,
    numReviews: 60,
  },
  {
    name: "Jeans",
    description: "Stylish and comfortable jeans",
    price: 1499,
    category: "clothing",
    image: "https://via.placeholder.com/300?text=Jeans",
    stock: 150,
    rating: 4.4,
    numReviews: 100,
  },
  {
    name: "Organic Tea",
    description: "100% organic green tea from premium gardens",
    price: 299,
    category: "food",
    image: "https://via.placeholder.com/300?text=Organic+Tea",
    stock: 500,
    rating: 4.5,
    numReviews: 45,
  },
  {
    name: "Dark Chocolate",
    description: "Premium dark chocolate with 70% cocoa",
    price: 199,
    category: "food",
    image: "https://via.placeholder.com/300?text=Dark+Chocolate",
    stock: 300,
    rating: 4.6,
    numReviews: 75,
  },
  {
    name: "JavaScript Guide",
    description: "Complete guide to modern JavaScript",
    price: 499,
    category: "books",
    image: "https://via.placeholder.com/300?text=JavaScript+Guide",
    stock: 80,
    rating: 4.7,
    numReviews: 120,
  },
  {
    name: "Web Development Handbook",
    description: "Comprehensive handbook for web development",
    price: 699,
    category: "books",
    image: "https://via.placeholder.com/300?text=Web+Dev+Handbook",
    stock: 60,
    rating: 4.8,
    numReviews: 160,
  },
];

const seedData = async () => {
  const userCount = await User.countDocuments();
  if (userCount === 0) {
    await User.create({
      name: "Admin User",
      email: "admin@test.com",
      password: "password123",
      role: "admin",
    });
    await User.create({
      name: "Regular User",
      email: "user@test.com",
      password: "password123",
      role: "user",
    });
    console.log("Sample users created.");
  } else {
    console.log("Users already exist. Skipping user seeding.");
  }

  const productCount = await Product.countDocuments();
  if (productCount === 0) {
    const createdProducts = await Product.insertMany(sampleProducts);
    console.log(`${createdProducts.length} products created.`);
  } else {
    console.log("Products already exist. Skipping product seeding.");
  }
};

const seedDB = async () => {
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    }
    await seedData();
    if (require.main === module) {
      console.log("Database seeded successfully!");
      process.exit(0);
    }
  } catch (error) {
    console.error("Error seeding database:", error);
    if (require.main === module) {
      process.exit(1);
    }
    throw error;
  }
};

if (require.main === module) {
  seedDB();
}

module.exports = seedDB;
