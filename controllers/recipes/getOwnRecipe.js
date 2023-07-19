// /own-recipes
const Recipe = require("../../models/recipe");

const getOwnRecipe = async (req, res) => {
  const { _id: userId } = req.user;
  const { page, limit } = req.query;

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const result = await Recipe.find({ owner: userId })
    .skip(startIndex)
    .limit(limit);

  const totalRecipes = await Recipe.countDocuments({ owner: userId });

  const response = {
    status: "success",
    code: 200,
    message: "My recipes",
    data: result,
    quantity: result.length,
  };

  if (endIndex < totalRecipes) {
    response.nextPage = page + 1;
  }

  if (startIndex > 0) {
    response.prevPage = page - 1;
  }

  res.json(response);
};

module.exports = getOwnRecipe;
// ?page=1&limit=10
