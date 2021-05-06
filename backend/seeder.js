// THIS FILE IS NOT CONNECTED TO OUR PROJECT OR SERVER
// This is just used to seed some data to our db. Therefor all the db init etc needs to be done here again

// import mongoose from 'mongoose';
import dotenv from 'dotenv';
import users from './data/users.js';
import products from './data/products.js';
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const importData = async () => {
  try {
    // will completely wipe the DB so that the new data can be seeded freshly.
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    // taking the output in createdUsers as we want to extract out the ObjectID of the Admin
    const createdUsers = await User.insertMany(users);

    const adminUser = createdUsers[0]._id; // we defined the first user in users.js as admins

    const sampleProducts = products.map((product) => {
      return { ...products, user: adminUser }; // return products but add our admin to it
    });

    await Product.insertMany(sampleProducts);
    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    // will completely wipe the DB so that the new data can be seeded freshly.
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

// to call this seeder -> node backend/seeder or node backend/seeder -d
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
