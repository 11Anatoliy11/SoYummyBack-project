const Recipe = require("../../models/recipe");

const getPopularRecipe = async (req, res) => {
  const data = await Recipe.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "_id",
        foreignField: "favorites",
        as: "owners",
      },
    },

    {
      $addFields: {
        popularity: {
          $size: "$owners",
        },
      },
    },
    {
      $unset: "owners",
    },

    {
      $sort: {
        popularity: -1,
      },
    },
    { $limit: 2 },
  ]);
  res.status(200).json({
    code: 200,
    message: "Received the most popular recipes",
    data: data,
  });
};
module.exports = getPopularRecipe;
