const Ingredient = require("../../models/ingredient");

const allIngredients = async (req, res) => {
  const result = await Ingredient.find();

  if (!result) {
    res.status(400);
    throw new Error("Bad Request");
  }
  res.status(200).json({
    code: 200,
    message: "success",
    data: result,
  });
};

module.exports = allIngredients;
