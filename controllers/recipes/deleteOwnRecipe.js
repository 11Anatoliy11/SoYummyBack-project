// /remove-recipe/:id

const Recipe = require("../../models/recipe");

const deleteOwnRecipe = async (req, res) => {
  const { id: recipeId } = req.params;
  const { _id: userId } = req.user;

  const result = await Recipe.findByIdAndRemove(recipeId, { owner: userId });
  if (!result) {
    res.status(404).json({
      status: "error",
      code: 404,
      message: "Recipe not found or unauthorized",
    });
    return;
  }
  res.json({
    status: "success",
    code: 200,
    message: "Recipe successfully deleted",
    data: result,
  });
};

module.exports = deleteOwnRecipe;
