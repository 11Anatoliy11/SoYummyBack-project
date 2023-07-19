const express = require("express");
const ctrlIngredients = require("../../controllers/ingredients");
const { authenticate } = require("../../middlewares");
const { ctrlWrapper } = require("../../helpers");
const ingredientRouter = express.Router();

ingredientRouter.get(
  "/list",
  authenticate,
  ctrlWrapper(ctrlIngredients.allIngredients)
);

ingredientRouter.get(
  "/list/:id",
  authenticate,
  ctrlWrapper(ctrlIngredients.getIngredientList)
);

module.exports = ingredientRouter;
