const Recipe = require("../../models/recipe");

const searchByTitle = async (req, res) => {
  const { keyword } = req.query;
  const result = await Recipe.find({
    title: { $regex: keyword, $options: "i" },
  });
  if (!result) {
    res.status(400);
    throw new Error("Bad Request");
  }
  res.json({
    status: 200,
    message: "success",
    data: result,
  });
};

module.exports = searchByTitle;
