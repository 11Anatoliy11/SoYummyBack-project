// add-recipe
const ingredient = require("../../models/ingredient");
const Recipe = require("../../models/recipe");
const cloudinary = require("cloudinary").v2;
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const addOwnRecipe = async (req, res) => {
  const {
    title,
    description,
    instructions,
    category,
    time,
    formattedIngredients,
    measure,
  } = req.body;

  if (!title || !description || !instructions || !category || !time) {
    res.status(400);
    throw new Error("Please fill all the required fields");
  }

  const { _id: owner } = req.user;
  const { path: filePath } = req.file;

  const ingredientsParsed = JSON.parse(formattedIngredients);
  const ingredients = ingredientsParsed.map(function (ingredient) {
    ingredient.id = ObjectId.createFromHexString(ingredient.id);
    return ingredient;
  });
  const { secure_url: thumb } = await cloudinary.uploader.upload(filePath);
  const newRecipe = await Recipe.create({
    title,
    description,
    category,
    time,
    ingredients,
    instructions,
    thumb,
    owner,
    measure,
  });

  res.status(200).json({
    message: "success",
    data: newRecipe,
  });
};
module.exports = addOwnRecipe;
