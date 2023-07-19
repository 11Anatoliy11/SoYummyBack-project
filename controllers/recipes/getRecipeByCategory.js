// recipes/:category
const Recipe = require("../../models/recipe");
// const categories = require("../../data/categories");
const getRecipeByCategory = async (req, res) => {
  const { category } = req.params;

  const result = await Recipe.find({ category: `${category}` })
    .sort({
      createdAt: -1,
    })
    .limit(8);

  res.json({
    status: 200,
    message: "success",
    data: result,
  });
};
module.exports = getRecipeByCategory;
