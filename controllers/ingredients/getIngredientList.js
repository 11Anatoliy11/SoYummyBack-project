const mongoose = require("mongoose");
const Ingredient = require("../../models/ingredient");

const ObjectId = mongoose.Types.ObjectId;
const getIngredientList = async (req, res) => {
  const { id } = req.params;
  const result = await Ingredient.aggregate([
    {
      $lookup: {
        from: "recipes",
        pipeline: [
          {
            $match: {
              ingredients: {
                $elemMatch: {
                  id: ObjectId.createFromHexString(id),
                },
              },
            },
          },
          {
            $project: {
              recipes: {
                _id: "$_id",
                title: "$title",
                thumb: "$thumb",
              },
            },
          },
          {
            $replaceRoot: {
              newRoot: "$recipes",
            },
          },
        ],
        as: "recipes",
      },
    },
    {
      $match: {
        _id: ObjectId.createFromHexString(id),
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
module.exports = getIngredientList;
