const Recipe = require("../../models/recipe");
const Ingredient = require("../../models/ingredient");

const addToShoppingList = async (req, res) => {
  const { recipeId, ingredientId } = req.query;
  const { user } = req;
  const recipe = await Recipe.findById(recipeId);

  if (!recipe) {
    throw new Error(`Recipe is not found`);
  }
  const [ingredient] = recipe.ingredients.filter(
    ({ id }) => id.toString() === ingredientId
  );
  console.log(ingredient.measure);
  const ingredientData = await Ingredient.findById(ingredientId);
  console.log(ingredientData.ttl);
  if (!ingredient) {
    throw new Error(`Ingredient is not found`);
  }
  const newRecipeId = recipeId;
  const recipeAlreadyExists = user.shoppingList.find(
    ({ recipeId }) => recipeId === newRecipeId
  );
  if (recipeAlreadyExists) {
    const ingredientAlreadyExists = recipeAlreadyExists.ingredients.some(
      ({ id }) => id.toString() === ingredient.id.toString()
    );
    if (!ingredientAlreadyExists) {
      recipeAlreadyExists.ingredients.push({
        id: ingredient.id.toString(),
        measure: ingredient.measure,
      });

      const idx = user.shoppingList.findIndex(
        ({ recipeId }) => recipeId === newRecipeId
      );
      user.shoppingList.splice(idx, 1);
      user.shoppingList.push(recipeAlreadyExists);
    } else {
      throw new Error(`Ingredient already added`);
    }
  } else {
    user.shoppingList.push({
      id: ingredient.id.toString(),
      measure: ingredient.measure,
      ttl: ingredientData.ttl,
      thb: ingredientData.thb,
    });
  }

  await user.save();
  res.status(200).json({
    code: 200,
    message: "success",
    data: user.shoppingList,
  });
};
module.exports = addToShoppingList;
