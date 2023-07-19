const User = require("../../models/user");

const getShoppingList = async (req, res) => {
  const { _id: userId } = req.user;

  const result = await User.findById(userId)
    .populate({
      path: "shoppingList._id",
      model: "Ingredient",
    })
    .select("shoppingList");

  if (!result) {
    res.status(404);
    throw new Error(`User is not found`);
  }

  res.status(200).json({
    code: 200,
    message: "success",
    data: result,
  });
};
module.exports = getShoppingList;
