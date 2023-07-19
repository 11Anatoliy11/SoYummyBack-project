const express = require("express");
const ctrlRecipes = require("../../controllers/recipes");
const { authenticate } = require("../../middlewares");
const { ctrlWrapper } = require("../../helpers");

const recipesRouter = express.Router();
recipesRouter.get(
  "/category-list",
  authenticate,
  ctrlWrapper(ctrlRecipes.getCategoriesList)
);
recipesRouter.get(
  "/popular",
  authenticate,
  ctrlWrapper(ctrlRecipes.getPopularRecipe)
);
recipesRouter.get(
  "/main-page",
  authenticate,
  ctrlWrapper(ctrlRecipes.getMainPage)
);
recipesRouter.get(
  "/id/:id",
  authenticate,
  ctrlWrapper(ctrlRecipes.getRecipeByID)
);

recipesRouter.get(
  "/:category",
  authenticate,
  ctrlWrapper(ctrlRecipes.getRecipeByCategory)
);

recipesRouter.get(
  "/search/title",
  authenticate,
  ctrlWrapper(ctrlRecipes.searchByTitle)
);

recipesRouter.get(
  "/search/ingredient",
  authenticate,
  ctrlWrapper(ctrlRecipes.searchByIngredient)
);

module.exports = recipesRouter;
