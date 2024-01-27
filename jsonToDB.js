require('dotenv').config();

const connectDB = require('./db/connect');
const Product = require('./models/productSchema');
const Item = require('./models/itemSchema');

const jsonProducts = require('./data.json');

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    // await Item.deleteMany();
    await Item.create(jsonProducts);
    console.log('Success!!!!');
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
