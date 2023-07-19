const User = require("../../models/user");
const deleteFavoriteRecipe = async (req, res) => {
  const { _id: userId } = req.user;
  const { id: recipeId } = req.params;
  const updateUser = await User.findByIdAndUpdate(
    userId,
    { $pull: { favorites: recipeId } },
    { new: true }
  );
  if (!recipeId) {
    res.json({
      message: "This recipe was not found",
    });
  }
  res.status(200).json({
    code: 200,
    message: "Recipe is deleted from favorites",
    data: updateUser.favorites,
  });
};

module.exports = deleteFavoriteRecipe;
