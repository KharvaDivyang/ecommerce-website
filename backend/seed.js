const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Product = require('./models/Product');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);
    
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@shopnest.com',
      password: hashedPassword,
      role: 'admin'
    });

    const products = [
      {
        name: 'Wireless Noise-Cancelling Headphones',
        description: 'Immersive sound experience with advanced active noise cancellation.',
        price: 299.99,
        category: 'Electronics',
        stock: 15,
        imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
        ratings: 4.8,
        numReviews: 24
      },
      {
        name: 'Portable Bluetooth Speaker',
        description: 'Compact speaker with rich bass and waterproof design for outdoor use.',
        price: 89.99,
        category: 'Electronics',
        stock: 25,
        imageUrl: 'https://images.unsplash.com/photo-1511376777868-611b54f68947?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
        ratings: 4.6,
        numReviews: 34
      },
      {
        name: 'Smart Fitness Watch',
        description: 'Track workouts, heart rate, and sleep with a sleek touchscreen display.',
        price: 219.99,
        category: 'Electronics',
        stock: 18,
        imageUrl: 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
        ratings: 4.7,
        numReviews: 41
      },
      {
        name: 'Classic White Sneakers',
        description: 'Versatile and comfortable, a staple for any casual outfit.',
        price: 85.00,
        category: 'Clothing',
        stock: 50,
        imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
        ratings: 4.5,
        numReviews: 89
      },
      {
        name: 'Denim Jacket',
        description: 'Stylish regular-fit denim jacket with durable stitching.',
        price: 109.99,
        category: 'Clothing',
        stock: 27,
        imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
        ratings: 4.4,
        numReviews: 38
      },
      {
        name: 'Graphic Cotton T-Shirt',
        description: 'Soft cotton tee with bold print and comfortable fit.',
        price: 25.00,
        category: 'Clothing',
        stock: 62,
        imageUrl: 'https://images.unsplash.com/photo-1520975951124-7217de9f55cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
        ratings: 4.2,
        numReviews: 19
      },
      {
        name: 'Minimalist Desk Lamp',
        description: 'Soft warm lighting with adjustable brightness and modern design.',
        price: 45.00,
        category: 'Home',
        stock: 38,
        imageUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
        ratings: 4.3,
        numReviews: 21
      },
      {
        name: 'Ceramic Plant Vase',
        description: 'Elegant home decor vase with matte finish and organic shape.',
        price: 34.99,
        category: 'Home',
        stock: 20,
        imageUrl: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
        ratings: 4.5,
        numReviews: 28
      },
      {
        name: 'Soft Throw Blanket',
        description: 'Luxurious plush blanket for cozy evenings on the couch.',
        price: 59.99,
        category: 'Home',
        stock: 31,
        imageUrl: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
        ratings: 4.6,
        numReviews: 33
      },
      {
        name: 'Leather Tote Bag',
        description: 'Premium leather tote with roomy interior and secure zip closure.',
        price: 169.99,
        category: 'Accessories',
        stock: 22,
        imageUrl: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
        ratings: 4.7,
        numReviews: 58
      },
      {
        name: 'Sunglasses with UV Protection',
        description: 'Stylish sunglasses with polarized lenses for outdoor comfort.',
        price: 79.99,
        category: 'Accessories',
        stock: 45,
        imageUrl: 'https://images.unsplash.com/photo-1526045612212-70caf35c14df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
        ratings: 4.5,
        numReviews: 26
      },
      {
        name: 'Minimalist Leather Wallet',
        description: 'Slim wallet with multiple card slots and premium leather finish.',
        price: 39.99,
        category: 'Accessories',
        stock: 40,
        imageUrl: 'https://images.unsplash.com/photo-1514474959185-5a8dde19feaa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
        ratings: 4.8,
        numReviews: 14
      },
      {
        name: 'Yoga Mat with Carrying Strap',
        description: 'Durable, non-slip yoga mat for studio and home workouts.',
        price: 49.99,
        category: 'Fitness',
        stock: 35,
        imageUrl: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
        ratings: 4.6,
        numReviews: 22
      },
      {
        name: 'Adjustable Dumbbell Set',
        description: 'Space-saving dumbbells with easy weight adjustment for strength training.',
        price: 129.99,
        category: 'Fitness',
        stock: 14,
        imageUrl: 'https://images.unsplash.com/photo-1579758629939-0370c175b4c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
        ratings: 4.7,
        numReviews: 31
      },
      {
        name: 'Running Shoes',
        description: 'Lightweight running shoes designed for comfort and support.',
        price: 119.99,
        category: 'Fitness',
        stock: 28,
        imageUrl: 'https://images.unsplash.com/photo-1515548218140-9c1c8f7562d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
        ratings: 4.4,
        numReviews: 44
      }
    ];

    await Product.insertMany(products);
    
    console.log('✅ Data Imported Successfully!');
    process.exit();
  } catch (error) {
    console.error(`❌ Error with data import: ${error.message}`);
    process.exit(1);
  }
};

importData();
