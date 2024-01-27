const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({}, { strict: false });

// creating compound index
itemSchema.index({
  isFeatured: 1,
  brand: 1,
  color: 1,
  category: 1,
  company: 1,
  rating: 1,
  price: 1,
  createdAt: 1,
  name: 1,
});

module.exports = mongoose.model('Item', itemSchema);
