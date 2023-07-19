const getCategoriesList = require("./getCategoriesList");
const getMainPage = require("./mainPageCategories");
const getRecipeByID = require("./getRecipeByID");
const getRecipeByCategory = require("./getRecipeByCategory");
const addOwnRecipe = require("./addOwnRecipe");
const deleteOwnRecipe = require("./deleteOwnRecipe");
const getOwnRecipe = require("./getOwnRecipe");
const searchByTitle = require("./searchByTitle");
const addFavoriteRecipe = require("./addFavoriteRecipe");
const getFavoriteRecipe = require("./getFavoriteRecipe");
const deleteFavoriteRecipe = require("./deleteFavoriteRecipe");
const searchByIngredient = require("./searchByIngredient");
const getPopularRecipe = require("./getPopularRecipe");
module.exports = {
  getCategoriesList,
  getMainPage,
  getRecipeByID,
  getRecipeByCategory,
  addOwnRecipe,
  deleteOwnRecipe,
  getOwnRecipe,
  searchByTitle,
  addFavoriteRecipe,
  getFavoriteRecipe,
  deleteFavoriteRecipe,
  searchByIngredient,
  getPopularRecipe,
};
