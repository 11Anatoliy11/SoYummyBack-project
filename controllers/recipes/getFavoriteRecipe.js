// /get-favorite

const Recipe = require("../../models/recipe");
const User = require("../../models/user");

const getFavoriteRecipe = async (req, res) => {
  const { _id: userId } = req.user;
  const { page, limit } = req.query;

  const user = await User.findById(userId);

  const favoriteRecipes = user.favorites;

  if (!favoriteRecipes) {
    return res.json({
      message: "No favorites have been added yet",
    });
  }

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const result = await Recipe.find({
    _id: { $in: favoriteRecipes },
  })
    .skip(startIndex)
    .limit(limit);

  const response = {
    data: result,
  };

  if (endIndex < favoriteRecipes.length) {
    response.nextPage = page + 1;
  }

  if (startIndex > 0) {
    response.prevPage = page - 1;
  }

  res.status(200).json(response);
};

module.exports = getFavoriteRecipe;
