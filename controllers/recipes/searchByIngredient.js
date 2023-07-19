// search
const Recipe = require("../../models/recipe");
const Ingredient = require("../../models/ingredient");

const searchByIngredient = async (req, res) => {
  const { ingredient } = req.query;
  const findIngredient = await Ingredient.find({ ttl: ingredient });
  const ingredientId = findIngredient.map((ingredient) => ingredient._id)[0];
  console.log(ingredientId[0]);
  const result = await Recipe.find({
    ingredients: {
      $elemMatch: { id: ingredientId },
    },
  });
  if (!result) {
    res.status(400);
    throw new Error("Bad Request");
  }
  res.json({
    status: 200,
    message: "success",
    data: result,
  });
};

module.exports = searchByIngredient;
