const express = require("express");
const ctrlRecipes = require("../../controllers/recipes");
const { authenticate, uploadCloud } = require("../../middlewares");
const { ctrlWrapper } = require("../../helpers");

const ownRecipesRouter = express.Router();

ownRecipesRouter.patch(
  "/add-recipe",
  authenticate,
  uploadCloud.single("thumb"),
  ctrlWrapper(ctrlRecipes.addOwnRecipe)
);

ownRecipesRouter.delete(
  "/remove-recipe/:id",
  authenticate,
  ctrlWrapper(ctrlRecipes.deleteOwnRecipe)
);
ownRecipesRouter.get(
  "/own-recipes",
  authenticate,
  ctrlWrapper(ctrlRecipes.getOwnRecipe)
);
module.exports = ownRecipesRouter;
