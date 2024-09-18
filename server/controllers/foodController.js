const Food = require('../models/foodModel');

const getAllFood = async (req, res, next) => {
  try {
    const allFood = await Food.find({});
    return res.status(200).json(allFood);
  }
  catch (error) {
    next(error);
  }
};

const getFoodById = async (req, res, next) => {
  try {
    const food = await Food.findById(req.params.foodId);
    if (!food) return res.status(404).json({ message: 'Food not found' });
    return res.status(200).json(food);
  }
  catch (error) {
    next(error);
  }
};

module.exports = {
  getAllFood,
  getFoodById,
};
