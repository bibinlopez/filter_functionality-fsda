const CustomAPIError = require('../errors/custom-error');
const Item = require('../models/itemSchema');

// get items
const getItems = async (req, res) => {
  const { name, limit, sort, skip, condition } = req.query;
  let queryObject = {};

  if (name) {
    queryObject.name = { $regex: name, $options: 'i' };
  }

  if (condition?.rating) {
    rating = Number(condition.rating);
    condition.rating = { $gte: rating };
  }

  if (condition?.price) {
    const { $gte, $lte, $gt, $lt } = condition.price;
    if ($gte) {
      condition.price.$gte = Number($gte);
    }
    if ($lte) {
      condition.price.$lte = Number($lte);
    }
    if ($gt) {
      condition.price.$gt = Number($gt);
    }
    if ($lt) {
      condition.price.$lt = Number($lt);
    }
  }

  if (condition?.isFeatured) {
    condition.isFeatured = condition.isFeatured == 'true' ? true : false;
  }
  queryObject = { ...queryObject, ...condition };

  // console.log(queryObject);
  let result = Item.find(queryObject);

  if (sort) {
    const sortStr = sort.split(',').join(' ');
    result = result.sort(sortStr);
  }

  result = result.limit(Number(limit) || 10).skip(Number(skip) || 0);

  const items = await result;

  return res.status(200).json({ count: items.length, data: items });
};

// get single item
const getItem = async (req, res) => {
  const { id } = req.params;
  const item = await Item.findById(id);

  if (!item) {
    throw new CustomAPIError(`No item with the id: ${id}`, 404);
  }
  return res.status(200).json({ data: item });
};

// delete an item
const deleteItem = async (req, res) => {
  const { id } = req.params;

  const item = await Item.findById(id);
  if (!item) {
    throw new CustomAPIError(`No item with the id: ${id}`, 404);
  }
  await item.deleteOne();
  return res.status(200).json({ msg: 'item deleted!!!' });
};

module.exports = {
  getItems,
  getItem,
  deleteItem,
};
