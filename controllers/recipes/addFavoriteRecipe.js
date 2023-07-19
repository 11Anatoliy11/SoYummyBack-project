// /add-favorite/:id
const Recipe = require("../../models/recipe");
const User = require("../../models/user");
const addFavoriteRecipe = async (req, res) => {
  const { _id: userId } = req.user;
  const { id: recipeId } = req.params;
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({
      message: "User is not found",
    });
  }

  const recipe = await Recipe.findById(recipeId);
  if (!recipe) {
    return res.status(404).json({
      message: "Recipe is not found",
    });
  }

  if (user.favorites.includes(recipeId)) {
    return res.status(400).json({
      message: "Recipe already added to favorites",
    });
  }
  user.favorites.push(recipeId);
  await user.save();

  res.status(200).json({
    message: "Recipe is added to favorites",
    data: user.favorites,
  });
};
module.exports = addFavoriteRecipe;
