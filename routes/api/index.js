const authRouter = require("./auth");
const recipesRouter = require("./recipes");
const ownRecipes = require("./ownRecipes");
const favoriteRouter = require("./favorite");
const shoppingListRouter = require("./shopping-list");

module.exports = {
  authRouter,
  recipesRouter,
  ownRecipes,
  favoriteRouter,
  shoppingListRouter,
};
