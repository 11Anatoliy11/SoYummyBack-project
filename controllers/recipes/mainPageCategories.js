// /recipes/main-page
const Recipe = require("../../models/recipe");

const getMainPage = async (req, res) => {
  const categories = ["Breakfast", "Miscellaneous", "Chicken", "Dessert"];

  const result = await Recipe.aggregate([
    {
      $match: {
        category: { $in: categories },
      },
    },
    {
      $group: {
        _id: "$category",
        documents: { $push: "$$ROOT" },
        categoryOrder: { $first: { $indexOfArray: [categories, "$category"] } },
      },
    },
    {
      $sort: {
        categoryOrder: 1,
      },
    },
    {
      $project: {
        _id: 0,
        category: "$_id",
        documents: { $slice: ["$documents", 4] },
      },
    },
  ]);

  if (!result) {
    res.status(400);
    throw new Error("Bad Request");
  }

  res.status(200).json({
    code: 200,
    message: "success",
    data: result,
  });
};

module.exports = getMainPage;
