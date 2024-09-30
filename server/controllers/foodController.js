const responses = require('../utils/responses')
const Food = require('../models/Food');
const FoodReview = require('../models/FoodReview');

const getAllFood = async (req, res, next) => {
  try {
    const allFood = await Food.findAll({
      where: {
        isActive: true,
      },
    });

    if (!allFood)
      return res.status(responses.error.NOT_FOUND.code)
        .json(responses.error.NOT_FOUND.json);

    return res.status(responses.success.OK.code).json({
      ...responses.success.OK.json,
      data: allFood,
    });
  }
  catch (error) {
    next(error);
  }
};

const getFood = async (req, res, next) => {
  try {
    const food = await Food.findByPk(req.params.foodId, {
      where: {
        isActive: true,
      },
    });

    if (!food)
      return res.status(responses.error.NOT_FOUND.code)
        .json(responses.error.NOT_FOUND.json);

    return res.status(responses.success.OK.code).json({
      ...responses.success.OK.json,
      data: food,
    });
  }
  catch (error) {
    next(error);
  }
};

const getAllReviews = async (req, res, next) => {
  try {
    const allReviews = await FoodReview.findAll({
      where: {
        isActive: true,
      },
    });

    if (!allReviews)
      return res.status(responses.error.NOT_FOUND.code)
        .json(responses.error.NOT_FOUND.json);

    return res.status(responses.success.OK.code).json({
      ...responses.success.OK.json,
      data: allReviews,
    });
  }
  catch (error) {
    next(error);
  }
};

const getReview = async (req, res, next) => {
  try {
    const review = await FoodReview.findByPk(req.params.reviewId, {
      where: {
        isActive: true,
      },
    });
    
    if (!review)
      return res.status(responses.error.NOT_FOUND.code)
        .json(responses.error.NOT_FOUND.json);

    if (review.foodId !== req.params.foodId)
      return res.status(responses.error.BAD_REQUEST.code)
        .json(responses.error.BAD_REQUEST.json);

    return res.status(responses.success.OK.code).json({
      ...responses.success.OK.json,
      data: review,
    });
  }
  catch (error) {
    next(error);
  }
};

const addReview = async (req, res, next) => {
  // {
  //   userId: INTEGER
  //   foodId: INTEGER
  //   rating: INTEGER
  //   review: TEXT
  // }

  const validate = (req) => {
    const { author, item, rating } = req.body;
    let errors = [];
    
    if (!author) errors.push('\'author\' field missing');
    else if (typeof author !== 'number') errors.push('\'author\' field must be an integer');
    if (!item) errors.push('\'item\' field missing');
    else if (typeof item !== 'number') errors.push('\'item\' field must be an integer');
    if (!rating) errors.push('\'rating\' field missing');
    else if (typeof rating !== 'number') errors.push('\'rating\' field must be an integer');
    else if (rating < 1 || rating > 5) errors.push('\'rating\' field must be between 1 and 5');

    return errors;
  };

  const errorMessage = (errors) => {
    if (errors.length !== 0) {
      details = '';

      for (let i = 0; i < errors.length - 1; i++) details += errors[i] + ", ";
      details += errors[errors.length - 1];

      return details;
    }
  }

  try {
    const errors = validate(req);
    if (errors.length !== 0) {
      const details = errorMessage(errors);

      return res.status(responses.error.BAD_REQUEST.code).json({
        ...responses.error.BAD_REQUEST.json,
        details: details,
      });
    }

    const data = req.body;
    const review = await FoodReview.create(
      data,
      { fields: ['userId', 'foodId', 'rating', 'review'] },
    );

    return res.status(responses.success.CREATED.code).json({
      ...responses.success.CREATED.json,
      data: review,
    });
  }
  catch (error) {
    next(error);
  }
};

const updateReview = async (req, res, next) => {
  // {
  //   userId: String (ObjectId)
  //   data: {
  //     (optional properties)
  //   }
  // }

  try {
    const data = req.body;
    const oldValue = await FoodReview.findById(req.params.reviewId, {
      where: {
        isActive: true,
      },
    });

    if (!oldValue)
      return res.status(responses.error.NOT_FOUND.code)
        .json(responses.error.NOT_FOUND.json);

    if (oldValue.userId.toString() !== data.userId)
      return res.status(responses.error.FORBIDDEN.code)
        .json(responses.error.FORBIDDEN.json);

    const newReview = await FoodReview.update(
      data,
      {
        where: {
          id: req.params.reviewId,
        },
      },
    );
    return res.status(responses.success.OK.code).json({
      ...responses.success.OK.json,
      data: newReview,
    });
  }
  catch (error) {
    next(error);
  }
};

const deleteReview = async (req, res, next) => {
  // {
  //   userId: String (ObjectId)
  // }

  try {
    const review = await FoodReview.findByPk(req.params.reviewId, {
      where: {
        isActive: true,
      },
    });

    if (!review)
      return res.status(responses.error.NOT_FOUND.code)
        .json(responses.error.NOT_FOUND.json);

    if (review.author.toString() !== req.body.userId)
      return res.status(responses.error.FORBIDDEN.code)
        .json(responses.error.FORBIDDEN.json);

    const oldValue = await FoodReview.update(
      { isActive: false },
      {
        where: {
          id: req.params.reviewId
        }
      }
    );
    return res.status(responses.success.NO_CONTENT.code).end();
  }
  catch (error) {
    next(error)
  }
};

module.exports = {
  getAllFood,
  getFood,
  getAllReviews,
  getReview,
  addReview,
  updateReview,
  deleteReview,
};
