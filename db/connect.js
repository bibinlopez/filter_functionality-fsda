const mongoose = require('mongoose');

// const connectDB = (url) => {
//   return mongoose.connect(url);
// };

const connectDB = (url) => {
  return mongoose.connect(url, {
    dbName: 'shop',
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = connectDB;
